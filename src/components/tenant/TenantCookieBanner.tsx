'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useConsent, type ConsentCategory } from '@/lib/consent';

const CATEGORY_INFO: { key: Exclude<ConsentCategory, 'necessary'>; label: string; desc: string }[] = [
  { key: 'functional', label: 'Funktional', desc: 'Komfort wie eingebettete Karten oder Videos.' },
  { key: 'analytics', label: 'Analyse', desc: 'Statistiken zur Verbesserung der Website (z. B. Plausible, GA).' },
  { key: 'marketing', label: 'Marketing', desc: 'Tracking-Pixel und Werbung (z. B. Meta Pixel).' }
];

export function TenantCookieBanner({
  privacyHref = '/datenschutz',
  imprintHref = '/impressum'
}: {
  privacyHref?: string;
  imprintHref?: string;
}) {
  const { needsDecision, consent, acceptAll, rejectAll, setConsent } = useConsent();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState({
    functional: consent.functional,
    analytics: consent.analytics,
    marketing: consent.marketing
  });

  if (!needsDecision) return null;

  const saveSelection = () => {
    setConsent(draft);
    setOpen(false);
  };

  return (
    <>
      <div role="dialog" aria-live="polite" aria-label="Cookie-Einstellungen" className="fm-tenant-cookie">
        <div className="fm-tenant-cookie__panel">
          <div className="fm-tenant-cookie__row">
            <div className="fm-tenant-cookie__text">
              <h2>Wir respektieren Ihre Privatsphäre.</h2>
              <p>
                Diese Website nutzt technisch notwendige Speicherung (z. B. für Ihre Auswahl). Optional laden wir
                Analyse- oder Marketing-Skripte erst nach Zustimmung. Details in der{' '}
                <Link href={privacyHref} className="fm-tenant-cookie__link">
                  Datenschutzerklärung
                </Link>{' '}
                und im{' '}
                <Link href={imprintHref} className="fm-tenant-cookie__link">
                  Impressum
                </Link>
                .
              </p>
            </div>
            <div className="fm-tenant-cookie__actions">
              <button type="button" className="fm-tenant-cookie__btn fm-tenant-cookie__btn--ghost" onClick={() => setOpen(true)}>
                Einstellungen
              </button>
              <button type="button" className="fm-tenant-cookie__btn fm-tenant-cookie__btn--ghost" onClick={rejectAll}>
                Ablehnen
              </button>
              <button type="button" className="fm-tenant-cookie__btn fm-tenant-cookie__btn--primary" onClick={acceptAll}>
                Akzeptieren
              </button>
            </div>
          </div>
        </div>
      </div>

      {open ? (
        <div className="fm-tenant-cookie__overlay" role="presentation" onClick={() => setOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            className="fm-tenant-cookie__modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="fm-tenant-cookie__modal-head">
              <h3>Cookie-Einstellungen</h3>
              <button type="button" className="fm-tenant-cookie__close" aria-label="Schließen" onClick={() => setOpen(false)}>
                ✕
              </button>
            </div>
            <ul className="fm-tenant-cookie__list">
              <li>
                <div>
                  <p className="fm-tenant-cookie__cat">Notwendig</p>
                  <p className="fm-tenant-cookie__desc">Erforderlich für den Betrieb (Speicherung Ihrer Auswahl).</p>
                </div>
                <span className="fm-tenant-cookie__badge">Aktiv</span>
              </li>
              {CATEGORY_INFO.map((c) => (
                <li key={c.key}>
                  <div>
                    <p className="fm-tenant-cookie__cat">{c.label}</p>
                    <p className="fm-tenant-cookie__desc">{c.desc}</p>
                  </div>
                  <label className="fm-tenant-cookie__switch">
                    <input
                      type="checkbox"
                      checked={draft[c.key]}
                      onChange={(e) => setDraft({ ...draft, [c.key]: e.target.checked })}
                    />
                  </label>
                </li>
              ))}
            </ul>
            <div className="fm-tenant-cookie__modal-footer">
              <button type="button" className="fm-tenant-cookie__btn fm-tenant-cookie__btn--ghost" onClick={() => setOpen(false)}>
                Abbrechen
              </button>
              <button type="button" className="fm-tenant-cookie__btn fm-tenant-cookie__btn--primary" onClick={saveSelection}>
                Speichern
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
