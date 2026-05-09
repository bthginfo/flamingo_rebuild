import type { Metadata } from 'next';
import { agency, processPhases } from '@/ui/marketing/data';
import { CtaFooterSection, LandingHeroShowcase } from '@/ui/marketing/showcase-shared';
import { ProcessTimelineClient } from '@/ui/marketing/ProcessTimelineClient';

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
        scrollTargetId="#schritte"
      />

      <div id="schritte">
        <ProcessTimelineClient steps={processPhases} />
      </div>

      <CtaFooterSection />
    </main>
  );
}
