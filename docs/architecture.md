# Flamingo Rebuild Architecture

## Product Shape

The platform has three surfaces:

1. Flamingo marketing and showcase site
2. Tenant websites
3. Client admin plus internal CRM

The marketing site sells the product and previews each industry/style combination. Tenant websites render published content. The admin edits draft content and publishes versioned site states.

## Source Of Truth

The source of truth is the template registry:

- industries
- styles
- pages
- sections
- fields
- collections
- detail pages
- seed requirements

All renderers and CMS forms must read from this registry.

## Multi-Tenant Model

Tenant resolution is host-based:

- `flamingomedia.online` and `www.flamingomedia.online`: marketing site
- `<slug>.flamingomedia.online`: tenant site
- custom domain: tenant site by domain lookup

Each tenant has one industry and one style at a time. Changing style changes visual renderers but not the core content model.

## Content Versioning

The platform uses versioned content:

- draft version for admin edits
- published version for live site
- archived versions for rollback

Live tenant pages only read the latest published version. Preview reads the draft version after authentication.

## Pages

The platform supports three page kinds:

- core pages from the industry blueprint
- custom pages created by the client
- collection detail pages generated from structured content

Core pages cannot be accidentally removed. Custom pages must use allowed sections for the tenant's industry/style. Collection detail pages are defined by the collection schema.

## Sections

Sections are registered through `SectionDefinition`.

Each section defines:

- key
- label
- allowed industries
- allowed styles
- allowed page kinds
- fields
- repeatability

The CMS can only add registered sections. The frontend can only render registered sections.

## Collections

Collections model structured business content:

- restaurant: menu items, dining experiences
- hotel: rooms, offers
- tourism: tours
- salon: treatments, looks
- tradesman: services, reference projects
- consulting: services, cases
- medical: treatments, doctors
- fitness: classes, trainers, schedule items
- wedding: schedule items, accommodations, RSVP-related content

Collections can power listing sections, navigation links, CTAs and dynamic detail pages.

## Admin UX

The admin is organized around user tasks:

- Dashboard
- Pages
- Content collections
- Media
- Navigation and footer
- Brand and design
- Contact and location
- SEO and visibility
- Scripts and tracking
- Legal
- CRM
- Password and access

Technical debug wording is not shown to customers. The admin explains status and actions in customer language.

## CRM And Provisioning

The CRM owns prospects and onboarding.

Provisioning flow:

1. choose prospect
2. select industry and style
3. choose demo, blank or imported content
4. create tenant
5. create draft and initial published version
6. generate core pages and sections from registry
7. seed collections
8. create admin credentials
9. run health checks

Provisioning may not bypass registry validation.

## Guardrails

The build must fail when:

- an industry is missing
- a style is missing
- a page references an unknown section
- a page defaults to a disallowed section
- a collection detail page defaults to a disallowed section
- a section has duplicate field paths
- a demo seed is missing for an industry/style combination
- a renderer is missing for a registered section/style combination
- a CMS widget is missing for a field type

Additional guards will be added as renderers and admin widgets are implemented.
