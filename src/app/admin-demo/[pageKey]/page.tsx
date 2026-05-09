import { notFound } from 'next/navigation';
import { RestaurantHomeEditor } from '@/cms/page-editor/RestaurantHomeEditor';
import { getIndustry } from '@/template-engine/registry';
import { INDUSTRY_KEYS, STYLE_KEYS, type IndustryKey, type StyleKey } from '@/template-engine/model';
import { getDemoSeed } from '@/template-engine/seeds';

function parseIndustry(v: string | undefined): IndustryKey {
  if (v && INDUSTRY_KEYS.includes(v as IndustryKey)) return v as IndustryKey;
  return 'restaurant';
}

function parseStyle(v: string | undefined): StyleKey {
  if (v && STYLE_KEYS.includes(v as StyleKey)) return v as StyleKey;
  return 'classic';
}

export default async function AdminDemoEditorPage({
  params,
  searchParams
}: {
  params: Promise<{ pageKey: string }>;
  searchParams: Promise<{ industry?: string; style?: string }>;
}) {
  const { pageKey } = await params;
  const sp = await searchParams;
  const industry = parseIndustry(sp.industry);
  const style = parseStyle(sp.style);

  const allowedKeys = new Set(getIndustry(industry).corePages.map((p) => p.key));
  if (!allowedKeys.has(pageKey)) {
    notFound();
  }

  const initialSeed = getDemoSeed(industry, style);
  if (!initialSeed) {
    notFound();
  }

  return (
    <RestaurantHomeEditor
      initialSeed={initialSeed}
      pageKey={pageKey}
      editorPathBase="/admin-demo"
      editorPersistQuery={`industry=${encodeURIComponent(industry)}`}
      forceDemo
    />
  );
}
