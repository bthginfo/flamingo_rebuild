import { sections } from '../sections';
import type { CollectionDefinition, FieldDefinition, IndustryKey } from '../model';
import type { CollectionSeedItem, SiteSeed } from './model';
import { getIndustryDefinition } from '../industries';

const MIN_ITEMS_PER_COLLECTION = 6;

const IMAGE_BY_INDUSTRY: Record<IndustryKey, readonly string[]> = {
  restaurant: [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=82',
    'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=82',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=82'
  ],
  hotel: [
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=82',
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=82',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=82'
  ],
  tourism: [
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=82',
    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=82',
    'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=82'
  ],
  salon: [
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=82',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=82',
    'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1200&q=82'
  ],
  tradesman: [
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=82',
    'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=82',
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=82'
  ],
  consulting: [
    'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=82',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=82',
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=82'
  ],
  medical: [
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=82',
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=82',
    'https://images.unsplash.com/photo-1584432810601-6d7a340be29c?auto=format&fit=crop&w=1200&q=82'
  ],
  fitness: [
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=82',
    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=82',
    'https://images.unsplash.com/photo-1593079831268-3381b0db04a5?auto=format&fit=crop&w=1200&q=82'
  ],
  wedding: [
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=82',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=82',
    'https://images.unsplash.com/photo-1522673607260-14d1f34b1a31?auto=format&fit=crop&w=1200&q=82'
  ]
};

const TITLE_BANK: Record<string, readonly string[]> = {
  menuItem: ['Hausgemachte Pasta', 'Gerösteter Blumenkohl', 'Rinderfilet vom Grill', 'Zitronen-Tarte', 'Winzerplatte', 'Signature Aperitif'],
  diningExperience: ['Chef Table', 'Sonntagsbrunch', 'Weinabend', 'Private Dining', 'Terrassen-Lunch', 'Küchenparty'],
  restaurantInsight: ['Warum unser Sauerteig ruht', 'Die Produzentenrunde', 'Pairing ohne Dogma', 'Terrassenservice bei Regen', 'Kinder am Tisch', 'Reservieren wie Stammgäste'],
  room: ['Garden Suite', 'Rheinblick Deluxe', 'Family Loft', 'Business Comfort', 'Spa Junior Suite', 'Classic Doppelzimmer'],
  hotelOffer: ['Wellness Wochenende', 'Workation Paket', 'Dinner & Stay', 'Familienferien', 'Late Checkout Special', 'Meeting Retreat'],
  hotelInsight: ['Check-in ohne Reibung', 'Spa-Zeit richtig planen', 'Frühstück mit Herkunft', 'Kissenmenü & Schlaf', 'Anreise mit Gepäck', 'Meetingtage, die laufen'],
  tour: ['Sonnenaufgangs-Wanderung', 'Altstadt & Genuss', 'E-Bike Panorama', 'Familienabenteuer', 'Weinberg Picknick', 'Winter Walk'],
  tourismInsight: ['Packliste nach Wetter', 'Wie unsere Guides führen', 'Sicherheit am Treffpunkt', 'Fotospots ohne Gedränge', 'Touren mit Kindern', 'Plan B bei Regen'],
  treatment: ['Glossing & Pflege', 'Balayage Refresh', 'Bridal Styling', 'Herren Cut', 'Color Correction', 'Relax Ritual'],
  look: ['Soft Copper', 'French Bob', 'Glossy Brunette', 'Blonde Dimension', 'Clean Bridal', 'Textured Waves'],
  salonInsight: ['Beratung vor Farbe', 'Pflegeplan für Zuhause', 'Brautprobe ohne Stress', 'Color Save Ritual', 'Schnitt, der wächst', 'Produkte mit Sinn'],
  tradeService: ['Bad Modernisierung', 'Dach Check', 'Smart Home Nachrüstung', 'Wartungsvertrag', 'Energieberatung', 'Notfallservice'],
  referenceProject: ['Altbau Loft', 'Familienhaus Nord', 'Praxis Umbau', 'Hotel Terrasse', 'Küchenstudio', 'Denkmal Fassade'],
  tradesmanInsight: ['Ablauf vom Ersttermin', 'Materialentscheidung ohne Druck', 'Baustelle sauber übergeben', 'Wartung spart Kosten', 'Notfall richtig melden', 'Qualität sichtbar prüfen'],
  consultingService: ['Strategie Sprint', 'Go-to-Market Audit', 'Funding Readiness', 'Brand Positioning', 'Process Design', 'Leadership Workshop'],
  caseStudy: ['SaaS Relaunch', 'Hotelgruppe Wachstum', 'Praxis Digitalisierung', 'Retail Turnaround', 'B2B Pipeline', 'Employer Brand'],
  consultingInsight: ['Was im Erstcall zählt', 'Board-Deck statt Folienfriedhof', 'Research in 10 Tagen', 'Entscheidungen sichtbar machen', 'MVP-Scope schützen', 'Nach dem Workshop'],
  treatmentOverview: [],
  doctor: ['Dr. Mira Keller', 'Dr. Jonas Hart', 'Nina Vogt', 'Leon Weber', 'Aylin Demir', 'Prof. Simon Falk'],
  medicalInsight: ['Vor dem Termin', 'Befunde verständlich lesen', 'Diagnostik ohne Wartechaos', 'Nachsorge planen', 'Barrierefrei ankommen', 'Akut oder Routine'],
  fitnessClass: ['Strength 45', 'Mobility Flow', 'HIIT Circuit', 'Pilates Core', 'Run Club', 'Recovery Yoga'],
  scheduleItem: ['Getting Ready', 'Freie Trauung', 'Aperitif & Fotos', 'Dinner', 'Eröffnungstanz', 'Late-Night Snacks'],
  trainer: ['Mara Stein', 'Noah Kraft', 'Lina Core', 'Ben Mobility', 'Elif Run', 'Tom Recovery'],
  fitnessInsight: ['Probetraining ohne Druck', 'Trainingsziel in 30 Tagen', 'Peak-Zeiten clever nutzen', 'Community statt Anonymität', 'Regeneration zählt', 'Startplan für Wiedereinsteiger'],
  accommodation: ['Hotel Rheinblick', 'Pension Marktgasse', 'Boutique Loft', 'Winzerhof Gästehaus', 'Apartment Hafen', 'Shuttle Treffpunkt'],
  weddingInsight: ['Plan B bei Wetter', 'Dresscode ohne Rätsel', 'Kinder & Ruhezone', 'Geschenke & Beiträge', 'Shuttle nach Mitternacht', 'Fotos ohne Zeitdruck'],
  newsArticle: ['Neu im Fruehjahr', 'Blick hinter die Kulissen', 'Terminfenster mit Mehrwert', 'Was Kunden jetzt fragen', 'Saison-Update aus dem Team', 'Vor Ort besser geplant']
};

