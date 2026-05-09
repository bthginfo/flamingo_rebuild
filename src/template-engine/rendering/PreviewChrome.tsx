'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

export function PreviewChrome({
  industryKey,
  styleKey,
  pathSegments
}: {
  industryKey: IndustryKey;
  styleKey: StyleKey;
  pathSegments: readonly string[];
}) {
  const router = useRouter();
  const suffix = pathSuffix(pathSegments);

  return (
    <div className="preview-chrome" role="region" aria-label="Template-Vorschau Steuerung">
      <div className="preview-chrome__inner">
        <Link href="/templates" className="preview-chrome__back">
          ← Alle Templates
        </Link>
        <label className="preview-chrome__field">
          <span className="preview-chrome__label">Branche</span>
          <select
            className="preview-chrome__select"
            value={industryKey}
            onChange={(event) => {
              const next = event.target.value as IndustryKey;
              router.push(`/preview/${next}/${styleKey}${suffix}`);
            }}
          >
            {INDUSTRY_KEYS.map((key) => (
              <option key={key} value={key}>
                {getIndustry(key).label}
              </option>
            ))}
          </select>
        </label>
        <nav className="preview-chrome__styles" aria-label="Stil">
          {STYLE_KEYS.map((sk) => (
            <Link
              key={sk}
              href={`/preview/${industryKey}/${sk}${suffix}`}
              className={sk === styleKey ? 'is-active' : undefined}
              prefetch={false}
            >
              {STYLE_LABELS[sk]}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
