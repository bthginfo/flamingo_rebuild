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

## Internes CRM & Provisioning

Das **interne CRM** liegt unter **`/internal/crm`** und ist **nirgends verlinkt**. Zugang nur mit einem **eigenen Passwort** (bcrypt-Hash in `FLAMINGO_INTERNAL_CRM_PASSWORD_HASH`), **getrennt** vom Kunden-Admin (`/admin/login` pro Tenant).

- **`/internal/crm/login`** — Anmeldung für Betriebsteam  
- **`/internal/crm/prospects`** — Prospects, Status, Provisionieren (Dialog: Slug, Name, optionales Passwort, Template/Stil, Content-JSON)  
- **`/internal/crm/tenants`** — Übersicht angelegter Tenants mit Links zur Website und zum Admin-Login  

Der **Kunden-Admin** (`/admin`, `/admin/pages`, …) erfordert wie bisher eine gültige **Tenant-Session**; es gibt **keinen** CRM-Eintrag mehr in der Seitenleiste.

Mit aktivierter Datenbank werden Prospects verwaltet und Tenants provisioniert: Insert in `flamingo_rebuild.tenants` mit bcrypt-Hash, **veröffentlichte** Site-Version aus Demo-Seed (alle **neun** Branchen × drei Stile), optional Merge mit **Content-JSON**, danach Draft-Klon für die Bearbeitung. Leeres Admin-Passwort im Dialog erzeugt ein **automatisches Passwort** (wird nach dem Speichern in der Erfolgsmeldung angezeigt — bitte sicher notieren).

**KI-gefüllte Inhalte:** Vorlage `docs/rebuild-content-template.json`, System-/Arbeitsprompt `docs/rebuild-ki-prompt.md` — JSON im Provisionierungs-Dialog einfügen oder als Datei wählen. Schlüssel mit Unterstrich (`_…`) werden beim Import automatisch entfernt.

### Eigenes Vercel-Projekt pro Kunde (optional)

Wenn die **Plattform**-`.env.local` / Vercel-Umgebung **`VERCEL_TOKEN`**, **`VERCEL_TEAM_ID`** und **Plaintext-`POSTGRES_URL`** (kein Vercel-Blob) gesetzt sind, kannst du zusätzlich **`FLAMINGO_PROVISION_VERCEL=1`** setzen. Beim Provisionieren aus dem CRM wird dann:

1. Ein **Vercel-Projekt** mit Namen = Tenant-Slug angelegt oder wiederverwendet (GitHub-Repo standard **`bthginfo/flamingo_rebuild`**, überschreibbar mit **`GITHUB_REPO`**).
2. **Umgebungsvariablen** auf diesem Projekt gesetzt: u. a. dieselbe **`POSTGRES_URL`** (gemeinsame Neon-DB), **`FLAMINGO_REBUILD_DB=1`**, ein **neu generiertes `AUTH_SECRET`**, **`FLAMINGO_SINGLE_TENANT_SLUG`** (= Slug), **`NEXT_PUBLIC_SITE_URL`**, optional **`BLOB_READ_WRITE_TOKEN`**. Internes CRM-Passwort wird **nicht** kopiert.
3. Ein **Production-Deploy** von `main` angestoßen.

Auf dem **Kunden-Vercel-Projekt** gilt **Single-Tenant-Modus**: `FLAMINGO_SINGLE_TENANT_SLUG` sperrt die App auf genau diesen Slug (Middleware leitet `/` auf `/site/<slug>/…`, **`/internal` ist 404** — Kunden haben **kein internes CRM**, nur ihr **Tenant-Admin**; Login mit **fremdem** Slug wird abgelehnt). **`FLAMINGO_INTERNAL_CRM_PASSWORD_HASH`** gehört **nur** auf die **Plattform**-Vercel-Umgebung (Showcase), nicht auf provisionierte Kundenprojekte. **Eigene Domain** verbindest du in Vercel wie gewohnt mit dem Kundenprojekt; **Kontaktformulare auf Kundenwebsites** nutzen die jeweilige Site-Konfiguration (Admin), nicht die Marketing-SMTP-Variablen unten.

### Showcase: Kontaktformular (`/kontakt`) und SMTP (Marketing)

Die **Marketing-Seite** (`/kontakt`, Formular-Komponente `ContactForm`) sendet per **`POST /api/marketing/contact`** E-Mail über **Umgebungsvariablen** (gleicher Code wie lokal in `.env.example` dokumentiert):

- `SMTP_HOST`, `SMTP_PORT` (Standard 587), `SMTP_USER`, `SMTP_PASS`
- `MAIL_FROM`, `MAIL_TO`
- optional `MAIL_AUTOREPLY` (`on` / `1` / `true` — kurze Bestätigung an die Absenderadresse)

Setze diese Werte auf dem **Showcase-/Plattform-Vercel-Projekt** (`flamingomedia.online`). Fehlen sie, antwortet die Route mit **503** und das Formular **fällt auf `mailto:`** zurück.

**Migration:** Nach `git pull` einmal `npm run db:migrate` (neue Spalten `vercel_project_id` / `vercel_project_name` an `tenants`).

Showcase: [http://localhost:3000/templates](http://localhost:3000/templates) bei `npm run dev`.

### Admin: wer loggt sich wo ein?

- **`/admin-demo/...`** ist ein **öffentlicher** Playground (ohne Login — Middleware überspringt die Admin-Cookie-Prüfung für dieses Präfix). Inhalte liegen im Browser unter `localStorage`-Keys `flamingo-rebuild.demo.<industry>.<style>`.
- **`/admin/login`** prüft **`flamingo_rebuild.tenants`** (bcrypt). Es gibt **kein fixes Demo-Passwort** im Repo: Tenant-Slug und Passwort aus dem Provisionieren bzw. aus eurem Passwort-Manager.

## Tenant site (optional dev routing)

With `FLAMINGO_TENANT_HOST_ROUTING=1` and `FLAMINGO_TENANT_HOST_SUFFIX` (default `.localhost`), a host like `mytenant.localhost:3000` is **rewritten** internally to `/site/mytenant/...`, which renders the **published** site document for slug `mytenant`. Marketing routes stay on plain `localhost` without that subdomain. See `.env.example`.
