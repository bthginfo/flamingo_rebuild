import type { Metadata } from 'next';
import { agency } from '@/ui/marketing/data';
import { BranchMarqueeSection, CtaFooterSection, LandingHeroShowcase, ManifestoSection, TestimonialsSection } from '@/ui/marketing/showcase-shared';
import { ContactForm } from '@/ui/marketing/ContactForm';
import { RevealOnScroll } from '@/ui/marketing/RevealOnScroll';

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Schreib uns Deine Idee. Wir antworten innerhalb von 24 Stunden mit einer ehrlichen Einschätzung – auch wenn wir nicht der richtige Partner sind.'
};

export default function ContactPage() {
  return (
    <main>
      <LandingHeroShowcase
        pulse={agency.tagline}
        titleLine1="Lass uns"
        titleEmphasis="reden."
        lead="Schreib uns Deine Idee. Wir antworten innerhalb von 24 Stunden mit einer ehrlichen Einschätzung – auch wenn wir nicht der richtige Partner sind."
        monoAside="/ Mo–Fr · 09–18"
        primaryCta={{ href: '#formular', label: 'Zum Formular →' }}
        secondaryCta={{ href: '/preise', label: 'Preise ansehen' }}
        scrollTargetId="#mehr"
      />

      <BranchMarqueeSection />

      <RevealOnScroll as="section" className="section surface" id="formular">
        <div className="shell split-grid" data-stagger-grid>
          <div>
            <p className="eyebrow">Erreichbarkeit</p>
            <h2 className="section-title">Mo–Fr · 09:00 – 18:00</h2>
            <p className="hero-copy">DACH-weit remote · Termine vor Ort nach Absprache.</p>
            <p className="hero-copy" style={{ marginTop: 16 }}>
              <a href={`mailto:${agency.email}`}>{agency.email}</a>
              <br />
              <a href={`tel:${agency.phone.replace(/\s/g, '')}`}>{agency.phone}</a>
            </p>
          </div>
          <div className="card" style={{ padding: 28 }}>
            <ContactForm />
          </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll as="section" className="section">
        <div className="shell">
          <p className="eyebrow">Wo wir arbeiten</p>
          <h2 className="section-title">
            DACH-Region.
            <br />
            <em>Mit Fokus auf drei Städte.</em>
          </h2>
          <p className="hero-copy" style={{ maxWidth: 720, marginBottom: 32 }}>
            Wir arbeiten remote-first für inhabergeführte Betriebe in Deutschland, Österreich und der Schweiz. Persönliche
            Termine vor Ort vereinbaren wir gerne nach Absprache.
          </p>
          <div className="feature-grid" data-stagger-grid>
            <article className="card feature-card">
              <p className="fm-mono-label">/ Schwerpunkt-Region</p>
              <h3>Innsbruck &amp; Tirol</h3>
            </article>
            <article className="card feature-card">
              <p className="fm-mono-label">/ Schwerpunkt-Region</p>
              <h3>München &amp; Oberbayern</h3>
            </article>
            <article className="card feature-card">
              <p className="fm-mono-label">/ Schwerpunkt-Region</p>
              <h3>Ingolstadt &amp; Region</h3>
            </article>
          </div>
          <p className="hero-copy" style={{ marginTop: 28 }}>
            Du sitzt woanders? Schreib uns trotzdem – wir arbeiten DACH-weit remote.
          </p>
        </div>
      </RevealOnScroll>

      <ManifestoSection />
      <TestimonialsSection />
      <CtaFooterSection />
    </main>
  );
}
