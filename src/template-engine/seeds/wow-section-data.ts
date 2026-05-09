import type { IndustryKey, SectionInstance, StyleKey } from '../model';

function section(id: string, sectionKey: string, sortOrder: number, data: Record<string, unknown>): SectionInstance {
  return { id, sectionKey, visible: true, sortOrder, data };
}

type TrustLogo = { name: string; logo: string; href: string };

/** Abstract marks as placeholder logos (Unsplash); partner names are demo labels. */
const TRUST_LOGO_URLS = [
  'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=220&q=72',
  'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=220&q=72',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=220&q=72',
  'https://images.unsplash.com/photo-1466637574441-795b8e58ef84?auto=format&fit=crop&w=220&q=72',
  'https://images.unsplash.com/photo-1514362549857-f7c088a4fee0?auto=format&fit=crop&w=220&q=72',
  'https://images.unsplash.com/photo-1504711434969-e33886174f5d?auto=format&fit=crop&w=220&q=72'
] as const;

function trustRow(names: readonly string[]): TrustLogo[] {
  return names.map((name, i) => ({
    name,
    logo: TRUST_LOGO_URLS[i % TRUST_LOGO_URLS.length],
    href: ''
  }));
}

const TRUST_BY_INDUSTRY: Record<IndustryKey, TrustLogo[]> = {
  restaurant: trustRow([
    'Feinschmecker Regional',
    'Slow Food Freunde',
    'Bio-Partnergastronomie',
    'Weinhandel Süd',
    'Handwerk & Genuss',
    'Stadtmarketing'
  ]),
  hotel: trustRow([
    'Preferred Partner Hotels',
    'Green Stay Initiative',
    'Spa & Wellness Verband',
    'Regionaltourismus',
    'MICE Netzwerk D-A-CH',
    'Gästebewertungen Top 1%'
  ]),
  tourism: trustRow([
    'Alpenverein Partner',
    'Nachhaltige Touren',
    'Qualitätsreisen D-A-CH',
    'Regional Guides',
    'Outdoor Safety',
    'Reisejournal'
  ]),
  salon: trustRow([
    'Color Partner Studio',
    'Care & Repair Linie',
    'Bridal Collective',
    'Clean Beauty Circle',
    'Stylist Academy',
    'Presse & Looks'
  ]),
  tradesman: trustRow([
    'Handwerkskammer Mitglied',
    'Meisterbetrieb zertifiziert',
    'Geprüfte Arbeitssicherheit',
    'Hersteller Premium',
    'Regionalbau Netzwerk',
    'Versicherungspartner'
  ]),
  consulting: trustRow([
    'ISO 27001 Prozesse',
    'Startup Hub Partner',
    'Corporate Venture Board',
    'EU Förderprojekte',
    'Research Alliance',
    'Executive Network'
  ]),
  medical: trustRow([
    'Kassenärztliche Vereinigung',
    'Qualitätsmanagement QM',
    'Fachgesellschaft',
    'Digitale Terminplattform',
    'Patientenfeedback Top',
    'Fortbildungszentrum'
  ]),
  fitness: trustRow([
    'Programm Partner',
    'Athletic Performance Lab',
    'Community Challenges',
    'Ernährung & Coaching',
    'ZPP-anerkannt',
    'Studio Awards'
  ]),
  wedding: trustRow([
    'Bridal Guide Featured',
    'Location Partner Weingut',
    'Catering Collective',
    'Fotografie Guild',
    'RSVP Tech Partner',
    'Hochzeitsredaktion'
  ])
};

const TRUST_HEADLINE_BY_INDUSTRY: Record<
  IndustryKey,
  { eyebrow: string; headline: { plain: string; accent: string } }
