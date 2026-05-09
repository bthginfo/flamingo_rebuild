import type { Metadata } from 'next';
import Link from 'next/link';
import { addOns, agency, pricingFaqs, pricingTiers } from '@/ui/marketing/data';
import {
  BranchMarqueeSection,
  CtaFooterSection,
  LandingHeroShowcase,
  ManifestoSection,
  TestimonialsSection
} from '@/ui/marketing/showcase-shared';
import { RevealOnScroll } from '@/ui/marketing/RevealOnScroll';

export const metadata: Metadata = {
  title: 'Preise & Pakete',
  description:
    'Drei klare Pakete. Ein transparenter Festpreis, einmalig zahlbar. Hosting und Pflege auf Wunsch monatlich – kündbar jederzeit.'
};

export default function PricingPage() {
  return (
    <main>
      <LandingHeroShowcase
        pulse={agency.tagline}
        titleLine1="Faire Preise."
        titleEmphasis="Keine Überraschungen."
        lead="Drei klare Pakete. Ein transparenter Festpreis, einmalig zahlbar. Hosting und Pflege auf Wunsch monatlich – kündbar jederzeit."
        monoAside="/ Fair · transparent"
        primaryCta={{ href: '#pakete', label: 'Pakete vergleichen →' }}
        secondaryCta={{ href: '/templates', label: 'Templates ansehen' }}
        scrollTargetId="#mehr"
      />

      <BranchMarqueeSection />

      <RevealOnScroll as="section" className="section surface" id="pakete">
        <div className="shell pricing-grid" data-stagger-grid>
          {pricingTiers.map((tier) => (
            <article className={`card price-card ${tier.featured ? 'featured' : ''}`} key={tier.name}>
              {tier.badge ? (
                <p className="eyebrow" style={{ color: 'var(--accent)' }}>
                  {tier.badge}
                </p>
              ) : null}
              <h3 className="fm-price-title">
                <span className="fm-price-slash">/ </span>
                {tier.name}
              </h3>
              <p className="price-value">{tier.price}</p>
              <p className="fm-price-subtitle">{tier.subtitle}</p>
              <p className="fm-price-monthly">{tier.monthly}</p>
              <ul>
                {tier.features.map((feature) => (
                  <li key={feature}>
                    <span aria-hidden>✓ </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link className={tier.featured ? 'button' : 'button secondary'} href="/prozess" style={{ marginTop: 'auto' }}>
                Ablauf ansehen
              </Link>
            </article>
          ))}
        </div>
      </RevealOnScroll>

      <RevealOnScroll as="section" className="section">
        <div className="shell">
          <div className="split-grid" style={{ alignItems: 'end', marginBottom: 32 }} data-stagger-grid>
            <div>
              <p className="eyebrow">Add-ons</p>
              <h2 className="section-title">
                Wer mehr braucht,
                <br />
                <em>bekommt mehr.</em>
              </h2>
            </div>
            <p className="hero-copy">
              Buchbar einzeln oder als Paket. Auf Wunsch zu jedem Zeitpunkt nachrüstbar.
            </p>
          </div>
          <div className="feature-grid" data-stagger-grid>
            {addOns.map((addon) => (
              <article className="card feature-card" key={addon.title}>
                <h3>{addon.title}</h3>
                <strong>{addon.price}</strong>
                <p>{addon.text}</p>
              </article>
            ))}
          </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll as="section" className="section surface" id="faq">
        <div className="shell">
          <p className="eyebrow">FAQ</p>
          <h2 className="section-title">Häufige Fragen.</h2>
          <div className="fm-faq-grid" data-stagger-grid>
            {pricingFaqs.map((item) => (
              <article className="card fm-faq-card" key={item.q}>
                <h3>{item.q}</h3>
                <p style={{ color: 'var(--muted)', lineHeight: 1.65 }}>{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </RevealOnScroll>

      <ManifestoSection />
      <TestimonialsSection />
      <CtaFooterSection />
    </main>
  );
}
