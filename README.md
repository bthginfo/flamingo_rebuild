# Flamingo Platform Rebuild

This is the clean rebuild of the Flamingo website platform.

The old Vite template/CMS implementation is not ported. This project uses the old repository only as product reference:

- Flamingo marketing and showcase positioning
- multi-tenant website platform goal
- client CMS goal
- CRM/provisioning workflow idea
- industry/style matrix learnings

## Target Stack

- Next.js App Router
- Vercel
- PostgreSQL with Drizzle
- Vercel Blob for media
- schema-driven CMS
- registry-driven template engine

## Core Principle

The template registry is the single source of truth.

Frontend renderers, CMS forms, demo seeds, validation, provisioning defaults and QA checks must all derive from registered industries, styles, pages, sections, fields and collections.

No frontend section may exist without a CMS schema.
No CMS field may exist without meaningful frontend usage or an explicit platform reason.

## First Milestone

This initial scaffold includes:

- Next/App-Router project structure
- all nine industries
- three styles
- section field model
- global sections
- industry-specific collection sections
- core page blueprints
- collection/detail page definitions
- database schema draft
- admin shell
- CRM shell
- template showcase shell
- registry validation script

## Commands

```bash
npm install
npm run validate:registry
npm run typecheck
npm run dev
```

The current scaffold has not installed dependencies yet. Install them inside this folder when the new repo becomes the active project.

## Database (rebuild only)

All Drizzle models live in the PostgreSQL schema **`flamingo_rebuild`**, separate from legacy `public.*` tables. Use a **new Neon database or branch** dedicated to this project; do not reuse the old company-template `POSTGRES_URL`.

1. Create a new Neon project (or branch) for flamingo-rebuild.
2. Copy `.env.example` to `.env.local` and set:
   - `FLAMINGO_REBUILD_DB=1`
   - `POSTGRES_URL` — connection string for the **new** database only
   - `AUTH_SECRET` — long random secret for admin session cookies
3. Generate and apply migrations (from this folder, with `POSTGRES_URL` set):

```bash
npm run db:generate   # after schema changes
npm run db:migrate    # applies SQL in ./drizzle to the DB
```

Optional: `npm run db:studio` opens Drizzle Studio against `POSTGRES_URL`.

Content and auth APIs return `503` with a clear message until `FLAMINGO_REBUILD_DB=1` and `POSTGRES_URL` are set.

### Vercel (Production / Preview)

When both `FLAMINGO_REBUILD_DB=1` and `POSTGRES_URL` are present in the build environment, `npm run build` runs **`drizzle-kit migrate` first** (see `scripts/migrate-if-configured.mjs`), then `next build`. CI and local builds **without** those variables skip migration and only run `next build`. After changing the Drizzle schema, commit new files under `./drizzle` from `npm run db:generate` so deploys apply them.

## CRM & Provisioning

`/admin/crm` is reachable **without** tenant login (middleware exception) so internal staff can manage prospects on a fresh machine. Tenant-facing admin (`/admin`, `/admin/pages`, …) still requires `/admin/login`.

With the database enabled, you can create prospects, update status, delete rows, and **provision** a tenant: inserts `flamingo_rebuild.tenants` with a bcrypt password hash, writes a **published** site version from the industry/style demo seed (all **nine** registry industries are seeded for classic/modern/bold), then clones that snapshot into a new **draft** for editing. Collection IDs from seeds are normalized to UUIDs on write so section references stay valid.

Showcase marketing page: [http://localhost:3000/templates](http://localhost:3000/templates) when `npm run dev` is running.

### Admin: who can log in where?

- **`/admin-demo/...`** is a **public** playground (no login — middleware skips the admin cookie check for this prefix). Content is stored in the browser under `localStorage` keys `flamingo-rebuild.demo.<industry>.<style>`. If subpages all look like the homepage, click **„Demo zurücksetzen“** in the toolbar or clear those keys — an old truncated snapshot used to load instead of the full seed.
- **`/admin/login`** talks to the API and checks **`flamingo_rebuild.tenants`** (bcrypt). There is **no fixed demo password in this repository**: use the **tenant slug** and the password chosen when that tenant was **provisioned from CRM** (or stored in your team’s password manager).
- **`/admin/crm`** stays reachable without tenant login (middleware exception) for internal prospecting.

## Tenant site (optional dev routing)

With `FLAMINGO_TENANT_HOST_ROUTING=1` and `FLAMINGO_TENANT_HOST_SUFFIX` (default `.localhost`), a host like `mytenant.localhost:3000` is **rewritten** internally to `/site/mytenant/...`, which renders the **published** site document for slug `mytenant`. Marketing routes stay on plain `localhost` without that subdomain. See `.env.example`.
