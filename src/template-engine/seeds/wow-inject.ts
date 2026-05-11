import type { SectionInstance } from '../model';
import type { SiteSeed } from './model';
import { buildWowSectionInstances } from './wow-section-data';
import { THEME_PRESETS } from '../theme-presets';
import { getIndustryDefinition } from '../industries';

function renumber(sections: readonly SectionInstance[]): SectionInstance[] {
  const cleaned = sections.filter(
    (s): s is SectionInstance =>
      s != null && typeof s === 'object' && typeof s.sectionKey === 'string' && s.sectionKey.length > 0
  );
  return cleaned.map((s, i) => ({ ...s, sortOrder: i + 1 }));
}

function insertAfterMarker(
  sections: readonly SectionInstance[],
  markerKey: string,
  inserts: readonly SectionInstance[]
): SectionInstance[] {
  const idx = sections.findIndex((s) => s.sectionKey === markerKey);
  const at = idx >= 0 ? idx + 1 : sections.length;
  return renumber([...sections.slice(0, at), ...inserts, ...sections.slice(at)]);
}

function pickHomeMarker(sections: readonly SectionInstance[]): string {
  if (sections.some((s) => s.sectionKey === 'global.actionBar')) return 'global.actionBar';
  return 'global.hero';
}

/** WOW nur auf der Startseite; alle anderen Seiten = nur `page.sections` aus dem Seed (CMS). */
export function applyWowToSeed(seed: SiteSeed): SiteSeed {
  const { industryKey, styleKey } = seed;
  const preset = THEME_PRESETS[industryKey]?.[styleKey === 'bold' ? 1 : styleKey === 'modern' ? 2 : 0] ?? THEME_PRESETS[industryKey]?.[0];
  const pageAllowedSections = allowedSectionsByPage(seed);

  const pages = seed.pages.map((page) => {
    const allowedSections = pageAllowedSections.get(page.key);
    if (page.key === 'home') {
      const marker = pickHomeMarker(page.sections);
      const wow = filterAllowedSections(buildWowSectionInstances(industryKey, styleKey), allowedSections);
      return { ...page, sections: enrichSections(insertAfterMarker(page.sections, marker, wow), seed) };
    }
    return { ...page, sections: enrichSections(renumber(page.sections), seed) };
  });

  return {
    ...seed,
    global: {
      ...seed.global,
      brand: {
        ...seed.global.brand,
        themePresetId: seed.global.brand.themePresetId || preset?.id || '',
        accentHex: seed.global.brand.accentHex || preset?.accent || ''
      }
    },
    pages
  };
}

function allowedSectionsByPage(seed: SiteSeed): Map<string, ReadonlySet<string>> {
  const industry = getIndustryDefinition(seed.industryKey);
  const entries =
    industry?.corePages.map((page) => [page.key, new Set(page.allowedSections)] as const) ??
    [];
  return new Map(entries);
}

function filterAllowedSections(
  sections: readonly SectionInstance[],
  allowedSections: ReadonlySet<string> | undefined
): SectionInstance[] {
  if (!allowedSections) return [...sections];
  return sections.filter((section) => allowedSections.has(section.sectionKey));
}