> = {
  restaurant: {
    eyebrow: 'Auszeichnungen & Partner',
    headline: { plain: 'Vertrauen', accent: 'auf dem Teller.' }
  },
  hotel: {
    eyebrow: 'Netzwerk & Qualität',
    headline: { plain: 'Gäste', accent: 'an erster Stelle.' }
  },
  tourism: {
    eyebrow: 'Verbände & Medien',
    headline: { plain: 'Sicher unterwegs', accent: 'mit Profis.' }
  },
  salon: {
    eyebrow: 'Marken & Kooperationen',
    headline: { plain: 'Looks', accent: 'mit Rückenwind.' }
  },
  tradesman: {
    eyebrow: 'Zertifikate & Partner',
    headline: { plain: 'Qualität', accent: 'die man sieht.' }
  },
  consulting: {
    eyebrow: 'Ökosystem',
    headline: { plain: 'Verlässlich', accent: 'im Boardroom.' }
  },
  medical: {
    eyebrow: 'Qualität & Vernetzung',
    headline: { plain: 'Medizin', accent: 'mit Rückhalt.' }
  },
  fitness: {
    eyebrow: 'Programme & Partner',
    headline: { plain: 'Power', accent: 'mit Standards.' }
  },
  wedding: {
    eyebrow: 'Dienstleister & Medien',
    headline: { plain: 'Euer Tag', accent: 'im Rampenlicht.' }
  }
};

const STATS_BY_INDUSTRY: Record<
  IndustryKey,
  { eyebrow: string; headline: { plain: string; accent: string }; items: { value: string; label: string; hint: string }[] }
> = {
  restaurant: {
    eyebrow: 'Zahlen, die schmecken',
    headline: { plain: 'Qualität', accent: 'in jeder Portion.' },
    items: [
      { value: '4.9', label: 'Google', hint: 'Ø Bewertung' },
      { value: '28', label: 'Jahre', hint: 'Familie & Team' },
      { value: '120+', label: 'Weine', hint: 'Karte & Keller' },
      { value: '15', label: 'Min.', hint: 'bis zur Altstadt' }
    ]
  },
  hotel: {
    eyebrow: 'Aufenthalt in Zahlen',
    headline: { plain: 'Raum zum', accent: 'Durchatmen.' },
    items: [
      { value: '48', label: 'Zimmer', hint: 'Suiten & Deluxe' },
      { value: '98%', label: 'Weiterempfehlung', hint: 'Gäste-Feedback' },
      { value: '1.200m²', label: 'Spa', hint: 'Pools & Saunen' },
      { value: '0', label: 'Hektik', hint: 'versprochen' }
    ]
  },
  tourism: {
    eyebrow: 'Erlebnis-Kennzahlen',
    headline: { plain: 'Touren mit', accent: 'Herz.' },
    items: [
      { value: '120+', label: 'Touren', hint: 'pro Saison' },
      { value: '4.8', label: 'Sterne', hint: 'Ø Bewertung' },
      { value: '12', label: 'Guides', hint: 'lokal & mehrsprachig' },
      { value: '24h', label: 'Support', hint: 'Notfall-Hotline' }
    ]
  },
  salon: {
    eyebrow: 'Studio in Zahlen',
    headline: { plain: 'Looks mit', accent: 'Liebe.' },
    items: [
      { value: '15+', label: 'Jahre', hint: 'Erfahrung' },
      { value: '8', label: 'Stühle', hint: 'gleichzeitig' },
      { value: '200+', label: 'Looks', hint: 'pro Jahr' },
      { value: '5★', label: 'Service', hint: 'Durchschnitt' }
    ]
  },
  tradesman: {
    eyebrow: 'Handwerk, das zählt',
    headline: { plain: 'Zuverlässig', accent: 'vor Ort.' },
    items: [
      { value: '500+', label: 'Projekte', hint: 'regional' },
      { value: '25', label: 'Jahre', hint: 'Meisterbetrieb' },
      { value: '24h', label: 'Notdienst', hint: 'für Partner' },
      { value: '100%', label: 'Garantie', hint: 'auf Arbeit' }
    ]
  },
  consulting: {
    eyebrow: 'Wirkung messbar',
    headline: { plain: 'Strategie mit', accent: 'Substanz.' },
    items: [
      { value: '€180M+', label: 'Transaktionen', hint: 'begleitet' },
      { value: '40+', label: 'Expert:innen', hint: 'im Netzwerk' },
      { value: '12', label: 'Wochen', hint: 'bis MVP' },
      { value: '3×', label: 'ROI', hint: 'Ø Steigerung' }
    ]
  },
  medical: {
    eyebrow: 'Praxis-Kennzahlen',
    headline: { plain: 'Medizin mit', accent: 'Zeit.' },
    items: [
      { value: '25+', label: 'Jahre', hint: 'Erfahrung' },
      { value: '12k', label: 'Patient:innen', hint: 'pro Jahr' },
      { value: '< 48h', label: 'Termin', hint: 'Ø Wartezeit' },
      { value: '4.9', label: 'Feedback', hint: 'Ø Note' }
    ]
  },
  fitness: {
    eyebrow: 'Studio Power',
    headline: { plain: 'Trainieren mit', accent: 'Drive.' },
    items: [
      { value: '80+', label: 'Kurse', hint: 'pro Woche' },
      { value: '18', label: 'Trainer:innen', hint: 'zertifiziert' },
      { value: '1.200m²', label: 'Fläche', hint: 'Training & Spa' },
      { value: '7', label: 'Tage', hint: 'geöffnet' }
    ]
  },
  wedding: {
    eyebrow: 'Euer Tag',
    headline: { plain: 'Momente, die', accent: 'bleiben.' },
    items: [
      { value: '120', label: 'Gäste', hint: 'Kapazität' },
      { value: '1', label: 'Love-Story', hint: 'einzigartig' },
      { value: '48h', label: 'RSVP', hint: 'Antwortfenster' },
      { value: '∞', label: 'Freude', hint: 'garantiert' }
    ]
  }
};

