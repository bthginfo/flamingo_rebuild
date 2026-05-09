'use client';

import { useMemo, useEffect, useState } from 'react';
import type { IndustryKey, StyleKey } from '../model';
import type { SiteSeed } from '../seeds/model';
import { loadDemoContent } from '@/cms/demo-store';
import { loadAdminDocument } from '@/cms/admin-content-api';
import { SeedPageRenderer } from './SeedRenderer';
import { resolvePreviewPage } from './preview-route';
import { PreviewChrome } from './PreviewChrome';

export function DemoPreviewClient({
  industryKey,
  initialSeed,
  styleKey,
  pathSegments,
  previewBasePath
}: {
  industryKey: IndustryKey;
  initialSeed: SiteSeed;
  styleKey: StyleKey;
  pathSegments: string[];
  previewBasePath: string;
}) {
  const [seed, setSeed] = useState(initialSeed);

  useEffect(() => {
    let active = true;
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('preview') === '1' ? 'draft' : 'published';
    const tenantSlug = params.get('tenant');

    async function load() {
      if (tenantSlug) {
        try {
          const document = await loadAdminDocument(tenantSlug, mode === 'draft');
          if (active) setSeed(document);
          return;
        } catch {
          // The public demo preview still works without a logged-in tenant session or database.
        }
      }

      if (active) setSeed(loadDemoContent(initialSeed, mode));
    }

    void load();
    const onStorage = () => void load();
    window.addEventListener('storage', onStorage);
    window.addEventListener('focus', onStorage);
    return () => {
      active = false;
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('focus', onStorage);
    };
  }, [initialSeed]);

  const page = useMemo(() => resolvePreviewPage(seed, pathSegments), [seed, pathSegments]);

  return (
    <>
      <PreviewChrome industryKey={industryKey} styleKey={styleKey} pathSegments={pathSegments} />
      <SeedPageRenderer seed={seed} page={page} styleKey={styleKey} previewBasePath={previewBasePath} />
    </>
  );
}
