'use client';

import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { INDUSTRY_KEYS, STYLE_KEYS, type IndustryKey, type StyleKey } from '@/template-engine/model';
import { getIndustry } from '@/template-engine/registry';

const STYLE_LABELS: Record<StyleKey, string> = {
  classic: 'Classic',
  modern: 'Modern',
  bold: 'Bold'
};

function pathSuffix(segments: readonly string[]): string {
  if (!segments.length) return '';
  return `/${segments.map((s) => encodeURIComponent(s)).join('/')}`;
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
