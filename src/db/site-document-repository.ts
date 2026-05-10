import { randomUUID } from 'node:crypto';
import { and, asc, desc, eq } from 'drizzle-orm';
import type { PageInstance, SectionInstance } from '@/template-engine/model';
import type { CollectionSeedItem, SiteGlobalIntegrations, SiteSeed, TenantCustomScript, TenantMailSmtpSettings } from '@/template-engine/seeds/model';
import { getDb } from './client';
import { collectionItems, globalSettings, pages, sectionInstances, siteVersions, tenants } from './schema';

type VersionStatus = 'draft' | 'published' | 'archived';

export async function loadSiteDocumentByTenantSlug(tenantSlug: string, status: Exclude<VersionStatus, 'archived'>): Promise<SiteSeed | undefined> {
  const db = getDb();
  const [tenant] = await db.select().from(tenants).where(eq(tenants.slug, tenantSlug)).limit(1);
  if (!tenant) return undefined;

  const [version] = await db
    .select()
    .from(siteVersions)
    .where(and(eq(siteVersions.tenantId, tenant.id), eq(siteVersions.status, status)))
    .orderBy(desc(siteVersions.versionNumber))
    .limit(1);

  if (!version) return undefined;

  const [settings] = await db
    .select()
    .from(globalSettings)
    .where(and(eq(globalSettings.tenantId, tenant.id), eq(globalSettings.versionId, version.id)))
    .limit(1);

  const pageRows = await db
    .select()
    .from(pages)
    .where(and(eq(pages.tenantId, tenant.id), eq(pages.versionId, version.id)))
    .orderBy(asc(pages.sortOrder));

  const sectionRows = await db
    .select()
    .from(sectionInstances)
    .where(and(eq(sectionInstances.tenantId, tenant.id), eq(sectionInstances.versionId, version.id)))
    .orderBy(asc(sectionInstances.sortOrder));

  const collectionRows = await db
    .select()
    .from(collectionItems)
    .where(and(eq(collectionItems.tenantId, tenant.id), eq(collectionItems.versionId, version.id)))
    .orderBy(asc(collectionItems.collectionKey), asc(collectionItems.title));

  return {
    tenantName: tenant.name,
    industryKey: tenant.industryKey as SiteSeed['industryKey'],
    styleKey: tenant.styleKey as SiteSeed['styleKey'],
    global: {
      brand: asBrand(settings?.brand),
      navigation: asNavigation(settings?.navigation),
      contact: settings?.contact ?? {},
      integrations: integrationsFromGlobalRow(
        settings
          ? { tracking: settings.tracking as unknown, legal: settings.legal as unknown }
          : undefined
      )
    },
    pages: pageRows.map((page): PageInstance => ({
      id: page.id,
      key: page.key,
      kind: page.kind,
      title: page.title,
      slug: page.slug,
      seo: page.seo,
      sections: sectionRows
        .filter((section) => section.pageId === page.id)
        .map((section): SectionInstance => ({
          id: section.id,
          sectionKey: section.sectionKey,
          visible: section.visible,
          sortOrder: section.sortOrder,
          data: section.data
        }))
    })),
    collections: collectionRows.map((item): CollectionSeedItem => ({
      id: item.id,
      collectionKey: item.collectionKey,
      title: item.title,
      slug: item.slug,
      data: item.data,
      seo: item.seo
    }))
  };
}

