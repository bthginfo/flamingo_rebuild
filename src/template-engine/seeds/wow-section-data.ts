import type { IndustryKey, SectionInstance, StyleKey } from '../model';

function section(id: string, sectionKey: string, sortOrder: number, data: Record<string, unknown>): SectionInstance {
  return { id, sectionKey, visible: true, sortOrder, data };
}

type TrustLogo = { name: string; logo: string; href: string };

/** Themed thumbnail URLs per industry (no random food shots on hotels, etc.). */
const TRUST_BY_INDUSTRY: Record<IndustryKey, TrustLogo[]> = {
  restaurant: [
    { name: 'Feinschmecker Regional', logo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Slow Food Freunde', logo: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Bio-Partnergastronomie', logo: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Weinhandel Süd', logo: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Handwerk & Genuss', logo: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Stadtmarketing', logo: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=220&q=72', href: '' }
  ],
  hotel: [
    { name: 'Preferred Partner Hotels', logo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Green Stay Initiative', logo: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Spa & Wellness Verband', logo: 'https://images.unsplash.com/photo-1544161515-4ab6b6e49453?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Regionaltourismus', logo: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'MICE Netzwerk D-A-CH', logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Gästebewertungen Top 1%', logo: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=220&q=72', href: '' }
  ],
  tourism: [
    { name: 'Alpenverein Partner', logo: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Nachhaltige Touren', logo: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Qualitätsreisen D-A-CH', logo: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Regional Guides', logo: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Outdoor Safety', logo: 'https://images.unsplash.com/photo-1533240332313-74db2b1c0e20?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Reisejournal', logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=220&q=72', href: '' }
  ],
  salon: [
    { name: 'Color Partner Studio', logo: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Care & Repair Linie', logo: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Bridal Collective', logo: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Clean Beauty Circle', logo: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Stylist Academy', logo: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Presse & Looks', logo: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=220&q=72', href: '' }
  ],
  tradesman: [
    { name: 'Handwerkskammer Mitglied', logo: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Meisterbetrieb zertifiziert', logo: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Geprüfte Arbeitssicherheit', logo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Hersteller Premium', logo: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Regionalbau Netzwerk', logo: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Versicherungspartner', logo: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=220&q=72', href: '' }
  ],
  consulting: [
    { name: 'ISO 27001 Prozesse', logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Startup Hub Partner', logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Corporate Venture Board', logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'EU Förderprojekte', logo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Research Alliance', logo: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Executive Network', logo: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=220&q=72', href: '' }
  ],
  medical: [
    { name: 'Kassenärztliche Vereinigung', logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Qualitätsmanagement QM', logo: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Fachgesellschaft', logo: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Digitale Terminplattform', logo: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Patientenfeedback Top', logo: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Fortbildungszentrum', logo: 'https://images.unsplash.com/photo-1584432810601-6d7a340be29c?auto=format&fit=crop&w=220&q=72', href: '' }
  ],
  fitness: [
    { name: 'Programm Partner', logo: 'https://images.unsplash.com/photo-1534438327276-14e6700d112c?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Athletic Performance Lab', logo: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Community Challenges', logo: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Ernährung & Coaching', logo: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'ZPP-anerkannt', logo: 'https://images.unsplash.com/photo-1593079831268-3381b0db04a5?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Studio Awards', logo: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=220&q=72', href: '' }
  ],
  wedding: [
    { name: 'Bridal Guide Featured', logo: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Location Partner Weingut', logo: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Catering Collective', logo: 'https://images.unsplash.com/photo-1555244163-436a6e0c0bb7?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Fotografie Guild', logo: 'https://images.unsplash.com/photo-1606800052052-a08c30f87cd6?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'RSVP Tech Partner', logo: 'https://images.unsplash.com/photo-1522673607260-14d1f34b1a31?auto=format&fit=crop&w=220&q=72', href: '' },
    { name: 'Hochzeitsredaktion', logo: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=220&q=72', href: '' }
  ]
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
    eyebrow: 'Was unsere Gaeste schaetzen',
    headline: { plain: 'Sicher geplant,', accent: 'intensiv erlebt.' },
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
      eyebrow: block.eyebrow,
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
      headline: block.headline
    };
  }
  return {
    eyebrow: block.eyebrow,
    headline: block.headline
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
      headline: bento.headline,
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
        body: 'Von Turnaround bis Wachstum — wir liefern messbare Wirkung, keine reine Folien-Sammlung.',
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

function withPageEyebrow(eyebrow: string, ctx?: WowPageContext): string {
  if (ctx?.pageTitle && ctx.pageTitle.length > 0) return `${eyebrow} · ${ctx.pageTitle}`;
  return eyebrow;
}

const QUOTE_PACK: Record<IndustryKey, { quote: string; name: string; role: string }[]> = {
  restaurant: [
    { quote: '„Endlich eine Website, die genauso warm wirkt wie unser Lokal.“', name: 'Gästefeedback', role: 'Google Reviews' },
    { quote: '„Reservierungen laufen spürbar smoother — ohne extra Tool-Chaos.“', name: 'Service', role: 'Operations' },
    { quote: '„Die Bildsprache trifft unsere Küche auf den Punkt.“', name: 'Team', role: 'Service' }
  ],
  hotel: [
    { quote: '„Buchungsanfragen kommen jetzt gebündelt und hochwertig.“', name: 'Front Office', role: 'Reservierung' },
    { quote: '„Unsere Gäste finden Spa & Zimmer auf einen Blick.“', name: 'Wellness', role: 'Marketing' },
    { quote: '„Design fühlt sich luxuriös an, bleibt aber schnell.“', name: 'GM', role: 'Leadership' }
  ],
  tourism: [
    { quote: '„Touren wirken professioneller — Vertrauen steigt vor der Buchung.“', name: 'Guide Team', role: 'Outdoor' },
    { quote: '„Wir erzählen unsere Geschichte endlich visuell stark.“', name: 'Founder', role: 'Brand' },
    { quote: '„Mobile Nutzung ist endlich first-class.“', name: 'Ops', role: 'Logistik' }
  ],
  salon: [
    { quote: '„Unsere Beratung beginnt jetzt schon vor dem Termin.“', name: 'Salon Lead', role: 'Styling' },
    { quote: '„Looks wirken hochwertig — wie im Editorial.“', name: 'Color', role: 'Creative' },
    { quote: '„Termin-CTA ist klar, ohne Druck.“', name: 'Owner', role: 'Studio' }
  ],
  tradesman: [
    { quote: '„Anfragen sind besser qualifiziert — weniger Leerlauf.“', name: 'Meister', role: 'Betrieb' },
    { quote: '„Referenzen wirken jetzt wie ein echtes Portfolio.“', name: 'Projekt', role: 'Bau' },
    { quote: '„Vertrauen auf der Startseite — sofort spürbar.“', name: 'Inhaber', role: 'Service' }
  ],
  consulting: [
    { quote: '„Cases wirken seriös, ohne steif zu werden.“', name: 'Partner', role: 'Strategy' },
    { quote: '„Unsere Expertise liest man in Sekunden.“', name: 'Principal', role: 'Advisory' },
    { quote: '„Perfekt für Executive First Impressions.“', name: 'BD', role: 'Growth' }
  ],
  medical: [
    { quote: '„Patient:innen finden Leistungen und Wege klarer.“', name: 'Praxismanager', role: 'Admin' },
    { quote: '„Vertrauen entsteht durch Ruhe und Struktur.“', name: 'Ärztin', role: 'Fachbereich' },
    { quote: '„Terminwege sind endlich verständlich erklärt.“', name: 'Team', role: 'Care' }
  ],
  fitness: [
    { quote: '„Energy, ohne zu schreien — genau unsere Marke.“', name: 'Head Coach', role: 'Training' },
    { quote: '„Kurse und Trainer sind endlich im gleichen Look.“', name: 'Studio', role: 'Brand' },
    { quote: '„Probetraining-CTA performt spürbar besser.“', name: 'Sales', role: 'Membership' }
  ],
  wedding: [
    { quote: '„Unsere Gäste haben alles an einem Ort — pure Freude.“', name: 'Brautpaar', role: 'Feedback' },
    { quote: '„RSVP und Story fühlen sich premium an.“', name: 'Planner', role: 'Day-of' },
    { quote: '„Fotos und Typografie — wie aus dem Magazin.“', name: 'Foto', role: 'Creative' }
  ]
};

const QUOTE_MARQUEE_HEADLINE_BY_INDUSTRY: Record<IndustryKey, { plain: string; accent: string }> = {
  restaurant: { plain: 'Gäste', accent: 'sprechen Klartext.' },
  hotel: { plain: 'Aufenthalte', accent: 'die überzeugen.' },
  tourism: { plain: 'Touren', accent: 'die Vertrauen schaffen.' },
  salon: { plain: 'Looks', accent: 'mit Rückenwind.' },
  tradesman: { plain: 'Projekte', accent: 'die zählen.' },
  consulting: { plain: 'Stimmen', accent: 'aus dem Boardroom.' },
  medical: { plain: 'Vertrauen', accent: 'im Alltag.' },
  fitness: { plain: 'Community', accent: 'die motiviert.' },
  wedding: { plain: 'Momente', accent: 'die bleiben.' }
};

const PREMIUM_MEDIA_CTAS_BY_INDUSTRY: Record<IndustryKey, { primary: string; secondary: string }> = {
  restaurant: { primary: 'Tisch reservieren', secondary: 'Menü ansehen' },
  hotel: { primary: 'Zimmer anfragen', secondary: 'Angebot sichern' },
  tourism: { primary: 'Tour wählen', secondary: 'Frage stellen' },
  salon: { primary: 'Termin buchen', secondary: 'Leistungen' },
  tradesman: { primary: 'Anfrage senden', secondary: 'Referenzen' },
  consulting: { primary: 'Erstgespräch', secondary: 'Cases lesen' },
  medical: { primary: 'Termin', secondary: 'Leistungen' },
  fitness: { primary: 'Probetraining', secondary: 'Kurse' },
  wedding: { primary: 'RSVP', secondary: 'Ablauf' }
};

const ICON_HIGHLIGHT_INTRO_BY_INDUSTRY: Record<IndustryKey, string> = {
  restaurant: 'Kurz und einladend — was Gäste bei euch sofort spüren.',
  hotel: 'Vom ersten Klick bis zum Check-out: was Aufenthalte leichter macht.',
  tourism: 'Orientierung, Sicherheit, Vorfreude — bevor die Tour startet.',
  salon: 'Beratung, Handwerk, Pflege — was euer Studio von anderen unterscheidet.',
  tradesman: 'Anfrage, Plan, Ausführung — transparent und termintreu.',
  consulting: 'Klarheit, Tempo, messbare Wirkung — ohne Folien-Theater.',
  medical: 'Erreichbarkeit, Diagnostik, Begleitung — ruhig und verständlich.',
  fitness: 'Einstieg, Plan, Community — Training, das motiviert statt zu stressen.',
  wedding: 'Planung, Details, großer Tag — damit ihr wirklich feiern könnt.'
};

type GuestTimelinePack = {
  eyebrow: string;
  headline: { plain: string; accent: string };
  steps: { label: string; title: string; body: string }[];
};

/** Guest- / patient-facing journey copy (not internal agency process). */
const GUEST_JOURNEY_TIMELINE: Record<IndustryKey, GuestTimelinePack> = {
  restaurant: {
    eyebrow: 'Dein Besuch',
    headline: { plain: 'Vom ersten', accent: 'Happen bis zum Digestif.' },
    steps: [
      { label: '01', title: 'Reservieren', body: 'Tisch, Allergien, Anlass — wir bereiten alles vor.' },
      { label: '02', title: 'Willkommen', body: 'Begleitung, erste Empfehlungen, Tisch im richtigen Rhythmus.' },
      { label: '03', title: 'Genießen', body: 'Gänge, Wein, Service — ohne Hetzen.' },
      { label: '04', title: 'Wiedersehen', body: 'Take-away, nächster Termin, Gästefeedback — bis bald.' }
    ]
  },
  hotel: {
    eyebrow: 'Aufenthalt',
    headline: { plain: 'Vom Klick', accent: 'bis zur stillen Minute.' },
    steps: [
      { label: '01', title: 'Buchen', body: 'Zimmertyp, Extras, Anreise — alles digital erfasst.' },
      { label: '02', title: 'Ankommen', body: 'Check-in, Gepäck, erste Orientierung im Haus.' },
      { label: '03', title: 'Erleben', body: 'Spa, Kulinarik, Concierge — euer Tempo zählt.' },
      { label: '04', title: 'Gehen', body: 'Late check-out, Transfer, herzlicher Abschied.' }
    ]
  },
  tourism: {
    eyebrow: 'Tour',
    headline: { plain: 'Vom Plan', accent: 'zum Gipfelmoment.' },
    steps: [
      { label: '01', title: 'Inspiration', body: 'Schwierigkeit, Dauer, Saison — wir finden die passende Route.' },
      { label: '02', title: 'Buchung', body: 'Ausrüstung, Treffpunkt, Wetterfenster — alles fix.' },
      { label: '03', title: 'Guiding', body: 'Sicherheit, Pausen, Storytelling vor Ort.' },
      { label: '04', title: 'Nachklang', body: 'Fotos, Tipps fürs Tal, nächste Abenteuer.' }
    ]
  },
  salon: {
    eyebrow: 'Salon-Besuch',
    headline: { plain: 'Vom Beratungs', accent: 'gespräch zum Finish.' },
    steps: [
      { label: '01', title: 'Analyse', body: 'Struktur, Wunschbild, Pflege zu Hause.' },
      { label: '02', title: 'Color & Cut', body: 'Präzises Handwerk, entspannte Pausen.' },
      { label: '03', title: 'Finish', body: 'Styling, Produkte, Pflege-Tipps für jeden Tag.' },
      { label: '04', title: 'Follow-up', body: 'Nachtermin, Refresh, Treue-Vorteile.' }
    ]
  },
  tradesman: {
    eyebrow: 'Projekt',
    headline: { plain: 'Vom Erst', accent: 'gespräch bis zur Abnahme.' },
    steps: [
      { label: '01', title: 'Anfrage', body: 'Fotos, Maße, Wunschtermin — wir melden uns schnell.' },
      { label: '02', title: 'Vor-Ort', body: 'Aufmaß, Varianten, transparentes Angebot.' },
      { label: '03', title: 'Umsetzung', body: 'Termintreue, Sauberkeit, Zwischenstände.' },
      { label: '04', title: 'Übergabe', body: 'Abnahme, Garantie, Dokumentation.' }
    ]
  },
  consulting: {
    eyebrow: 'Mandat',
    headline: { plain: 'Vom Briefing', accent: 'zur messbaren Wirkung.' },
    steps: [
      { label: '01', title: 'Diagnose', body: 'Markt, Kennzahlen, Organisation — klare Ausgangslage.' },
      { label: '02', title: 'Roadmap', body: 'Prioritäten, Quick Wins, Verantwortlichkeiten.' },
      { label: '03', title: 'Umsetzung', body: 'Sprints, Steuerung, regelmäßige Entscheidungszyklen.' },
      { label: '04', title: 'Impact', body: 'Wirkungs-Review, Skalierung, Übergabe ins Team.' }
    ]
  },
  medical: {
    eyebrow: 'Patientenweg',
    headline: { plain: 'Vom Erstkontakt', accent: 'bis zur Nachsorge.' },
    steps: [
      { label: '01', title: 'Kontakt', body: 'Online, Telefon oder Empfang — wir koordinieren Termine.' },
      { label: '02', title: 'Diagnostik', body: 'Befunde verständlich, Zeit für Fragen.' },
      { label: '03', title: 'Therapie', body: 'Behandlung, Medikation, klare nächste Schritte.' },
      { label: '04', title: 'Nachsorge', body: 'Kontrollen, Prävention, langfristige Betreuung.' }
    ]
  },
  fitness: {
    eyebrow: 'Studio-Flow',
    headline: { plain: 'Vom Probetraining', accent: 'zur Routine.' },
    steps: [
      { label: '01', title: 'Onboarding', body: 'Ziele, Level, Gesundheitscheck — sicher starten.' },
      { label: '02', title: 'Plan', body: 'Kurse, Personal, Ernährung — alles abgestimmt.' },
      { label: '03', title: 'Trainieren', body: 'Coaching, Technik, Fortschritt sichtbar machen.' },
      { label: '04', title: 'Bleiben', body: 'Community, Challenges, nächste Meilensteine.' }
    ]
  },
  wedding: {
    eyebrow: 'Euer Tag',
    headline: { plain: 'Von Save-the-Date', accent: 'bis zum letzten Tanz.' },
    steps: [
      { label: '01', title: 'Planung', body: 'Timeline, Budget, Dienstleister — strukturiert und ruhig.' },
      { label: '02', title: 'Details', body: 'RSVP, Menü, Shuttle — alles an einem Ort.' },
      { label: '03', title: 'Feiern', body: 'Ablauf mit Puffer — ihr seid Gäste auf eurer Party.' },
      { label: '04', title: 'Memories', body: 'Fotos, Dank, nächste Meilensteine — der Nachhall zählt.' }
    ]
  }
};

function buildPremiumWowSections(
  idBase: string,
  industryKey: IndustryKey,
  styleKey: StyleKey,
  ctx: WowPageContext | undefined,
  mode: 'full' | 'compact'
): SectionInstance[] {
  const statsBlock = STATS_BY_INDUSTRY[industryKey];
  const iconItems = statsBlock.items.slice(0, 4).map((it) => ({
    icon: it.value,
    title: it.label,
    body: it.hint,
    cta: { label: '', link: { type: 'page' as const, pageKey: 'home', href: '/' } }
  }));

  const iconHead = adaptTrustHeadlineForStyle(
    {
      eyebrow: withPageEyebrow('Signature', ctx),
      headline: statsBlock.headline
    },
    styleKey
  );

  const guestJourney = GUEST_JOURNEY_TIMELINE[industryKey];

  const timelineHead = adaptTrustHeadlineForStyle(
    {
      eyebrow: withPageEyebrow(guestJourney.eyebrow, ctx),
      headline: guestJourney.headline
    },
    styleKey
  );

  const bentoHero = BENTO_BY_INDUSTRY[industryKey].items[0];
  const heroImg = String(bentoHero?.image ?? '');
  const mediaHead = adaptTrustHeadlineForStyle(
    {
      eyebrow: withPageEyebrow('Spotlight', ctx),
      headline: BENTO_BY_INDUSTRY[industryKey].headline
    },
    styleKey
  );
  const mood = styleKey === 'bold' ? 'stark' : 'soft';
  const mediaCtas = PREMIUM_MEDIA_CTAS_BY_INDUSTRY[industryKey];

  const mediaSection = section(`${idBase}-media`, 'global.mediaSpotlight', 0, {
    eyebrow: mediaHead.eyebrow,
    headline: mediaHead.headline,
    subline: String(bentoHero?.body ?? ''),
    image: heroImg,
    mood,
    primaryCta: { label: mediaCtas.primary, link: { type: 'page' as const, pageKey: 'home', href: '/' } },
    secondaryCta: { label: mediaCtas.secondary, link: { type: 'page' as const, pageKey: 'home', href: '/' } }
  });

  const quoteHead = adaptTrustHeadlineForStyle(
    {
      eyebrow: withPageEyebrow('Stimmen', ctx),
      headline: QUOTE_MARQUEE_HEADLINE_BY_INDUSTRY[industryKey]
    },
    styleKey
  );

  const quotes = [...QUOTE_PACK[industryKey], ...[...QUOTE_PACK[industryKey]].reverse()];

  const iconSection = section(`${idBase}-icons`, 'global.iconHighlights', 0, {
    eyebrow: iconHead.eyebrow,
    headline: iconHead.headline,
    intro: ICON_HIGHLIGHT_INTRO_BY_INDUSTRY[industryKey],
    items: iconItems
  });

  const timelineSection = section(`${idBase}-timeline`, 'global.storyTimeline', 0, {
    eyebrow: timelineHead.eyebrow,
    headline: timelineHead.headline,
    steps: guestJourney.steps
  });

  const quoteSection = section(`${idBase}-quotes`, 'global.quoteMarquee', 0, {
    eyebrow: quoteHead.eyebrow,
    headline: quoteHead.headline,
    items: quotes
  });

  if (mode === 'compact') {
    return [iconSection, quoteSection];
  }

  return [iconSection, timelineSection, mediaSection, quoteSection];
}

/** Unterseiten: deterministische Streuung aus Branche + Seite (andere Reihenfolge als nur pageKey). */
function subpageLayoutHash(industryKey: IndustryKey, pageKey: string): number {
  let h = 2166136261 >>> 0;
  const s = `${industryKey}|${pageKey}`;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

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

  const triple: SectionInstance[] = [
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

  const premium = buildPremiumWowSections(id, industryKey, styleKey, page, 'full');

  if (page === undefined) {
    return [...triple, ...premium];
  }

  const h = subpageLayoutHash(industryKey, page.pageKey);
  const tStart = h % 3;
  const rotatedTriple = [triple[tStart], triple[(tStart + 1) % 3]];
  const pStart = (h >>> 6) % 4;
  const orderedPremium = premium.length > 0 ? [0, 1, 2, 3].map((i) => premium[(pStart + i) % 4]) : [];
  const pCount = 2 + ((h >>> 14) % 2);
  return [...rotatedTriple, ...orderedPremium.slice(0, pCount)].filter(Boolean);
}
