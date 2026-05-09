import type { StyleKey } from '@/template-engine/model';
import { isDatabaseConfigured } from '@/db/client';
import { loadSiteDocumentByTenantSlug } from '@/db/site-document-repository';
import type { TenantCmsProfile } from '@/db/auth-repository';
import { getDemoSeed } from '@/template-engine/seeds';
import type { SiteSeed } from '@/template-engine/seeds/model';

export async function loadEditorSiteSeed(
  tenantSlug: string,
  profile: TenantCmsProfile,
  styleOverride?: StyleKey
): Promise<SiteSeed> {
  if (isDatabaseConfigured()) {
    const draft = await loadSiteDocumentByTenantSlug(tenantSlug, 'draft');
    if (draft) return draft;
    const published = await loadSiteDocumentByTenantSlug(tenantSlug, 'published');
    if (published) return published;
  }

  const styleKey = styleOverride ?? profile.styleKey;
  const demo = getDemoSeed(profile.industryKey, styleKey);
  if (!demo) {
    throw new Error(`Missing demo seed for ${profile.industryKey} / ${styleKey}`);
  }
  return demo;
}
