import { eq } from 'drizzle-orm';
import { INDUSTRY_KEYS, STYLE_KEYS, type IndustryKey, type StyleKey } from '@/template-engine/model';
import { getDb } from './client';
import { tenants } from './schema';

export type TenantAuthRecord = {
  slug: string;
  passwordHash: string | null;
  status: 'active' | 'paused' | 'archived';
};

export type TenantCmsProfile = {
  slug: string;
  name: string;
  industryKey: IndustryKey;
  styleKey: StyleKey;
};

export async function getTenantAuthRecord(slug: string): Promise<TenantAuthRecord | undefined> {
  const db = getDb();
  const [tenant] = await db
    .select({
      slug: tenants.slug,
      passwordHash: tenants.passwordHash,
      status: tenants.status
    })
    .from(tenants)
    .where(eq(tenants.slug, slug))
    .limit(1);

  return tenant;
}

export async function getTenantCmsProfile(slug: string): Promise<TenantCmsProfile | undefined> {
  const db = getDb();
  const [tenant] = await db
    .select({
      slug: tenants.slug,
      name: tenants.name,
      industryKey: tenants.industryKey,
      styleKey: tenants.styleKey
    })
    .from(tenants)
    .where(eq(tenants.slug, slug))
    .limit(1);

  if (!tenant) return undefined;
  if (!INDUSTRY_KEYS.includes(tenant.industryKey as IndustryKey) || !STYLE_KEYS.includes(tenant.styleKey as StyleKey)) {
    return undefined;
  }

  return {
    slug: tenant.slug,
    name: tenant.name,
    industryKey: tenant.industryKey as IndustryKey,
    styleKey: tenant.styleKey as StyleKey
  };
}
