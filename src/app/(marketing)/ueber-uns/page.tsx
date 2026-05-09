import type { Metadata } from 'next';
import { agency, team } from '@/ui/marketing/data';
import {
  BranchMarqueeSection,
  CtaFooterSection,
  LandingHeroShowcase,
  ManifestoSection,
  TestimonialsSection
} from '@/ui/marketing/showcase-shared';
import { RevealOnScroll } from '@/ui/marketing/RevealOnScroll';

export const metadata: Metadata = {
  title: 'Über uns',
  description:
    'FlamingoMedia ist eine Werkstatt für Websites, Foto und Video. Zwei Menschen, ein Hund, viel Kaffee — Handwerk vor Marketing-Sprech.'
};

export default function AboutPage() {
  return (
    <main>
      <LandingHeroShowcase
        pulse={agency.tagline}
        titleLine1="Ein kleines Studio."
        titleEmphasis="Ein klarer Anspruch."
        lead="FlamingoMedia ist eine Werkstatt für Websites, Foto und Video. Zwei Menschen, ein Hund, viel Kaffee. Wir glauben an Handwerk vor Marketing-Sprech."
        monoAside="/ Innsbruck · DACH"
        primaryCta={{ href: '#team', label: 'Das Team →' }}
        secondaryCta={{ href: '/templates', label: 'Templates ansehen' }}
        scrollTargetId="#mehr"
      />

      <BranchMarqueeSection />

      <RevealOnScroll as="section" className="section surface">
        <div className="shell split-grid" data-stagger-grid>
          <div>
            <h2 className="section-title">
              Studio in Innsbruck.
              <br />
              <em>Kunden in der DACH-Region.</em>
            </h2>
            <p className="hero-copy">
              Wir sind ein kleines, unkompliziertes Team aus Tech-Enthusiast:innen und Gestalter:innen. Lieber kurze Wege
              als lange Briefings. Lieber direkt sprechen als zehnseitige Konzepte schicken.
            </p>
            <p className="hero-copy" style={{ marginTop: 16 }}>
              Unsere Kunden sind Restaurants, Salons, Handwerksbetriebe, Praxen, Kanzleien, Studios und viele mehr – in
              Innsbruck, München, Ingolstadt und überall dort, wo gute Arbeit zählt. Über 65 % der Aufträge kommen von
              Empfehlungen.
            </p>
          </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll as="section" className="section" id="team">
        <div className="shell">
          <p className="eyebrow">Das Team.</p>
          <div className="team-grid" data-stagger-grid>
            {team.map((member, index) => (
              <article className="card team-card" key={member.name}>
                <p className="fm-mono-label">/ {String(index + 1).padStart(2, '0')}</p>
                <img src={member.image} alt={member.name} />
                <h3>{member.name}</h3>
                <p className="eyebrow" style={{ marginTop: 4 }}>
                  {member.role}
                </p>
                <p>{member.text}</p>
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
