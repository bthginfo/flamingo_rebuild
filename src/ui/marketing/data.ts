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

/** Legacy short list — prefer `processPhases` on /prozess. */
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

/** Seven-step timeline — https://www.flamingomedia.online/prozess */
export const processPhases = [
  {
    step: '01',
    rail: 'Kennenlernen',
    tag: 'Tag 1',
    title: 'Kennenlernen',
    lead: '30-Minuten Online-Call oder Telefon. Wir verstehen Deinen Betrieb, Deine Konkurrenz, Deine Ziele. Du bekommst unsere ehrliche Einschätzung.',
    bullets: ['Branche & Wettbewerb', 'Ziele & Zielgruppe', 'Erste Empfehlung'] as const
  },
  {
    step: '02',
    rail: 'Briefing & Auswahl',
    tag: 'Tag 2',
    title: 'Briefing & Auswahl',
    lead: 'Du wählst Template und Paket. Wir senden ein verbindliches Angebot. Anzahlung 50 %.',
    bullets: ['Template & Stil', 'Module & Features', 'Verbindliches Angebot'] as const
  },
  {
    step: '03',
    rail: 'Foto- & Videoshooting',
    tag: 'Optional',
    title: 'Foto- & Videoshooting',
    lead: 'Add-on, kein Standard. Auf Wunsch kommen wir mit kleinem Team vor Ort und produzieren Bild- und Filmmaterial. Auch nachträglich oder separat buchbar.',
    bullets: ['Halber oder ganzer Tag', 'Bildauswahl mit Dir', 'Druckreife Lieferung'] as const
  },
  {
    step: '04',
    rail: 'Aufbau',
    tag: 'Tag 3–7',
    title: 'Aufbau',
    lead: 'Wir richten das Template ein, importieren Deine Inhalte, optimieren Bilder, schreiben SEO-Texte vor.',
    bullets: ['Template-Setup', 'Inhalte & Bilder', 'SEO-Vorlagen'] as const
  },
  {
    step: '05',
    rail: 'Feedback-Schleife',
    tag: 'Tag 8',
    title: 'Feedback-Schleife',
    lead: 'Du schaust Dir den Preview-Link an. Eine Korrektur-Runde inkludiert. Du sendest Anmerkungen, wir setzen um.',
    bullets: ['Privater Preview-Link', '1× Korrektur-Runde inkl.', 'Schnelle Umsetzung'] as const
  },
  {
    step: '06',
    rail: 'Live-Schaltung',
    tag: 'Tag 9–10',
    title: 'Live-Schaltung',
    lead: 'Wir verbinden Deine Domain und übergeben den Admin-Bereich. Du bist online.',
    bullets: ['Domain & SSL', 'Admin-Zugang & Schulung', 'Online — fertig'] as const
  },
  {
    step: '07',
    rail: 'Pflege & Support',
    tag: 'Laufend',
    title: 'Pflege & Support',
    lead: 'Du pflegst Inhalte selbst. Wir kümmern uns um den Hosting-Teil und kleine Anpassungen. 29 €/Monat.',
    bullets: ['Du pflegst Inhalte selbst', 'Hosting inklusive', 'Kleine Anpassungen on demand'] as const
  }
] as const;

/** https://www.flamingomedia.online/preise */
export const pricingTiers = [
  {
    name: 'Template',
    price: '1.490 €',
    subtitle: 'einmalig',
    monthly: '+ 29 € / Monat Hosting & Pflege',
    featured: false,
    features: [
      'Eines unserer Branchen-Templates (6 Branchen, 3 Stile)',
      '6 Farbschemas pro Branche – jederzeit per Klick umstellbar',
      'Admin-Bereich zum selbst pflegen',
      'Hosting & Pflege inklusive',
      '1 Stunde Einrichtungs-Support',
      'Online in wenigen Tagen – je nach Verfügbarkeit Deiner Inhalte'
    ]
  },
  {
    name: 'Mit Content Kit (Foto + Video)',
    price: '3.180 €',
    subtitle: 'einmalig',
    monthly: '+ 29 € / Monat Hosting & Pflege',
    featured: true,
    badge: 'Content Kit',
    features: [
      'Alles aus „Template"',
      '2 Drehtage bei Dir vor Ort',
      'Teamfotos bis 20 Personen (Einzel + Gruppe)',
      'Location komplett: Räume, Atmosphäre, Details',
      'Food-, Produkt- und Servicemomente inklusive',
      '50 bearbeitete Bilder + 3 Reels (à 30 Sek.)',
      'Beratung zu Bildsprache, Story und Einsatz auf Web & Social'
    ]
  },
  {
    name: 'Custom',
    price: 'auf Anfrage',
    subtitle: 'individuell',
    monthly: 'Hosting individuell',
    featured: false,
    features: [
      'Individuelles Design ohne Template-Bindung',
      'Beliebige Inhalts-Funktionen (Newsletter, Multi-Standort, Mehrsprachigkeit)',
      'Persönlicher Projektmanager',
      'Iterative Design-Schleifen mit Style-Guide',
      'API-Anbindungen möglich',
      'Zeitplan nach Absprache'
    ]
  }
];