function adaptStatsForStyle(
  block: { eyebrow: string; headline: { plain: string; accent: string }; items: { value: string; label: string; hint: string }[] },
  styleKey: StyleKey
): { eyebrow: string; headline: { plain: string; accent: string }; items: { value: string; label: string; hint: string }[] } {
  if (styleKey === 'classic') return block;
  if (styleKey === 'modern') {
    return {
      eyebrow: `${block.eyebrow} · KPI-fokussiert`,
      headline: block.headline,
      items: block.items
    };
  }
  return {
    eyebrow: block.eyebrow,
    headline: {
      plain: block.headline.plain,
      accent: block.headline.accent.endsWith('.')
        ? `${block.headline.accent.slice(0, -1)}!`
        : `${block.headline.accent}!`
    },
    items: block.items
  };
}

function adaptTrustHeadlineForStyle(
  block: { eyebrow: string; headline: { plain: string; accent: string } },
  styleKey: StyleKey
): { eyebrow: string; headline: { plain: string; accent: string } } {
  if (styleKey === 'classic') return block;
  if (styleKey === 'modern') {
    return {
      eyebrow: block.eyebrow,
      headline: { plain: block.headline.plain, accent: `${block.headline.accent.replace(/\.$/, '')} · sachlich` }
    };
  }
  return {
    eyebrow: block.eyebrow,
    headline: { plain: block.headline.plain, accent: `${block.headline.accent.replace(/\.$/, '')} — jetzt.` }
  };
}

function adaptBentoForStyle(
  bento: { eyebrow: string; headline: { plain: string; accent: string }; items: Record<string, string>[] },
  styleKey: StyleKey
): { eyebrow: string; headline: { plain: string; accent: string }; items: Record<string, string>[] } {
  if (styleKey === 'classic') return bento;
  if (styleKey === 'modern') {
    return {
      eyebrow: bento.eyebrow,
      headline: { plain: bento.headline.plain, accent: `${bento.headline.accent.replace(/\.$/, '')} · modular` },
      items: bento.items
    };
  }
  return {
    eyebrow: bento.eyebrow,
    headline: {
      plain: bento.headline.plain,
      accent: bento.headline.accent.endsWith('.')
        ? `${bento.headline.accent.slice(0, -1)}!`
        : `${bento.headline.accent}!`
    },
    items: bento.items
  };
}