const SECTION_COLLECTION = new Map(
  sections.flatMap((section) =>
    section.fields
      .filter((field) => field.type === 'collectionReferenceList' && field.collectionKey)
      .map((field) => [section.key, field.collectionKey as string] as const)
  )
);

export function deepenDemoSeed(seed: SiteSeed): SiteSeed {
  const industry = getIndustryDefinition(seed.industryKey);
  if (!industry) return seed;

  const collections = [...seed.collections];
  for (const collection of industry.collections) {
    ensureCollectionItems(collections, collection, seed.industryKey);
  }
  const enrichedCollections = enrichCollectionItems(collections, industry.collections, seed.industryKey);

  const idsByCollection = new Map<string, string[]>();
  for (const item of enrichedCollections) {
    idsByCollection.set(item.collectionKey, [...(idsByCollection.get(item.collectionKey) ?? []), item.id]);
  }

  return {
    ...seed,
    collections: enrichedCollections,
    pages: seed.pages.map((page) => {
      const newsIds = latestNewsIds(enrichedCollections);
      const sections = page.sections.map((section) => {
        const collectionKey = SECTION_COLLECTION.get(section.sectionKey);
        const ids = collectionKey ? idsByCollection.get(collectionKey) : undefined;
        if (!ids || ids.length === 0) return section;
        return {
          ...section,
          data: {
            ...section.data,
            items: ids
          }
        };
      });
      const pageSections =
        page.key === 'contact'
          ? sections.filter((section) => ['global.pageHeader', 'global.mapContact', 'global.contactCta'].includes(section.sectionKey))
          : sections;
      const withNews =
        page.key !== 'home' || pageSections.some((section) => section.sectionKey === 'global.newsTeaser') || newsIds.length === 0
          ? pageSections
          : insertBeforeContact(pageSections, {
              id: 'home-news-teaser',
              sectionKey: 'global.newsTeaser',
              visible: true,
              sortOrder: 0,
              data: {
                eyebrow: newsEyebrow(seed.industryKey),
                headline: newsHeadline(seed.industryKey),
                intro: newsIntro(seed.industryKey),
                limit: 4,
                items: newsIds,
                cta: { label: 'Alle News lesen', link: { type: 'page', href: '/news' } }
              }
            });
      return {
        ...page,
        sections: renumber(withNews)
      };
    })
  };
}

