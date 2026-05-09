CREATE SCHEMA "flamingo_rebuild";
--> statement-breakpoint
CREATE TYPE "flamingo_rebuild"."content_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TYPE "flamingo_rebuild"."page_kind" AS ENUM('core', 'custom', 'collectionDetail');--> statement-breakpoint
CREATE TYPE "flamingo_rebuild"."site_version_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TYPE "flamingo_rebuild"."tenant_status" AS ENUM('active', 'paused', 'archived');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "flamingo_rebuild"."collection_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"version_id" uuid NOT NULL,
	"collection_key" text NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"status" "flamingo_rebuild"."content_status" DEFAULT 'draft' NOT NULL,
	"data" jsonb NOT NULL,
	"seo" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "flamingo_rebuild"."crm_prospects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company" text NOT NULL,
	"contact_name" text DEFAULT '' NOT NULL,
	"email" text DEFAULT '' NOT NULL,
	"phone" text DEFAULT '' NOT NULL,
	"old_website" text DEFAULT '' NOT NULL,
	"notes" text DEFAULT '' NOT NULL,
	"status" text DEFAULT 'new' NOT NULL,
	"preferred_industry" text,
	"preferred_style" text,
	"provisioned_tenant_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "flamingo_rebuild"."global_settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"version_id" uuid NOT NULL,
	"brand" jsonb NOT NULL,
	"navigation" jsonb NOT NULL,
	"footer" jsonb NOT NULL,
	"contact" jsonb NOT NULL,
	"seo_defaults" jsonb NOT NULL,
	"legal" jsonb NOT NULL,
	"tracking" jsonb NOT NULL,
	"announcement" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "flamingo_rebuild"."pages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"version_id" uuid NOT NULL,
	"kind" "flamingo_rebuild"."page_kind" NOT NULL,
	"key" text NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"seo" jsonb NOT NULL,
	"visible" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "flamingo_rebuild"."section_instances" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"version_id" uuid NOT NULL,
	"page_id" uuid NOT NULL,
	"section_key" text NOT NULL,
	"visible" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"data" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "flamingo_rebuild"."site_versions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"status" "flamingo_rebuild"."site_version_status" NOT NULL,
	"version_number" integer NOT NULL,
	"created_by" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"published_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "flamingo_rebuild"."tenants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"primary_domain" text,
	"industry_key" text NOT NULL,
	"style_key" text NOT NULL,
	"status" "flamingo_rebuild"."tenant_status" DEFAULT 'active' NOT NULL,
	"password_hash" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tenants_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flamingo_rebuild"."collection_items" ADD CONSTRAINT "collection_items_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "flamingo_rebuild"."tenants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flamingo_rebuild"."collection_items" ADD CONSTRAINT "collection_items_version_id_site_versions_id_fk" FOREIGN KEY ("version_id") REFERENCES "flamingo_rebuild"."site_versions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flamingo_rebuild"."crm_prospects" ADD CONSTRAINT "crm_prospects_provisioned_tenant_id_tenants_id_fk" FOREIGN KEY ("provisioned_tenant_id") REFERENCES "flamingo_rebuild"."tenants"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flamingo_rebuild"."global_settings" ADD CONSTRAINT "global_settings_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "flamingo_rebuild"."tenants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flamingo_rebuild"."global_settings" ADD CONSTRAINT "global_settings_version_id_site_versions_id_fk" FOREIGN KEY ("version_id") REFERENCES "flamingo_rebuild"."site_versions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flamingo_rebuild"."pages" ADD CONSTRAINT "pages_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "flamingo_rebuild"."tenants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flamingo_rebuild"."pages" ADD CONSTRAINT "pages_version_id_site_versions_id_fk" FOREIGN KEY ("version_id") REFERENCES "flamingo_rebuild"."site_versions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flamingo_rebuild"."section_instances" ADD CONSTRAINT "section_instances_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "flamingo_rebuild"."tenants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flamingo_rebuild"."section_instances" ADD CONSTRAINT "section_instances_version_id_site_versions_id_fk" FOREIGN KEY ("version_id") REFERENCES "flamingo_rebuild"."site_versions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flamingo_rebuild"."section_instances" ADD CONSTRAINT "section_instances_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "flamingo_rebuild"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flamingo_rebuild"."site_versions" ADD CONSTRAINT "site_versions_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "flamingo_rebuild"."tenants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