export async function saveDraftSiteDocument(tenantSlug: string, inputDocument: SiteSeed): Promise<void> {
  const db = getDb();
  const [tenant] = await db.select().from(tenants).where(eq(tenants.slug, tenantSlug)).limit(1);
  if (!tenant) {
    throw new Error(`Tenant not found: ${tenantSlug}`);
  }

  const document = normalizeCollectionIdsForPersist(inputDocument);
  const publishedLegalMail = await loadPublishedMailFromLegal(db, tenant.id);
  const mergedIntegrations = mergeMailPasswordIntoIntegrations(publishedLegalMail, document.global.integrations);
  const documentWithSecrets: SiteSeed = {
    ...document,
    global: {
      ...document.global,
      integrations: mergedIntegrations
    }
  };

  const versions = await db
    .select()
    .from(siteVersions)
    .where(eq(siteVersions.tenantId, tenant.id))
    .orderBy(desc(siteVersions.versionNumber));

  for (const version of versions.filter((entry) => entry.status === 'draft')) {
    await db.delete(siteVersions).where(eq(siteVersions.id, version.id));
  }

  const nextVersionNumber = (versions[0]?.versionNumber ?? 0) + 1;
  const [version] = await db
    .insert(siteVersions)
    .values({
      tenantId: tenant.id,
      status: 'draft',
      versionNumber: nextVersionNumber
    })
    .returning();

  await db.insert(globalSettings).values({
    tenantId: tenant.id,
    versionId: version.id,
    brand: documentWithSecrets.global.brand,
    navigation: { items: documentWithSecrets.global.navigation },
    footer: { items: [] },
    contact: documentWithSecrets.global.contact,
    seoDefaults: {},
    legal: legalJsonFromIntegrations(mergedIntegrations),
    tracking: trackingJsonFromIntegrations(mergedIntegrations),
    announcement: {}
  });

  for (const [pageIndex, page] of documentWithSecrets.pages.entries()) {
    const [pageRow] = await db
      .insert(pages)
      .values({
        tenantId: tenant.id,
        versionId: version.id,
        kind: page.kind,
        key: page.key,
        title: page.title,
        slug: page.slug,
        seo: page.seo,
        visible: true,
        sortOrder: pageIndex + 1
      })
      .returning();

    for (const section of page.sections) {
      await db.insert(sectionInstances).values({
        tenantId: tenant.id,
        versionId: version.id,
        pageId: pageRow.id,
        sectionKey: section.sectionKey,
        visible: section.visible,
        sortOrder: section.sortOrder,
        data: section.data
      });
    }
  }

  for (const item of documentWithSecrets.collections) {
    await db.insert(collectionItems).values({
      id: item.id,
      tenantId: tenant.id,
      versionId: version.id,
      collectionKey: item.collectionKey,
      title: item.title,
      slug: item.slug,
      status: 'draft',
      data: item.data,
      seo: item.seo ?? {}
    });
  }
}

export async function listPublishedTenantSlugs(): Promise<string[]> {
  const db = getDb();
  const rows = await db
    .select({ slug: tenants.slug })
    .from(tenants)
    .innerJoin(siteVersions, eq(siteVersions.tenantId, tenants.id))
    .where(eq(siteVersions.status, 'published'));
  return [...new Set(rows.map((row) => row.slug))];
}

/** Removes SMTP password before sending a site document to the browser. */
export function stripSiteSeedForAdminApi(document: SiteSeed): SiteSeed {
  const integ = document.global.integrations;
  if (!integ?.mail) return document;
  const mailWithoutPass = { ...integ.mail };
  delete mailWithoutPass.pass;
  const passPresent =
    integ.mail.passPresent === true || (typeof integ.mail.pass === 'string' && integ.mail.pass.length > 0);
  return {
    ...document,
    global: {
      ...document.global,
      integrations: {
        ...integ,
        mail: { ...mailWithoutPass, passPresent }
      }
    }
  };
}

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function integrationsFromGlobalRow(
  settings: { tracking: unknown; legal: unknown } | undefined
): SiteGlobalIntegrations | undefined {
  if (!settings) return undefined;
  const tracking = asRecord(settings.tracking);
  const legal = asRecord(settings.legal);
  const rawScripts = tracking.customScripts;
  const scripts = Array.isArray(rawScripts)
    ? rawScripts.filter(isRecord).map(normalizeScript).filter((s): s is TenantCustomScript => Boolean(s))
    : [];
  const mail = parseMailForClient(legal.mail);
  const cookieUi = parseCookieUiMode(legal.cookieUi);
  const privacyHref = typeof legal.privacyHref === 'string' ? legal.privacyHref : undefined;
  const imprintHref = typeof legal.imprintHref === 'string' ? legal.imprintHref : undefined;
  if (scripts.length === 0 && !mail && !cookieUi && !privacyHref && !imprintHref) return undefined;
  return {
    customScripts: scripts.length ? scripts : undefined,
    mail,
    cookieUi,
    privacyHref,
    imprintHref
  };
}

