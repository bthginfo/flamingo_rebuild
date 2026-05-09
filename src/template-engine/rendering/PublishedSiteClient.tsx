'use client';

import { useMemo } from 'react';
import type { SiteSeed } from '../seeds/model';
import { SeedPageRenderer } from './SeedRenderer';
import { resolvePreviewPage } from './preview-route';

export function PublishedSiteClient({ seed, pathSegments }: { seed: SiteSeed; pathSegments: string[] }) {
  const page = useMemo(() => resolvePreviewPage(seed, pathSegments), [seed, pathSegments]);
  return <SeedPageRenderer seed={seed} page={page} styleKey={seed.styleKey} previewBasePath="" />;
}
