'use client';

import { useMemo } from 'react';
import { ConsentProvider } from '@/lib/consent';
import { TenantConsentScripts } from '@/components/tenant/TenantConsentScripts';
import { TenantCookieBanner } from '@/components/tenant/TenantCookieBanner';
import type { SiteSeed } from '../seeds/model';
import { SeedPageRenderer } from './SeedRenderer';
import { resolvePreviewPage } from './preview-route';

export function PublishedSiteClient({ seed, pathSegments }: { seed: SiteSeed; pathSegments: string[] }) {
  const page = useMemo(() => resolvePreviewPage(seed, pathSegments), [seed, pathSegments]);
  const integ = seed.global.integrations;
  const scripts = integ?.customScripts;
  const cookieUi = integ?.cookieUi ?? 'off';
  const privacyHref = integ?.privacyHref ?? '/datenschutz';
  const imprintHref = integ?.imprintHref ?? '/impressum';

  return (
    <ConsentProvider>
      <TenantConsentScripts scripts={scripts} />
      {cookieUi === 'full' ? <TenantCookieBanner privacyHref={privacyHref} imprintHref={imprintHref} /> : null}
      <SeedPageRenderer seed={seed} page={page} styleKey={seed.styleKey} previewBasePath="" />
    </ConsentProvider>
  );
}
