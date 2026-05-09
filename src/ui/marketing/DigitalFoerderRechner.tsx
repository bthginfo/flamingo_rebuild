'use client';

import { useMemo, useState } from 'react';

/**
 * Illustrative calculator for eligible digitalization project costs under the
 * Tirol public programme (rates aligned with public summaries for 2025).
 * Purely informational — no legal claim; many costs (e.g. pure marketing websites)
 * may be excluded — see disclaimer in UI.
 */
const TIROL_RATES: Record<string, { rate: number; cap: number; label: string }> = {
  kleinst: { rate: 0.3, cap: 100_000, label: 'Kleinstunternehmen (≤ 10 MA)' },
  klein: { rate: 0.2, cap: 300_000, label: 'Kleines Unternehmen (≤ 50 MA)' },
  mittel: { rate: 0.1, cap: 750_000, label: 'Mittleres / großes Unternehmen' }
};

function formatEuro(n: number): string {
  return new Intl.NumberFormat('de-AT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
}

export function DigitalFoerderRechner() {
  const [size, setSize] = useState<string>('kleinst');
  const [projectCost, setProjectCost] = useState<number>(5000);

  const { grant, net } = useMemo(() => {
    const cfg = TIROL_RATES[size] ?? TIROL_RATES.kleinst;
    const eligible = Math.max(0, Math.min(projectCost, cfg.cap));
    const g = eligible * cfg.rate;
    return { grant: g, net: Math.max(0, projectCost - g) };
  }, [size, projectCost]);

  return (
    <div className="fm-foerder-card card">
      <p className="eyebrow">Tirol</p>
      <h2 className="section-title" style={{ marginTop: 8 }}>
        Digitalisierungs-
        <br />
        <em className="fm-italic-pop">Förder-Rechner.</em>
      </h2>
      <p className="hero-copy" style={{ marginTop: 12 }}>
        Grobe Schätzung der Förderhöhe für <strong>förderfähige</strong> Digitalisierungskosten nach Unternehmensgröße
        (Stand 2025, öffentlich kommunizierte Sätze). Eine reine Website / Online-Marketing ist oft{' '}
        <strong>nicht</strong> förderfähig — prüfe Dein konkretes Vorhaben bei{' '}
        <a href="https://www.tirol.gv.at/" target="_blank" rel="noreferrer">
          Land Tirol
        </a>{' '}
        oder Deiner Beratungsstelle.
      </p>

      <div className="fm-foerder-fields">
        <label className="fm-foerder-label">
          <span>Unternehmensgröße</span>
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            {Object.entries(TIROL_RATES).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label} · bis {formatEuro(v.cap)} förderbare Kosten
              </option>
            ))}
          </select>
        </label>
        <label className="fm-foerder-label">
          <span>Angenommene förderfähige Projektkosten (€)</span>
          <input
            type="range"
            min={1000}
            max={200000}
            step={500}
            value={projectCost}
            onChange={(e) => setProjectCost(Number(e.target.value))}
          />
          <span className="fm-foerder-value">{formatEuro(projectCost)}</span>
        </label>
      </div>

      <div className="fm-foerder-result">
        <div>
          <p className="fm-mono-muted">Illustrativer Förderbetrag</p>
          <p className="fm-foerder-big">{formatEuro(grant)}</p>
        </div>
        <div>
          <p className="fm-mono-muted">Eigenanteil (nach Förderung)</p>
          <p className="fm-foerder-big fm-foerder-big--muted">{formatEuro(net)}</p>
        </div>
      </div>
      <p className="fm-foerder-disclaimer">
        Keine Rechts- oder Antragsberatung. Sätze/Obergrenzen können sich ändern; es gilt immer der offizielle Bescheid.
      </p>
    </div>
  );
}
