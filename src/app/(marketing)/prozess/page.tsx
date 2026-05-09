import type { Metadata } from 'next';
import Link from 'next/link';
import { agency, imageAssets, processSteps } from '@/ui/marketing/data';
import {
  BranchMarqueeSection,
  CtaFooterSection,
  LandingHeroShowcase,
  ManifestoSection,
  TestimonialsSection
} from '@/ui/marketing/showcase-shared';

export const metadata: Metadata = {
  title: 'Ablauf',
  description:
    'So begleiten wir Dich vom Erstgespräch bis live: ruhige Schritte, frühe Vorschau im Browser und Übergabe, damit Du weiterarbeiten kannst.'
};

export default function ProcessPage() {
  return (
    <main>
      <LandingHeroShowcase
        pulse={agency.tagline}
        titleLine1="Vom ersten Gespräch"
        titleEmphasis="bis live."
        lead="Ein ruhiger Ablauf für Betriebe, die schnell eine starke Website brauchen — und danach selbst weitermachen wollen, ohne von einer Agentur abhängig zu sein."
        monoAside="/ Klar · persönlich"
        primaryCta={{ href: '#ablauf', label: 'So arbeiten wir →' }}
        secondaryCta={{ href: '/preise', label: 'Preise & Pakete' }}
        scrollTargetId="#mehr"
      />

      <BranchMarqueeSection />

      <section className="section surface" id="ablauf">
        <div className="shell split-grid">
          <div className="image-panel">
            <img src={imageAssets.process} alt="Team plant Website-Projekt" />
          </div>
          <div className="timeline">
            {processSteps.map((step) => (
              <article className="card timeline-card" key={step.title}>
                <h2>{step.title}</h2>
                <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section fm-device-strip">
        <div className="shell">
          <p className="eyebrow">Nächster Schritt</p>
          <h2 className="section-title">
            Lust auf einen
            <br />
            <em>echten Blick?</em>
          </h2>
          <p className="hero-copy" style={{ maxWidth: 720 }}>
            Schreib uns mit ein paar Sätzen zu Deinem Betrieb — oder stöbert in Ruhe in den Templates und der
            Live-Vorschau. Wir melden uns persönlich.
          </p>
          <div className="fm-device-grid">
            <Link href="/templates#galerie" className="fm-device-card">
              <img src={imageAssets.heroDevice} alt="" />
              <div>
                <h3>Templates</h3>
                <p>Branchen &amp; Stile ansehen</p>
              </div>
            </Link>
            <a className="fm-device-card" href={`mailto:${agency.email}`}>
              <img src={imageAssets.contentKit} alt="" />
              <div>
                <h3>Kurz anfragen</h3>
                <p>Wir melden uns persönlich</p>
              </div>
            </a>
            <Link href="/preise#pakete" className="fm-device-card">
              <img src={imageAssets.process} alt="" />
              <div>
                <h3>Preise</h3>
                <p>Pakete &amp; Add-ons</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <ManifestoSection />
      <TestimonialsSection />
      <CtaFooterSection />
    </main>
  );
}
