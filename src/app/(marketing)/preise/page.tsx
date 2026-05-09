import type { Metadata } from 'next';
import Link from 'next/link';
import { addOns, agency, pricingTiers } from '@/ui/marketing/data';
import {
  BranchMarqueeSection,
  CtaFooterSection,
  LandingHeroShowcase,
  ManifestoSection,
  TestimonialsSection
} from '@/ui/marketing/showcase-shared';

export const metadata: Metadata = {
  title: 'Preise & Pakete',
  description:
    'Klare Pakete für Template-Websites, Content-Unterstützung und Custom-Auftritte — inklusive Add-ons wie Foto, Film und Mehrsprachigkeit.'
};

export default function PricingPage() {
  return (
    <main>
      <LandingHeroShowcase
        pulse={agency.tagline}
        titleLine1="Preise,"
        titleEmphasis="die passen."
        lead="Klare Pakete für Template-Websites, Content-Unterstützung und individuelle Auftritte — ohne Kleingedrucktes und ohne Überraschungen auf der Rechnung."
        monoAside="/ Fair · transparent"
        primaryCta={{ href: '#pakete', label: 'Pakete vergleichen →' }}
        secondaryCta={{ href: '/templates', label: 'Templates ansehen' }}
        scrollTargetId="#mehr"
      />

      <BranchMarqueeSection />

      <section className="section surface" id="pakete">
        <div className="shell pricing-grid">
          {pricingTiers.map((tier) => (
            <article className={`card price-card ${tier.featured ? 'featured' : ''}`} key={tier.name}>
              {tier.badge ? (
                <p className="eyebrow" style={{ color: 'var(--accent)' }}>
                  {tier.badge}
                </p>
              ) : null}
              <h3>{tier.name}</h3>
              <p className="price-value">{tier.price}</p>
              <p>{tier.subtitle}</p>
              <p>{tier.monthly}</p>
              <ul>
                {tier.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <Link className={tier.featured ? 'button' : 'button secondary'} href="/prozess" style={{ marginTop: 'auto' }}>
                Ablauf ansehen
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="split-grid" style={{ alignItems: 'end', marginBottom: 32 }}>
            <div>
              <p className="eyebrow">Add-ons</p>
              <h2 className="section-title">Wer mehr braucht, bekommt mehr.</h2>
            </div>
            <p className="hero-copy">Buchbar einzeln oder kombiniert. Später nachrüstbar — ohne dass wir bei Null anfangen.</p>
          </div>
          <div className="feature-grid">
            {addOns.map((addon) => (
              <article className="card feature-card" key={addon.title}>
                <h3>{addon.title}</h3>
                <strong>{addon.price}</strong>
                <p>{addon.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ManifestoSection />
      <TestimonialsSection />
      <CtaFooterSection />
    </main>
  );
}
