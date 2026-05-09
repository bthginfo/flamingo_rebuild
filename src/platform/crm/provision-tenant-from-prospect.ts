import { randomBytes } from 'crypto';
import bcrypt from 'bcryptjs';
import { loadSiteDocumentByTenantSlug, publishDraftForTenant, saveDraftSiteDocument } from '@/db/site-document-repository';
import {
  getProspectById,
  insertTenantRecord,
  markProspectProvisioned,
  tenantSlugExists,
  updateTenantVercelById
} from '@/db/crm-repository';
import { isValidTenantSlug } from '@/lib/tenant-slug';
import { INDUSTRY_KEYS, STYLE_KEYS, type IndustryKey, type StyleKey } from '@/template-engine/model';
import { validateSiteDocument } from '@/platform/publishing/validate-site-document';
import { provisionVercelProjectForTenantSlug } from '@/platform/vercel/provision-tenant-project';
import { getDemoSeed } from '@/template-engine/seeds';
import type { CollectionSeedItem, SiteSeed } from '@/template-engine/seeds/model';

export type ProvisionInput = {
  prospectId: string;
  tenantSlug: string;
  /** Leer oder zu kurz → zufälliges Passwort (wird in `generatedPassword` zurückgegeben). */
  adminPassword?: string;
  /** Anzeigename / Tenant-Name in der DB; Standard: Firmenname des Prospects. */
  tenantDisplayName?: string;
  /** Überschreibt die Branche aus dem Prospect. */
  industryKey?: IndustryKey;
  /** Überschreibt den Stil aus dem Prospect. */
  styleKey?: StyleKey;
  /** Optionales JSON (z. B. Perplexity-Export): wird mit dem Demo-Seed zusammengefuehrt und validiert. */
  contentJson?: string;
};

export type ProvisionHealth = {
  registryValid: boolean;
  draftCreated: boolean;
  publishedCreated: boolean;
  defaultPagesCreated: boolean;
  collectionsSeeded: boolean;
};

export type ProvisionResult =
  | {
      ok: true;
      tenantId: string;
      tenantSlug: string;
      health: ProvisionHealth;
      generatedPassword?: string;
      vercel?: {
        projectUrl: string;
        loginUrl: string;
        vercelProjectName: string;
        deploymentUrl: string;
        deploymentState: string;
      };
      vercelError?: string;
    }
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

function cloneSeed(seed: SiteSeed): SiteSeed {
  return JSON.parse(JSON.stringify(seed)) as SiteSeed;
}

function stripUnderscoreKeys(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(stripUnderscoreKeys);
  }
  if (value && typeof value === 'object') {
    const o = value as Record<string, unknown>;
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(o)) {
      if (k.startsWith('_')) continue;
      out[k] = stripUnderscoreKeys(v);
    }
    return out;
  }
  return value;
}