function enrichCollectionItems(
  items: readonly CollectionSeedItem[],
  definitions: readonly CollectionDefinition[],
  industry: IndustryKey
): CollectionSeedItem[] {
  const definitionsByKey = new Map(definitions.map((definition) => [definition.key, definition]));
  const seenByCollection = new Map<string, number>();
  return items.map((item) => {
    const definition = definitionsByKey.get(item.collectionKey);
    if (!definition) return item;
    const index = seenByCollection.get(item.collectionKey) ?? 0;
    seenByCollection.set(item.collectionKey, index + 1);
    const data = { ...item.data };
    for (const field of definition.fields) {
      if (field.key === 'title' || field.key === 'slug' || field.key === 'seo') continue;
      const current = data[field.key];
      const emptyArray = Array.isArray(current) && current.length === 0;
      if (current === undefined || current === null || current === '' || emptyArray) {
        data[field.key] = valueForField(field, definition, industry, item.title, index);
      }
    }
    return { ...item, data };
  });
}

function insertBeforeContact(sections: readonly SiteSeed['pages'][number]['sections'][number][], insert: SiteSeed['pages'][number]['sections'][number]) {
  const idx = sections.findIndex((section) => section.sectionKey === 'global.contactCta');
  const at = idx >= 0 ? idx : sections.length;
  return [...sections.slice(0, at), insert, ...sections.slice(at)];
}

function latestNewsIds(collections: readonly CollectionSeedItem[]): string[] {
  return collections
    .filter((item) => item.collectionKey === 'newsArticle')
    .sort((a, b) => String(b.data.publishedAt ?? '').localeCompare(String(a.data.publishedAt ?? '')))
    .map((item) => item.id);
}

function renumber<T extends { sortOrder: number }>(sections: readonly T[]): T[] {
  return sections.map((section, index) => ({ ...section, sortOrder: index + 1 }));
}

function ensureCollectionItems(items: CollectionSeedItem[], collection: CollectionDefinition, industry: IndustryKey) {
  const existing = items.filter((item) => item.collectionKey === collection.key);
  const needed = Math.max(0, MIN_ITEMS_PER_COLLECTION - existing.length);
  for (let i = 0; i < needed; i += 1) {
    const index = existing.length + i;
    const title = titleFor(collection.key, index);
    items.push({
      id: `depth-${collection.key}-${index + 1}`,
      collectionKey: collection.key,
      title,
      slug: slugify(title),
      data: dataFor(collection, industry, title, index),
      seo: {
        title,
        description: summaryFor(collection.key, collection.label, title, index)
      }
    });
  }
}

function dataFor(collection: CollectionDefinition, industry: IndustryKey, title: string, index: number): Record<string, unknown> {
  const data: Record<string, unknown> = {};
  for (const field of collection.fields) {
    if (field.key === 'title' || field.key === 'slug' || field.key === 'seo') continue;
    data[field.key] = valueForField(field, collection, industry, title, index);
  }
  return data;
}

