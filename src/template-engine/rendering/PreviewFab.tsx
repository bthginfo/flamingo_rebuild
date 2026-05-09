'use client';

import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { INDUSTRY_KEYS, STYLE_KEYS, type IndustryKey, type StyleKey } from '@/template-engine/model';
import { getIndustry } from '@/template-engine/registry';
import {
  PREVIEW_ACCENT_IDS,
  isPreviewAccentId,
  resolvePreviewAccentHex,
  type PreviewAccentId
} from '@/template-engine/rendering/preview-accent-palette';

const STYLE_LABELS: Record<StyleKey, string> = {
  classic: 'Classic',
  modern: 'Modern',
  bold: 'Bold'
};

function pathSuffix(segments: readonly string[]): string {
  if (!segments.length) return '';
  return `/${segments.map((s) => encodeURIComponent(s)).join('/')}`;
}

function queryWithAccentUpdates(searchParams: URLSearchParams, accent: PreviewAccentId | null): string {
  const next = new URLSearchParams(searchParams.toString());
  if (accent === null) next.delete('accent');
  else next.set('accent', accent);
  const s = next.toString();
  return s ? `?${s}` : '';
}

export function PreviewFab({
  industryKey,
  styleKey,
  pathSegments
}: {
  industryKey: IndustryKey;
  styleKey: StyleKey;
  pathSegments: readonly string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const suffix = pathSuffix(pathSegments);
  const query = searchParams.toString();
  const queryPart = query ? `?${query}` : '';
  const rawAccent = searchParams.get('accent');
  const activeAccent: PreviewAccentId | null = isPreviewAccentId(rawAccent) ? rawAccent : null;

  useEffect(() => {
    setOpen(false);
  }, [pathname, industryKey, styleKey]);

  function navigate(href: string) {
    router.push(`${href}${queryPart}`);
  }

  const panel = (
    <div className="preview-fab__panel">
      <Link href="/templates" className="preview-fab__back" onClick={() => setOpen(false)}>
        ← Alle Templates
      </Link>
      <div className="preview-fab__row" style={{ marginTop: 12 }}>
        <div style={{ flex: '1 1 100%' }}>
          <span className="preview-fab__label">Branche</span>
          <select
            className="preview-fab__select"
            value={industryKey}
            onChange={(event) => {
              const next = event.target.value as IndustryKey;
              navigate(`/preview/${next}/${styleKey}${suffix}`);
            }}
          >
            {INDUSTRY_KEYS.map((key) => (
              <option key={key} value={key}>
                {getIndustry(key).label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="preview-fab__row">
        <span className="preview-fab__label" style={{ width: '100%' }}>
          Stil
        </span>
        <nav className="preview-fab__styles" aria-label="Stil">
          {STYLE_KEYS.map((sk) => (
            <Link
              key={sk}
              href={`/preview/${industryKey}/${sk}${suffix}${queryPart}`}
              className={sk === styleKey ? 'is-active' : undefined}
              prefetch={false}
              onClick={() => setOpen(false)}
            >
              {STYLE_LABELS[sk]}
            </Link>
          ))}
        </nav>
      </div>
      <div className="preview-fab__row">
        <span className="preview-fab__label" style={{ width: '100%' }}>
          Farbschema
        </span>
        <div className="preview-fab__swatches" role="group" aria-label="Farbschema">
          {PREVIEW_ACCENT_IDS.map((id) => {
            const fill = resolvePreviewAccentHex(id, styleKey) ?? '#888';
            const isActive = activeAccent === id;
            return (
              <button
                key={id}
                type="button"
                className={`preview-fab__swatch${isActive ? ' is-active' : ''}`}
                aria-pressed={isActive}
                aria-label={`Akzentfarbe ${id}`}
                title={id}
                style={{ background: fill }}
                onClick={() => {
                  const nextAccent: PreviewAccentId | null = isActive ? null : id;
                  router.push(`${pathname ?? ''}${queryWithAccentUpdates(searchParams, nextAccent)}`);
                  setOpen(false);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`preview-fab ${open ? 'preview-fab--open' : ''}`}>
      {open ? (
        <button type="button" className="preview-fab__backdrop" aria-label="Schließen" onClick={() => setOpen(false)} />
      ) : null}
      {panel}
      <button
        type="button"
        className="preview-fab__toggle"
        aria-expanded={open}
        aria-label={open ? 'Vorschau-Steuerung schließen' : 'Vorschau-Steuerung öffnen'}
        onClick={() => setOpen((v) => !v)}
      >
        ◐
      </button>
    </div>
  );
}
