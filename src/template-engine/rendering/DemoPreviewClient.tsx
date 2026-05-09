'use client';

import { Suspense, useMemo, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type { IndustryKey, PageInstance, StyleKey } from '../model';
import type { SiteSeed } from '../seeds/model';
import { loadDemoContent } from '@/cms/demo-store';
import { loadAdminDocument } from '@/cms/admin-content-api';
import { SeedPageRenderer } from './SeedRenderer';
import { resolvePreviewPage } from './preview-route';
import { PreviewFab } from './PreviewFab';
import { resolvePreviewAccentHex } from './preview-accent-palette';

function DemoPreviewSeedBody({
  seed,
  page,
  styleKey,
  previewBasePath
}: {
  seed: SiteSeed;
  page: PageInstance;
  styleKey: StyleKey;
  previewBasePath: string;
}) {
  const searchParams = useSearchParams();
  const accentHex = resolvePreviewAccentHex(searchParams.get('accent'), styleKey);
  return (
    <SeedPageRenderer
      seed={seed}
      page={page}
      styleKey={styleKey}
      previewBasePath={previewBasePath}
      accentHex={accentHex}
    />
  );
}

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
      <Suspense fallback={null}>
        <PreviewFab industryKey={industryKey} styleKey={styleKey} pathSegments={pathSegments} />
      </Suspense>
      <Suspense
        fallback={
          <SeedPageRenderer
            seed={seed}
            page={page}
            styleKey={styleKey}
            previewBasePath={previewBasePath}
            accentHex={null}
          />
        }
      >
        <DemoPreviewSeedBody
          seed={seed}
          page={page}
          styleKey={styleKey}
          previewBasePath={previewBasePath}
        />
      </Suspense>
    </>
  );
}
