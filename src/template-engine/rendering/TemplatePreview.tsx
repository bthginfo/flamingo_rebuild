import { getIndustry, getStyle } from '../registry';
import type { IndustryKey, StyleKey } from '../model';
import { getDemoSeed } from '../seeds';
import { Suspense } from 'react';
import { DemoPreviewClient } from './DemoPreviewClient';
import { PreviewFab } from './PreviewFab';

export function TemplatePreview({
  industryKey,
  styleKey,
  pathSegments = []
}: {
  industryKey: IndustryKey;
  styleKey: StyleKey;
  pathSegments?: string[];
}) {
  const industry = getIndustry(industryKey);
  const style = getStyle(styleKey);
  const home = industry.corePages.find((page) => page.key === 'home') ?? industry.corePages[0];
  const seed = getDemoSeed(industryKey, styleKey);
  const previewBasePath = `/preview/${industryKey}/${styleKey}`;

  if (seed) {
    return (
      <DemoPreviewClient
        industryKey={industryKey}
        initialSeed={seed}
        styleKey={styleKey}
        pathSegments={pathSegments}
        previewBasePath={previewBasePath}
      />
    );
  }

  return (
    <>
      <Suspense fallback={null}>
        <PreviewFab industryKey={industryKey} styleKey={styleKey} pathSegments={pathSegments} />
      </Suspense>
      <main>
        <section className="section">
          <div className="shell">
            <p className="eyebrow">
              {industry.label} · {style.label}
            </p>
            <h1 className="headline">{demoHeadline(industryKey, styleKey)}</h1>
            <p style={{ maxWidth: 760, color: 'var(--muted)', fontSize: 21, lineHeight: 1.45 }}>{demoIntro(industryKey)}</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
              <a className="button" href="#sections">
                Abschnitte ansehen
              </a>
              <a className="button secondary" href="/admin-demo/home?industry=restaurant&style=classic">
                Admin-Demo
              </a>
            </div>
          </div>
        </section>
        <section id="sections" className="section" style={{ background: 'white' }}>
          <div className="shell">
            <p className="eyebrow">Page Blueprint</p>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 44 }}>{home.label}</h2>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {home.defaultSections.map((sectionKey) => (
              <div className="card" key={sectionKey}>
                <strong>{sectionKey}</strong>
                <p style={{ color: 'var(--muted)' }}>Diese Section kommt aus der Registry und wird später vom CMS befüllt.</p>
              </div>
            ))}
          </div>
          </div>
        </section>
      </main>
    </>
  );
}

function demoHeadline(industryKey: IndustryKey, styleKey: StyleKey): string {
  const byIndustry: Record<IndustryKey, string> = {
    restaurant: 'Ein Restaurantauftritt, der Reservierungen auslöst.',
    hotel: 'Ein Hotelauftritt, der Zimmer erlebbar macht.',
    tourism: 'Touren, die schon vor der Buchung Fernweh auslösen.',
    salon: 'Ein Studioauftritt für Looks, Vertrauen und Termine.',
    tradesman: 'Handwerk sichtbar machen, bevor die Anfrage kommt.',
    consulting: 'Beratung klar positioniert und direkt anfragbar.',
    medical: 'Praxisinformationen, die Orientierung und Vertrauen geben.',
    fitness: 'Kurse, Trainer und Probetrainings auf einen Blick.',
    wedding: 'Eine Hochzeitswebsite, die Gäste wirklich nutzen.'
  };
  return styleKey === 'bold' ? byIndustry[industryKey].replace('.', '!') : byIndustry[industryKey];
}

function demoIntro(industryKey: IndustryKey): string {
  const intros: Record<IndustryKey, string> = {
    restaurant: 'Speisekarte, Atmosphäre, Öffnungszeiten, Events und Reservierung werden als echte Restaurantlogik gepflegt.',
    hotel: 'Zimmer, Angebote, Galerie und Anfragefluss greifen auf strukturierte Hotel-Inhalte zu.',
    tourism: 'Touren, Pakete, Guides und Detailseiten entstehen aus Collections statt aus hartem Seiten-Code.',
    salon: 'Leistungen, Looks, Team und Buchungsimpulse bleiben branchenspezifisch und editierbar.',
    tradesman: 'Leistungen, Referenzen, Regionen und Anfrage-CTAs sind für lokale Handwerksbetriebe gebaut.',
    consulting: 'Angebote, Cases, Expert:innen und Prozesse werden als Beratungsmodell gepflegt.',
    medical: 'Behandlungen, Ärzteteam, FAQs und Terminwege sind sauber getrennte Content-Typen.',
    fitness: 'Kurse, Trainingsplan, Trainer:innen und Mitgliedschaften bekommen eigene Datenmodelle.',
    wedding: 'Ablauf, RSVP, Location, Unterkunft und FAQ werden als Event-CMS geführt.'
  };
  return intros[industryKey];
}