function valueForField(
  field: FieldDefinition,
  collection: CollectionDefinition,
  industry: IndustryKey,
  title: string,
  index: number
): unknown {
  if (field.key === 'summary') return summaryFor(collection.key, collection.label, title, index);
  if (field.key === 'description') {
    return descriptionFor(collection.key, title);
  }
  if (field.key === 'image') return IMAGE_BY_INDUSTRY[industry][index % IMAGE_BY_INDUSTRY[industry].length];
  if (field.key === 'kicker') return ['Insider', 'Gut zu wissen', 'Ablauf', 'Empfehlung', 'Detail', 'Service'][index % 6];
  if (field.key === 'metric') return ['3 Min.', 'Premium', 'Planbar', 'Vor Ort', 'Sicher', 'Direkt'][index % 6];
  if (field.key === 'detail') return detailFor(collection.key, title, index);
  if (field.key === 'category') return ['Update', 'Einblick', 'Ratgeber', 'Saison'][index % 4];
  if (field.key === 'publishedAt') return `2026-0${(index % 6) + 1}-15`;
  if (field.key === 'author') return 'Flamingo Redaktion';
  if (field.key === 'readTime') return `${3 + (index % 4)} Min.`;
  if (field.key === 'videoUrl') return '';
  if (field.key === 'images') return galleryFor(industry, index);
  if (field.key === 'priceFrom') return priceFromFor(collection.key, index);
  if (field.key === 'duration') return durationFor(collection.key, index);
  if (field.key === 'capacity') return ['bis 8 Personen', '12 bis 24 Gaeste', 'exklusiv buchbar'][index % 3];
  if (field.key === 'allergens') return ['enthaelt Gluten', 'enthaelt Milchprodukte', 'auf Wunsch erklaeren wir alle Allergene am Tisch'][index % 3];
  if (field.key === 'dietaryTags') return ['vegetarisch moeglich', 'saisonal', 'hausgemacht'][index % 3];
  if (field.key === 'pairingRecommendation') return ['Mineralischer Weisswein oder alkoholfreier Verjus-Spritz', 'Leichter Rotwein mit kuehler Frucht', 'Hausgemachte Limonade mit Kraeutern'][index % 3];
  if (field.key === 'sizeSqm') return ['28 qm', '36 qm', '52 qm', '64 qm'][index % 4];
  if (field.key === 'occupancy') return ['1-2 Personen', '2 Personen', '2-4 Personen', 'bis 5 Personen'][index % 4];
  if (field.key === 'bedType') return ['King Size', 'Queen Size', 'Twin moeglich', 'Familienbett plus Schlafsofa'][index % 4];
  if (field.key === 'view') return ['Gartenblick', 'Altstadtblick', 'Panoramafenster', 'Ruhiger Innenhof'][index % 4];
  if (field.key === 'travelPeriod') return ['ganzjaehrig buchbar', 'Sonntag bis Donnerstag', 'April bis Oktober', 'Feiertage auf Anfrage'][index % 4];
  if (field.key === 'distance') return collection.key === 'tour' ? ['6 km', '9 km', '14 km', '3 km'][index % 4] : ['5 Gehminuten', '1,2 km', 'Shuttle empfohlen'][index % 3];
  if (field.key === 'elevationGain') return ['180 hm', '420 hm', '760 hm', 'kaum Steigung'][index % 4];
  if (field.key === 'difficulty') return ['leicht', 'moderat', 'sportlich', 'familienfreundlich'][index % 4];
  if (field.key === 'season') return ['Fruehjahr bis Herbst', 'ganzjaehrig', 'Sommer', 'Winter bei guter Lage'][index % 4];
  if (field.key === 'meetingPoint') return ['Haupteingang', 'Talstation', 'Marktplatz', 'direkt vor Ort'][index % 4];
  if (field.key === 'preparation') return preparationFor(collection.key);
  if (field.key === 'aftercare') return aftercareFor(collection.key);
  if (field.key === 'problemStatement') return 'Viele Anfragen starten mit Unsicherheit bei Aufwand, Material und Timing. Wir machen den Ablauf frueh konkret.';
  if (field.key === 'solutionSummary') return 'Vor-Ort-Check, klare Empfehlung, transparente Etappen und saubere Uebergabe ohne offene Punkte.';
  if (field.key === 'serviceArea') return 'Region, Umland und kurzfristige Einsaetze nach Verfuegbarkeit.';
  if (field.key === 'location') return ['Innenstadt', 'Am See', 'Altbauviertel', 'Weingut', 'Studio'][index % 5];
  if (field.key === 'projectType') return ['Sanierung', 'Umbau', 'Wartung', 'Neubau', 'Modernisierung'][index % 5];
  if (field.key === 'customerQuote') return 'Wir wussten zu jedem Zeitpunkt, was als Naechstes passiert und warum.';
  if (field.key === 'targetAudience') return 'Teams und Entscheider, die Klarheit vor Tempo setzen und dann konsequent umsetzen wollen.';
  if (field.key === 'problemTypes') return 'Positionierung, Priorisierung, Wachstum, Prozesse und Entscheidungen mit zu wenig Datenbasis.';
  if (field.key === 'challenge') return 'Das Team hatte gute Einzelinitiativen, aber kein gemeinsames Bild von Prioritaeten, Wirkung und naechstem Schritt.';
  if (field.key === 'approach') return 'Wir haben Interviews, Datenpunkte und Marktlogik in einen klaren Entscheidungsrahmen gebracht und daraus umsetzbare Sprints abgeleitet.';
  if (field.key === 'results') return 'Das Ergebnis war weniger Abstimmungsaufwand, bessere Entscheidungen und ein Fahrplan, der im Alltag wirklich nutzbar blieb.';
  if (field.key === 'testimonial') return 'Die Zusammenarbeit hat Komplexitaet reduziert, ohne die wichtigen Details zu verlieren.';
  if (field.key === 'procedure') return 'Nach einer kurzen Anamnese klaeren wir Ziel, Ablauf und moegliche Alternativen. Danach erhalten Patientinnen und Patienten eine verstaendliche Empfehlung.';
  if (field.key === 'coveredByInsurance') return ['Kasse nach Indikation', 'Privatleistung', 'Kasse und Privat', 'Bitte vorab klaeren'][index % 4];
  if (field.key === 'role') return ['Leitung', 'Spezialist:in', 'Coach', 'Gastgeber:in'][index % 4];
  if (field.key === 'languages') return 'Deutsch, Englisch';
  if (field.key === 'consultationHours') return 'Sprechzeiten nach Vereinbarung, Akuttermine je nach Verfuegbarkeit.';
  if (field.key === 'schedule') return 'Mehrmals pro Woche mit festen Slots und klarer Empfehlung fuer den Einstieg.';
  if (field.key === 'certifications') return 'Zertifizierte Ausbildung, laufende Fortbildungen und dokumentierte Praxiserfahrung.';
  if (field.key === 'guestNote') return 'Bitte plant ein paar Minuten Puffer ein; wir fuehren euch vor Ort gut durch den Ablauf.';
  if (field.key === 'bookingHint') return 'Nennt bei der Buchung den Anlass, damit das Kontingent korrekt zugeordnet wird.';
  if (field.key === 'mapsUrl') return 'https://www.google.com/maps';
  if (field.key === 'weekday') return ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'][index % 6];
  if (field.key === 'time') return ['08:00', '10:30', '13:00', '16:30', '18:00', '20:00'][index % 6];
  if (field.key === 'level') return ['Einsteiger', 'Alle Level', 'Fortgeschritten', 'Performance'][index % 4];
  if (field.key === 'trainer') return ['Mara', 'Noah', 'Lina', 'Ben', 'Elif', 'Tom'][index % 6];
  if (field.key === 'cta') return { label: 'Mehr erfahren', link: { type: 'page', href: collection.slugPrefix } };
  if (field.type === 'gallery') return galleryFor(industry, index);
  if (field.type === 'repeater') return repeaterValueFor(field, collection.key, index);
  if (field.type === 'boolean') return false;
  if (field.type === 'number') return index + 1;
  return field.required ? title : '';
}

