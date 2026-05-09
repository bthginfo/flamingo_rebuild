import Link from 'next/link';
import type { ReactNode } from 'react';
import { agency } from '@/ui/marketing/data';
import { branchMarquee, manifestoBlocks, testimonials } from '@/ui/marketing/showcase-content';
import { MouseGlow } from '@/ui/marketing/MouseGlow';
import { RevealOnScroll } from '@/ui/marketing/RevealOnScroll';

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
      <div className="fm-landing-hero__glow">
        <MouseGlow />
      </div>
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
        <span className="fm-scroll-hint__label">Scroll</span>
        <span className="fm-scroll-line" aria-hidden />
      </a>
    </section>
  );
}

export function BranchMarqueeSection({ id = 'mehr' }: { id?: string }) {
  const loop = [...branchMarquee, ...branchMarquee];
  return (
    <section className="fm-branch-marquee surface" id={id}>
      <div className="shell fm-branch-marquee__head">
        <p className="eyebrow">Branchen, die wir verstehen</p>
      </div>
      <div className="fm-branch-marquee__viewport" aria-hidden>
        <div className="fm-branch-marquee__animate">
          {[...loop, ...loop].map((label, i) => (
            <span key={`${label}-${i}`} className="fm-branch-marquee__item">
              {label}
              <span className="fm-branch-marquee__star">✦</span>
            </span>
          ))}
          <span className="fm-branch-marquee__item fm-branch-marquee__more">und viele mehr</span>
          <span className="fm-branch-marquee__star fm-branch-marquee__star--muted">✦</span>
        </div>
      </div>
    </section>
  );
}

export function ManifestoSection() {
  return (
    <RevealOnScroll as="section" className="fm-manifesto">
      <div className="shell">
        <p className="eyebrow fm-manifesto__eyebrow">Was uns wichtig ist</p>
        <h2 className="fm-manifesto__title">
          <span className="fm-manifesto__muted">Wir bauen keine Templates.</span> Wir bauen <em className="fm-italic-pop">Werkzeuge</em>, mit denen Du
          weiterarbeiten kannst – auch wenn wir nicht da sind.
        </h2>
        <div className="fm-manifesto__grid" data-stagger-grid>
          {manifestoBlocks.map((b, i) => (
            <article key={b.title}>
              <p className="fm-mono-label">/ {String(i + 1).padStart(2, '0')}</p>
              <h3>{b.title}</h3>
              <p>{b.body}</p>
            </article>
          ))}
        </div>
      </div>
    </RevealOnScroll>
  );
}

export function TestimonialsSection() {
  return (
    <RevealOnScroll as="section" className="section surface fm-testimonials-reveal">
      <div className="shell">
        <p className="eyebrow">Stimmen</p>
        <h2 className="section-title">
          Was unsere
          <br />
          <em>Kund:innen sagen.</em>
        </h2>
        <div className="fm-quote-grid" data-stagger-grid>
          {testimonials.map((t) => (
            <blockquote key={t.name} className="fm-quote">
              <p>“{t.quote}”</p>
              <footer>— {t.name}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </RevealOnScroll>
  );
}

export function CtaFooterSection() {
  return (
    <RevealOnScroll as="section" className="fm-cta-footer">
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
          <Link className="button" href="/kontakt">
            Beratung anfragen →
          </Link>
          <Link className="button secondary fm-btn-outline-light" href="/templates">
            Templates ansehen
          </Link>
        </div>
      </div>
    </RevealOnScroll>
  );
}

/** Light hero for inner marketing routes (legacy showcase parity). */
export function SimplePageHero({
  eyebrow,
  titleLine1,
  titleEmphasis,
  lead
}: {
  eyebrow: string;
  titleLine1: string;
  titleEmphasis: string;
  lead: string;
}) {
  return (
    <section className="fm-simple-hero">
      <div className="fm-simple-hero__wash" aria-hidden />
      <div className="shell fm-simple-hero__inner">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="fm-simple-hero__title">
          {titleLine1}
          <br />
          <em className="fm-italic-pop fm-simple-hero__accent">{titleEmphasis}</em>
        </h1>
        <p className="hero-copy fm-simple-hero__lead">{lead}</p>
      </div>
    </section>
  );
}
