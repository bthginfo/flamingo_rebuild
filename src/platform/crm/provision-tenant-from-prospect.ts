import bcrypt from 'bcryptjs';
import { loadSiteDocumentByTenantSlug, publishDraftForTenant, saveDraftSiteDocument } from '@/db/site-document-repository';
import {
  getProspectById,
  insertTenantRecord,
  markProspectProvisioned,
  tenantSlugExists
} from '@/db/crm-repository';
import { isValidTenantSlug } from '@/lib/tenant-slug';
import { INDUSTRY_KEYS, STYLE_KEYS, type IndustryKey, type StyleKey } from '@/template-engine/model';
import { validateSiteDocument } from '@/platform/publishing/validate-site-document';
import { getDemoSeed } from '@/template-engine/seeds';
import type { SiteSeed } from '@/template-engine/seeds/model';

export type ProvisionInput = {
  prospectId: string;
  tenantSlug: string;
  adminPassword: string;
};

export type ProvisionHealth = {
  registryValid: boolean;
  draftCreated: boolean;
  publishedCreated: boolean;
  defaultPagesCreated: boolean;
  collectionsSeeded: boolean;
};

export type ProvisionResult =
  | { ok: true; tenantId: string; tenantSlug: string; health: ProvisionHealth }
  | { ok: false; status: number; error: string; issues?: string[] };

function isIndustryKey(value: string): value is IndustryKey {
  return (INDUSTRY_KEYS as readonly string[]).includes(value);
}

function isStyleKey(value: string): value is StyleKey {
  return (STYLE_KEYS as readonly string[]).includes(value);
}

function personalizeSeed(seed: SiteSeed, tenantName: string): SiteSeed {
  return {
    ...seed,
    tenantName,
    global: {
      ...seed.global,
      brand: { ...seed.global.brand, name: tenantName },
      integrations: {
        ...seed.global.integrations,
        cookieUi: 'full',
        privacyHref: '/datenschutz',
        imprintHref: '/impressum'
      }
    }
  };
}

export async function provisionTenantFromProspect(input: ProvisionInput): Promise<ProvisionResult> {
  const prospect = await getProspectById(input.prospectId);
  if (!prospect) return { ok: false, status: 404, error: 'Prospect nicht gefunden.' };

  if (prospect.provisionedTenantId) {
    return { ok: false, status: 409, error: 'Für diesen Prospect existiert bereits ein Tenant.' };
  }

  const tenantSlug = input.tenantSlug.trim().toLowerCase();
  if (!isValidTenantSlug(tenantSlug)) {
    return {
      ok: false,
      status: 400,
      error: 'Ungültiger Tenant-Slug (2–50 Zeichen, Kleinbuchstaben, Ziffern, Bindestriche).'
    };
  }

  if (await tenantSlugExists(tenantSlug)) {
    return { ok: false, status: 409, error: 'Dieser Tenant-Slug ist bereits vergeben.' };
  }

  const industryCandidate = prospect.preferredIndustry ?? 'restaurant';
  const styleCandidate = prospect.preferredStyle ?? 'classic';
  if (!isIndustryKey(industryCandidate)) {
    return { ok: false, status: 400, error: `Unbekannte Branche: ${industryCandidate}` };
  }
  if (!isStyleKey(styleCandidate)) {
    return { ok: false, status: 400, error: `Unbekannter Stil: ${styleCandidate}` };
  }

  const industryKey = industryCandidate;
  const styleKey = styleCandidate;

  const seed = getDemoSeed(industryKey, styleKey);
  if (!seed) {
    return {
      ok: false,
      status: 422,
      error: `Für die Branche „${industryKey}“ ist kein Demo-Seed registriert. Bitte eine der neun Registry-Branchen wählen.`
    };
  }

  const personalized = personalizeSeed(seed, prospect.company);
  const issues = validateSiteDocument(personalized);
  if (issues.length > 0) {
    return { ok: false, status: 422, error: 'Seed besteht die Registry-Validierung nicht.', issues };
  }

  if (input.adminPassword.length < 8) {
    return { ok: false, status: 400, error: 'Admin-Passwort muss mindestens 8 Zeichen haben.' };
  }

  const passwordHash = await bcrypt.hash(input.adminPassword, 10);
  const tenantId = await insertTenantRecord({
    slug: tenantSlug,
    name: prospect.company,
    industryKey,
    styleKey,
    passwordHash
  });

  await saveDraftSiteDocument(tenantSlug, personalized);
  await publishDraftForTenant(tenantSlug);

  const published = await loadSiteDocumentByTenantSlug(tenantSlug, 'published');
  if (!published) {
    return { ok: false, status: 500, error: 'Published-Version fehlt nach dem Provisionieren.' };
  }

  await saveDraftSiteDocument(tenantSlug, published);
  await markProspectProvisioned(prospect.id, tenantId);

  const health: ProvisionHealth = {
    registryValid: true,
    draftCreated: true,
    publishedCreated: true,
    defaultPagesCreated: published.pages.length > 0,
    collectionsSeeded: published.collections.length > 0
  };

  return { ok: true, tenantId, tenantSlug, health };
}
