import Link from 'next/link';
import type { ReactNode } from 'react';
import { agency } from '@/ui/marketing/data';
import { branchMarquee, manifestoBlocks, testimonials } from '@/ui/marketing/showcase-content';

export function LandingHeroShowcase({
  id = 'top',
  pulse,
  titleLine1,
  titleEmphasis,
  lead,
  monoAside,
  primaryCta,
  secondaryCta,
  scrollTargetId = '#mehr'
}: {
  id?: string;
  pulse: string;
  titleLine1: string;
  titleEmphasis: ReactNode;
  lead: string;
  monoAside: string;
  primaryCta: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  scrollTargetId?: string;
}) {
  return (
    <section className="fm-landing-hero" id={id}>
      <div className="fm-landing-hero__bg" aria-hidden />
      <img className="fm-landing-hero__mark" src={agency.logoMark} alt="" />
      <div className="shell fm-landing-hero__inner">
        <p className="fm-landing-hero__pulse">
          <span className="fm-dot" aria-hidden />
          {pulse}
        </p>
        <h1 className="fm-landing-hero__title">
          {titleLine1}
          <br />
          <em className="fm-italic-pop">{titleEmphasis}</em>
        </h1>
        <div className="fm-landing-hero__grid">
          <p className="fm-landing-hero__lead">{lead}</p>
          <div className="fm-landing-hero__aside">
            <p className="fm-mono-label">{monoAside}</p>
            <div className="fm-hero-ctas">
              <Link className="button" href={primaryCta.href}>
                {primaryCta.label}
              </Link>
              {secondaryCta ? (
                <Link className="button secondary fm-btn-outline-light" href={secondaryCta.href}>
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <a className="fm-scroll-hint" href={scrollTargetId} aria-label="Weiter scrollen">
        <span>Scroll</span>
        <span className="fm-scroll-line" aria-hidden />
      </a>
    </section>
  );
}

export function BranchMarqueeSection({ id = 'mehr' }: { id?: string }) {
  return (
    <section className="fm-branch-marquee surface" id={id}>
      <div className="shell fm-branch-marquee__head">
        <p className="eyebrow">Branchen, die wir verstehen</p>
      </div>
      <div className="fm-branch-marquee__track" aria-hidden>
        {[...branchMarquee, ...branchMarquee, ...branchMarquee].map((label, i) => (
          <span key={`${label}-${i}`} className="fm-branch-marquee__item">
            {label}
            <span className="fm-branch-marquee__star">✦</span>
          </span>
        ))}
        <span className="fm-branch-marquee__item fm-branch-marquee__more">und viele mehr</span>
        <span className="fm-branch-marquee__star fm-branch-marquee__star--muted">✦</span>
      </div>
    </section>
  );
}

export function ManifestoSection() {
  return (
    <section className="fm-manifesto">
      <div className="shell">
        <p className="eyebrow fm-manifesto__eyebrow">Was uns wichtig ist</p>
        <h2 className="fm-manifesto__title">
          <span className="fm-manifesto__muted">Wir bauen keine Templates.</span> Wir bauen <em className="fm-italic-pop">Werkzeuge</em>, mit denen Du
          weiterarbeiten kannst – auch wenn wir nicht da sind.
        </h2>
        <div className="fm-manifesto__grid">
          {manifestoBlocks.map((b, i) => (
            <article key={b.title}>
              <p className="fm-mono-label">/ {String(i + 1).padStart(2, '0')}</p>
              <h3>{b.title}</h3>
              <p>{b.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="section surface">
      <div className="shell">
        <p className="eyebrow">Stimmen</p>
        <h2 className="section-title">
          Was unsere
          <br />
          <em>Kund:innen sagen.</em>
        </h2>
        <div className="fm-quote-grid">
          {testimonials.map((t) => (
            <blockquote key={t.name} className="fm-quote">
              <p>“{t.quote}”</p>
              <footer>— {t.name}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaFooterSection() {
  return (
    <section className="fm-cta-footer">
      <div className="shell fm-cta-footer__inner">
        <h2 className="section-title" style={{ color: '#fff' }}>
          Bauen wir
          <br />
          <em>Deine Website.</em>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.78)', maxWidth: 520, fontSize: '1.15rem', lineHeight: 1.55 }}>
          Schreib uns – wir antworten innerhalb von 24 Stunden mit einer ehrlichen Einschätzung.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
          <a className="button" href={`mailto:${agency.email}`}>
            Beratung anfragen →
          </a>
          <Link className="button secondary fm-btn-outline-light" href="/templates">
            Templates ansehen
          </Link>
        </div>
      </div>
    </section>
  );
}
