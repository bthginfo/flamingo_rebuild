'use client';

import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'flamingo-admin-onboarding-v1';

type Step = {
  title: string;
  body: string;
  selector: string;
};

const STEPS: readonly Step[] = [
  {
    title: 'Workspace Navigation',
    body: 'Links wechselst du zwischen Seiten, globaler Navigation, SEO, Medien und Inhalts-Collections.',
    selector: '.admin-app__sidebar'
  },
  {
    title: 'Seiten bearbeiten',
    body: 'Hier pflegst du Page-Sections, sortierst Bausteine und befüllst alle Template-Felder aus dem CMS.',
    selector: '.admin-app__nav--pages'
  },
  {
    title: 'Vorschau und Medien',
    body: 'Die Quicklinks öffnen Seitenübersicht, Media Library und Live-Vorschau ohne Umwege.',
    selector: '.admin-app__quicknav'
  },
  {
    title: 'Speichern und veröffentlichen',
    body: 'Wenn du Seiten editierst, nutzt du den schwebenden Dock für Entwurf, Verwerfen und Publish.',
    selector: '.cms-floating-dock'
  }
];

export function AdminOnboarding({ enabled }: { enabled: boolean }) {
  const [open, setOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const step = STEPS[stepIndex];
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!enabled) return;
    if (window.localStorage.getItem(STORAGE_KEY) !== 'done') {
      setOpen(true);
    }
  }, [enabled]);

  useEffect(() => {
    function openTour() {
      setStepIndex(0);
      setOpen(true);
    }
    window.addEventListener('flamingo-admin-open-tour', openTour);
    return () => window.removeEventListener('flamingo-admin-open-tour', openTour);
  }, []);

  useEffect(() => {
    if (!open) return;
    const update = () => {
      const target = document.querySelector(step.selector);
      setTargetRect(target?.getBoundingClientRect() ?? null);
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [open, step.selector]);

  const highlightStyle = useMemo(() => {
    if (!targetRect) return undefined;
    return {
      left: Math.max(12, targetRect.left - 8),
      top: Math.max(12, targetRect.top - 8),
      width: targetRect.width + 16,
      height: targetRect.height + 16
    };
  }, [targetRect]);

  if (!enabled || !open) return null;

  function close(done: boolean) {
    if (done) window.localStorage.setItem(STORAGE_KEY, 'done');
    setOpen(false);
  }

  return (
    <div className="admin-tour" role="dialog" aria-modal="true" aria-labelledby="admin-tour-title">
      <button className="admin-tour__scrim" type="button" aria-label="Tour überspringen" onClick={() => close(true)} />
      {highlightStyle ? <div className="admin-tour__highlight" style={highlightStyle} aria-hidden /> : null}
      <article className="admin-tour__card">
        <p className="eyebrow">
          Admin Tour · {stepIndex + 1}/{STEPS.length}
        </p>
        <h2 id="admin-tour-title">{step.title}</h2>
        <p>{step.body}</p>
        <div className="admin-tour__actions">
          <button type="button" className="button secondary" onClick={() => close(true)}>
            Skip
          </button>
          {stepIndex > 0 ? (
            <button type="button" className="button secondary" onClick={() => setStepIndex((current) => current - 1)}>
              Zurück
            </button>
          ) : null}
          <button
            type="button"
            className="button"
            onClick={() => {
              if (stepIndex === STEPS.length - 1) close(true);
              else setStepIndex((current) => current + 1);
            }}
          >
            {stepIndex === STEPS.length - 1 ? 'Fertig' : 'Weiter'}
          </button>
        </div>
      </article>
    </div>
  );
}

export function AdminTourButton({ enabled }: { enabled: boolean }) {
  if (!enabled) return null;
  return (
    <button
      type="button"
      className="admin-app__header-link admin-app__tour-button"
      onClick={() => window.dispatchEvent(new Event('flamingo-admin-open-tour'))}
    >
      Tour
    </button>
  );
}
