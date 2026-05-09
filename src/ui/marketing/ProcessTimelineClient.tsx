'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { ProcessPhase } from '@/ui/marketing/data';

export function ProcessTimelineClient({ steps }: { steps: readonly ProcessPhase[] }) {
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    let raf = 0;
    const compute = () => {
      raf = 0;
      const track = timelineRef.current;
      if (!track) return;
      const r = track.getBoundingClientRect();
      const winH = window.innerHeight;
      const anchor = winH * 0.55;
      const start = r.top - anchor;
      const total = r.height;
      const passed = Math.max(0, Math.min(total, -start));
      const p = total > 0 ? passed / total : 0;
      setProgress(p);

      let best = 0;
      let bestDist = Infinity;
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        const er = el.getBoundingClientRect();
        const center = er.top + er.height / 2;
        const dist = Math.abs(center - anchor);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActiveIdx(best);
    };
    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const jumpTo = (i: number) => {
    const el = stepRefs.current[i];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 140;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <>
      <div className="fm-process-sticky" aria-label="Aktueller Schritt">
        <div className="shell fm-process-sticky__inner">
          <div className="fm-process-sticky__row">
            <span className="fm-process-sticky__meta">
              Schritt {String(activeIdx + 1).padStart(2, '0')}/{String(steps.length).padStart(2, '0')}
            </span>
            <div className="fm-process-sticky__pills">
              {steps.map((s, i) => {
                const reached = i <= activeIdx;
                return (
                  <button
                    key={s.title}
                    type="button"
                    onClick={() => jumpTo(i)}
                    title={`${s.tag} – ${s.title}`}
                    className={`fm-process-pill ${i === activeIdx ? 'is-active' : ''} ${reached ? 'is-reached' : ''}`}
                  >
                    <span className="fm-process-pill__num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="fm-process-pill__full">{s.title}</span>
                    <span className="fm-process-pill__short">{s.tag}</span>
                  </button>
                );
              })}
            </div>
            <div className="fm-process-sticky__bar-wrap" aria-hidden>
              <div className="fm-process-sticky__bar">
                <div className="fm-process-sticky__bar-fill" style={{ width: `${Math.round(progress * 100)}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section fm-process-timeline">
        <div className="shell fm-process-timeline__tight">
          <div ref={timelineRef} className="fm-process-track-wrap">
            <div className="fm-process-track-bg" aria-hidden />
            <div
              className="fm-process-track-fill"
              aria-hidden
              style={{ height: `${Math.max(0, Math.min(100, progress * 100))}%` }}
            />

            <ol className="fm-process-steps">
              {steps.map((s, i) => {
                const left = i % 2 === 0;
                const isActive = i === activeIdx;
                const reached = i <= activeIdx;
                const icon = 'icon' in s ? String(s.icon) : '✦';
                return (
                  <li key={s.title} className="fm-process-step">
                    <div className="fm-process-node-wrap" aria-hidden>
                      <span
                        className={`fm-process-node ${reached ? 'is-on' : ''} ${isActive ? 'is-pulse' : ''}`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div
                      ref={(el) => {
                        stepRefs.current[i] = el;
                      }}
                      className={`fm-process-card-outer ${left ? 'is-left' : 'is-right'}`}
                    >
                      <article className={`fm-process-card ${isActive ? 'is-active' : ''}`}>
                        <div className={`fm-process-card__top ${left ? 'is-left' : ''}`}>
                          <span className={`fm-process-card__glyph ${reached ? 'is-on' : ''}`} aria-hidden>
                            {icon}
                          </span>
                          <div className={left ? 'fm-process-card__titles is-left' : 'fm-process-card__titles'}>
                            <p className="fm-process-card__kicker">
                              Schritt {String(i + 1).padStart(2, '0')}
                            </p>
                            <p className="fm-process-card__phase">{s.tag}</p>
                          </div>
                        </div>

                        <h3 className="fm-process-card__h">{s.title}</h3>
                        <p className="fm-process-card__lead">{s.lead}</p>

                        <ul className={`fm-process-tags ${left ? 'is-left' : ''}`}>
                          {s.bullets.map((b) => (
                            <li key={b} className="fm-process-tag">
                              <span aria-hidden className="fm-process-tag__dot" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </article>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="fm-process-banner">
            <div className="fm-process-banner__bg" aria-hidden />
            <div className="fm-process-banner__inner">
              <p className="eyebrow" style={{ color: 'rgba(255,255,255,0.72)' }}>
                Bereit?
              </p>
              <h2 className="section-title" style={{ color: '#fff', marginTop: 12 }}>
                In 10 Tagen
                <br />
                <em className="fm-italic-pop" style={{ color: 'var(--accent-2, #ffb347)' }}>
                  online.
                </em>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.82)', maxWidth: 520, margin: '16px auto 0', lineHeight: 1.55 }}>
                Schreib uns kurz, was Du brauchst. Wir melden uns am selben Tag mit einer ehrlichen Einschätzung.
              </p>
              <div className="fm-process-banner__ctas">
                <Link className="button" href="/kontakt">
                  Beratung anfragen
                </Link>
                <Link className="button secondary fm-btn-outline-light" href="/preise">
                  Preise ansehen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