function repeaterValueFor(field: FieldDefinition, collectionKey: string, index: number): Record<string, string>[] {
  const values = listValuesFor(field.key, collectionKey, index);
  const itemFields = field.itemFields ?? [];
  if (itemFields.length === 1 && itemFields[0]?.key === 'value') {
    return values.map((value) => ({ value }));
  }
  if (field.key === 'metrics') {
    return [
      { label: 'Time to clarity', value: '10 Tage' },
      { label: 'Prioritaeten', value: '3 klare Sprints' },
      { label: 'Entscheidungsrunde', value: '1 Board-Format' }
    ];
  }
  return values.map((value) => ({ title: value, body: value, label: value }));
}

function listValuesFor(fieldKey: string, collectionKey: string, index: number): string[] {
  const map: Record<string, string[]> = {
    ingredients: ['saisonal eingekauft', 'hausgemacht vorbereitet', 'fein abgeschmeckt'],
    included: ['persoenliche Einordnung', 'klare Empfehlung', 'saubere Vorbereitung'],
    amenities: ['Naturmaterialien', 'ruhige Lage', 'WLAN', 'hochwertige Pflegeprodukte'],
    requirements: ['normale Grundfitness', 'wetterfeste Kleidung', 'pünktlicher Treffpunkt'],
    packingList: ['Wasserflasche', 'leichte Jacke', 'Sonnenschutz', 'feste Schuhe'],
    deliverables: ['Entscheidungsvorlage', 'priorisierte Roadmap', 'Workshop-Dokumentation'],
    indications: ['Erstabklaerung', 'Verlaufskontrolle', 'gezielte Diagnostik'],
    specialties: ['Beratung', 'Praxisroutine', 'ruhige Kommunikation'],
    goals: ['stabiler Einstieg', 'messbarer Fortschritt', 'bessere Technik'],
    equipmentNeeded: ['Handtuch', 'Trinkflasche', 'bequeme Kleidung']
  };
  return map[fieldKey] ?? [`${humanize(collectionKey)} Detail ${index + 1}`, 'gut planbar', 'klar erklaert'];
}