export const addOns = [
  {
    title: 'Mehrsprachigkeit',
    price: 'ab 290 €',
    text: 'DE + EN, weitere Sprachen auf Anfrage. Inkl. Sprach-Switcher.'
  },
  {
    title: 'Online-Reservierung',
    price: 'ab 390 €',
    text: 'Anbindung an Tools wie Quandoo, OpenTable, Treatwell.'
  },
  {
    title: 'Foto-/Video-Nachshooting',
    price: '890 €',
    text: '1 Drehtag light für saisonale Updates, neue Produkte oder Teamwechsel (ca. 25 Bilder + 1 Reel).'
  },
  {
    title: 'Newsletter-Setup',
    price: '290 €',
    text: 'Anbindung an Mailerlite, Brevo oder Mailchimp.'
  },
  {
    title: 'Texte & SEO',
    price: 'ab 490 €',
    text: 'Schreiben aller Inhalte durch unsere Copywriter:innen, inkl. SEO-Recherche.'
  },
  {
    title: 'Logo-Refresh',
    price: 'ab 590 €',
    text: 'Modernisierung Deines bestehenden Logos. Drei Iterationen.'
  }
];

export const pricingFaqs = [
  {
    q: 'Wie lange dauert die Erstellung?',
    a: 'Bei Template-Projekten typischerweise wenige Tage nach Inhalts-Übergabe. Wie schnell es real geht, hängt vor allem davon ab, wie zügig Texte und Fotos von Deiner Seite kommen. Mit Content Kit planen wir zusätzlich Zeit für Dreh, Auswahl und Schnitt ein.'
  },
  {
    q: 'Kann ich Inhalte selbst pflegen?',
    a: 'Ja. Du bekommst einen einfachen Admin-Bereich. Texte, Bilder, Speisekarte und Öffnungszeiten änderst Du ohne Vorkenntnisse direkt im Browser. Du siehst den Effekt sofort.'
  },
  {
    q: 'Was passiert, wenn etwas kaputt ist?',
    a: 'Im Pflegepaket überwachen wir Deine Seite automatisch – wir bekommen Probleme oft mit, bevor Du es tust. Wir reagieren innerhalb der Geschäftszeiten in der Regel binnen weniger Stunden.'
  },
  {
    q: 'Wem gehört die Website?',
    a: 'Dir. Du kannst den Quellcode jederzeit anfordern, das Hosting wechseln und mit anderen Agenturen weiterarbeiten. Wir liefern keine Verträge mit Lock-in-Klauseln.'
  },
  {
    q: 'Was kostet eine zusätzliche Sprache?',
    a: 'Mehrsprachigkeit (DE + EN) kostet einmalig ab 290 €. Weitere Sprachen je nach Umfang. Inhalte können von uns übersetzt oder bereitgestellt werden.'
  },
  {
    q: 'Welche Zahlungsweise?',
    a: '50 % Anzahlung bei Auftrag, 50 % bei Live-Schaltung. Beide Rechnungen mit MwSt. Hosting wird monatlich abgebucht (kündbar zum Monatsende).'
  },
  {
    q: 'Arbeitet ihr auch außerhalb der DACH-Region?',
    a: 'Ja, auf Anfrage. Allerdings nur dort, wo wir mit Tageslicht und einem Direktflug hinreisen können – sonst leidet die Qualität des Shootings.'
  }
] as const;

