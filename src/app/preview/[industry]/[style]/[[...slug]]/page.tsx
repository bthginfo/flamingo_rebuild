import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { INDUSTRY_KEYS, STYLE_KEYS, type IndustryKey, type StyleKey } from '@/template-engine/model';
import { getDemoSeed } from '@/template-engine/seeds';
import { previewPathFromSegments, resolvePreviewPage } from '@/template-engine/rendering/preview-route';
import { TemplatePreview } from '@/template-engine/rendering/TemplatePreview';
import { getSiteUrl } from '@/lib/site-url';
import { buildTenantJsonLd, firstSeoImage } from '@/template-engine/seo/structured-data';

function asMetaString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ industry: string; style: string; slug?: string[] }>;
}): Promise<Metadata> {
  const { industry, style, slug } = await params;
  if (!INDUSTRY_KEYS.includes(industry as IndustryKey) || !STYLE_KEYS.includes(style as StyleKey)) {
    return { title: 'Vorschau' };
  }
  const seed = getDemoSeed(industry as IndustryKey, style as StyleKey);
  if (!seed) {
    return { title: 'Vorschau' };
  }
  const page = resolvePreviewPage(seed, slug ?? []);
  const home = seed.pages.find((p) => p.key === 'home');
  const title =
    asMetaString(page.seo.title) || page.title || asMetaString(home?.seo.title) || seed.global.brand.name || 'Vorschau';
  const description =
    asMetaString(page.seo.description) || asMetaString(home?.seo.description) || seed.global.brand.tagline || undefined;
  const pathNorm = previewPathFromSegments(slug ?? []);
  const canonical = new URL(`/preview/${industry}/${style}${pathNorm === '/' ? '' : pathNorm}`, getSiteUrl()).toString();
  const image = firstSeoImage(page);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: seed.global.brand.name,
      type: 'website',
      locale: 'de_DE',
      images: [{ url: image || '/opengraph-image', width: 1200, height: 630, alt: seed.global.brand.name }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image || '/opengraph-image']
    }
  };
}

export default async function PreviewCatchAllPage({
  params
}: {
  params: Promise<{ industry: string; style: string; slug?: string[] }>;
}) {
  const { industry, style, slug } = await params;
  if (!INDUSTRY_KEYS.includes(industry as IndustryKey) || !STYLE_KEYS.includes(style as StyleKey)) {
    notFound();
  }

  const seed = getDemoSeed(industry as IndustryKey, style as StyleKey);
  const pathNorm = previewPathFromSegments(slug ?? []);
  const canonical = new URL(`/preview/${industry}/${style}${pathNorm === '/' ? '' : pathNorm}`, getSiteUrl()).toString();

  return (
    <>
      {seed ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              buildTenantJsonLd({
                seed,
                page: resolvePreviewPage(seed, slug ?? []),
                canonicalUrl: canonical
              })
            ).replace(/</g, '\\u003c')
          }}
        />
      ) : null}
      <TemplatePreview industryKey={industry as IndustryKey} styleKey={style as StyleKey} pathSegments={slug ?? []} />
    </>
  );
}
