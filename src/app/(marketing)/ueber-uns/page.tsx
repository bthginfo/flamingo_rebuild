import type { Metadata } from 'next';
import { agency, imageAssets, team } from '@/ui/marketing/data';
import {
  BranchMarqueeSection,
  CtaFooterSection,
  LandingHeroShowcase,
  ManifestoSection,
  TestimonialsSection
} from '@/ui/marketing/showcase-shared';

export const metadata: Metadata = {
  title: 'Über uns',
  description:
    'FlamingoMedia aus Innsbruck: Team, Haltung und Arbeitsweise — Websites, Foto und Video für lokale Marken in der DACH-Region.'
};

export default function AboutPage() {
  return (
    <main>
      <LandingHeroShowcase
        pulse={agency.tagline}
        titleLine1="Werkstatt für Websites,"
        titleEmphasis="Foto und Video."
        lead="FlamingoMedia arbeitet für lokale Marken, die online hochwertig wirken wollen — mit echten Bildern, klaren Angeboten und einem Team, das mitdenkt statt Templates zu verstecken."
        monoAside="/ Innsbruck · DACH"
        primaryCta={{ href: '#team', label: 'Team kennenlernen →' }}
        secondaryCta={{ href: '/templates', label: 'Templates ansehen' }}
        scrollTargetId="#mehr"
      />

      <BranchMarqueeSection />

      <section className="section surface">
        <div className="shell split-grid">
          <div>
            <p className="eyebrow">Haltung</p>
            <h2 className="section-title">Gute Websites sind konkret.</h2>
            <p className="hero-copy">
              Wir zeigen echte Angebote, echte Abläufe, echte Menschen und klare nächste Schritte.               Kein austauschbarer Standard — jede Branche bekommt Rhythmus und Bildsprache, die zu den Gästen passen, die Du im Laden
              auch siehst.
            </p>
          </div>
          <div className="image-panel">
            <img src={imageAssets.about} alt="FlamingoMedia Team arbeitet gemeinsam" />
          </div>
        </div>
      </section>

      <section className="section" id="team">
        <div className="shell">
          <p className="eyebrow">Team</p>
          <h2 className="section-title" style={{ marginBottom: 34 }}>
            Die Menschen dahinter.
          </h2>
          <div className="team-grid">
            {team.map((member) => (
              <article className="card team-card" key={member.name}>
                <img src={member.image} alt={member.name} />
                <p className="eyebrow">{member.role}</p>
                <h3>{member.name}</h3>
                <p>{member.text}</p>
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