function contactConversionDefaults(
  industry: SiteSeed['industryKey']
): { badge: string; title: string; body: string }[] {
  const map: Record<SiteSeed['industryKey'], { badge: string; title: string; body: string }[]> = {
    restaurant: [
      { badge: 'Reservierung', title: 'Tisch & Gruppen', body: 'Abendslots und private Tische — kurz Anlass und Personenzahl nennen, wir melden uns mit Vorschlägen.' },
      { badge: 'Service', title: 'Allergien & Menü', body: 'Vegetarisch, vegan oder Unverträglichkeiten? Wir koordinieren Menü und Küche vorab.' },
      { badge: 'Notfall', title: 'Kurzfristig vorbeiziehen?', body: 'Bei spontanem Besuch: kurz anrufen — wir prüfen Restkapazität am Tresen.' }
    ],
    hotel: [
      { badge: 'Buchung', title: 'Zimmer & Pakete', body: 'Früh buchen, Zusatzleistungen und Late Check-out — wir halten Optionen frei.' },
      { badge: 'Anreise', title: 'Parken & Transfer', body: 'Stellplätze sind begrenzt; Shuttle vom Bahnhof auf Anfrage.' },
      { badge: 'Concierge', title: 'Besondere Anlässe', body: 'Jubiläum oder Firmengruppe? Wir planen Kulinarik und Spa mit.' }
    ],
    tourism: [
      { badge: 'Buchung', title: 'Tour & Wetterfenster', body: 'Wir bestätigen Treffpunkt, Ausrüstung und Schwierigkeitsgrad vorab.' },
      { badge: 'Sicherheit', title: 'Notfall & Hotline', body: 'Unterwegs erreichbar für Rückfragen und kurzfristige Wetterupdates.' },
      { badge: 'Gruppe', title: 'Private Führungen', body: 'Familien oder Teams — wir passen Tempo und Pausen an.' }
    ],
    salon: [
      { badge: 'Termin', title: 'Beratung vorab', body: 'Fotos, Wunschlook und Haarhistorie helfen — wir reservieren genug Zeit.' },
      { badge: 'Vorbereitung', title: 'Vor dem Besuch', body: 'Bitte keine starken Styling-Produkte; wir messen Farbton und Struktur vor Ort.' },
      { badge: 'Nachsorge', title: 'Pflege zu Hause', body: 'Produkte und Refresh-Termin — damit der Look hält.' }
    ],
    tradesman: [
      { badge: 'Notdienst', title: 'Dringende Schäden', body: 'Wasserschaden oder Leck — kurz anrufen, wir priorisieren Einsatz und Erstmaßnahmen.' },
      { badge: 'Angebot', title: 'Vor-Ort-Termin', body: 'Fotos und Adresse reichen für eine erste Einschätzung — Aufmaß fixieren wir schnell.' },
      { badge: 'Projekt', title: 'Koordination', body: 'Wir übernehmen Abstimmung mit Versicherung und Partnergewerken.' }
    ],
    consulting: [
      { badge: 'Erstgespräch', title: '30 Minuten Check', body: 'Klarheit zu Ziel, Budget und Timeline — ohne Pitch-Überlauf.' },
      { badge: 'Vertraulichkeit', title: 'NDA & Daten', body: 'Auf Wunsch vorab — sensible Kennzahlen geschützt besprechen.' },
      { badge: 'Workshop', title: 'Deep Dive buchen', body: 'Fokussierte Session zu Produkt, GTM oder Transformation — Termin direkt vorschlagen.' }
    ],
    medical: [
      { badge: 'Termin', title: 'Online & Telefon', body: 'Akut oder geplant — wir koordinieren Fachbereich und Dringlichkeit.' },
      { badge: 'Notfall', title: 'Außerhalb der Zeiten', body: 'Bitte die veröffentlichten Notfallnummern nutzen — wir leiten weiter.' },
      { badge: 'Vorbereitung', title: 'Unterlagen mitbringen', body: 'Befunde und Medikationsliste beschleunigen den Ablauf.' }
    ],
    fitness: [
      { badge: 'Probetraining', title: 'Erstbesuch', body: '15 Minuten vorher da sein — kurzer Health-Check, dann Einstieg ins Training.' },
      { badge: 'Kurse', title: 'Platz sichern', body: 'Beliebte Slots früh buchen — wir melden Alternativen, falls voll.' },
      { badge: 'Mitgliedschaft', title: 'Beratung', body: 'Ziele und Verfügbarkeit — wir empfehlen passendes Paket ohne Druck.' }
    ],
    wedding: [
      { badge: 'RSVP', title: 'Antwort bis Frist', body: 'Personen, Ernährung, Shuttle — alles zentral, damit ihr feiern könnt.' },
      { badge: 'Gäste', title: 'Unterkunft & Shuttle', body: 'Kontingente und Abfahrtszeiten — wir halten Infos aktuell.' },
      { badge: 'Tag X', title: 'Kontakt am Tag', body: 'Für spontane Fragen: Day-of-Koordinator — Nummer folgt mit Einladung.' }
    ]
  };
  return map[industry];
}

function enrichSections(sections: readonly SectionInstance[], seed: SiteSeed): SectionInstance[] {
  return sections.map((section) => {
    if (section.sectionKey !== 'global.mapContact') return section;
    const contact = seed.global.contact;
    const address = stringValue(section.data.address) || stringValue(contact.address);
    const phone = stringValue(section.data.phone) || stringValue(contact.phone);
    const email = stringValue(section.data.email) || stringValue(contact.email);
    const openingHours = stringValue(section.data.openingHours) || stringValue(contact.openingHours);
    const highlightsRaw = section.data.conversionHighlights;
    const conversionHighlights =
      Array.isArray(highlightsRaw) && highlightsRaw.length > 0 ? highlightsRaw : contactConversionDefaults(seed.industryKey);

    return {
      ...section,
      data: {
        subline: contactSubline(seed.industryKey),
        primaryActionLabel: contactActions(seed.industryKey).primary,
        secondaryActionLabel: contactActions(seed.industryKey).secondary,
        ...section.data,
        conversionHighlights,
        mapsUrl: stringValue(section.data.mapsUrl) || stringValue(contact.mapsUrl),
        locations: Array.isArray(section.data.locations) && section.data.locations.length > 0
          ? section.data.locations
          : [
              {
                name: seed.global.brand.name,
                address,
                city: '',
                phone,
                email,
                mapsUrl: stringValue(contact.mapsUrl)
              }
            ],
        arrival: Array.isArray(section.data.arrival) && section.data.arrival.length > 0
          ? section.data.arrival
          : contactArrival(seed.industryKey, openingHours)
      }
    };
  });
}

