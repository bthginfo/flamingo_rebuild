import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { loadSiteDocumentByTenantSlug } from '@/db/site-document-repository';
import { getSiteUrl } from '@/lib/site-url';
import { previewPathFromSegments, resolvePreviewPage } from '@/template-engine/rendering/preview-route';
import { PublishedSiteClient } from '@/template-engine/rendering/PublishedSiteClient';

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

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonical,
      siteName: brandName,
      type: 'website',
      locale: 'de_DE',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: brandName }]
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: ['/opengraph-image']
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

  return <PublishedSiteClient seed={seed} pathSegments={path ?? []} />;
}