const BENTO_BY_INDUSTRY: Record<IndustryKey, { eyebrow: string; headline: { plain: string; accent: string }; items: Record<string, string>[] }> = {
  restaurant: {
    eyebrow: 'Warum wir',
    headline: { plain: 'Küche, die', accent: 'Geschichten erzählt.' },
    items: [
      {
        kicker: 'Handwerk',
        title: 'Pasta & Pizza aus eigener Manufaktur',
        body: 'Teigruhe 48h, Ofen aus Neapel, Tomaten aus Kampanien — und jeden Tag frische Kräuter vom Markt.',
        image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80',
        layoutSpan: '2'
      },
      {
        kicker: 'Wein',
        title: 'Karte mit Charakter',
        body: 'Naturweine, Klassiker und Geheimtipps unserer Sommeliers.',
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
        layoutSpan: '1'
      },
      {
        kicker: 'Gäste',
        title: 'Tischkultur',
        body: 'Langer Tisch, Kerzenlicht, Musik leise — Abende, die nicht enden wollen.',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
        layoutSpan: '1'
      }
    ]
  },
  hotel: {
    eyebrow: 'Aufenthalt',
    headline: { plain: 'Design trifft', accent: 'Natur.' },
    items: [
      {
        kicker: 'Zimmer',
        title: 'Räume mit Aussicht',
        body: 'Große Fenster, regionale Materialien und Ruhe, die man spürt.',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        layoutSpan: '2'
      },
      {
        kicker: 'Spa',
        title: 'Wellness',
        body: 'Pools, Saunen und Behandlungen mit Kräutern aus dem Tal.',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
        layoutSpan: '1'
      },
      {
        kicker: 'Kulinarik',
        title: 'Vom Tal auf den Teller',
        body: 'Frühstück bis Fine Dining — alles saisonal.',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80',
        layoutSpan: '1'
      }
    ]
  },
  tourism: {
    eyebrow: 'Abenteuer',
    headline: { plain: 'Touren mit', accent: 'Puls.' },
    items: [
      {
        kicker: 'Guides',
        title: 'Lokale Expertise',
        body: 'Wir kennen jeden Pfad, jedes Wetterfenster, jeden Kaffee danach.',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
        layoutSpan: '2'
      },
      {
        kicker: 'Sicher',
        title: 'Ausrüstung inklusive',
        body: 'Premium-Material, geprüft vor jeder Tour.',
        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
        layoutSpan: '1'
      },
      {
        kicker: 'Gruppe',
        title: 'Klein & persönlich',
        body: 'Max. 12 Personen — damit niemand untergeht.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
        layoutSpan: '1'
      }
    ]
  },
  salon: {
    eyebrow: 'Studio',
    headline: { plain: 'Looks mit', accent: 'Präzision.' },
    items: [
      {
        kicker: 'Color',
        title: 'Signature-Farben',
        body: 'Balayage, Glossing und Pflege-Rituale für strahlendes Haar.',
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
        layoutSpan: '2'
      },
      {
        kicker: 'Team',
        title: 'Stylist:innen',
        body: 'Fortbildung in Paris & London — Trends, die zu dir passen.',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
        layoutSpan: '1'
      },
      {
        kicker: 'Care',
        title: 'Rituale',
        body: 'Kopfhaut-Analyse, Massage, Finish mit Hitze-Schutz.',
        image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
        layoutSpan: '1'
      }
    ]
  },
  tradesman: {
    eyebrow: 'Qualität',
    headline: { plain: 'Handwerk, das', accent: 'hält.' },
    items: [
      {
        kicker: 'Planung',
        title: 'Transparent & termintreu',
        body: 'Digitale Baustellen-Updates und klare Kostenvoranschläge.',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
        layoutSpan: '2'
      },
      {
        kicker: 'Team',
        title: 'Meisterbetrieb',
        body: 'Ausbildung, Zertifikate, Sicherheit an erster Stelle.',
        image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
        layoutSpan: '1'
      },
      {
        kicker: 'Region',
        title: 'Nah bei dir',
        body: 'Kurze Wege, schnelle Einsätze, faire Preise.',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
        layoutSpan: '1'
      }
    ]
  },
  consulting: {
    eyebrow: 'Impact',
    headline: { plain: 'Strategie, die', accent: 'skaliert.' },
    items: [
      {
        kicker: 'Cases',
        title: 'Messbare Ergebnisse',
        body: 'Von Turnaround bis Wachstum — wir liefern KPIs, keine Folien-Sammlung.',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
        layoutSpan: '2'
      },
      {
        kicker: 'Team',
        title: 'Senior Expertise',
        body: 'Partner-Level ab Tag 1 — keine Junior-Lückenfüller.',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
        layoutSpan: '1'
      },
      {
        kicker: 'Prozess',
        title: 'Klar & iterativ',
        body: 'Design Sprints, OKRs, wöchentliche Demos.',
        image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
        layoutSpan: '1'
      }
    ]
  },
  medical: {
    eyebrow: 'Vertrauen',
    headline: { plain: 'Medizin mit', accent: 'Menschlichkeit.' },
    items: [
      {
        kicker: 'Team',
        title: 'Fachärztliche Leitung',
        body: 'Interdisziplinär, forschungsnah, auf Augenhöhe.',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
        layoutSpan: '2'
      },
      {
        kicker: 'Termin',
        title: 'Schnelle Wege',
        body: 'Online-Buchung, Erinnerungen, kurze Wartezeiten.',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
        layoutSpan: '1'
      },
      {
        kicker: 'Praxis',
        title: 'Moderne Ausstattung',
        body: 'Diagnostik und Therapie unter einem Dach.',
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
        layoutSpan: '1'
      }
    ]
  },
  fitness: {
    eyebrow: 'Energy',
    headline: { plain: 'Training mit', accent: 'Flow.' },
    items: [
      {
        kicker: 'Classes',
        title: 'Vielfalt pur',
        body: 'HIIT, Yoga, Cycle, Mobility — jede Woche neue Slots.',
        image: 'https://images.unsplash.com/photo-1534438327276-14e6700d112c?auto=format&fit=crop&w=1200&q=80',
        layoutSpan: '2'
      },
      {
        kicker: 'Trainer',
        title: 'Coaching',
        body: 'Individuelle Pläne, Form-Checks, Ernährungstipps.',
        image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80',
        layoutSpan: '1'
      },
      {
        kicker: 'Community',
        title: 'Zusammen stärker',
        body: 'Challenges, Events, Social Wall.',
        image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80',
        layoutSpan: '1'
      }
    ]
  },
  wedding: {
    eyebrow: 'Details',
    headline: { plain: 'Liebe im', accent: 'Rahmen.' },
    items: [
      {
        kicker: 'Location',
        title: 'Weingut & Licht',
        body: 'Sonnenuntergang über den Reben — perfekt für Fotos und Dinner.',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
        layoutSpan: '2'
      },
      {
        kicker: 'Ablauf',
        title: 'Entspannt feiern',
        body: 'Timeline mit Puffer — damit ihr wirklich dabei seid.',
        image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
        layoutSpan: '1'
      },
      {
        kicker: 'Gäste',
        title: 'RSVP digital',
        body: 'Allergien, Kinder, Shuttle — alles in einem Formular.',
        image: 'https://images.unsplash.com/photo-1522673607260-14d1f34b1a31?auto=format&fit=crop&w=800&q=80',
        layoutSpan: '1'
      }
    ]
  }
};

