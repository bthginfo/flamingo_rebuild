import { getTenantCmsProfile } from '@/db/auth-repository';
import { isDatabaseConfigured } from '@/db/client';
import { loadEditorSiteSeed } from '@/lib/admin-editor-seed';
import { AdminAppChrome, type AdminCorePageNav } from '@/admin/AdminAppChrome';
import { isSessionFresh, readAdminSession } from '@/platform/auth/admin-session';
import { getIndustry } from '@/template-engine/registry';
import type { IndustryKey, StyleKey } from '@/template-engine/model';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await readAdminSession();
  const fresh = Boolean(session && isSessionFresh(session));

  let tenantSlug: string | null = null;
  let tenantName: string | null = null;
  let industryKey: IndustryKey | null = null;
  let styleKey: StyleKey | null = null;
  let corePages: readonly AdminCorePageNav[] = [];

  if (fresh && session) {
    tenantSlug = session.tenantSlug;
    if (isDatabaseConfigured()) {
      try {
        const profile = await getTenantCmsProfile(session.tenantSlug);
        if (profile) {
          tenantName = profile.name;
          industryKey = profile.industryKey;
          styleKey = profile.styleKey;
          const industry = getIndustry(profile.industryKey);
          const coreNav: AdminCorePageNav[] = industry.corePages.map((p) => ({ key: p.key, label: p.label }));
          try {
            const seed = await loadEditorSiteSeed(session.tenantSlug, profile);
            const coreKeys = new Set(industry.corePages.map((p) => p.key));
            const extras: AdminCorePageNav[] = seed.pages
              .filter((p) => !coreKeys.has(p.key))
              .map((p) => ({ key: p.key, label: p.title }));
            corePages = [...coreNav, ...extras];
          } catch {
            corePages = coreNav;
          }
        } else {
          tenantName = session.tenantSlug;
        }
      } catch {
        tenantName = session.tenantSlug;
      }
    } else {
      tenantName = session.tenantSlug;
    }
  }

  return (
    <AdminAppChrome
      tenantSlug={tenantSlug}
      tenantName={tenantName}
      industryKey={industryKey}
      styleKey={styleKey}
      corePages={corePages}
    >
      {children}
    </AdminAppChrome>
  );
}