function contactActions(industry: SiteSeed['industryKey']): { primary: string; secondary: string } {
  const map: Record<SiteSeed['industryKey'], { primary: string; secondary: string }> = {
    restaurant: { primary: 'Jetzt reservieren', secondary: 'Event anfragen' },
    hotel: { primary: 'Zimmer anfragen', secondary: 'Anreise klären' },
    tourism: { primary: 'Tour buchen', secondary: 'Frage senden' },
    salon: { primary: 'Termin buchen', secondary: 'Look anfragen' },
    tradesman: { primary: 'Rückruf starten', secondary: 'Projekt senden' },
    consulting: { primary: 'Erstgespräch buchen', secondary: 'Briefing senden' },
    medical: { primary: 'Termin vereinbaren', secondary: 'Rückfrage senden' },
    fitness: { primary: 'Probetraining buchen', secondary: 'Kursfrage senden' },
    wedding: { primary: 'RSVP senden', secondary: 'Frage stellen' }
  };
  return map[industry];
}

function stringValue(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function contactSubline(industry: SiteSeed['industryKey']): string {
  const map: Record<SiteSeed['industryKey'], string> = {
    restaurant: 'Reservierung, Anfahrt und direkte Rückfragen an einem Ort.',
    hotel: 'Anreise, Buchung und Fragen zum Aufenthalt schnell klären.',
    tourism: 'Buchungsfragen, Treffpunkt und Ablauf ohne Umwege abstimmen.',
    salon: 'Terminwunsch, Adresse und Öffnungszeiten auf einen Blick.',
    tradesman: 'Anfrage, Rückruf und Einsatzgebiet schnell koordinieren.',
    consulting: 'Erstgespräch, Projektfit und nächste Schritte direkt vereinbaren.',
    medical: 'Termin, Adresse und organisatorische Fragen klar gebündelt.',
    fitness: 'Probetraining, Kursfragen und Studiozeiten direkt abklären.',
    wedding: 'Rückfragen, Location und Anreise zentral sammeln.'
  };
  return map[industry];
}

function contactArrival(industry: SiteSeed['industryKey'], openingHours: string): { title: string; body: string }[] {
  const first = openingHours || 'Antwort meist am selben Werktag.';
  const map: Record<SiteSeed['industryKey'], { title: string; body: string }[]> = {
    restaurant: [
      { title: 'Reservieren', body: first },
      { title: 'Ankommen', body: 'Parken und Route vorab prüfen.' },
      { title: 'Feiern', body: 'Gruppen und Events direkt anfragen.' }
    ],
    hotel: [
      { title: 'Check-in', body: first },
      { title: 'Anreise', body: 'Route, Parken und Transfer planen.' },
      { title: 'Extras', body: 'Zimmerwünsche direkt mitsenden.' }
    ],
    tourism: [
      { title: 'Anfrage', body: first },
      { title: 'Treffpunkt', body: 'Route und Startzeit vorab klären.' },
      { title: 'Ausrüstung', body: 'Wichtige Details direkt abfragen.' }
    ],
    salon: [
      { title: 'Termin', body: first },
      { title: 'Beratung', body: 'Wunschlook oder Anlass mitschicken.' },
      { title: 'Besuch', body: 'Adresse und Timing schnell finden.' }
    ],
    tradesman: [
      { title: 'Anfrage', body: first },
      { title: 'Rückruf', body: 'Projektumfang kurz beschreiben.' },
      { title: 'Vor-Ort', body: 'Adresse und Wunschzeit ergänzen.' }
    ],
    consulting: [
      { title: 'Erstcall', body: first },
      { title: 'Briefing', body: 'Ziel und Ausgangslage skizzieren.' },
      { title: 'Nächster Schritt', body: 'Passendes Format vereinbaren.' }
    ],
    medical: [
      { title: 'Termin', body: first },
      { title: 'Unterlagen', body: 'Relevante Infos vorbereiten.' },
      { title: 'Anfahrt', body: 'Adresse und Orientierung prüfen.' }
    ],
    fitness: [
      { title: 'Probetraining', body: first },
      { title: 'Kursfit', body: 'Ziel und Level kurz angeben.' },
      { title: 'Start', body: 'Studio und Kurszeiten prüfen.' }
    ],
    wedding: [
      { title: 'Rückfrage', body: first },
      { title: 'Location', body: 'Adresse und Ablauf griffbereit.' },
      { title: 'RSVP', body: 'Antwort und Begleitung abstimmen.' }
    ]
  };
  return map[industry];
}
