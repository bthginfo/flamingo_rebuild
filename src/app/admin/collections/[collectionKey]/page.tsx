import { notFound, redirect } from 'next/navigation';
import { RestaurantMenuEditor } from '@/cms/collection-editor/RestaurantMenuEditor';
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

export default async function AdminCollectionEditorRoute({
  params,
  searchParams
}: {
  params: Promise<{ collectionKey: string }>;
  searchParams: Promise<{ style?: string }>;
}) {
  const { collectionKey } = await params;
  const { tenantSlug } = await requireAdminSession(`/admin/collections/${collectionKey}`);
  const profile = await getTenantCmsProfile(tenantSlug);
  if (!profile) {
    redirect('/admin/login?next=/admin/collections');
  }

  const industry = getIndustry(profile.industryKey);
  const allowed = new Set(industry.collections.map((c) => c.key));
  if (!allowed.has(collectionKey)) {
    notFound();
  }

  const { style: styleParam } = await searchParams;
  const styleOverride = resolveStyleParam(styleParam, profile.styleKey);
  const initialSeed = await loadEditorSiteSeed(tenantSlug, profile, styleOverride);

  return <RestaurantMenuEditor initialSeed={initialSeed} collectionKey={collectionKey} />;
}
