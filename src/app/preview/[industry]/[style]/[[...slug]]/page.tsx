import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { INDUSTRY_KEYS, STYLE_KEYS, type IndustryKey, type StyleKey } from '@/template-engine/model';
import { getDemoSeed } from '@/template-engine/seeds';
import { resolvePreviewPage } from '@/template-engine/rendering/preview-route';
import { TemplatePreview } from '@/template-engine/rendering/TemplatePreview';

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
  return { title, description };
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

  return <TemplatePreview industryKey={industry as IndustryKey} styleKey={style as StyleKey} pathSegments={slug ?? []} />;
}
