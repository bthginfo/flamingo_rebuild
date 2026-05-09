import { notFound, redirect } from 'next/navigation';
import { RestaurantHomeEditor } from '@/cms/page-editor/RestaurantHomeEditor';
import { getTenantCmsProfile } from '@/db/auth-repository';
import { loadEditorSiteSeed } from '@/lib/admin-editor-seed';
import { requireAdminSession } from '@/lib/admin-server';
import { STYLE_KEYS, type StyleKey } from '@/template-engine/model';
import { getIndustry } from '@/template-engine/registry';

function resolveStyleParam(raw: string | undefined, fallback: StyleKey): StyleKey {
  if (raw && STYLE_KEYS.includes(raw as StyleKey)) {
    return raw as StyleKey;
  }
  return fallback;
}

export default async function AdminPageEditorRoute({
  params,
  searchParams
}: {
  params: Promise<{ pageKey: string }>;
  searchParams: Promise<{ style?: string }>;
}) {
  const { pageKey } = await params;
  const { tenantSlug } = await requireAdminSession(`/admin/pages/${pageKey}`);
  const profile = await getTenantCmsProfile(tenantSlug);
  if (!profile) {
    redirect('/admin/login?next=/admin/pages');
  }

  const industry = getIndustry(profile.industryKey);
  const pageKeys = new Set(industry.corePages.map((p) => p.key));
  if (!pageKeys.has(pageKey)) {
    notFound();
  }

  const { style: styleParam } = await searchParams;
  const styleOverride = resolveStyleParam(styleParam, profile.styleKey);
  const initialSeed = await loadEditorSiteSeed(tenantSlug, profile, styleOverride);

  return <RestaurantHomeEditor initialSeed={initialSeed} pageKey={pageKey} />;
}
