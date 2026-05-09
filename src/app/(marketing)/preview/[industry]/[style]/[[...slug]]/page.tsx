import { notFound } from 'next/navigation';
import { INDUSTRY_KEYS, STYLE_KEYS, type IndustryKey, type StyleKey } from '@/template-engine/model';
import { TemplatePreview } from '@/template-engine/rendering/TemplatePreview';

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
