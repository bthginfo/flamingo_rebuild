import { desc, eq, max } from 'drizzle-orm';
import { getDb } from './client';
import { crmProspects, siteVersions, tenants } from './schema';

export type ProspectStatus = 'new' | 'contacted' | 'won' | 'lost' | 'provisioned';

export type ProspectRecord = {
  id: string;
  company: string;
  contactName: string;
  email: string;
  phone: string;
  oldWebsite: string;
  notes: string;
  status: ProspectStatus;
  preferredIndustry: string | null;
  preferredStyle: string | null;
  provisionedTenantId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

function mapRow(row: typeof crmProspects.$inferSelect): ProspectRecord {
  return {
    id: row.id,
    company: row.company,
    contactName: row.contactName,
    email: row.email,
    phone: row.phone,
    oldWebsite: row.oldWebsite,
    notes: row.notes,
    status: (row.status as ProspectStatus) ?? 'new',
    preferredIndustry: row.preferredIndustry,
    preferredStyle: row.preferredStyle,
    provisionedTenantId: row.provisionedTenantId,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt
  };
}

export async function listProspects(): Promise<ProspectRecord[]> {
  const db = getDb();
  const rows = await db.select().from(crmProspects).orderBy(desc(crmProspects.updatedAt));
  return rows.map(mapRow);
}

export async function getProspectById(id: string): Promise<ProspectRecord | undefined> {
  const db = getDb();
  const [row] = await db.select().from(crmProspects).where(eq(crmProspects.id, id)).limit(1);
  return row ? mapRow(row) : undefined;
}

export type CreateProspectInput = {
  company: string;
  contactName?: string;
  email?: string;
  phone?: string;
  oldWebsite?: string;
  notes?: string;
  status?: ProspectStatus;
  preferredIndustry?: string | null;
  preferredStyle?: string | null;
};

export async function createProspect(input: CreateProspectInput): Promise<ProspectRecord> {
  const db = getDb();
  const [row] = await db
    .insert(crmProspects)
    .values({
      company: input.company.trim(),
      contactName: input.contactName?.trim() ?? '',
      email: input.email?.trim() ?? '',
      phone: input.phone?.trim() ?? '',
      oldWebsite: input.oldWebsite?.trim() ?? '',
      notes: input.notes?.trim() ?? '',
      status: input.status ?? 'new',
      preferredIndustry: input.preferredIndustry ?? null,
      preferredStyle: input.preferredStyle ?? null
    })
    .returning();

  if (!row) throw new Error('Failed to create prospect.');
  return mapRow(row);
}

export type UpdateProspectInput = Partial<{
  company: string;
  contactName: string;
  email: string;
  phone: string;
  oldWebsite: string;
  notes: string;
  status: ProspectStatus;
  preferredIndustry: string | null;
  preferredStyle: string | null;
}>;

export async function updateProspect(id: string, patch: UpdateProspectInput): Promise<ProspectRecord | undefined> {
  const db = getDb();
  const values: Partial<typeof crmProspects.$inferInsert> = { updatedAt: new Date() };

  if (patch.company !== undefined) values.company = patch.company.trim();
  if (patch.contactName !== undefined) values.contactName = patch.contactName.trim();
  if (patch.email !== undefined) values.email = patch.email.trim();
  if (patch.phone !== undefined) values.phone = patch.phone.trim();
  if (patch.oldWebsite !== undefined) values.oldWebsite = patch.oldWebsite.trim();
  if (patch.notes !== undefined) values.notes = patch.notes.trim();
  if (patch.status !== undefined) values.status = patch.status;
  if (patch.preferredIndustry !== undefined) values.preferredIndustry = patch.preferredIndustry;
  if (patch.preferredStyle !== undefined) values.preferredStyle = patch.preferredStyle;

  const [row] = await db.update(crmProspects).set(values).where(eq(crmProspects.id, id)).returning();

  return row ? mapRow(row) : undefined;
}

export async function deleteProspect(id: string): Promise<boolean> {
  const db = getDb();
  const deleted = await db.delete(crmProspects).where(eq(crmProspects.id, id)).returning({ id: crmProspects.id });
  return deleted.length > 0;
}

export async function markProspectProvisioned(prospectId: string, tenantId: string): Promise<void> {
  const db = getDb();
  await db
    .update(crmProspects)
    .set({
      status: 'provisioned',
      provisionedTenantId: tenantId,
      updatedAt: new Date()
    })
    .where(eq(crmProspects.id, prospectId));
}

export async function tenantSlugExists(slug: string): Promise<boolean> {
  const db = getDb();
  const [row] = await db.select({ id: tenants.id }).from(tenants).where(eq(tenants.slug, slug)).limit(1);
  return Boolean(row);
}

export type InternalTenantListRow = {
  id: string;
  slug: string;
  name: string;
  industryKey: string;
  styleKey: string;
  createdAt: Date;
  updatedAt: Date;
  lastPublishedAt: Date | null;
};

/** Für internes CRM: alle Tenants mit Zeitpunkt der letzten Veröffentlichung (falls vorhanden). */
export async function listTenantsForInternalCrm(): Promise<InternalTenantListRow[]> {
  const db = getDb();
  const tenantRows = await db.select().from(tenants).orderBy(desc(tenants.createdAt));
  const pubs = await db
    .select({
      tenantId: siteVersions.tenantId,
      lastPublishedAt: max(siteVersions.publishedAt)
    })
    .from(siteVersions)
    .where(eq(siteVersions.status, 'published'))
    .groupBy(siteVersions.tenantId);
  const pubMap = new Map(pubs.map((p) => [p.tenantId, p.lastPublishedAt]));
  return tenantRows.map((t) => ({
    id: t.id,
    slug: t.slug,
    name: t.name,
    industryKey: t.industryKey,
    styleKey: t.styleKey,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt,
    lastPublishedAt: pubMap.get(t.id) ?? null
  }));
}

export async function insertTenantRecord(params: {
  slug: string;
  name: string;
  industryKey: string;
  styleKey: string;
  passwordHash: string;
}): Promise<string> {
  const db = getDb();
  const [row] = await db
    .insert(tenants)
    .values({
      slug: params.slug,
      name: params.name,
      industryKey: params.industryKey,
      styleKey: params.styleKey,
      passwordHash: params.passwordHash,
      status: 'active'
    })
    .returning({ id: tenants.id });

  if (!row) throw new Error('Failed to insert tenant.');
  return row.id;
}
