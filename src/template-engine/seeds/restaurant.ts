import type { SectionInstance, StyleKey } from '../model';
import type { SiteSeed } from './model';

const heroImg =
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=82';

function make(id: string, sectionKey: string, sortOrder: number, data: Record<string, unknown>): SectionInstance {
  return { id, sectionKey, visible: true, sortOrder, data };
}

function order(sections: SectionInstance[]): SectionInstance[] {
  return sections.map((s, i) => ({ ...s, sortOrder: i + 1 }));
}

const addr = {
  organization: 'Restaurant Zum Goldenen Herd',
  street: 'Sophienstraße 12',
  postalCode: '80333',
  city: 'München',
  countryCode: 'DE'
};

function homeSections(_styleKey: StyleKey): SectionInstance[] {
  return order([
    make('rc-ann', 'restaurantClassic.announcementBar', 1, {
      enabled: true,
      message: 'Winterkarte ab 15. November — Reservierung für Dezember empfohlen.',
      link: { type: 'section', pageKey: 'home', sectionId: 'rc-res' },
      tone: 'info',
      dismissible: true
    }),
    make('rc-hero', 'restaurantClassic.hero', 2, {
      eyebrow: 'Seit 1987 am Platz',
      headline: { plain: 'Wo die Jahreszeiten', accent: 'auf dem Teller landen.' },
      subheadline: 'Regionale Klassiker, ruhig serviert. Reservieren Sie Ihren Tisch — wir freuen uns auf Sie.',
      scrollHintLabel: 'Nach unten',
      badge: 'Neue Winterkarte',
      backgroundImage: heroImg,
      overlayStrength: 42,
      primaryCta: { label: 'Tisch reservieren', link: { type: 'section', pageKey: 'home', sectionId: 'rc-res' } },
      secondaryCta: { label: 'Speisekarte', link: { type: 'page', pageKey: 'menu', href: '/speisekarte' } }
    }),
    make('rc-trust', 'restaurantClassic.trustStrip', 3, {
      eyebrow: 'Ausgezeichnet',
      headline: { plain: 'Vertrauen,', accent: 'das man schmeckt.' },
      intro: 'Kurz und ohne Schnörkel — was Partner und Gäste über uns sagen.',
      items: [
        {
          logo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=220&q=72',
          name: 'Gault&Millau',
          subtitle: '15 Punkte',
          href: ''
        },
        {
          logo: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=220&q=72',
          name: 'Falstaff',
          subtitle: '87/100',
          href: ''
        }
      ]
    }),
    make('rc-brand', 'restaurantClassic.brandPhilosophy', 4, {
      eyebrow: 'Unsere Küche',
      headline: { plain: 'Klassisch heißt:', accent: 'Zeit nehmen.' },
      subheadline: 'Keine Modetrends auf Biegen und Brechen — Handwerk, gute Produkte, ein Menü, das zur Jahreszeit passt.',
      body: '<p>Wir kochen mit dem, was Märkte und Felder uns geben. Sie sollen reden können — und trotzdem nichts vermissen.</p>',
      portraitImage: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=1200&q=80',
      quote: '„Gutes Essen braucht keine Bühne. Nur einen guten Teller.“',
      quoteAttribution: 'Lukas Brenner, Küchenchef',
      primaryCta: { label: 'Mehr über uns', link: { type: 'page', pageKey: 'about', href: '/ueber-uns' } }
    }),
    make('rc-usp', 'restaurantClassic.uspGrid', 5, {
      eyebrow: 'Drei Gründe',
      headline: { plain: 'Warum Gäste', accent: 'wiederkommen.' },
      intro: 'Kurz gesagt: Qualität, die man nicht erklären muss.',
      pillars: [
        {
          icon: '◇',
          title: 'Saison statt Show',
          description: 'Was reif ist, kommt auf den Teller — ohne Theater.',
          link: { type: 'page', pageKey: 'menu', href: '/speisekarte' }
        },
        {
          icon: '◇',
          title: 'Handwerk, sichtbar',
          description: 'Vom Brot bis zur Sauce: bei uns wird vor Ort fertig gemacht.',
          link: {}
        },
        {
          icon: '◇',
          title: 'Ruhiger Raum',
          description: 'Gespräche, die man hört. Licht, das warm bleibt.',
          link: {}
        }
      ]
    }),
    make('rc-menu-teaser', 'restaurantClassic.menuTeaser', 6, {
      eyebrow: 'Menü',
      headline: { plain: 'Ein Vorgeschmack', accent: 'auf den Abend.' },
      intro: 'Klar gegliedert — von der kleinen Röstung bis zum Dessert.',
      categories: [
        { name: 'Vorspeisen', description: 'Leicht, würzig.', priceHint: 'ab 14 €', highlight: false },
        { name: 'Hauptgänge', description: 'Klassiker und Saison.', priceHint: 'ab 32 €', highlight: true },
        { name: 'Süße & Käse', description: 'Hausgemacht oder von Meisterhand.', priceHint: 'ab 12 €', highlight: false }
      ],
      menuPdfUrl: '',
      menuPdfLabel: 'Speisekarte als PDF',
      viewMenuCta: { label: 'Zur vollen Speisekarte', link: { type: 'page', pageKey: 'menu', href: '/speisekarte' } },
      reserveCta: { label: 'Jetzt reservieren', link: { type: 'page', pageKey: 'booking', href: '/reservierung' } }
    }),
    make('rc-sig', 'restaurantClassic.signatureDishes', 7, {
      eyebrow: 'Signature',
      headline: { plain: 'Drei Teller,', accent: 'die unsere Küche erzählen.' },
      intro: 'Ehrlich statt inszeniert.',
      dishes: [
        {
          name: 'Kalbsbäckchen in Malzbier',
          tagline: 'Sanft, dunkel, herb',
          description: 'Mit Wurzelgemüse und Schmorjus.',
          price: '38 €',
          dietaryNote: 'enthält Gluten',
          image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80'
        },
        {
          name: 'Zander aus dem Ofen',
          tagline: 'Haut knusprig, Filet zart',
          description: 'Mit Lauch, Kerbel und Butter.',
          price: '36 €',
          image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80'
        },
        {
          name: 'Topinambur-Suppe',
          tagline: 'Cremig, nussig',
          description: 'Mit Kernöl und Muskat.',
          price: '14 €',
          image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80'
        }
      ]
    }),
    make('rc-chef', 'restaurantClassic.chefSpotlight', 8, {
      eyebrow: 'Im Gespräch',
      headline: { plain: 'Lukas', accent: 'Brenner.' },
      roleTitle: 'Küchenchef',
      bio: 'Küche als Handwerk — mit dem Anspruch, dass Gäste nichts „merken“ müssen außer: gut.',
      portrait: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80',
      signatureQuote: '„Respekt vor dem Produkt ist das beste Gewürz.“',
      secondaryCta: { label: 'Team kennenlernen', link: { type: 'page', pageKey: 'about', href: '/ueber-uns' } }
    }),
    make('rc-pair', 'restaurantClassic.pairingBeverages', 9, {
      eyebrow: 'Getränke',
      headline: { plain: 'Wein, der', accent: 'mitdenkt.' },
      body: '<p>Unsere Sommelière stellt Weine vor, die zur Jahreszeit passen — ohne Predigt.</p>',
      coverImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
      cta: { label: 'Zur Getränkekarte', link: { type: 'page', pageKey: 'menu', href: '/speisekarte' } }
    }),
    make('rc-res', 'restaurantClassic.reservation', 10, {
      eyebrow: 'Reservierung',
      headline: { plain: 'Ihr Tisch', accent: 'wartet.' },
      intro: 'Für Gruppen ab 6 Personen kurz per Mail. Sonst: online oder telefonisch.',
      microcopy: 'Wir bestätigen in der Regel innerhalb weniger Stunden. Storno bis 24 h vorher kostenfrei.',
      primaryCta: { label: 'Online reservieren', link: { type: 'page', pageKey: 'booking', href: '/reservierung' } },
      secondaryCta: { label: 'Anrufen', link: { type: 'url', href: 'tel:+498912345678' } },
      channels: [
        { label: 'Online', sublabel: 'Mit Sofort-Feedback (sofern verfügbar)', link: { type: 'page', pageKey: 'booking', href: '/reservierung' } },
        { label: 'Telefon', sublabel: 'Für Rückfragen & Fensterplatz', link: { type: 'url', href: 'tel:+498912345678' } }
      ]
    }),
    make('rc-hours', 'restaurantClassic.hoursContact', 11, {
      eyebrow: 'Öffnungszeiten',
      headline: { plain: 'Wann wir', accent: 'für Sie da sind.' },
      openingHoursText: 'Di–So 18:00–23:00 · warme Küche bis 22:00',
      phoneLabel: 'Telefon',
      phone: '+49 89 12345678',
      emailLabel: 'E-Mail',
      email: 'tisch@goldener-herd.example',
      address: addr,
      noteHolidays: 'An Feiertagen bitte kurz vorher auf der Website oder telefonisch prüfen.',
      ctaCall: { label: 'Jetzt anrufen', link: { type: 'url', href: 'tel:+498912345678' } },
      ctaEmail: { label: 'E-Mail schreiben', link: { type: 'url', href: 'mailto:tisch@goldener-herd.example' } }
    }),
    make('rc-map', 'restaurantClassic.locationMap', 12, {
      eyebrow: 'Lage',
      headline: { plain: 'Zentral —', accent: 'und trotzdem ruhig.' },
      directionsIntro: 'Eine Seitenstraße von der Hauptachse — wer sucht, findet Ruhe.',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2663!2d11.575!3d48.137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDA4JzEzLjIiTiAxMcKwMzQnMzAuMCJF!5e0!3m2!1sde!2sde!4v1',
      parkingTitle: 'Parken',
      parkingBody: 'Tiefgarage „Altstadt“ in 3 Gehminuten.',
      transitTitle: 'ÖPNV',
      transitBody: 'U3/U6 Odeonsplatz, dann 6 Minuten zu Fuß.',
      openInMapsCta: { label: 'Route in Google Maps', link: { type: 'url', href: 'https://www.google.com/maps' } }
    }),
    make('rc-testi', 'restaurantClassic.testimonials', 13, {
      eyebrow: 'Stimmen',
      headline: { plain: 'Was Gäste', accent: 'sagen.' },
      reviews: [
        { quote: '„Endlich ein Ort, an dem man sich nicht anstrengen muss, um gut zu essen.“', name: 'M. K.', source: 'Google', rating: 5 },
        { quote: '„Der Service trifft genau den Ton: warm, nicht servil.“', name: 'Stadtmagazin', source: 'Presse', rating: 5 }
      ],
      aggregateRating: 4.9,
      reviewCount: 214
    }),
    make('rc-private', 'restaurantClassic.privateDining', 14, {
      eyebrow: 'Feiern',
      headline: { plain: 'Private Dining', accent: '& Events.' },
      body: '<p>Vom Familienjubiläum bis zum Business-Dinner — wir planen Menü, Raum und Timing mit.</p>',
      packages: [
        {
          title: 'Der lange Tisch',
          description: 'Bis 14 Personen im Gewölberaum.',
          capacity: '8–14',
          priceFrom: 'ab 89 € p. P.',
          image: 'https://images.unsplash.com/photo-1555244163-436a6e0c0bb7?auto=format&fit=crop&w=900&q=80',
          inquiryCta: { label: 'Unverbindlich anfragen', link: { type: 'page', pageKey: 'events', href: '/events' } }
        }
      ],
      gallery: [
        { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80', alt: 'Tisch' },
        { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80', alt: 'Service' }
      ]
    }),
    make('rc-social', 'restaurantClassic.socialGallery', 15, {
      eyebrow: 'Einblicke',
      headline: { plain: 'Auf dem Teller', accent: '& daneben.' },
      instagramHandle: '@goldener.herd',
      instagramUrl: 'https://www.instagram.com',
      images: [{ image: heroImg }, { image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80' }]
    }),
    make('rc-newsletter', 'restaurantClassic.newsletter', 16, {
      eyebrow: 'Liste',
      headline: { plain: 'Saison &', accent: 'Menüwechsel.' },
      body: 'Maximal zwei Mails im Monat. Abmeldung jederzeit.',
      consentHint: 'Mit dem Eintrag stimmen Sie unseren Datenschutzhinweisen zu.',
      successMessage: 'Danke — bitte Posteingang prüfen.',
      emailLabel: 'E-Mail-Adresse',
      submitButton: 'Eintragen',
      privacyLink: { type: 'url', href: '/datenschutz' }
    }),
    make('rc-faq', 'restaurantClassic.faq', 17, {
      eyebrow: 'Fragen',
      headline: { plain: 'Bevor Sie', accent: 'buchen.' },
      items: [
        { question: 'Dresscode?', answer: 'Smart casual reicht.' },
        { question: 'Hunde?', answer: 'Kleine, ruhige Hunde nach Rücksprache — nicht am Hauptabend Sa/Sa.' }
      ]
    })
  ]);
}

function menuPage(): SectionInstance[] {
  return order([
    make('rc-mh', 'restaurantClassic.menuPageHero', 1, {
      eyebrow: 'Speisekarte',
      headline: { plain: 'Was heute', accent: 'auf den Tisch darf.' },
      subheadline: 'Saisonal und nachvollziehbar.',
      intro: 'Alle Preise inkl. MwSt. Änderungen bei Fisch und Wild vorbehalten.',
      lastUpdatedLabel: 'Stand: November 2025',
      coverImage: heroImg,
      pdfCta: { label: 'PDF herunterladen', link: { type: 'url', href: '#' } },
      reserveCta: { label: 'Tisch reservieren', link: { type: 'page', pageKey: 'booking', href: '/reservierung' } }
    }),
    make('rc-mnav', 'restaurantClassic.menuCategoryNav', 2, {
      items: [
        { label: 'Vorspeisen', target: { type: 'section', pageKey: 'menu', sectionId: 'rc-cat-1' } },
        { label: 'Hauptgang', target: { type: 'section', pageKey: 'menu', sectionId: 'rc-cat-2' } }
      ]
    }),
    make('rc-cat-1', 'restaurantClassic.menuCategoryBlock', 3, {
      categoryTitle: 'Vorspeisen',
      categoryDescription: 'Zum Start: klar, nicht zu schwer.',
      dishes: [
        { name: 'Rinderconsommé', description: 'Klärung über Nacht, Kräuteröl.', price: '12 €' },
        { name: 'Gebeizter Saibling', description: 'Meerrettich, Apfel, Dill.', price: '16 €', allergens: 'Fisch, Senf' }
      ]
    }),
    make('rc-cat-2', 'restaurantClassic.menuCategoryBlock', 4, {
      categoryTitle: 'Hauptgänge',
      categoryDescription: 'Herzstück der Karte.',
      dishes: [
        { name: 'Kalbsbäckchen in Malzbier', description: 'Mit Wurzelgemüse.', price: '38 €', highlight: true },
        { name: 'Pilzrisotto', description: 'Steinpilz, Parmesan.', price: '28 €', dietaryTags: 'vegetarisch' }
      ]
    }),
    make('rc-madd', 'restaurantClassic.menuAddendum', 5, {
      headline: { plain: 'Gut', accent: 'zu wissen.' },
      body: '<p>Bitte Allergien bei der Reservierung angeben.</p>',
      footnote: 'Service: freiwillig, wie üblich in Deutschland.'
    }),
    make('rc-mcta', 'restaurantClassic.menuFooterCta', 6, {
      headline: { plain: 'Lust', accent: 'bekommen?' },
      body: 'Wir halten Ihnen den passenden Tisch frei.',
      primaryCta: { label: 'Reservierung', link: { type: 'page', pageKey: 'booking', href: '/reservierung' } },
      secondaryCta: { label: 'Rückfrage per Mail', link: { type: 'url', href: 'mailto:tisch@goldener-herd.example' } }
    })
  ]);
}

function bookingPage(): SectionInstance[] {
  return order([
    make('rc-bh', 'restaurantClassic.bookingHero', 1, {
      eyebrow: 'Reservierung',
      headline: { plain: 'Ihr Tisch —', accent: 'unkompliziert.' },
      subheadline: 'Wählen Sie den Weg, der zu Ihrem Tag passt.',
      trustLine: 'Antwort meist innerhalb von 2 Stunden (10–22 Uhr).',
      heroImage: heroImg
    }),
    make('rc-bc', 'restaurantClassic.bookingChannels', 2, {
      intro: 'Drei Wege — ein Ziel: ein schöner Abend bei uns.',
      channels: [
        {
          title: 'Online reservieren',
          description: 'Datum, Uhrzeit, Personen — fertig.',
          cta: { label: 'Zum Buchungstool', link: { type: 'url', href: 'https://example.com/book' } }
        },
        {
          title: 'Telefonisch',
          description: 'Für Fensterplätze und kurzfristige Wünsche.',
          cta: { label: 'Anrufen', link: { type: 'url', href: 'tel:+498912345678' } }
        }
      ]
    }),
    make('rc-bp', 'restaurantClassic.bookingPolicy', 3, {
      headline: { plain: 'Fair', accent: 'für alle.' },
      items: [
        { title: 'Stornierung', body: 'Bis 24 Stunden vorher kostenfrei.' },
        { title: 'Verspätung', body: 'Bitte Bescheid sagen — wir halten 20 Minuten.' }
      ]
    }),
    make('rc-bf', 'restaurantClassic.bookingFaqMini', 4, {
      headline: { plain: 'Kurz', accent: 'gefragt.' },
      items: [{ question: 'Fensterplatz?', answer: 'Wir versuchen es gern — keine Garantie.' }]
    }),
    make('rc-ba', 'restaurantClassic.bookingAlternateContact', 5, {
      headline: { plain: 'Lieber', accent: 'direkt?' },
      body: 'Wenn das Tool mal zickt: wir sind einen Anruf entfernt.',
      phone: '+49 89 12345678',
      email: 'tisch@goldener-herd.example',
      ctaCall: { label: 'Anrufen', link: { type: 'url', href: 'tel:+498912345678' } },
      ctaMail: { label: 'E-Mail', link: { type: 'url', href: 'mailto:tisch@goldener-herd.example' } }
    })
  ]);
}

function aboutPage(): SectionInstance[] {
  return order([
    make('rc-ah', 'restaurantClassic.aboutHero', 1, {
      eyebrow: 'Über uns',
      headline: { plain: 'Ein Haus,', accent: 'das atmet.' },
      subheadline: 'Klassisch — weil wir uns weiterentwickeln.',
      lede: '1987 eröffnet, 2019 neu gedacht: heller, offener — der Anspruch blieb.',
      heroImage: heroImg
    }),
    make('rc-at', 'restaurantClassic.aboutTimeline', 2, {
      eyebrow: 'Meilensteine',
      headline: { plain: 'Kurz', accent: 'chronologisch.' },
      milestones: [
        { year: '1987', title: 'Eröffnung', description: 'Familienbetrieb, klein und lautstark.' },
        { year: '2019', title: 'Neues Raumgefühl', description: 'Mehr Licht, gleiche Handschrift.' }
      ]
    }),
    make('rc-av', 'restaurantClassic.aboutValues', 3, {
      headline: { plain: 'Wofür wir', accent: 'stehen.' },
      intro: 'Als Tagesgeschäft, nicht als Slogan.',
      values: [
        { icon: '①', title: 'Regionalität', description: 'Probieren, bevor wir schreiben.' },
        { icon: '②', title: 'Team', description: 'Von der Spülung bis zur Pass.' }
      ]
    }),
    make('rc-team', 'restaurantClassic.teamGrid', 4, {
      eyebrow: 'Team',
      headline: { plain: 'Menschen,', accent: 'die Sie sehen.' },
      intro: 'Ein paar Gesichter — der Rest am Abend.',
      members: [
        { name: 'Lukas Brenner', role: 'Küchenchef', bio: 'Handwerk vor Show.', portrait: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80' },
        { name: 'Carla Mehnert', role: 'Sommelière', bio: 'Wein mit Geschichte, ohne Vortrag.', portrait: 'https://images.unsplash.com/photo-1583394838336-acd9527c1d5a?auto=format&fit=crop&w=600&q=80' }
      ]
    }),
    make('rc-press', 'restaurantClassic.pressLogos', 5, {
      headline: { plain: 'Presse &', accent: 'Partner.' },
      items: [
        { logo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=220&q=72', name: 'Presse', subtitle: '2025', href: '' }
      ]
    }),
    make('rc-ac', 'restaurantClassic.aboutCta', 6, {
      headline: { plain: 'Überzeugt?', accent: '' },
      body: 'Reservieren — oder vorab in die Karte schauen.',
      reserveCta: { label: 'Tisch buchen', link: { type: 'page', pageKey: 'booking', href: '/reservierung' } },
      menuCta: { label: 'Zur Speisekarte', link: { type: 'page', pageKey: 'menu', href: '/speisekarte' } }
    })
  ]);
}

function eventsPage(): SectionInstance[] {
  return order([
    make('rc-eh', 'restaurantClassic.eventsHero', 1, {
      eyebrow: 'Events',
      headline: { plain: 'Feiern mit', accent: 'Struktur.' },
      subheadline: 'Ein Ansprechpartner, ein Ablauf.',
      coverImage: heroImg
    }),
    make('rc-es', 'restaurantClassic.eventsSpaces', 2, {
      headline: { plain: 'Räume', accent: 'mit Charakter.' },
      intro: 'Zwei Optionen — je nach Größe.',
      spaces: [
        {
          name: 'Gewölberaum',
          description: 'Backstein, gedämpftes Licht.',
          capacityMin: 8,
          capacityMax: 14,
          amenities: 'Eigenes WC, Rednerpult optional',
          gallery: [{ url: 'https://images.unsplash.com/photo-1555244163-436a6e0c0bb7?auto=format&fit=crop&w=600&q=80', alt: 'Raum' }],
          inquiryCta: { label: 'Anfragen', link: { type: 'page', pageKey: 'contact', href: '/kontakt' } }
        }
      ]
    }),
    make('rc-ep', 'restaurantClassic.eventsPackages', 3, {
      packages: [
        {
          title: 'Business Dinner',
          subtitle: 'Klar & warm',
          description: 'Vier Gänge, Getränkeempfehlung.',
          priceFrom: 'ab 95 € p. P.',
          duration: 'ca. 2,5 h',
          includesText: 'Begrüßungssekt alkoholfrei\n4-Gang-Menü\nWasser am Tisch',
          image: heroImg,
          cta: { label: 'Paket anfragen', link: { type: 'page', pageKey: 'contact', href: '/kontakt' } }
        }
      ]
    }),
    make('rc-eg', 'restaurantClassic.eventsGallery', 4, {
      eyebrow: 'Stimmung',
      headline: { plain: 'So fühlt es', accent: 'sich an.' },
      images: [
        { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80', alt: '1' },
        { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80', alt: '2' }
      ]
    }),
    make('rc-ei', 'restaurantClassic.eventsInquiryForm', 5, {
      headline: { plain: 'Unverbindlich', accent: 'anfragen.' },
      intro: 'Je genauer die Mail, desto schneller unser Vorschlag.',
      successMessage: 'Danke — wir melden uns werktags innerhalb von 24 Stunden.',
      privacyNote: 'Datenschutz: siehe verlinkte Erklärung.',
      nameLabel: 'Name',
      emailLabel: 'E-Mail',
      dateLabel: 'Wunschtermin',
      guestsLabel: 'Personen',
      messageLabel: 'Nachricht',
      submitLabel: 'Senden',
      privacyLink: { type: 'url', href: '/datenschutz' }
    }),
    make('rc-ef', 'restaurantClassic.eventsFaq', 6, {
      headline: { plain: 'FAQ', accent: '' },
      items: [{ question: 'Eigenes Dekor?', answer: 'In Absprache — ohne offene Kerzen.' }]
    })
  ]);
}

function contactPage(): SectionInstance[] {
  return order([
    make('rc-ch', 'restaurantClassic.contactHero', 1, {
      eyebrow: 'Kontakt',
      headline: { plain: 'Wir freuen uns', accent: 'auf Sie.' },
      intro: 'Für Tische, Events und Rückfragen.'
    }),
    make('rc-cd', 'restaurantClassic.contactDetails', 2, {
      address: addr,
      phone: '+49 89 12345678',
      email: 'tisch@goldener-herd.example',
      openingHoursText: 'Di–So 18:00–23:00',
      note: 'Für Events bitte das Formular auf /events nutzen.',
      ctaCall: { label: 'Anrufen', link: { type: 'url', href: 'tel:+498912345678' } },
      ctaMail: { label: 'E-Mail', link: { type: 'url', href: 'mailto:tisch@goldener-herd.example' } },
      ctaReserve: { label: 'Reservierung', link: { type: 'page', pageKey: 'booking', href: '/reservierung' } }
    }),
    make('rc-cm', 'restaurantClassic.contactMap', 3, {
      headline: { plain: 'Anfahrt', accent: '' },
      directionsBody: 'Zentral in München — Parkhaus in wenigen Minuten.',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2663!2d11.575!3d48.137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDA4JzEzLjIiTiAxMcKwMzQnMzAuMCJF!5e0!3m2!1sde!2sde!4v1',
      parkingTitle: 'Parken',
      parkingBody: 'Tiefgarage Altstadt.',
      transitTitle: 'ÖPNV',
      transitBody: 'U3/U6 Odeonsplatz.',
      openInMapsCta: { label: 'Google Maps', link: { type: 'url', href: 'https://www.google.com/maps' } }
    }),
    make('rc-cf', 'restaurantClassic.contactForm', 4, {
      headline: { plain: 'Nachricht', accent: 'senden.' },
      intro: 'Allgemeine Anfragen — für Reservierungen bitte den Buchungsweg nutzen.',
      nameLabel: 'Name',
      emailLabel: 'E-Mail',
      messageLabel: 'Nachricht',
      submitLabel: 'Absenden',
      successMessage: 'Versendet — wir melden uns schnellstmöglich.',
      privacyLink: { type: 'url', href: '/datenschutz' }
    }),
    make('rc-ca', 'restaurantClassic.contactAccessibility', 5, {
      headline: { plain: 'Barrierefreiheit', accent: '' },
      body: '<p>Stufenloser Seiteneingang auf Anfrage. WC barrierearm.</p>'
    })
  ]);
}

function newsPage(): SectionInstance[] {
  return order([
    make('rc-nh', 'restaurantClassic.newsIndexHero', 1, {
      eyebrow: 'Aktuelles',
      headline: { plain: 'Was die Küche', accent: 'beschäftigt.' },
      intro: 'Saisonstarts, Menüwechsel, kleine Einladungen.'
    }),
    make('rc-nf', 'restaurantClassic.newsFeatured', 2, {
      title: 'Winterkarte 2025/26',
      excerpt: 'Ruhig, herzhaft, mit viel Zeit.',
      date: '2025-11-01',
      coverImage: heroImg,
      readCta: { label: 'Weiterlesen', link: { type: 'url', href: '/news/winterkarte' } }
    }),
    make('rc-nl', 'restaurantClassic.newsList', 3, {
      items: [
        {
          title: 'Offener Sonntag im Januar',
          excerpt: 'Andere Zeiten, gleiche Küche.',
          date: '2025-10-12',
          category: 'Hinweis',
          link: { type: 'page', pageKey: 'news', href: '/aktuelles' }
        },
        {
          title: 'Job: Servicekraft',
          excerpt: 'Teamplayer:in mit Gespür für Rhythmus.',
          date: '2025-09-20',
          category: 'Jobs',
          link: { type: 'page', pageKey: 'contact', href: '/kontakt' }
        }
      ]
    })
  ]);
}

export function restaurantSeed(styleKey: StyleKey): SiteSeed {
  return {
    tenantName: 'Zum Goldenen Herd',
    industryKey: 'restaurant',
    styleKey,
    global: {
      brand: {
        name: 'Zum Goldenen Herd',
        tagline: 'Küche mit Geduld. Tisch mit Herz.'
      },
      navigation: [
        { label: 'Start', href: '/' },
        { label: 'Speisekarte', href: '/speisekarte' },
        { label: 'Reservierung', href: '/reservierung' },
        { label: 'Über uns', href: '/ueber-uns' },
        { label: 'Events', href: '/events' },
        { label: 'Aktuelles', href: '/aktuelles' },
        { label: 'Kontakt', href: '/kontakt' }
      ],
      contact: {
        phone: '+49 89 12345678',
        email: 'tisch@goldener-herd.example',
        address: 'Sophienstraße 12, 80333 München',
        openingHours: 'Di–So 18:00–23:00'
      }
    },
    collections: [
      {
        id: 'dish-kalb',
        collectionKey: 'menuItem',
        title: 'Kalbsbäckchen in Malzbier',
        slug: 'kalbsbaeckchen-malzbier',
        data: {
          summary: 'Mit Wurzelgemüse und Schmorjus.',
          price: '38 €',
          image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80'
        }
      },
      {
        id: 'dish-zander',
        collectionKey: 'menuItem',
        title: 'Zander aus dem Ofen',
        slug: 'zander-ofen',
        data: {
          summary: 'Lauch, Kerbel, Butter.',
          price: '36 €',
          image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1000&q=80'
        }
      },
      {
        id: 'dish-suppe',
        collectionKey: 'menuItem',
        title: 'Topinambur-Suppe',
        slug: 'topinambur-suppe',
        data: {
          summary: 'Cremig, nussig, leise.',
          price: '14 €',
          image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80'
        }
      },
      {
        id: 'exp-wein',
        collectionKey: 'diningExperience',
        title: 'Weinabend am langen Tisch',
        slug: 'weinabend',
        data: {
          summary: 'Vier Gänge, begleitende Weine.',
          image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=80'
        }
      },
      {
        id: 'exp-private',
        collectionKey: 'diningExperience',
        title: 'Private Dining',
        slug: 'private-dining',
        data: {
          summary: 'Exklusiver Raum, Menü nach Absprache.',
          image: 'https://images.unsplash.com/photo-1555244163-436a6e0c0bb7?auto=format&fit=crop&w=1000&q=80'
        }
      }
    ],
    pages: [
      {
        id: 'home',
        key: 'home',
        kind: 'core',
        title: 'Startseite',
        slug: '/',
        seo: {
          title: 'Zum Goldenen Herd · Restaurant München',
          description: 'Klassische Küche, moderne Gastfreundschaft, Reservierung online.'
        },
        sections: homeSections(styleKey)
      },
      {
        id: 'menu',
        key: 'menu',
        kind: 'core',
        title: 'Speisekarte',
        slug: '/speisekarte',
        seo: { title: 'Speisekarte · Zum Goldenen Herd', description: 'Aktuelle Karte und Saisongerichte.' },
        sections: menuPage()
      },
      {
        id: 'booking',
        key: 'booking',
        kind: 'core',
        title: 'Reservierung',
        slug: '/reservierung',
        seo: { title: 'Reservierung · Zum Goldenen Herd', description: 'Tisch online oder telefonisch reservieren.' },
        sections: bookingPage()
      },
      {
        id: 'about',
        key: 'about',
        kind: 'core',
        title: 'Über uns',
        slug: '/ueber-uns',
        seo: { title: 'Über uns · Zum Goldenen Herd', description: 'Team, Geschichte, Werte.' },
        sections: aboutPage()
      },
      {
        id: 'events',
        key: 'events',
        kind: 'core',
        title: 'Events',
        slug: '/events',
        seo: { title: 'Events & Private Dining', description: 'Räume, Pakete, Anfrage.' },
        sections: eventsPage()
      },
      {
        id: 'contact',
        key: 'contact',
        kind: 'core',
        title: 'Kontakt',
        slug: '/kontakt',
        seo: { title: 'Kontakt · Zum Goldenen Herd', description: 'Anfahrt, Öffnungszeiten, Nachricht.' },
        sections: contactPage()
      },
      {
        id: 'news',
        key: 'news',
        kind: 'core',
        title: 'Aktuelles',
        slug: '/aktuelles',
        seo: { title: 'Aktuelles · Zum Goldenen Herd', description: 'News, Saison, Jobs.' },
        sections: newsPage()
      }
    ]
  };
}
