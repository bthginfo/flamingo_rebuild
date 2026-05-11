'use client';

import { Suspense, useMemo, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams();
  const rawAccent = searchParams.get('accent');
  const accentId: PreviewAccentId | null = isPreviewAccentId(rawAccent) ? rawAccent : null;

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
  const accentHex = resolvePreviewAccentHex(accentId, styleKey);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('.tenant-site-wrap, .tenant-preview');
    for (const target of targets) {
      if (accentHex) {
        const vars = previewColorVarsForClient(accentHex, styleKey);
        for (const [key, value] of Object.entries(vars)) target.style.setProperty(key, value);
      } else {
        for (const key of PREVIEW_COLOR_VAR_KEYS) target.style.removeProperty(key);
      }
    }
  }, [accentHex, styleKey]);

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

const PREVIEW_COLOR_VAR_KEYS = [
  '--tenant-accent',
  '--tenant-primary',
  '--tenant-bg',
  '--tenant-fg',
  '--tenant-muted',
  '--tenant-line',
  '--tenant-soft',
  '--tenant-button-fg'
];

function previewColorVarsForClient(accent: string, styleKey: StyleKey): Record<string, string> {
  const darkAccent = isDarkHex(accent);
  if (styleKey === 'bold') {
    return {
      '--tenant-accent': accent,
      '--tenant-primary': accent,
      '--tenant-bg': `color-mix(in oklab, ${accent}, #050507 88%)`,
      '--tenant-fg': '#ffffff',
      '--tenant-muted': 'rgba(255,255,255,0.72)',
      '--tenant-line': 'rgba(255,255,255,0.18)',
      '--tenant-soft': `color-mix(in oklab, ${accent}, #050507 76%)`,
      '--tenant-button-fg': darkAccent ? '#ffffff' : '#14111a'
    };
  }
  if (styleKey === 'modern') {
    return {
      '--tenant-accent': accent,
      '--tenant-primary': accent,
      '--tenant-bg': `color-mix(in oklab, ${accent}, #f8fafc 93%)`,
      '--tenant-fg': '#101418',
      '--tenant-muted': '#5f6872',
      '--tenant-line': `color-mix(in oklab, ${accent}, #d7dde4 72%)`,
      '--tenant-soft': `color-mix(in oklab, ${accent}, #ffffff 90%)`,
      '--tenant-button-fg': darkAccent ? '#ffffff' : '#101418'
    };
  }
  return {
    '--tenant-accent': accent,
    '--tenant-primary': accent,
    '--tenant-bg': `color-mix(in oklab, ${accent}, #fffaf4 94%)`,
    '--tenant-fg': '#241f1b',
    '--tenant-muted': '#6f6760',
    '--tenant-line': `color-mix(in oklab, ${accent}, #eadfd5 72%)`,
    '--tenant-soft': `color-mix(in oklab, ${accent}, #fff7ed 88%)`,
    '--tenant-button-fg': darkAccent ? '#ffffff' : '#241f1b'
  };
}

function isDarkHex(hex: string): boolean {
  const clean = hex.replace('#', '');
  if (!/^[0-9a-f]{6}$/i.test(clean)) return true;
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 0.55;
}
