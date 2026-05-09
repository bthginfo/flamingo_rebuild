import type { Metadata } from 'next';
import Link from 'next/link';
import { agency, processPhases } from '@/ui/marketing/data';
import { BranchMarqueeSection, CtaFooterSection, LandingHeroShowcase, ManifestoSection, TestimonialsSection } from '@/ui/marketing/showcase-shared';
import { RevealOnScroll } from '@/ui/marketing/RevealOnScroll';

export const metadata: Metadata = {
  title: 'Ablauf',
  description:
    'Klare Stationen, transparente Kosten, kein Agentur-Theater. Du weißt jederzeit, wo wir stehen — und was als nächstes kommt.'
};

export default function ProcessPage() {
  return (
    <main>
      <LandingHeroShowcase
        pulse={agency.tagline}
        titleLine1="Von der Idee bis live."
        titleEmphasis="In sieben Schritten."
        lead="Klare Stationen, transparente Kosten, kein Agentur-Theater. Du weißt jederzeit, wo wir stehen — und was als nächstes kommt."
        monoAside="/ Klar · persönlich"
        primaryCta={{ href: '#schritte', label: 'Schritte ansehen →' }}
        secondaryCta={{ href: '/preise', label: 'Preise ansehen' }}
        scrollTargetId="#mehr"
      />

      <BranchMarqueeSection />

      <RevealOnScroll as="section" className="section surface" id="schritte">
        <div className="shell">
          <div className="fm-process-rail" aria-hidden>
            {processPhases.map((p) => (
              <div className="fm-process-rail__cell" key={p.step}>
                <span className="fm-mono-muted">{p.step}</span>
                <span className="fm-process-rail__name">{p.rail}</span>
                <span className="fm-process-rail__tag">{p.tag}</span>
              </div>
            ))}
          </div>
          <div className="fm-process-list" data-stagger-grid>
            {processPhases.map((phase) => (
              <article className="card fm-process-card" key={phase.step}>
                <p className="eyebrow">
                  Schritt {phase.step} · {phase.tag}
                </p>
                <h3>{phase.title}</h3>
                <p style={{ color: 'var(--muted)', lineHeight: 1.65 }}>{phase.lead}</p>
                <ul className="fm-checklist">
                  {phase.bullets.map((b) => (
                    <li key={b}>✓ {b}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll as="section" className="section fm-cta-mid">
        <div className="shell fm-cta-mid__inner">
          <p className="eyebrow">Bereit?</p>
          <h2 className="section-title">
            In 10 Tagen
            <br />
            <em>online.</em>
          </h2>
          <p className="hero-copy" style={{ maxWidth: 640 }}>
            Schreib uns kurz, was Du brauchst. Wir melden uns am selben Tag mit einer ehrlichen Einschätzung.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24 }}>
            <Link className="button" href="/kontakt">
              Beratung anfragen →
            </Link>
            <Link className="button secondary" href="/preise">
              Preise ansehen
            </Link>
          </div>
        </div>
      </RevealOnScroll>

      <ManifestoSection />
      <TestimonialsSection />
      <CtaFooterSection />
    </main>
  );
}
