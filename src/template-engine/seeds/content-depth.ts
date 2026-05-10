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
  newsArticle: ['Neu im Fruehjahr', 'Blick hinter die Kulissen', 'Terminfenster mit Mehrwert', 'Das fragen Kund:innen gerade', 'Saison-Update aus dem Team', 'Vor Ort besser geplant']
};

const DEEP_SECTION_BY_INDUSTRY: Record<IndustryKey, string> = {
  restaurant: 'restaurant.deepDives',
  hotel: 'hotel.deepDives',
  tourism: 'tourism.deepDives',
  salon: 'salon.deepDives',
  tradesman: 'tradesman.deepDives',
  consulting: 'consulting.deepDives',
  medical: 'medical.deepDives',
  fitness: 'fitness.deepDives',
  wedding: 'wedding.deepDives'
};

const DEEP_COLLECTION_BY_INDUSTRY: Record<IndustryKey, string> = {
  restaurant: 'restaurantInsight',
  hotel: 'hotelInsight',
  tourism: 'tourismInsight',
  salon: 'salonInsight',
  tradesman: 'tradesmanInsight',
  consulting: 'consultingInsight',
  medical: 'medicalInsight',
  fitness: 'fitnessInsight',
  wedding: 'weddingInsight'
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

  const idsByCollection = new Map<string, string[]>();
  for (const item of collections) {
    idsByCollection.set(item.collectionKey, [...(idsByCollection.get(item.collectionKey) ?? []), item.id]);
  }

  return {
    ...seed,
    collections,
    pages: seed.pages.map((page) => {
      const deepCollection = DEEP_COLLECTION_BY_INDUSTRY[seed.industryKey];
      const deepSection = DEEP_SECTION_BY_INDUSTRY[seed.industryKey];
      const deepIds = idsByCollection.get(deepCollection) ?? [];
      const newsIds = latestNewsIds(collections);
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
      const withDeepDive =
        page.key === 'home' || sections.some((section) => section.sectionKey === deepSection) || deepIds.length === 0
          ? sections
          : insertAfterHeader(sections, {
              id: `depth-${page.key}-deep-dive`,
              sectionKey: deepSection,
              visible: true,
              sortOrder: 0,
              data: {
                eyebrow: deepEyebrow(seed.industryKey, page.title),
                headline: deepHeadline(seed.industryKey),
                intro: deepIntro(seed.industryKey, page.title),
                items: deepIds
              }
            });
      const withNews =
        page.key !== 'home' || withDeepDive.some((section) => section.sectionKey === 'global.newsTeaser') || newsIds.length === 0
          ? withDeepDive
          : insertBeforeContact(withDeepDive, {
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

function insertAfterHeader(sections: readonly SiteSeed['pages'][number]['sections'][number][], insert: SiteSeed['pages'][number]['sections'][number]) {
  const idx = sections.findIndex((section) => section.sectionKey === 'global.pageHeader');
  const at = idx >= 0 ? idx + 1 : Math.min(1, sections.length);
  return [...sections.slice(0, at), insert, ...sections.slice(at)];
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
        description: summaryFor(collection.label, title, index)
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
  if (field.key === 'summary') return summaryFor(collection.label, title, index);
  if (field.key === 'description') {
    return `${title} ist als echtes Demo-CMS-Item gepflegt: mit Nutzen, Kontext, Ablauf und klarer Erwartung. So wirken Unterseiten nicht leer, sondern wie ein belastbarer Kundenauftritt.`;
  }
  if (field.key === 'image') return IMAGE_BY_INDUSTRY[industry][index % IMAGE_BY_INDUSTRY[industry].length];
  if (field.key === 'kicker') return ['Insider', 'Gut zu wissen', 'Ablauf', 'Empfehlung', 'Detail', 'Service'][index % 6];
  if (field.key === 'metric') return ['3 Min.', 'Premium', 'Planbar', 'Vor Ort', 'Sicher', 'Direkt'][index % 6];
  if (field.key === 'detail') return `${title} macht die Entscheidung leichter, weil Erwartung, Timing und naechster Schritt klar sind.`;
  if (field.key === 'category') return ['Update', 'Einblick', 'Ratgeber', 'Saison'][index % 4];
  if (field.key === 'publishedAt') return `2026-0${(index % 6) + 1}-15`;
  if (field.key === 'author') return 'Flamingo Redaktion';
  if (field.key === 'readTime') return `${3 + (index % 4)} Min.`;
  if (field.key === 'weekday') return ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'][index % 6];
  if (field.key === 'time') return ['08:00', '10:30', '13:00', '16:30', '18:00', '20:00'][index % 6];
  if (field.key === 'level') return ['Einsteiger', 'Alle Level', 'Fortgeschritten', 'Performance'][index % 4];
  if (field.key === 'trainer') return ['Mara', 'Noah', 'Lina', 'Ben', 'Elif', 'Tom'][index % 6];
  if (field.key === 'cta') return { label: 'Mehr erfahren', link: { type: 'page', href: collection.slugPrefix } };
  if (field.type === 'boolean') return false;
  if (field.type === 'number') return index + 1;
  return field.required ? title : '';
}

function deepEyebrow(industry: IndustryKey, pageTitle: string): string {
  return `${pageTitle} · Deep Dive`;
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
    salon: 'Farbtrends, Pflegewissen und Terminfenster, die Kund:innen vor dem Besuch wirklich helfen.',
    tradesman: 'Material, Wartung, Ablauf und regionale Projekte mit konkretem Nutzen fuer Anfragen.',
    consulting: 'Perspektiven aus Strategie, Wachstum und Umsetzung, die direkt in bessere Entscheidungen fuehren.',
    medical: 'Patientenfreundliche Updates zu Ablauf, Vorsorge, Diagnostik und Organisation.',
    fitness: 'Programme, Community-Momente und Trainingsimpulse fuer Menschen, die dranbleiben wollen.',
    wedding: 'Planungsupdates, Gaesteinfos und kleine Details, die vor dem Fest Ruhe schaffen.'
  };
  return map[industry];
}

function deepHeadline(industry: IndustryKey): { plain: string; accent: string } {
  const map: Record<IndustryKey, { plain: string; accent: string }> = {
    restaurant: { plain: 'Mehr als', accent: 'eine Karte.' },
    hotel: { plain: 'Details, die', accent: 'Aufenthalt machen.' },
    tourism: { plain: 'Gut geplant', accent: 'besser erlebt.' },
    salon: { plain: 'Beratung mit', accent: 'echtem Plan.' },
    tradesman: { plain: 'Qualität beginnt', accent: 'vor dem Termin.' },
    consulting: { plain: 'Methodik, die', accent: 'Entscheidungen trägt.' },
    medical: { plain: 'Orientierung vor', accent: 'dem Termin.' },
    fitness: { plain: 'Training, das', accent: 'dranbleiben lässt.' },
    wedding: { plain: 'Details für', accent: 'entspannte Gäste.' }
  };
  return map[industry];
}

function deepIntro(industry: IndustryKey, pageTitle: string): string {
  const map: Record<IndustryKey, string> = {
    restaurant: 'Produzenten, Pairings, Reservierungsdetails und kleine Hinweise, die aus einem Besuch einen Abend machen.',
    hotel: 'Alles, was Gäste wissen wollen, bevor sie buchen: Komfort, Timing, Services und die kleinen Extras.',
    tourism: 'Praktische Vorbereitung mit Guide-Wissen, Sicherheitsgefühl und Insider-Tipps für unterwegs.',
    salon: 'Von Beratung bis Pflege danach: klare Erwartungen, bessere Ergebnisse, weniger Unsicherheit.',
    tradesman: 'Ablauf, Material, Qualität und Notfallwege so erklärt, dass Anfragen direkt besser werden.',
    consulting: 'Playbooks, Entscheidungswege und Deliverables, damit Beratung greifbar statt abstrakt wird.',
    medical: 'Patientenfreundliche Orientierung: Vorbereitung, Diagnostik, Nachsorge und Terminlogik.',
    fitness: 'Mehr Kontext zu Start, Ziel, Community und Trainingsrhythmus, damit Probetrainings leichter fallen.',
    wedding: 'Gäste lesen hier die Details, die am Hochzeitstag Ruhe schaffen: Plan B, Shuttle, Dresscode und Timing.'
  };
  return `${pageTitle}: ${map[industry]}`;
}

function titleFor(collectionKey: string, index: number): string {
  const bank = TITLE_BANK[collectionKey] ?? [];
  return bank[index] ?? `${humanize(collectionKey)} ${index + 1}`;
}

function summaryFor(label: string, title: string, index: number): string {
  const angles = [
    'mit klarer Empfehlung, schneller Orientierung und einem starken Grund zur Anfrage',
    'als hochwertiger Detailpunkt mit konkretem Nutzen und sauberem Erwartungsmanagement',
    'für Besucher, die vergleichen, planen und direkt den nächsten Schritt machen wollen',
    'mit genug Kontext, damit die Demo wie ein echter Kundenauftritt wirkt'
  ];
  return `${title}: ${label} ${angles[index % angles.length]}.`;
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
