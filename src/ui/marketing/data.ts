export const agency = {
  name: 'FlamingoMedia',
  fullName: 'FlamingoMedia · Websites für lokale Marken',
  tagline: 'Websites mit Pop für lokale Marken · Innsbruck · DACH',
  email: 'hello@flamingomedia.online',
  phone: '+49 1515 5338029',
  phoneAt: '+43 677 6368 1543',
  logo: '/brand/flamingo-full-beside.png',
  logoMark: '/brand/flamingo-icon.png',
  logoFull: '/brand/flamingo-full.png'
};

/** Hero line — matches public site rhythm (with trailing punctuation). */
export const rotatingHeroWords = [
  'Restaurants.',
  'Salons.',
  'Handwerk.',
  'Cafés.',
  'Praxen.',
  'Beratungen.',
  'Studios.',
  'Ateliers.',
  'Werkstätten.',
  'Hotels.',
  'Bäckereien.',
  'Boutiquen.'
] as const;

export const rotatingBranches = [
  'Restaurants',
  'Hotels',
  'Tourismus',
  'Salons',
  'Handwerk',
  'Praxen',
  'Beratungen',
  'Studios',
  'Hochzeiten'
];

/** Top ticker — aligned with https://www.flamingomedia.online/ */
export const marqueeItems = [
  'Passend für jede Branche',
  'Foto- & Videoshooting optional als Add-on',
  'Online in wenigen Tagen',
  'Innsbruck · München · Ingolstadt · DACH',
  'Hosting & kleine Pflege inklusive'
];

export const proofItems = [
  { value: '9', label: 'Branchen im Portfolio' },
  { value: '3', label: 'Stilwelten pro Auftritt' },
  { value: '100%', label: 'Redaktionell statt generisch' }
];

export const processSteps = [
  {
    title: 'Erstgespräch',
    text: 'Wir klären Betrieb, Zielgruppe, Stil und welche Seiten Deine Gäste wirklich brauchen — ohne Folien-Marathon.'
  },
  {
    title: 'Template & Struktur',
    text: 'Wir wählen Branche und Stil, richten Seiten, Texte und Bildplatzhalter ein und zeigen Dir früh eine echte Vorschau im Browser.'
  },
  {
    title: 'Umsetzung',
    text: 'Website, Bilder, Texte, SEO und technische Basis werden zusammengeführt. Du siehst den Stand jederzeit — nicht erst am Schluss.'
  },
  {
    title: 'Feinschliff',
    text: 'Wir gehen mit Dir durch: Reihenfolge, Formulierungen, Galerie, Team, Öffnungszeiten — bis es sich für Dich stimmig anfühlt.'
  },
  {
    title: 'Livegang',
    text: 'Nach Freigabe gehen wir live, verbinden die Domain und übergeben Dir den Zugang — mit kurzer Einweisung, damit Du Dich zurechtfindest.'
  }
];

export const pricingTiers = [
  {
    name: 'Template',
    price: 'ab 1.490 €',
    subtitle: 'Für schnelle, hochwertige Websites auf Basis einer Branchen-Stil-Kombi.',
    monthly: 'Hosting & Pflege ab 49 € / Monat',
    featured: false,
    features: [
      'Branchen-Template mit drei Stilwelten',
      'Eigener Bereich zum Pflegen von Texten und Bildern',
      'Basis-SEO und technische Einrichtung',
      'Kontaktformular und rechtliche Seiten',
      'Livegang auf Subdomain oder eigener Domain'
    ]
  },
  {
    name: 'Template + Content',
    price: 'ab 3.180 €',
    subtitle: 'Für Betriebe, die auch Texte, Bilder und sauberen Erstinhalt brauchen.',
    monthly: 'Hosting & Pflege ab 79 € / Monat',
    featured: true,
    badge: 'Empfohlen',
    features: [
      'Alles aus Template',
      'Content-Workshop und Struktur',
      'Foto-/Video-Add-on vorbereitbar',
      'Demo-Inhalte werden durch Deine echten Inhalte ersetzt',
      'Persönliche Einweisung, damit Du alles findest'
    ]
  },
  {
    name: 'Custom',
    price: 'auf Anfrage',
    subtitle: 'Für komplexere Plattformen, Spezialflows oder stark individuelle Gestaltung.',
    monthly: 'Betreuung nach Umfang',
    featured: false,
    features: [
      'Individuelle Layouts und Inhaltstypen',
      'Spezielle Buchungs- oder Anfrageabläufe',
      'Mehrsprachigkeit und Schnittstellen nach Absprache',
      'Ausführliche Qualitätssicherung',
      'Langfristige Betreuung nach Bedarf'
    ]
  }
];

export const addOns = [
  { title: 'Foto-Shooting', price: 'ab 690 €', text: 'Vor-Ort-Bilder für Hero, Galerie, Team und Detailseiten.' },
  { title: 'Imagefilm', price: 'ab 1.490 €', text: 'Kurzfilm für Website, Social Media und Kampagnen.' },
  { title: 'Logo-Refresh', price: 'ab 590 €', text: 'Modernisierung bestehender Logos ohne die Wiedererkennbarkeit zu verlieren.' },
  { title: 'Mehrsprachigkeit', price: 'ab 290 €', text: 'DE/EN oder weitere Sprachen, sauber in Navigation und SEO integriert.' },
  { title: 'Content-Import', price: 'ab 390 €', text: 'Strukturierte Übernahme vorhandener Inhalte, Menüs, Leistungen oder FAQs.' },
  { title: 'Start-Begleitung', price: 'inklusive', text: 'Wenn wir gemeinsam loslegen: Zugänge, Checklisten und kurze Calls, damit nichts untergeht.' }
];

export const team = [
  {
    name: 'Mario',
    role: 'Strategie & Vertrieb',
    image: '/team/mario.webp',
    text: 'Spricht mit Betrieben über Ziel, Angebot und die Inhalte, die wirklich verkaufen sollen.'
  },
  {
    name: 'Julius',
    role: 'Design & Umsetzung',
    image: '/team/julius.jpg',
    text: 'Übersetzt Positionierung in Websites, Templates, visuelle Systeme und saubere Nutzerführung.'
  },
  {
    name: 'Nikey',
    role: 'Content & Produktion',
    image: '/team/nikey.jpg',
    text: 'Bringt Bildsprache, Story und Material so zusammen, dass die Website glaubwürdig wirkt.'
  }
];

export const imageAssets = {
  heroDevice: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80',
  process: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80',
  about: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80',
  contentKit: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80'
};
