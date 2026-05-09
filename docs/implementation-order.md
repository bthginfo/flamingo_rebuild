# Implementation Order

## Phase 1: Foundation

1. Install Next dependencies.
2. Configure Drizzle migrations.
3. Implement tenant host resolution.
4. Implement auth sessions.
5. Implement draft/published version queries.
6. Implement registry validation in CI.

## Phase 2: Vertical Slice

Build Restaurant completely before expanding horizontally:

1. Restaurant demo seeds for classic, modern, bold.
2. Restaurant page renderers.
3. Restaurant collection renderers.
4. CMS page editor.
5. CMS collection editor.
6. Preview and publish flow.
7. E2E for edit/publish/verify.

## Phase 3: Expand Industries

Add industries one by one:

1. Hotel
2. Fitness
3. Medical
4. Consulting
5. Salon
6. Tourism
7. Tradesman
8. Wedding

Each industry must pass:

- registry validation
- demo seed validation
- page render validation
- admin form validation
- edit/publish E2E

## Phase 4: CRM And Provisioning

1. Prospect model.
2. Prospect list and detail view.
3. Provisioning wizard.
4. Content import.
5. Tenant health check.
6. Vercel project/domain integration.

## Phase 5: Premium Showcase

1. Marketing landing page.
2. Template overview.
3. Industry pages.
4. Style preview switcher.
5. Demo admin preview.
6. Conversion sections and trust proof.
