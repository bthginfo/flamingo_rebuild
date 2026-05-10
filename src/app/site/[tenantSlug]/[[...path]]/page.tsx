import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { loadSiteDocumentByTenantSlug } from '@/db/site-document-repository';
import { getSiteUrl } from '@/lib/site-url';
import { previewPathFromSegments, resolvePreviewPage } from '@/template-engine/rendering/preview-route';
import { PublishedSiteClient } from '@/template-engine/rendering/PublishedSiteClient';
import { buildTenantJsonLd, firstSeoImage } from '@/template-engine/seo/structured-data';

function asMetaString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ tenantSlug: string; path?: string[] }>;
}): Promise<Metadata> {
  const { tenantSlug, path } = await params;
  const seed = await loadSiteDocumentByTenantSlug(tenantSlug, 'published');
  if (!seed) {
    return { title: 'Flamingo' };
  }
  const page = resolvePreviewPage(seed, path ?? []);
  const home = seed.pages.find((p) => p.key === 'home');
  const metaTitle = asMetaString(page.seo.title) || page.title || asMetaString(home?.seo.title) || seed.global.brand.name || tenantSlug;
  const metaDescription =
    asMetaString(page.seo.description) ||
    asMetaString(home?.seo.description) ||
    seed.global.brand.tagline ||
    undefined;
  const pathNorm = previewPathFromSegments(path ?? []);
  const canonicalPath = `/site/${tenantSlug}${pathNorm === '/' ? '' : pathNorm}`;
  const canonical = new URL(canonicalPath, getSiteUrl()).toString();
  const brandName = seed.global.brand.name;
  const image = firstSeoImage(page);
  const robots = page.seo.noindex === true ? { index: false, follow: false } : undefined;

  return {
    title: metaTitle,
    description: metaDescription,
    robots,
    alternates: { canonical },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonical,
      siteName: brandName,
      type: 'website',
      locale: 'de_DE',
      images: [{ url: image || '/opengraph-image', width: 1200, height: 630, alt: brandName }]
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [image || '/opengraph-image']
    }
  };
}

export default async function TenantPublishedSitePage({
  params
}: {
  params: Promise<{ tenantSlug: string; path?: string[] }>;
}) {
  const { tenantSlug, path } = await params;
  const seed = await loadSiteDocumentByTenantSlug(tenantSlug, 'published');
  if (!seed) {
    notFound();
  }

  const page = resolvePreviewPage(seed, path ?? []);
  const pathNorm = previewPathFromSegments(path ?? []);
  const canonicalPath = `/site/${tenantSlug}${pathNorm === '/' ? '' : pathNorm}`;
  const canonical = new URL(canonicalPath, getSiteUrl()).toString();
  const jsonLd = buildTenantJsonLd({ seed, page, canonicalUrl: canonical });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <PublishedSiteClient seed={seed} pathSegments={path ?? []} />
    </>
  );
}
