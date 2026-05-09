ALTER TABLE "flamingo_rebuild"."tenants" ADD COLUMN IF NOT EXISTS "vercel_project_id" text;--> statement-breakpoint
ALTER TABLE "flamingo_rebuild"."tenants" ADD COLUMN IF NOT EXISTS "vercel_project_name" text;