function trackingJsonFromIntegrations(integrations: SiteGlobalIntegrations | undefined): Record<string, unknown> {
  const scripts = integrations?.customScripts ?? [];
  return { customScripts: scripts };
}

function legalJsonFromIntegrations(integrations: SiteGlobalIntegrations | undefined): Record<string, unknown> {
  const mail = integrations?.mail;
  const persistMail = mail
    ? (() => {
        const m = { ...mail };
        delete m.passPresent;
        return m;
      })()
    : {};
  return {
    mail: persistMail,
    cookieUi: integrations?.cookieUi ?? 'off',
    privacyHref: integrations?.privacyHref ?? '/datenschutz',
    imprintHref: integrations?.imprintHref ?? '/impressum'
  };
}

async function loadPublishedMailFromLegal(
  db: ReturnType<typeof getDb>,
  tenantId: string
): Promise<TenantMailSmtpSettings | undefined> {
  const [pubVer] = await db
    .select()
    .from(siteVersions)
    .where(and(eq(siteVersions.tenantId, tenantId), eq(siteVersions.status, 'published')))
    .orderBy(desc(siteVersions.versionNumber))
    .limit(1);
  if (!pubVer) return undefined;
  const [gs] = await db.select().from(globalSettings).where(eq(globalSettings.versionId, pubVer.id)).limit(1);
  const legal = asRecord(gs?.legal);
  const mail = legal.mail;
  if (!isRecord(mail)) return undefined;
  return mail as TenantMailSmtpSettings;
}

/** Server-only: SMTP inkl. Passwort aus der veröffentlichten Version (für Test-Mail). */
export async function loadPublishedSmtpSecretsByTenantSlug(tenantSlug: string): Promise<TenantMailSmtpSettings | undefined> {
  const db = getDb();
  const [tenant] = await db.select().from(tenants).where(eq(tenants.slug, tenantSlug)).limit(1);
  if (!tenant) return undefined;
  return loadPublishedMailFromLegal(db, tenant.id);
}

function mergeMailPasswordIntoIntegrations(
  prevPublishedMail: TenantMailSmtpSettings | undefined,
  integrations: SiteGlobalIntegrations | undefined
): SiteGlobalIntegrations | undefined {
  if (!integrations?.mail) return integrations;
  const incomingPass = integrations.mail.pass;
  if (typeof incomingPass === 'string' && incomingPass.length > 0) return integrations;
  if (!prevPublishedMail?.pass || typeof prevPublishedMail.pass !== 'string' || prevPublishedMail.pass.length === 0) {
    const rest = { ...integrations.mail };
    delete rest.pass;
    return { ...integrations, mail: rest };
  }
  return { ...integrations, mail: { ...integrations.mail, pass: prevPublishedMail.pass } };
}

function parseCookieUiMode(value: unknown): SiteGlobalIntegrations['cookieUi'] {
  if (value === 'full' || value === 'simple' || value === 'off') return value;
  return undefined;
}

function parseMailForClient(mail: unknown): TenantMailSmtpSettings | undefined {
  if (!isRecord(mail)) return undefined;
  const pass = typeof mail.pass === 'string' ? mail.pass : '';
  const rest = { ...mail };
  delete rest.pass;
  const passPresent = pass.length > 0;
  const cleaned = { ...rest } as TenantMailSmtpSettings;
  if (passPresent) cleaned.passPresent = true;
  const meaningful =
    cleaned.enabled === true ||
    (typeof cleaned.host === 'string' && cleaned.host.length > 0) ||
    (typeof cleaned.user === 'string' && cleaned.user.length > 0) ||
    passPresent;
  if (!meaningful) return undefined;
  return cleaned;
}

