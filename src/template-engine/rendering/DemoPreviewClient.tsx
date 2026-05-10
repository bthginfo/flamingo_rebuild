'use client';

import { Suspense, useMemo, useEffect, useState } from 'react';
import type { IndustryKey, StyleKey } from '../model';
import type { SiteSeed } from '../seeds/model';
import { loadDemoContent } from '@/cms/demo-store';
import { loadAdminDocument } from '@/cms/admin-content-api';
import { SeedPageRenderer } from './SeedRenderer';
import { resolvePreviewPage } from './preview-route';
import { PreviewFab } from './PreviewFab';
import { isPreviewAccentId, resolvePreviewAccentHex, type PreviewAccentId } from './preview-accent-palette';

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
  const [accentId, setAccentId] = useState<PreviewAccentId | null>(null);

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

  useEffect(() => {
    function syncFromUrl() {
      const raw = new URLSearchParams(window.location.search).get('accent');
      setAccentId(isPreviewAccentId(raw) ? raw : null);
    }
    function syncFromEvent(event: Event) {
      const detail = event instanceof CustomEvent ? event.detail : null;
      setAccentId(isPreviewAccentId(detail) ? detail : null);
    }
    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    window.addEventListener('flamingo-preview-accent', syncFromEvent);
    return () => {
      window.removeEventListener('popstate', syncFromUrl);
      window.removeEventListener('flamingo-preview-accent', syncFromEvent);
    };
  }, [industryKey, styleKey]);

  const page = useMemo(() => resolvePreviewPage(seed, pathSegments), [seed, pathSegments]);
  const accentHex = resolvePreviewAccentHex(accentId, styleKey);

  return (
    <>
      <Suspense fallback={null}>
        <PreviewFab industryKey={industryKey} styleKey={styleKey} pathSegments={pathSegments} />
      </Suspense>
      <SeedPageRenderer
        key={`${industryKey}-${styleKey}-${pathSegments.join('/')}-${accentId ?? 'default'}`}
        seed={seed}
        page={page}
        styleKey={styleKey}
        previewBasePath={previewBasePath}
        accentHex={accentHex}
      />
    </>
  );
}
