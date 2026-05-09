'use client';

import type { CSSProperties } from 'react';
import { useMemo, useState } from 'react';

/**
 * Illustrative calculator for eligible digitalization project costs (Tirol programme, public 2025 summaries).
 * Not legal advice — see on-card disclaimer.
 */
const TIROL_RATES: Record<string, { rate: number; cap: number; label: string }> = {
  kleinst: { rate: 0.3, cap: 100_000, label: 'Kleinst' },
  klein: { rate: 0.2, cap: 300_000, label: 'Klein' },
  mittel: { rate: 0.1, cap: 750_000, label: 'Mittel / groß' }
};

function formatEuro(n: number): string {
  return new Intl.NumberFormat('de-AT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
}

export function DigitalFoerderRechner() {
  const [size, setSize] = useState<string>('kleinst');
  const [projectCost, setProjectCost] = useState<number>(25_000);

  const cfg = TIROL_RATES[size] ?? TIROL_RATES.kleinst;

  const { grant, net, grantPct } = useMemo(() => {
    const eligible = Math.max(0, Math.min(projectCost, cfg.cap));
    const g = eligible * cfg.rate;
    const pct = projectCost > 0 ? Math.round((g / projectCost) * 1000) / 10 : 0;
    return { grant: g, net: Math.max(0, projectCost - g), grantPct: pct };
  }, [projectCost, cfg]);

  const capRatio = Math.min(1, projectCost / cfg.cap);
  const rangeFill = ((projectCost - 2000) / (250000 - 2000)) * 100;
  const rangeStyle = { '--fm-range-fill': `${rangeFill}%` } as CSSProperties;

  return (
    <div className="fm-foerder-pro">
      <div className="fm-foerder-pro__glow" aria-hidden />
      <div className="fm-foerder-pro__inner">
        <header className="fm-foerder-pro__head">
          <div>
            <p className="fm-foerder-pro__kicker">Tirol · Schätzung</p>
            <h2 className="fm-foerder-pro__title">
              Digitalisierung
              <span className="fm-foerder-pro__title-accent">rechnen.</span>
            </h2>
          </div>
          <p className="fm-foerder-pro__lead">
            Für <strong>förderfähige</strong> Projektkosten (nicht automatisch für reine Websites). Orientierung an
            öffentlich genannten Sätzen — Details immer bei{' '}
            <a href="https://www.tirol.gv.at/" target="_blank" rel="noreferrer">
              Land Tirol
            </a>
            .
          </p>
        </header>

        <div className="fm-foerder-pro__size" role="group" aria-label="Unternehmensgröße">
          {(Object.keys(TIROL_RATES) as (keyof typeof TIROL_RATES)[]).map((key) => {
            const row = TIROL_RATES[key];
            const on = size === key;
            return (
              <button
                key={key}
                type="button"
                className={`fm-foerder-pro__size-btn ${on ? 'is-on' : ''}`}
                onClick={() => setSize(key)}
                aria-pressed={on}
              >
                <span className="fm-foerder-pro__size-label">{row.label}</span>
                <span className="fm-foerder-pro__size-meta">
                  {Math.round(row.rate * 100)}% · max. {formatEuro(row.cap)}
                </span>
              </button>
            );
          })}
        </div>

        <div className="fm-foerder-pro__slider-block">
          <div className="fm-foerder-pro__slider-head">
            <span>Förderfähige Projektkosten</span>
            <output className="fm-foerder-pro__slider-value" htmlFor="foerder-range">
              {formatEuro(projectCost)}
            </output>
          </div>
          <div className="fm-foerder-pro__range-wrap">
            <input
              id="foerder-range"
              className="fm-foerder-pro__range"
              type="range"
              min={2000}
              max={250000}
              step={1000}
              value={projectCost}
              style={rangeStyle}
              onChange={(e) => setProjectCost(Number(e.target.value))}
            />
            <div className="fm-foerder-pro__cap-hint">
              <span>Cap Kategorie: {formatEuro(cfg.cap)}</span>
              <span className={capRatio >= 1 ? 'is-warn' : ''}>
                {capRatio >= 1 ? 'Überschuss oberhalb Cap nicht angerechnet' : `${Math.round(capRatio * 100)}% der Cap`}
              </span>
            </div>
          </div>
        </div>

        <div className="fm-foerder-pro__viz" aria-hidden>
          <div
            className="fm-foerder-pro__viz-fill"
            style={{ width: `${Math.min(100, projectCost > 0 ? (grant / projectCost) * 100 : 0)}%` }}
          />
        </div>

        <div className="fm-foerder-pro__stats">
          <article className="fm-foerder-pro__stat fm-foerder-pro__stat--grant">
            <p className="fm-foerder-pro__stat-label">Illustrativer Förderbetrag</p>
            <p className="fm-foerder-pro__stat-num">{formatEuro(grant)}</p>
            <p className="fm-foerder-pro__stat-sub">≈ {grantPct}% vom eingegebenen Betrag</p>
          </article>
          <article className="fm-foerder-pro__stat fm-foerder-pro__stat--net">
            <p className="fm-foerder-pro__stat-label">Eigenanteil (nachher)</p>
            <p className="fm-foerder-pro__stat-num">{formatEuro(net)}</p>
            <p className="fm-foerder-pro__stat-sub">Projektkosten minus Schätzung</p>
          </article>
        </div>

        <p className="fm-foerder-pro__fineprint">
          Keine Rechts- oder Antragsberatung. Förderfähigkeit, Ausschlüsse und Bescheid bestimmen Behörde &amp; aktuelle
          Richtlinien — diese Ansicht ist nur zur groben Orientierung.
        </p>
      </div>
    </div>
  );
}