function mergeSiteSeedFromJson(
  base: SiteSeed,
  jsonText: string
): { ok: true; seed: SiteSeed } | { ok: false; error: string } {
  let patch: unknown;
  try {
    patch = JSON.parse(jsonText);
  } catch {
    return { ok: false, error: 'Content-JSON ist kein gültiges JSON.' };
  }
  patch = stripUnderscoreKeys(patch);
  if (!patch || typeof patch !== 'object' || Array.isArray(patch)) {
    return { ok: false, error: 'Content-JSON muss ein Objekt sein.' };
  }
  const p = patch as Record<string, unknown>;
  const seed = cloneSeed(base);
  try {
    if (typeof p.tenantName === 'string' && p.tenantName.trim()) {
      seed.tenantName = p.tenantName.trim();
    }
    if (isIndustryKey(String(p.industryKey))) {
      seed.industryKey = p.industryKey as IndustryKey;
    }
    if (isStyleKey(String(p.styleKey))) {
      seed.styleKey = p.styleKey as StyleKey;
    }
    if (p.global && typeof p.global === 'object' && !Array.isArray(p.global)) {
      const g = p.global as Record<string, unknown>;
      const nextGlobal = { ...seed.global };
      if (g.brand && typeof g.brand === 'object' && !Array.isArray(g.brand)) {
        nextGlobal.brand = { ...seed.global.brand, ...(g.brand as Record<string, unknown>) } as SiteSeed['global']['brand'];
      }
      if (Array.isArray(g.navigation)) {
        nextGlobal.navigation = g.navigation as SiteSeed['global']['navigation'];
      }
      if (g.contact && typeof g.contact === 'object' && !Array.isArray(g.contact)) {
        nextGlobal.contact = { ...seed.global.contact, ...(g.contact as Record<string, unknown>) };
      }
      if (g.integrations !== undefined && g.integrations !== null) {
        if (typeof g.integrations === 'object' && !Array.isArray(g.integrations)) {
          nextGlobal.integrations = {
            ...seed.global.integrations,
            ...(g.integrations as Record<string, unknown>)
          } as SiteSeed['global']['integrations'];
        }
      }
      seed.global = nextGlobal;
    }
    if (Array.isArray(p.pages)) {
      seed.pages = p.pages as SiteSeed['pages'];
    }
    if (Array.isArray(p.collections)) {
      seed.collections = p.collections as readonly CollectionSeedItem[];
    }
    return { ok: true, seed };
  } catch {
    return { ok: false, error: 'Content-JSON konnte nicht zusammengeführt werden.' };
  }
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

  const displayName = (input.tenantDisplayName ?? prospect.company).trim() || prospect.company;

  const industryCandidate = input.industryKey ?? prospect.preferredIndustry ?? 'restaurant';
  const styleCandidate = input.styleKey ?? prospect.preferredStyle ?? 'classic';
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

  let personalized = personalizeSeed(seed, displayName);
  const jsonRaw = input.contentJson?.trim();
  if (jsonRaw) {
    const merged = mergeSiteSeedFromJson(personalized, jsonRaw);
    if (!merged.ok) {
      return { ok: false, status: 400, error: merged.error };
    }
    personalized = merged.seed;
  }

  personalized = { ...personalized, industryKey, styleKey };

  const issues = validateSiteDocument(personalized);
  if (issues.length > 0) {
    return { ok: false, status: 422, error: 'Seed besteht die Registry-Validierung nicht.', issues };
  }

  let adminPassword = input.adminPassword?.trim() ?? '';
  let generatedPassword: string | undefined;
  if (adminPassword.length < 8) {
    generatedPassword = randomBytes(12).toString('base64url');
    adminPassword = generatedPassword;
  }

  const passwordHash = await bcrypt.hash(adminPassword, 10);
  const tenantId = await insertTenantRecord({
    slug: tenantSlug,
    name: displayName,
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

  let vercel:
    | {
        projectUrl: string;
        loginUrl: string;
        vercelProjectName: string;
        deploymentUrl: string;
        deploymentState: string;
      }
    | undefined;
  let vercelError: string | undefined;
  if (process.env.FLAMINGO_PROVISION_VERCEL === '1') {
    const vr = await provisionVercelProjectForTenantSlug({
      slug: tenantSlug,
      onLog: () => {}
    });
    if (vr.ok) {
      vercel = {
        projectUrl: vr.projectUrl,
        loginUrl: vr.loginUrl,
        vercelProjectName: vr.vercelProjectName,
        deploymentUrl: vr.deploymentUrl,
        deploymentState: vr.deploymentState
      };
      await updateTenantVercelById(tenantId, {
        vercelProjectId: vr.vercelProjectId,
        vercelProjectName: vr.vercelProjectName
      });
    } else {
      vercelError = vr.error;
    }
  }

  const health: ProvisionHealth = {
    registryValid: true,
    draftCreated: true,
    publishedCreated: true,
    defaultPagesCreated: published.pages.length > 0,
    collectionsSeeded: published.collections.length > 0
  };

  return {
    ok: true,
    tenantId,
    tenantSlug,
    health,
    ...(generatedPassword ? { generatedPassword } : {}),
    ...(vercel ? { vercel } : {}),
    ...(vercelError ? { vercelError } : {})
  };
}
