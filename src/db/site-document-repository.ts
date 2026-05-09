import { randomUUID } from 'node:crypto';
import { and, asc, desc, eq } from 'drizzle-orm';
import type { PageInstance, SectionInstance } from '@/template-engine/model';
import type { CollectionSeedItem, SiteSeed } from '@/template-engine/seeds/model';
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
      contact: settings?.contact ?? {}
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
      data: item.data
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
    brand: document.global.brand,
    navigation: { items: document.global.navigation },
    footer: { items: [] },
    contact: document.global.contact,
    seoDefaults: {},
    legal: {},
    tracking: {},
    announcement: {}
  });

  for (const [pageIndex, page] of document.pages.entries()) {
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

  for (const item of document.collections) {
    await db.insert(collectionItems).values({
      id: item.id,
      tenantId: tenant.id,
      versionId: version.id,
      collectionKey: item.collectionKey,
      title: item.title,
      slug: item.slug,
      status: 'draft',
      data: item.data,
      seo: {}
    });
  }
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
    id: idMap.get(item.id) ?? item.id
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
