import type { Metadata } from 'next';
import Link from 'next/link';
import { addOns, pricingFaqs, pricingTiers } from '@/ui/marketing/data';
import { CtaFooterSection, SimplePageHero } from '@/ui/marketing/showcase-shared';
import { RevealOnScroll } from '@/ui/marketing/RevealOnScroll';
import { MarketingFaqAccordion } from '@/ui/marketing/MarketingFaqAccordion';
import { DigitalFoerderRechner } from '@/ui/marketing/DigitalFoerderRechner';

export const metadata: Metadata = {
  title: 'Preise & Pakete',
  description:
    'Drei klare Pakete. Ein transparenter Festpreis, einmalig zahlbar. Hosting und Pflege auf Wunsch monatlich – kündbar jederzeit.'
};

export default function PricingPage() {
  return (
    <main>
      <SimplePageHero
        eyebrow="Preise"
        titleLine1="Faire Preise."
        titleEmphasis="Keine Überraschungen."
        lead="Drei klare Pakete. Ein transparenter Festpreis, einmalig zahlbar. Hosting und Pflege auf Wunsch monatlich – kündbar jederzeit."
      />

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
              <Link className={tier.featured ? 'button' : 'button secondary'} href="/kontakt" style={{ marginTop: 'auto' }}>
                Anfragen →
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

      <RevealOnScroll as="section" className="section surface" id="foerderung">
        <div className="shell fm-preise-split">
          <DigitalFoerderRechner />
          <div>
            <p className="eyebrow">Hinweis</p>
            <h2 className="section-title">
              Förderung &amp;
              <br />
              <em>Website-Budget.</em>
            </h2>
            <p className="hero-copy">
              Viele reine Web- oder Marketingprojekte fallen <strong>nicht</strong> unter die Tiroler
              Digitalisierungsförderung — rechne trotzdem, wenn Du z. B. ERP, Prozesssysteme oder Schulungen mit
              einplanst. Wir begleiten Dich gern bei der Einordnung.
            </p>
            <Link className="button secondary" href="/prozess" style={{ marginTop: 20 }}>
              So läuft ein Projekt →
            </Link>
          </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll as="section" className="section fm-faq-section" id="faq">
        <div className="shell fm-faq-section__inner">
          <p className="eyebrow fm-faq-section__eyebrow">FAQ</p>
          <h2 className="fm-faq-section__title">
            Häufige <em className="fm-italic-pop fm-faq-section__accent">Fragen.</em>
          </h2>
          <MarketingFaqAccordion items={pricingFaqs} />
        </div>
      </RevealOnScroll>

      <CtaFooterSection />
    </main>
  );
}