function galleryFor(industry: IndustryKey, index: number): { url: string; alt: string }[] {
  const images = IMAGE_BY_INDUSTRY[industry];
  return [0, 1, 2].map((offset) => ({
    url: images[(index + offset) % images.length],
    alt: `${industry} Bild ${offset + 1}`
  }));
}

function priceFromFor(collectionKey: string, index: number): string {
  if (collectionKey === 'room') return ['ab 148 Euro', 'ab 186 Euro', 'ab 224 Euro'][index % 3];
  if (collectionKey === 'hotelOffer') return ['ab 290 Euro p. P.', 'ab 420 Euro fuer 2 Naechte', 'auf Anfrage'][index % 3];
  if (collectionKey === 'treatment') return ['ab 48 Euro', 'ab 92 Euro', 'ab 160 Euro'][index % 3];
  if (collectionKey === 'accommodation') return ['ab 99 Euro', 'ab 135 Euro', 'auf Anfrage'][index % 3];
  return ['ab 120 Euro', 'ab 240 Euro', 'auf Anfrage'][index % 3];
}

function durationFor(collectionKey: string, index: number): string {
  if (collectionKey === 'tour') return ['3 Stunden', 'halber Tag', 'ganzer Tag'][index % 3];
  if (collectionKey === 'fitnessClass') return ['45 Minuten', '60 Minuten', '75 Minuten'][index % 3];
  if (collectionKey === 'consultingService') return ['2 Wochen', '4 Wochen', '1 Workshop-Tag'][index % 3];
  if (collectionKey === 'scheduleItem') return ['30 Minuten', '60 Minuten', 'flexibel'][index % 3];
  return ['45 Minuten', '90 Minuten', 'nach Vereinbarung'][index % 3];
}

function preparationFor(collectionKey: string): string {
  if (collectionKey === 'treatment') return 'Bitte bringe Wunschbilder und bisherige Pflegeprodukte mit, damit die Beratung konkret wird.';
  return 'Vorab klaeren wir Ziel, Zeitfenster und relevante Unterlagen, damit der Termin ohne Umwege starten kann.';
}

function aftercareFor(collectionKey: string): string {
  if (collectionKey === 'treatment') return 'Du erhaeltst eine klare Pflegeempfehlung, damit Farbe, Schnitt und Finish laenger stark bleiben.';
  return 'Nach dem Termin bekommst du die wichtigsten Hinweise kompakt zusammengefasst.';
}

function newsEyebrow(industry: IndustryKey): string {
  const map: Record<IndustryKey, string> = {
    restaurant: 'Aus Kueche & Gastraum',
    hotel: 'Journal',
    tourism: 'Guide-Updates',
    salon: 'Studio Notes',
    tradesman: 'Werkstatt-News',
    consulting: 'Insights',
    medical: 'Praxiswissen',
    fitness: 'Studio Journal',
    wedding: 'Updates fuer Gaeste'
  };
  return map[industry];
}

