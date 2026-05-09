import { boolean, integer, jsonb, pgSchema, text, timestamp, uuid } from 'drizzle-orm/pg-core';

/**
 * All rebuild tables and enums live in this PostgreSQL schema so they never
 * collide with legacy `public.*` tables (e.g. old `tenants`, `site_content`)
 * if a connection string is misconfigured on a shared host.
 */
export const flamingoRebuildSchema = pgSchema('flamingo_rebuild');

export const tenantStatus = flamingoRebuildSchema.enum('tenant_status', ['active', 'paused', 'archived']);
export const siteVersionStatus = flamingoRebuildSchema.enum('site_version_status', ['draft', 'published', 'archived']);
export const pageKind = flamingoRebuildSchema.enum('page_kind', ['core', 'custom', 'collectionDetail']);
export const contentStatus = flamingoRebuildSchema.enum('content_status', ['draft', 'published', 'archived']);

export const tenants = flamingoRebuildSchema.table('tenants', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  primaryDomain: text('primary_domain'),
  industryKey: text('industry_key').notNull(),
  styleKey: text('style_key').notNull(),
  status: tenantStatus('status').notNull().default('active'),
  passwordHash: text('password_hash'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const siteVersions = flamingoRebuildSchema.table('site_versions', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  status: siteVersionStatus('status').notNull(),
  versionNumber: integer('version_number').notNull(),
  createdBy: text('created_by'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  publishedAt: timestamp('published_at')
});

export const globalSettings = flamingoRebuildSchema.table('global_settings', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  versionId: uuid('version_id').references(() => siteVersions.id, { onDelete: 'cascade' }).notNull(),
  brand: jsonb('brand').notNull().$type<Record<string, unknown>>(),
  navigation: jsonb('navigation').notNull().$type<Record<string, unknown>>(),
  footer: jsonb('footer').notNull().$type<Record<string, unknown>>(),
  contact: jsonb('contact').notNull().$type<Record<string, unknown>>(),
  seoDefaults: jsonb('seo_defaults').notNull().$type<Record<string, unknown>>(),
  legal: jsonb('legal').notNull().$type<Record<string, unknown>>(),
  tracking: jsonb('tracking').notNull().$type<Record<string, unknown>>(),
  announcement: jsonb('announcement').notNull().$type<Record<string, unknown>>()
});

export const pages = flamingoRebuildSchema.table('pages', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  versionId: uuid('version_id').references(() => siteVersions.id, { onDelete: 'cascade' }).notNull(),
  kind: pageKind('kind').notNull(),
  key: text('key').notNull(),
  title: text('title').notNull(),
  slug: text('slug').notNull(),
  seo: jsonb('seo').notNull().$type<Record<string, unknown>>(),
  visible: boolean('visible').notNull().default(true),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const sectionInstances = flamingoRebuildSchema.table('section_instances', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  versionId: uuid('version_id').references(() => siteVersions.id, { onDelete: 'cascade' }).notNull(),
  pageId: uuid('page_id').references(() => pages.id, { onDelete: 'cascade' }).notNull(),
  sectionKey: text('section_key').notNull(),
  visible: boolean('visible').notNull().default(true),
  sortOrder: integer('sort_order').notNull().default(0),
  data: jsonb('data').notNull().$type<Record<string, unknown>>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const collectionItems = flamingoRebuildSchema.table('collection_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  versionId: uuid('version_id').references(() => siteVersions.id, { onDelete: 'cascade' }).notNull(),
  collectionKey: text('collection_key').notNull(),
  title: text('title').notNull(),
  slug: text('slug').notNull(),
  status: contentStatus('status').notNull().default('draft'),
  data: jsonb('data').notNull().$type<Record<string, unknown>>(),
  seo: jsonb('seo').notNull().$type<Record<string, unknown>>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const crmProspects = flamingoRebuildSchema.table('crm_prospects', {
  id: uuid('id').defaultRandom().primaryKey(),
  company: text('company').notNull(),
  contactName: text('contact_name').notNull().default(''),
  email: text('email').notNull().default(''),
  phone: text('phone').notNull().default(''),
  oldWebsite: text('old_website').notNull().default(''),
  notes: text('notes').notNull().default(''),
  status: text('status').notNull().default('new'),
  preferredIndustry: text('preferred_industry'),
  preferredStyle: text('preferred_style'),
  provisionedTenantId: uuid('provisioned_tenant_id').references(() => tenants.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});