export const homeAdminBullets = [
  'Einfacher Admin-Zugang. Direkt im Browser.',
  'Bilder direkt hochladen – mit Live-Vorschau.',
  'Änderungen erscheinen direkt auf der Seite.',
  'Sektionen pro Seite ein-/ausblenden und neu sortieren.',
  'News & Blog-Beiträge mit eigenem Editor pflegen.',
  'Ohne extra App, ohne Plugin-Wirrwarr.'
] as const;

export const homeAblaufTeaser = [
  {
    step: '01',
    tag: 'Tag 1',
    title: 'Kennenlernen',
    text: 'Wir sprechen 30 Minuten über Deinen Betrieb, Dein Ziel und Deinen Stil. Kostenlos, unverbindlich, ohne Sales-Gedöns.'
  },
  {
    step: '02',
    tag: 'Optional',
    title: 'Foto- & Videoshooting',
    text: 'Optional als Add-on: Wir kommen mit kleinem Team vor Ort und produzieren passende Bilder und kurzen Bewegtbild-Content. Buchbar auch separat.'
  },
  {
    step: '03',
    tag: 'Tag 2–7',
    title: 'Aufbau & Befüllung',
    text: 'Du wählst Template und Farbschema. Wir bauen auf, befüllen mit Deinen Inhalten und schicken Dir einen Preview-Link.'
  },
  {
    step: '04',
    tag: 'Tag 8–10',
    title: 'Live-Schaltung',
    text: 'Du gibst grünes Licht. Wir schalten live, übergeben den Admin-Bereich und sind ab da Dein direkter Ansprechpartner.'
  }
] as const;

export const homeAddOnPackages = [
  {
    title: 'Foto-Shooting',
    bullets: ['Halber bis ganzer Tag vor Ort', '20–40 bearbeitete Bilder', 'Unbegrenzte Nutzung', 'Lieferung in ca. 2 Wochen'] as const
  },
  {
    title: 'Imagefilm',
    bullets: ['30–60 Sekunden Film', 'Kurzer Bewegtbild-Inhalt', 'Lizenzierte Hintergrundmusik', 'Web- & Social-Schnitt'] as const
  },
  {
    title: 'Foto + Film',
    bullets: ['Beides am gleichen Tag', 'Kombi-Konditionen', 'Social-Media-Cuts', 'Beste Preisleistung'] as const
  }
] as const;

export const homeStats = [
  { value: '8', label: 'Branchen-Templates' },
  { value: '3', label: 'Stilrichtungen je Branche' },
  { value: '24+', label: 'Bausteine kombinierbar' },
  { value: '7', label: 'Tage\nBis online (Ø)' }
] as const;

export const contactBranches = [
  'Restaurant / Gastro',
  'Salon / Beauty',
  'Handwerk / Service',
  'Praxis / Ärzte',
  'Beratung / Kanzlei',
  'Studio / Coaching',
  'Hotel / Pension',
  'Café / Bäckerei',
  'Andere'
] as const;

export const contactPackages = [
  'Template (1.490 €)',
  'Mit Content Kit (Foto + Video) (3.180 €)',
  'Custom (auf Anfrage)',
  'Noch unentschieden'
] as const;

export const team = [
  {
    name: 'Mario Schubert',
    role: 'CEO · Foto & Video',
    image: '/team/mario.webp',
    text: 'Der Mann für alles Visuelle. Packt die Kamera aus, denkt in Bildausschnitten und liefert Material, das nach Dir aussieht – nicht nach Stockfoto.'
  },
  {
    name: 'Julius von Ingelheim',
    role: 'CTO · Web · UX',
    image: '/team/julius.jpg',
    text: 'Gelernter UX-Designer und Tech-Nerd. Liebt saubere Design-Systeme, schnelle Ladezeiten und guter Wein – in dieser Reihenfolge.'
  },
  {
    name: 'Nikey',
    role: 'Chief Happiness Officer',
    image: '/team/nikey.jpg',
    text: 'Unser Hund. Begrüßt Besucher:innen, testet Sofakomfort und sorgt dafür, dass keiner zu lange am Schreibtisch sitzt.'
  }
];

export const imageAssets = {
  heroDevice: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80',
  process: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80',
  about: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80',
  contentKit: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80'
};