function newsHeadline(industry: IndustryKey): { plain: string; accent: string } {
  const map: Record<IndustryKey, { plain: string; accent: string }> = {
    restaurant: { plain: 'Aktuelles, das', accent: 'Appetit macht.' },
    hotel: { plain: 'Neuigkeiten fuer', accent: 'bessere Aufenthalte.' },
    tourism: { plain: 'Frisch geplant,', accent: 'besser unterwegs.' },
    salon: { plain: 'Trends, Pflege', accent: 'und Termine.' },
    tradesman: { plain: 'Updates vom', accent: 'Profi-Team.' },
    consulting: { plain: 'Gedanken, die', accent: 'Entscheidungen schaerfen.' },
    medical: { plain: 'Wissen fuer', accent: 'sichere Termine.' },
    fitness: { plain: 'Neu im Studio,', accent: 'stark im Alltag.' },
    wedding: { plain: 'Alles Neue fuer', accent: 'euren Tag.' }
  };
  return map[industry];
}

function newsIntro(industry: IndustryKey): string {
  const map: Record<IndustryKey, string> = {
    restaurant: 'Saisonkarte, Produzenten, Events und kleine Geschichten, die den naechsten Besuch greifbar machen.',
    hotel: 'Arrangements, Hausgeschichten und praktische Hinweise fuer Gaeste, die genauer planen wollen.',
    tourism: 'Wetter, Routen, Ausruestung und neue Erlebnisse kompakt aus Sicht des Guide-Teams.',
    salon: 'Farbtrends, Pflegewissen und Terminfenster, die vor dem Besuch wirklich helfen.',
    tradesman: 'Material, Wartung, Ablauf und regionale Projekte mit konkretem Nutzen fuer Anfragen.',
    consulting: 'Perspektiven aus Strategie, Wachstum und Umsetzung, die direkt in bessere Entscheidungen fuehren.',
    medical: 'Patientenfreundliche Updates zu Ablauf, Vorsorge, Diagnostik und Organisation.',
    fitness: 'Programme, Community-Momente und Trainingsimpulse fuer Menschen, die dranbleiben wollen.',
    wedding: 'Planungsupdates, Gaesteinfos und kleine Details, die vor dem Fest Ruhe schaffen.'
  };
  return map[industry];
}

function titleFor(collectionKey: string, index: number): string {
  const bank = TITLE_BANK[collectionKey] ?? [];
  return bank[index] ?? `${humanize(collectionKey)} ${index + 1}`;
}