/** Optional context for Unterseiten / Detailrouten — eigene Section-IDs + leichte Text-Anreicherung. */
export type WowPageContext = {
  pageKey: string;
  pageTitle?: string;
};

export function buildWowSectionInstances(
  industryKey: IndustryKey,
  styleKey: StyleKey,
  page?: WowPageContext
): SectionInstance[] {
  const id = page !== undefined ? `wow-${industryKey}-${styleKey}-${page.pageKey}` : `wow-${industryKey}-${styleKey}`;

  const statsSource = STATS_BY_INDUSTRY[industryKey];
  const statsBase =
    page?.pageTitle !== undefined && page.pageTitle.length > 0
      ? { ...statsSource, eyebrow: `${statsSource.eyebrow} · ${page.pageTitle}` }
      : statsSource;
  const stats = adaptStatsForStyle(statsBase, styleKey);

  const trustSource = TRUST_HEADLINE_BY_INDUSTRY[industryKey];
  const trustBase =
    page?.pageTitle !== undefined && page.pageTitle.length > 0
      ? { ...trustSource, eyebrow: `${trustSource.eyebrow} · ${page.pageTitle}` }
      : trustSource;
  const trustHead = adaptTrustHeadlineForStyle(trustBase, styleKey);

  const bentoSource = BENTO_BY_INDUSTRY[industryKey];
  const bentoBase =
    page?.pageTitle !== undefined && page.pageTitle.length > 0
      ? { ...bentoSource, eyebrow: `${bentoSource.eyebrow} · ${page.pageTitle}` }
      : bentoSource;
  const bento = adaptBentoForStyle(bentoBase, styleKey);

  return [
    section(`${id}-stats`, 'global.statsBand', 0, {
      eyebrow: stats.eyebrow,
      headline: stats.headline,
      items: stats.items
    }),
    section(`${id}-trust`, 'global.trustLogos', 0, {
      eyebrow: trustHead.eyebrow,
      headline: trustHead.headline,
      items: TRUST_BY_INDUSTRY[industryKey]
    }),
    section(`${id}-bento`, 'global.bentoHighlights', 0, {
      eyebrow: bento.eyebrow,
      headline: bento.headline,
      items: bento.items
    })
  ];
}