function normalizeScript(raw: Record<string, unknown>): TenantCustomScript | undefined {
  const id = typeof raw.id === 'string' ? raw.id : '';
  const name = typeof raw.name === 'string' ? raw.name : '';
  const code = typeof raw.code === 'string' ? raw.code : '';
  const category = raw.category;
  const placement = raw.placement;
  if (!id || !name) return undefined;
  if (category !== 'necessary' && category !== 'functional' && category !== 'analytics' && category !== 'marketing') {
    return undefined;
  }
  if (placement !== 'head' && placement !== 'body') return undefined;
  return {
    id,
    name,
    category,
    code,
    enabled: raw.enabled !== false,
    placement
  };
}

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function normalizeCollectionIdsForPersist(document: SiteSeed): SiteSeed {
  const idMap = new Map<string, string>();
  for (const item of document.collections) {
    if (isUuid(item.id)) {
      idMap.set(item.id, item.id);
    } else if (!idMap.has(item.id)) {
      idMap.set(item.id, randomUUID());
    }
  }

  const collections = document.collections.map((item) => ({
    ...item,
    id: idMap.get(item.id) ?? item.id,
    seo: item.seo ?? {}
  }));

  const pages = document.pages.map((page) => ({
    ...page,
    sections: page.sections.map((section) => ({
      ...section,
      data: rewriteCollectionRefsInSectionData(section.data, idMap)
    }))
  }));

  return { ...document, collections, pages };
}

function rewriteCollectionRefsInSectionData(
  data: Record<string, unknown>,
  idMap: Map<string, string>
): Record<string, unknown> {
  const next: Record<string, unknown> = { ...data };
  const items = next.items;
  if (Array.isArray(items) && items.length > 0 && items.every((entry) => typeof entry === 'string')) {
    next.items = items.map((entry) => idMap.get(String(entry)) ?? String(entry));
  }
  return next;
}

export async function publishDraftForTenant(tenantSlug: string): Promise<void> {
  const db = getDb();
  const [tenant] = await db.select().from(tenants).where(eq(tenants.slug, tenantSlug)).limit(1);
  if (!tenant) throw new Error(`Tenant not found: ${tenantSlug}`);

  const [draft] = await db
    .select()
    .from(siteVersions)
    .where(and(eq(siteVersions.tenantId, tenant.id), eq(siteVersions.status, 'draft')))
    .orderBy(desc(siteVersions.versionNumber))
    .limit(1);

  if (!draft) throw new Error(`No draft version for tenant: ${tenantSlug}`);

  await db
    .update(siteVersions)
    .set({ status: 'archived' })
    .where(and(eq(siteVersions.tenantId, tenant.id), eq(siteVersions.status, 'published')));

  await db
    .update(siteVersions)
    .set({ status: 'published', publishedAt: new Date() })
    .where(eq(siteVersions.id, draft.id));
}

export async function discardDraftForTenant(tenantSlug: string): Promise<void> {
  const db = getDb();
  const [tenant] = await db.select().from(tenants).where(eq(tenants.slug, tenantSlug)).limit(1);
  if (!tenant) throw new Error(`Tenant not found: ${tenantSlug}`);

  const drafts = await db
    .select()
    .from(siteVersions)
    .where(and(eq(siteVersions.tenantId, tenant.id), eq(siteVersions.status, 'draft')));

  for (const draft of drafts) {
    await db.delete(siteVersions).where(eq(siteVersions.id, draft.id));
  }
}

function asBrand(value: unknown): SiteSeed['global']['brand'] {
  if (!isRecord(value)) return { name: '', tagline: '' };
  return {
    name: typeof value.name === 'string' ? value.name : '',
    tagline: typeof value.tagline === 'string' ? value.tagline : ''
  };
}

function asNavigation(value: unknown): SiteSeed['global']['navigation'] {
  if (!isRecord(value) || !Array.isArray(value.items)) return [];
  return value.items
    .filter(isRecord)
    .map((item) => ({
      label: typeof item.label === 'string' ? item.label : '',
      href: typeof item.href === 'string' ? item.href : ''
    }));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