const PREMIUM_SUMMARY_BY_COLLECTION: Record<string, readonly string[]> = {
  restaurantInsight: [
    'Wie wir Timing, Herkunft und Service so verbinden, dass der Abend entspannt beginnt und am Tisch leicht wirkt.',
    'Ein Blick hinter die Kulissen fuer Gaeste, die Genuss lieben, aber keine Inszenierung brauchen.',
    'Konkrete Empfehlungen aus Kueche und Service, damit Reservierung, Anlass und Erwartung sauber zusammenpassen.'
  ],
  hotelInsight: [
    'Alles, was Gaeste vor der Buchung wissen wollen: Anreise, Komfort, Rhythmus und die kleinen Extras im Haus.',
    'Praktische Orientierung aus dem Hotelalltag, damit der Aufenthalt schon vor dem Check-in stressfrei startet.',
    'Mehr Kontext zu Schlaf, Spa, Fruehstueck und Services, die aus einer Uebernachtung echte Erholung machen.'
  ],
  tourismInsight: [
    'Guide-Wissen fuer bessere Vorbereitung: Route, Wetter, Sicherheit und die Momente, die unterwegs zaehlen.',
    'Klar erklaert, damit Besucher nicht nur buchen, sondern mit einem guten Gefuehl losziehen.',
    'Lokale Erfahrung als kompakter Planungshelfer fuer Menschen, die Natur und Ablauf ernst nehmen.'
  ],
  salonInsight: [
    'Beratung, Pflege und Ergebnis realistisch eingeordnet, damit der Termin sichtbar mehr Vertrauen bekommt.',
    'Professionelles Studio-Wissen fuer Kundinnen und Kunden, die Look, Haltbarkeit und Pflege verstehen wollen.',
    'Vom Wunschbild zur tragbaren Loesung: klare Erwartungen, weniger Unsicherheit und bessere Ergebnisse.'
  ],
  tradesmanInsight: [
    'So wird aus einer Anfrage ein sauberer Ablauf: Material, Termin, Baustelle und Ergebnis transparent erklaert.',
    'Praktische Orientierung fuer Hausbesitzer, die Qualitaet erkennen und Entscheidungen sicher treffen wollen.',
    'Ein ehrlicher Blick auf Planung, Aufwand und Wartung, bevor Kosten oder Rueckfragen unnoetig wachsen.'
  ],
  consultingInsight: [
    'Einordnung aus der Projektpraxis: Was wirklich hilft, wenn Entscheidungen schneller und belastbarer werden sollen.',
    'Methodik ohne Buzzwords, mit Fokus auf Klarheit, Prioritaeten und naechste Schritte, die Teams umsetzen koennen.',
    'Strategische Tiefe als greifbarer Leitfaden fuer Fuehrungsteams, die nicht noch ein loses Konzept brauchen.'
  ],
  medicalInsight: [
    'Patientenfreundlich erklaert, damit Vorbereitung, Ablauf und Nachsorge schon vor dem Termin klar sind.',
    'Praxiswissen in ruhiger Sprache fuer Menschen, die Orientierung statt medizinischer Floskeln suchen.',
    'Konkrete Hinweise zu Organisation, Diagnostik und Entscheidung, damit Termine sicherer genutzt werden.'
  ],
  fitnessInsight: [
    'Training verstaendlich gemacht: Einstieg, Ziel, Rhythmus und Regeneration so geplant, dass Menschen dranbleiben.',
    'Studio-Wissen fuer bessere Entscheidungen vor Probetraining, Mitgliedschaft oder Kursauswahl.',
    'Mehr Kontext zu Coaching, Community und Progression, damit Motivation nicht vom Zufall abhaengt.'
  ],
  weddingInsight: [
    'Liebevoll praktische Gaesteinfos, die Timing, Anreise, Dresscode und Plan B ohne Nachfragen klaeren.',
    'Alles, was den Hochzeitstag leichter macht: freundlich formuliert, konkret geplant und sofort hilfreich.',
    'Kleine Details mit grosser Wirkung, damit Gaeste ankommen, mitfeiern und nicht improvisieren muessen.'
  ],
  newsArticle: [
    'Aktuell, nuetzlich und konkret: ein kurzer Beitrag, der Besuchern vor Anfrage oder Buchung echten Kontext gibt.',
    'Ein saisonaler Einblick aus dem Betrieb mit klarer Empfehlung und einem naheliegenden naechsten Schritt.',
    'Relevant fuer Menschen, die planen, vergleichen oder einfach wissen wollen, was sich vor Ort gerade lohnt.'
  ]
};

function summaryFor(collectionKey: string, label: string, title: string, index: number): string {
  const premium = PREMIUM_SUMMARY_BY_COLLECTION[collectionKey];
  if (premium?.length) return premium[index % premium.length];
  const angles = [
    'klar beschrieben, damit Interessenten schneller verstehen, ob es zu ihrem Anlass passt',
    'mit konkretem Nutzen, ehrlicher Einordnung und einem naheliegenden naechsten Schritt',
    'fuer Menschen, die vor der Anfrage Orientierung und Sicherheit suchen',
    'als wertvoller Einblick aus dem Alltag des Betriebs'
  ];
  return `${title} aus ${label}: ${angles[index % angles.length]}.`;
}

function descriptionFor(collectionKey: string, title: string): string {
  if (collectionKey === 'newsArticle') {
    return `${title} ordnet ein, was Kundinnen und Kunden gerade wirklich wissen wollen: aktuelle Hinweise, klare Empfehlung und ein naechster Schritt ohne Umwege.`;
  }
  if (collectionKey.endsWith('Insight')) {
    return `${title} gibt Besuchern einen fundierten Blick hinter die Kulissen und beantwortet typische Fragen, bevor sie Kontakt aufnehmen.`;
  }
  return `${title} ist so beschrieben, dass Nutzen, Atmosphaere und naechster Schritt ohne langes Nachfragen sichtbar werden.`;
}

function detailFor(collectionKey: string, title: string, index: number): string {
  const lines = [
    'Hilft Interessenten, den naechsten Schritt mit gutem Gefuehl zu machen.',
    'Schafft Orientierung ohne lange Rueckfragen oder vage Versprechen.',
    'Macht Ablauf, Erwartung und Nutzen auf einen Blick klar.',
    'Gibt dem Angebot mehr Substanz und macht die Entscheidung leichter.'
  ];
  if (collectionKey.endsWith('Insight')) return lines[index % lines.length];
  return title;
}

function humanize(value: string): string {
  return value.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[-_]/g, ' ');
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
