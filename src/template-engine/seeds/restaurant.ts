import type { SectionInstance, StyleKey } from '../model';
import type { SiteSeed } from './model';

const heroImages: Record<StyleKey, string> = {
  classic: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=82',
  modern: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1800&q=82',
  bold: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1800&q=82'
};

function section(id: string, sectionKey: string, sortOrder: number, data: Record<string, unknown>): SectionInstance {
  return {
    id,
    sectionKey,
    visible: true,
    sortOrder,
    data
  };
}

function orderSections(sections: SectionInstance[]): SectionInstance[] {
  return sections.map((s, i) => ({ ...s, sortOrder: i + 1 }));
}

function homeHero(styleKey: StyleKey): SectionInstance {
  const copy = {
    classic: {
      eyebrow: 'Cucina italiana · seit 1998',
      headline: { plain: 'Italien beginnt', accent: 'am ersten Bissen.' },
      subline:
        'Pasta, Pizza, Naturweine und ein Tisch, an dem der Abend länger bleiben darf — wie bei Freunden, nur mit besserem Service.',
      body: 'Wir kochen täglich frisch, arbeiten mit Produzenten aus Tirol und Italien und servieren italienische Küche ohne Theater — dafür mit viel Herz.'
    },
    modern: {
      eyebrow: 'Restaurant · Innsbruck',
      headline: { plain: 'Küche mit', accent: 'Präzision & Seele.' },
      subline: 'Saisonal, regional verwurzelt, italienisch im Rhythmus — klar strukturiert, warm serviert.',
      body: 'Menülogik, offene Küche, kurze Wege zwischen Team und Gast. Weniger Inszenierung, mehr Geschmack pro Minute.'
    },
    bold: {
      eyebrow: 'Abends · Flamingo',
      headline: { plain: 'Feuer.', accent: 'Wein. Laut.' },
      subline: 'Holzofen, lange Tische, Mitternacht am Pass — für alle, die den Abend nicht kurz halten wollen.',
      body: 'Kein Fine-Dining-Theater: dafür Ofen, Bassline aus der Küche und Gänge, die man noch Wochen später schmeckt.'
    }
  }[styleKey];

  return section('home-hero', 'global.hero', 1, {
    eyebrow: copy.eyebrow,
    headline: copy.headline,
    subline: copy.subline,
    body: copy.body,
    image: heroImages[styleKey],
    primaryCta: { label: 'Tisch reservieren', link: { type: 'page', href: '/kontakt' } },
    secondaryCta: { label: 'Speisekarte ansehen', link: { type: 'page', href: '/speisekarte' } }
  });
}

function homeAfterAction(styleKey: StyleKey): SectionInstance[] {
  if (styleKey === 'classic') {
    return [
      section('home-story', 'global.textImage', 3, {
        eyebrow: 'Haus',
        headline: { plain: 'Gekocht wird', accent: 'für echte Gäste.' },
        body:
          'Seit 1998 verbinden wir Handarbeit am Pass mit Tischen, an denen Familien, Paare und Teams gleichermaßen Platz finden. Unsere Küche ist offen — weil Vertrauen man am besten riecht.',
        image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=1200&q=80',
        imageSide: 'rechts',
        cta: { label: 'Unsere Geschichte', link: { type: 'page', href: '/ueber-uns' } }
      })
    ];
  }
  if (styleKey === 'modern') {
    return [
      section('home-menu-filter', 'global.filterCardGrid', 3, {
        eyebrow: 'Menü',
        headline: { plain: 'Gerichte,', accent: 'klar gefiltert.' },
        intro:
          'Wie in der offenen Küche: zuerst wählen, dann genießen. Jedes Gericht ist im Restaurant mit saisonalen Details verfügbar.',
        tabs: [
          { key: 'all', label: 'Alle' },
          { key: 'pasta', label: 'Pasta' },
          { key: 'pizza', label: 'Pizza' },
          { key: 'pesce', label: 'Pesce' }
        ],
        cards: [
          {
            image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80',
            title: 'Tagliatelle al Tartufo',
            price: '24,90 €',
            badge: 'Manufaktur',
            body: '48 h Teigruhe, Sommertrüffel, Parmigiano 24 mesi.',
            tabKey: 'pasta',
            cta: { label: 'Zum Gericht', link: { type: 'page', href: '/speisekarte/tagliatelle-al-tartufo' } }
          },
          {
            image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=900&q=80',
            title: 'Pizza Margherita DOP',
            price: '15,50 €',
            badge: 'Ofen 485 °C',
            body: 'San Marzano, Büffelmozzarella, Basilikum — 90 Sekunden im Feuer.',
            tabKey: 'pizza',
            cta: { label: 'Zum Gericht', link: { type: 'page', href: '/speisekarte/pizza-margherita-dop' } }
          },
          {
            image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80',
            title: 'Branzino al Forno',
            price: '29,00 €',
            badge: 'Tagesfang',
            body: 'Wolfsbarsch, Zitrone, Rosmarin — leicht und klar.',
            tabKey: 'pesce',
            cta: { label: 'Zum Gericht', link: { type: 'page', href: '/speisekarte/branzino-al-forno' } }
          },
          {
            image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80',
            title: 'Bucatini all’Amatriciana',
            price: '18,50 €',
            badge: 'Klassiker',
            body: 'Guanciale, Pecorino, sanfter Schärfe-Kick.',
            tabKey: 'pasta',
            cta: { label: 'Speisekarte', link: { type: 'page', href: '/speisekarte' } }
          },
          {
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80',
            title: 'Diavola',
            price: '17,00 €',
            badge: 'Scharf',
            body: 'Salami ventricina, Honig-Finish optional.',
            tabKey: 'pizza',
            cta: { label: 'Speisekarte', link: { type: 'page', href: '/speisekarte' } }
          },
          {
            image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80',
            title: 'Orata al cartoccio',
            price: '32,00 €',
            badge: 'Saison',
            body: 'Mit Gemüse aus dem Ofen — für zwei zum Teilen.',
            tabKey: 'pesce',
            cta: { label: 'Speisekarte', link: { type: 'page', href: '/speisekarte' } }
          },
          {
            image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=900&q=80',
            title: 'Antipasti della Casa',
            price: 'für den Tisch',
            badge: 'Sharing',
            body: 'Crudo, Gemüse, Öl — der Einstieg ohne Schwere.',
            tabKey: 'all',
            cta: { label: 'Erlebnisse', link: { type: 'page', href: '/erlebnisse' } }
          },
          {
            image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80',
            title: 'Calzone ripieno',
            price: '16,50 €',
            badge: 'Ofen',
            body: 'Ricotta, Spinat, Mozzarella — knusprig außen, dampfend innen.',
            tabKey: 'pizza',
            cta: { label: 'Speisekarte', link: { type: 'page', href: '/speisekarte' } }
          }
        ],
        initialVisible: 6,
        loadMoreLabel: 'Mehr Gerichte'
      }),
      section('home-split-cta', 'global.splitCtaBand', 4, {
        eyebrow: 'Heute Abend',
        headline: { plain: 'Tisch', accent: 'mit Aussicht?' },
        subline:
          'Bar, Saal oder Fensterplatz — wir melden uns mit einem konkreten Vorschlag und halten kurzfristig den Tresen frei, wenn es passt.',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=82',
        imageSide: 'links',
        cta: { label: 'Reservierung anfragen', link: { type: 'page', href: '/kontakt' } }
      })
    ];
  }
  return [
    section('home-ribbon', 'global.ribbonCta', 3, {
      message: 'Freitag & Samstag: wenige Walk-in-Plätze an der Bar — wer spontan ist, soll kurz anrufen.',
      cta: { label: 'Jetzt reservieren', link: { type: 'page', href: '/kontakt' } }
    }),
    section('home-spot', 'global.mediaSpotlight', 4, {
      eyebrow: 'Tonight',
      headline: { plain: 'Küche', accent: 'im Scheinwerfer.' },
      subline: 'Pass, Flammen, Hände — der Moment, bevor der Teller kommt.',
      image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1400&q=82',
      mood: 'stark',
      primaryCta: { label: 'Tisch sichern', link: { type: 'page', href: '/kontakt' } },
      secondaryCta: { label: 'Menü', link: { type: 'page', href: '/speisekarte' } }
    }),
    section('home-marquee', 'global.quoteMarquee', 5, {
      eyebrow: 'Stimmen',
      headline: { plain: 'Laut', accent: 'geliebt.' },
      items: [
        { quote: '„Hier wird noch für Geschmack gekocht.“', name: 'Gast', role: 'Google' },
        { quote: '„Der Ofen ist eine Religion.“', name: 'Stammgast', role: 'Innsbruck' },
        { quote: '„Pasta wie in Bologna — ohne Flug.“', name: 'Food-Bloggerin', role: 'München' }
      ]
    })
  ];
}

function homeClosing(styleKey: StyleKey): SectionInstance[] {
  const dishes = section('home-dishes', 'restaurant.menuHighlights', 0, {
    eyebrow: 'Empfehlungen',
    headline: { plain: 'Unsere', accent: 'Karte.' },
    intro: 'Eine kleine Auswahl aus unserer aktuellen Küche.',
    items: ['dish-tagliatelle', 'dish-margherita', 'dish-branzino']
  });
  const experiences = section('home-experiences', 'restaurant.diningExperiences', 0, {
    eyebrow: 'Erlebnisse',
    headline: { plain: 'Abende, die', accent: 'bleiben.' },
    intro: 'Ob Weinabend oder Familien-Sonntag: diese Formate bringen Menschen an einen Tisch.',
    items: ['experience-wine', 'experience-family']
  });
  const testimonials = section('home-testimonials', 'global.testimonials', 0, {
    eyebrow: styleKey === 'modern' ? 'Reviews' : 'Stimmen',
    headline:
      styleKey === 'modern'
        ? { plain: 'Liebe zum', accent: 'Detail.' }
        : { plain: 'Was unsere', accent: 'Gäste sagen.' },
    items: [
      {
        quote: 'Ein Geheimtipp. Wir machen extra einen Umweg, wenn wir in Tirol sind.',
        name: 'Markus W.',
        role: 'Google · München',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=72'
      },
      {
        quote: 'Tolle Pasta, herzliche Bedienung und faire Preise. Unsere Kinder lieben Giulia.',
        name: 'Familie Berger',
        role: 'Stammgäste · Innsbruck',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=72'
      },
      {
        quote: 'Authentisch wie selten. Die Trüffel-Tagliatelle ist legendär.',
        name: 'Andrea L.',
        role: 'Bozen',
        rating: 4,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=72'
      }
    ]
  });
  const cta = section('home-cta', 'global.contactCta', 0, {
    eyebrow: 'Reservierung',
    headline: { plain: 'Heute Abend noch', accent: 'einen Tisch?' },
    subline: 'Schreiben Sie uns oder reservieren Sie direkt telefonisch.',
    cta: { label: 'Kontakt aufnehmen', link: { type: 'page', href: '/kontakt' } }
  });

  if (styleKey === 'bold') {
    return [dishes, experiences, cta];
  }
  return [dishes, experiences, testimonials, cta];
}

function buildHomeSections(styleKey: StyleKey): SectionInstance[] {
  const action = section('home-action', 'global.actionBar', 2, {
    useOpeningHours: true,
    statusOverride: 'Heute geöffnet',
    primaryCta: { label: 'Reservieren', link: { type: 'page', href: '/kontakt' } },
    secondaryCta: { label: 'Anrufen', link: { type: 'phone', href: '+435121234567' } }
  });
  return orderSections([homeHero(styleKey), action, ...homeAfterAction(styleKey), ...homeClosing(styleKey)]);
}

function buildMenuSections(styleKey: StyleKey): SectionInstance[] {
  const head = section('menu-head', 'global.pageHeader', 1, {
    eyebrow: 'Menü',
    headline: { plain: 'Speisekarte', accent: 'zum Teilen.' },
    subline: 'Hausgemachte Pasta, Holzofenpizza und Antipasti — täglich frisch.',
    image: heroImages[styleKey]
  });
  const intro = section('menu-intro', 'global.introBlock', 2, {
    eyebrow: 'Philosophie',
    headline: { plain: 'Was auf dem', accent: 'Teller landet.' },
    body:
      'Unsere Karte folgt dem Rhythmus der Jahreszeiten: kurze Wege, klare Zutaten, viel Handarbeit. Die folgenden Gerichte sind eine Auswahl — im Restaurant finden Sie die volle Karte inklusive Tagesangeboten.',
    facts: [
      { label: 'Manufaktur', value: 'Pasta täglich frisch' },
      { label: 'Ofen', value: 'Neapel · 485 °C' },
      { label: 'Weinkeller', value: '120+ Positionen' }
    ]
  });
  const grid = section('menu-grid', 'restaurant.menuHighlights', 3, {
    eyebrow: 'Gerichte',
    headline: { plain: 'Aus der', accent: 'Küche.' },
    intro: 'Alle Signature-Gerichte mit Preisen und Bildern — klicken Sie für Details.',
    items: ['dish-tagliatelle', 'dish-margherita', 'dish-branzino']
  });

  const menuFilter = section('menu-filter', 'global.filterCardGrid', 3, {
    eyebrow: 'Die Karte',
    headline: { plain: 'Alles auf', accent: 'einen Blick.' },
    intro: 'Filter nach Linie — die Karten sind vollständig im CMS steuerbar.',
    tabs: [
      { key: 'all', label: 'Alle' },
      { key: 'pasta', label: 'Pasta' },
      { key: 'pizza', label: 'Pizza' },
      { key: 'pesce', label: 'Pesce' }
    ],
    cards: [
      {
        image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80',
        title: 'Tagliatelle al Tartufo',
        price: '24,90 €',
        badge: 'Signature',
        body: 'Trüffel, Butter, Parmigiano — reduziert auf das Wesentliche.',
        tabKey: 'pasta',
        cta: { label: 'Details', link: { type: 'page', href: '/speisekarte/tagliatelle-al-tartufo' } }
      },
      {
        image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=900&q=80',
        title: 'Pizza Margherita DOP',
        price: '15,50 €',
        badge: 'Ofen',
        body: 'Klassiker, täglich frisch aus dem Neapel-Setup.',
        tabKey: 'pizza',
        cta: { label: 'Details', link: { type: 'page', href: '/speisekarte/pizza-margherita-dop' } }
      },
      {
        image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80',
        title: 'Branzino al Forno',
        price: '29,00 €',
        badge: 'Fisch',
        body: 'Zitrone, Olivenöl, Kräuter — leicht und klar.',
        tabKey: 'pesce',
        cta: { label: 'Details', link: { type: 'page', href: '/speisekarte/branzino-al-forno' } }
      },
      {
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80',
        title: 'Bucatini all’Amatriciana',
        price: '18,50 €',
        badge: 'Roman',
        body: 'Guanciale, Pecorino — die süße Schärfe am Ende.',
        tabKey: 'pasta',
        cta: { label: 'Speisekarte', link: { type: 'page', href: '/speisekarte' } }
      },
      {
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80',
        title: 'Pizza Diavola',
        price: '17,00 €',
        badge: 'Scharf',
        body: 'San Marzano, Salami, Chili — optional mit Honig.',
        tabKey: 'pizza',
        cta: { label: 'Speisekarte', link: { type: 'page', href: '/speisekarte' } }
      },
      {
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80',
        title: 'Orata al cartoccio',
        price: '32,00 €',
        badge: 'Sharing',
        body: 'Im Pergament mit Marktgemüse — für zwei.',
        tabKey: 'pesce',
        cta: { label: 'Speisekarte', link: { type: 'page', href: '/speisekarte' } }
      }
    ],
    initialVisible: 6,
    loadMoreLabel: 'Weitere anzeigen'
  });

  const menuSplit = section('menu-split-cta', 'global.splitCtaBand', 4, {
    eyebrow: 'Service',
    headline: { plain: 'Allergien &', accent: 'Wünsche.' },
    subline: 'Bei der Reservierung kurz Bescheid — Küche und Service stimmen Menü und Rhythmus vorab mit euch ab.',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=82',
    imageSide: 'rechts',
    cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
  });

  const scroller = section('menu-scroller', 'global.scrollerHighlights', 4, {
    eyebrow: 'Besonderheiten',
    headline: { plain: 'Drei Gründe', accent: 'vorbeizukommen.' },
    intro: 'Kurz & knackig: was uns von anderen unterscheidet.',
    slides: [
      {
        image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=900&q=80',
        title: 'Holzofen aus Neapel',
        body: 'Pizza in 90 Sekunden bei 485 °C — knusprig, luftig, authentisch.',
        cta: { label: 'Pizza ansehen', link: { type: 'page', href: '/speisekarte' } }
      },
      {
        image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80',
        title: 'Pasta frisch täglich',
        body: 'Eigene Manufaktur, lange Teigruhe, Saucen aus dem Sud.',
        cta: { label: 'Erlebnisse', link: { type: 'page', href: '/erlebnisse' } }
      },
      {
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=80',
        title: 'Wein & Natur',
        body: 'Über 120 Positionen — Schwerpunkt Italien & Alpen.',
        cta: { label: 'Weinabend', link: { type: 'page', href: '/erlebnisse' } }
      }
    ]
  });

  const bento = section('menu-bento', 'global.bentoHighlights', 4, {
    eyebrow: 'Menü-Logik',
    headline: { plain: 'Vom', accent: 'Aperitivo bis Dolce.' },
    items: [
      {
        kicker: 'Start',
        title: 'Antipasti & Crudo',
        body: 'Leicht, salzig, zum Teilen — der Einstieg ohne Schwere.',
        image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=900&q=80',
        layoutSpan: '2'
      },
      {
        kicker: 'Mitte',
        title: 'Pasta & Ofen',
        body: 'Manufaktur-Teig, Saucen aus dem Sud — und Pizza in 90 Sekunden.',
        image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=900&q=80',
        layoutSpan: '1'
      },
      {
        kicker: 'Finish',
        title: 'Dolce & Digestivo',
        body: 'Klassiker und saisonale Tarte — nie zu süß.',
        image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=80',
        layoutSpan: '1'
      }
    ]
  });

  const asymmetric = section('menu-asym', 'global.asymmetricSpot', 5, {
    eyebrow: 'Ofen',
    headline: { plain: 'Hitzewelle,', accent: 'Ruhe am Teller.' },
    body: 'Der Ofen ist das Herzstück: Temperatur, Timing, Teigführung — alles trainiert, nichts zufällig. Deshalb schmeckt jede Pizza gleich — und trotzdem lebendig.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
    imageSide: 'left'
  });

  const deep = section('menu-deep', 'restaurant.deepDives', 0, {
    eyebrow: 'Küche & Herkunft',
    headline: { plain: 'Storys', accent: 'vom Teller.' },
    intro: 'Produzenten, Pairings und Hintergründe — alles im CMS als eigene Storys gepflegt.'
  });
  const faq = section('menu-faq', 'global.faq', 0, {
    eyebrow: 'Gastronomie',
    headline: { plain: 'Häufige', accent: 'Fragen.' },
    items: [
      {
        question: 'Könnt ihr Allergien berücksichtigen?',
        answer: 'Ja. Bitte bei Reservierung oder beim Service Bescheid sagen — unsere Küche trennt Arbeitsgänge und kann auf Gluten, Laktose und Nüsse Rücksicht nehmen.'
      },
      {
        question: 'Gibt es eine Kinderkarte?',
        answer: 'Wir haben kleinere Portionen und Pasta-Formen, die Kinder lieben. Fragt einfach das Team am Tisch.'
      },
      {
        question: 'Wie lange im Voraus reservieren?',
        answer: 'Am Wochenende empfehlen wir 3–5 Tage Vorlauf. Unter der Woche oft auch spontan möglich.'
      }
    ]
  });
  const cta = section('menu-cta', 'global.contactCta', 0, {
    eyebrow: 'Reservierung',
    headline: { plain: 'Tisch', accent: 'für heute?' },
    subline: 'Wir halten Ihnen gern einen Platz frei.',
    cta: { label: 'Kontakt & Anfahrt', link: { type: 'page', href: '/kontakt' } }
  });

  if (styleKey === 'classic') {
    return orderSections([head, intro, grid, scroller, deep, faq, cta]);
  }
  if (styleKey === 'modern') {
    return orderSections([head, intro, menuFilter, grid, menuSplit, deep, faq, cta]);
  }
  return orderSections([head, intro, grid, scroller, asymmetric, deep, faq, cta]);
}

function buildExperiencesSections(styleKey: StyleKey): SectionInstance[] {
  const head = section('exp-head', 'global.pageHeader', 1, {
    eyebrow: 'Events',
    headline: { plain: 'Abende, die', accent: 'bleiben.' },
    subline: 'Wein, Familie, langer Tisch — unsere Formate mit Charakter.',
    image: heroImages[styleKey]
  });
  const intro = section('exp-intro', 'global.introBlock', 2, {
    eyebrow: 'Erlebnisse',
    headline: { plain: 'Formate mit', accent: 'Persönlichkeit.' },
    body:
      'Jedes Event hat eine eigene Dramaturgie: Weinbegleitung, Menüverlauf und Raum — abgestimmt auf Ihre Gruppe. Unten finden Sie unsere festen Formate; für Firmen und Feiern planen wir gern individuell.',
    facts: [
      { label: 'Kapazität', value: 'bis 48 Gäste' },
      { label: 'Planung', value: '4–8 Wochen Vorlauf' },
      { label: 'Menü', value: 'vegetarisch möglich' }
    ]
  });

  const media = section('exp-media', 'global.mediaSpotlight', 3, {
    eyebrow: 'Stimmung',
    headline: { plain: 'Licht,', accent: 'langer Tisch.' },
    subline: 'Weinabend oder Familien-Sonntag — wir inszenieren den Raum, nicht die Gäste.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1400&q=82',
    mood: styleKey === 'bold' ? 'stark' : 'soft',
    primaryCta: { label: 'Format anfragen', link: { type: 'page', href: '/kontakt' } },
    secondaryCta: { label: 'Speisekarte', link: { type: 'page', href: '/speisekarte' } }
  });

  const icons = section('exp-icons', 'global.iconHighlights', 3, {
    eyebrow: 'Service',
    headline: { plain: 'Was ihr', accent: 'spürt.' },
    intro: 'Kurz erklärt — ohne Marketing-Blabla.',
    items: [
      {
        icon: '①',
        title: 'Beratung',
        body: 'Wir hören Anlass, Budget, Allergien — und schlagen Menü & Getränke vor.',
        cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
      },
      {
        icon: '②',
        title: 'Raum',
        body: 'Saal, Bar, Terrasse — Tischformationen für Gespräch oder Party.',
        cta: { label: 'Galerie', link: { type: 'page', href: '/galerie' } }
      },
      {
        icon: '③',
        title: 'Timing',
        body: 'Ablauf mit Puffer — damit Küche und Service im Takt bleiben.',
        cta: { label: 'Ablauf', link: { type: 'page', href: '/erlebnisse' } }
      }
    ]
  });

  const grid = section('exp-grid', 'restaurant.diningExperiences', 0, {
    eyebrow: 'Kalender',
    headline: { plain: 'Unsere', accent: 'Erlebnisse.' },
    intro: 'Klicken Sie für Details und Buchungsweg.',
    items: ['experience-wine', 'experience-family']
  });

  const steps = section('exp-steps', 'global.stepsStrip', 0, {
    eyebrow: 'Buchung',
    headline: { plain: 'So läuft', accent: 'Ihre Anfrage.' },
    steps: [
      { label: '1', title: 'Kurz beschreiben', body: 'Anlass, Personenzahl, Wunschdatum und Budgetrahmen per Mail oder Telefon.' },
      { label: '2', title: 'Menü & Raum', body: 'Wir schlagen Menüfolge, Getränke und Tischformation vor — bis alles passt.' },
      { label: '3', title: 'Fixierung', body: 'Schriftliche Bestätigung mit Anzahlung — danach blocken wir Küche und Personal.' }
    ]
  });

  const timeline = section('exp-timeline', 'global.storyTimeline', 0, {
    eyebrow: 'Ein Abend',
    headline: { plain: 'Vom', accent: 'Aperitivo bis zum Digestif.' },
    steps: [
      { label: 'Willkommen', title: 'Empfang am Tresen', body: 'Erster Drink, erste Empfehlung — wir nehmen Tempo und Tischwunsch auf.' },
      { label: 'Mitte', title: 'Gänge & Wein', body: 'Service im Rhythmus der Küche — Pausen, wenn das Gespräch es will.' },
      { label: 'Höhepunkt', title: 'Hauptgang & Ofen', body: 'Pasta oder Pizza aus dem Feuer — je nach Menülinie.' },
      { label: 'Abschluss', title: 'Dolce & Digestivo', body: 'Klein, süß, ehrlich — und ein Abschied, der nach „bald“ schmeckt.' }
    ]
  });

  const deep = section('exp-deep', 'restaurant.deepDives', 0, {
    eyebrow: 'Hintergrund',
    headline: { plain: 'Mehr', accent: 'zum Erlebnis.' },
    intro: 'Wein, Menülogik und Abläufe — als kurze Storys für Gäste und Planer:innen.'
  });
  const cta = section('exp-cta', 'global.contactCta', 0, {
    eyebrow: 'Planung',
    headline: { plain: 'Privat oder', accent: 'geschlossene Gesellschaft?' },
    subline: 'Wir beraten Sie gern zu Kapazität, Menü und Timing.',
    cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
  });

  if (styleKey === 'classic') {
    return orderSections([head, intro, grid, timeline, deep, cta]);
  }
  if (styleKey === 'modern') {
    return orderSections([head, intro, icons, grid, steps, deep, cta]);
  }
  return orderSections([head, intro, media, grid, steps, deep, cta]);
}

function buildGallerySections(styleKey: StyleKey): SectionInstance[] {
  const head = section('gallery-head', 'global.pageHeader', 1, {
    eyebrow: 'Impressionen',
    headline: { plain: 'Licht, Holz', accent: 'und Teller.' },
    subline: 'Ein Blick in unsere Küche, den Saal und die Details, die den Abend ausmachen.',
    image: heroImages[styleKey]
  });
  const intro = section('gallery-intro', 'global.introBlock', 2, {
    eyebrow: 'Raum',
    headline: { plain: 'Ein Haus', accent: 'für lange Abende.' },
    body:
      'Zwischen Holzofen, Bar und Saal entsteht ein fließender Raum — mal laut und festlich, mal leise und intim. Die Galerie zeigt Momente aus dem Alltag der Trattoria, nicht nur inszenierte Shots.',
    facts: [
      { label: 'Saal', value: '52 Plätze' },
      { label: 'Bar', value: 'Walk-in' },
      { label: 'Terrasse', value: 'Saisonal' }
    ]
  });
  const grid = section('gallery-grid', 'global.galleryGrid', 3, {
    eyebrow: 'Rundgang',
    headline: { plain: 'Momente', accent: 'am Tisch.' },
    images: [
      { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80', alt: 'Gedeckter Tisch' },
      { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80', alt: 'Service' },
      { url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80', alt: 'Bar' },
      { url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80', alt: 'Holzofen' },
      { url: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1200&q=80', alt: 'Antipasti' },
      { url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1200&q=80', alt: 'Pasta' }
    ]
  });
  const carousel = section('gallery-carousel', 'global.imageCarousel', 4, {
    eyebrow: 'Stimmung',
    headline: { plain: 'Ein Abend', accent: 'in Bildern.' },
    intro:
      styleKey === 'classic'
        ? 'Langsam scrollen, Texte lesen — so stellt ihr emotionale Galerien im CMS zusammen.'
        : styleKey === 'modern'
          ? 'Karussell + Raster: zwei Lesarten derselben Location — strukturiert im CMS.'
          : 'Vollformat, starke Captions — für Abende, die man spürt, bevor man reserviert.',
    slides: [
      {
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=82',
        alt: 'Gäste im Restaurant',
        title: 'Tisch im Saal',
        body: 'Abendlicht, Leinen, Gespräch — der Raum, in dem unsere Gäste am längsten bleiben.',
        cta: { label: 'Reservieren', link: { type: 'page', href: '/kontakt' } }
      },
      {
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=82',
        alt: 'Bar mit Flaschen',
        title: 'Bar & Aperitivo',
        body: 'Kurze Wege zwischen Küche und Bar — perfekt für den ersten Drink.',
        cta: { label: 'Speisekarte', link: { type: 'page', href: '/speisekarte' } }
      },
      {
        image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1400&q=82',
        alt: 'Ofen und Pizza',
        title: 'Holzofen',
        body: 'Neapel-Technik, lokaler Teig — Hitze, die man fast hören kann.',
        cta: { label: 'Erlebnisse', link: { type: 'page', href: '/erlebnisse' } }
      }
    ]
  });
  const scroller = section('gallery-scroller', 'global.scrollerHighlights', 5, {
    eyebrow: 'Küche & Saal',
    headline: { plain: 'Hinter den', accent: 'Kulissen.' },
    intro: 'Wo gekocht, gegossen und gelacht wird — ein Blick in unsere Räume.',
    slides: [
      {
        image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=900&q=80',
        title: 'Pass',
        body: 'Handgemachte Pasta, täglich frisch gewalzt.',
        cta: { label: 'Speisekarte', link: { type: 'page', href: '/speisekarte' } }
      },
      {
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80',
        title: 'Service',
        body: 'Aufmerksam, persönlich, ohne aufdringlich zu sein.',
        cta: { label: 'Reservieren', link: { type: 'page', href: '/kontakt' } }
      },
      {
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80',
        title: 'Ambiente',
        body: 'Holz, Leinen, Kerzen — Abende, die länger werden dürfen.',
        cta: { label: 'Erlebnisse', link: { type: 'page', href: '/erlebnisse' } }
      }
    ]
  });
  const stats = section('gallery-stats', 'global.statsBand', 5, {
    eyebrow: 'Zahlen',
    headline: { plain: 'Raum', accent: 'in Kennzahlen.' },
    items: [
      { value: '52', label: 'Sitzplätze', hint: 'Saal + Bar' },
      { value: '485°', label: 'Ofen', hint: 'Neapel-Setup' },
      { value: '120+', label: 'Weine', hint: 'Karte' },
      { value: '1998', label: 'Seit', hint: 'Familie' }
    ]
  });
  const quotes = section('gallery-quotes', 'global.quoteMarquee', 5, {
    eyebrow: 'Stimmen',
    headline: { plain: 'Nachts', accent: 'noch mehr Flamme.' },
    items: [
      { quote: '„Hier riecht es nach echter Küche.“', name: 'Gast', role: 'Innsbruck' },
      { quote: '„Die Bar ist unser zweites Wohnzimmer.“', name: 'Stammgast', role: 'Stadt' },
      { quote: '„Pizza wie ein Donnerschlag — im positiven Sinne.“', name: 'Besuch', role: 'Wochenende' },
      { quote: '„Wir kommen für den Ofen, bleiben für das Team.“', name: 'Familie', role: 'Stamm' }
    ]
  });
  const deep = section('gallery-deep', 'restaurant.deepDives', 0, {
    eyebrow: 'Kulinarik',
    headline: { plain: 'Details', accent: 'die zählen.' },
    intro: 'Produzenten, Saison und Pairings — tiefer als die reine Galerie.'
  });
  const cta = section('gallery-cta', 'global.contactCta', 0, {
    eyebrow: 'Reservierung',
    headline: { plain: 'Selbst', accent: 'vorbeischauen?' },
    subline: 'Wir freuen uns, wenn Sie live statt nur auf Fotos neugierig werden.',
    cta: { label: 'Kontakt & Anfahrt', link: { type: 'page', href: '/kontakt' } }
  });

  if (styleKey === 'classic') {
    return orderSections([head, intro, grid, carousel, scroller, deep, cta]);
  }
  if (styleKey === 'modern') {
    return orderSections([head, intro, grid, carousel, stats, deep, cta]);
  }
  return orderSections([head, intro, grid, carousel, quotes, deep, cta]);
}

function buildAboutSections(styleKey: StyleKey): SectionInstance[] {
  const head = section('about-head', 'global.pageHeader', 1, {
    eyebrow: 'Geschichte',
    headline: { plain: 'Aus Leidenschaft', accent: 'für Gäste.' },
    subline: 'Was als kleine Osteria begann, ist heute ein Haus voller Stimmen, Düfte und langen Abenden.',
    image: ''
  });
  const intro = section('about-intro', 'global.introBlock', 2, {
    eyebrow: 'Über uns',
    headline: { plain: 'Zwei Generationen', accent: 'ein Tisch.' },
    body:
      'Giulia und Marco führen die Trattoria in zweiter Generation. Wir glauben an Handarbeit, ehrliche Preise und Gäste, die wiederkommen — nicht wegen eines Trends, sondern weil es sich wie Zuhause anfühlt.',
    facts: [
      { label: 'Seit', value: '1998' },
      { label: 'Team', value: '28 Menschen' },
      { label: 'Lieferanten', value: 'regional' }
    ]
  });

  const asym = section('about-asym', 'global.asymmetricSpot', 3, {
    eyebrow: 'Handschrift',
    headline: { plain: 'Küche,', accent: 'die man spürt.' },
    body: 'Keine Showküche fürs Auge — sondern eine, in der man Dämpfe, Hitzeschwallen und Lachen hört. Wir kochen, was wir selbst essen würden.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    imageSide: 'right'
  });

  const storyClassic = section('about-story', 'global.textImage', 0, {
    eyebrow: 'Team',
    headline: { plain: 'Küche mit', accent: 'Herz.' },
    body:
      'Unsere Manufaktur arbeitet in kleinen Chargen: Teigruhe über Nacht, Saucen aus dem Sud, Kräuter aus dem eigenen Hochbeet. Gäste schauen gern in die offene Küche — wir erklären Schritte am Tresen und lassen probieren, wenn es passt.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    imageSide: 'links',
    cta: { label: 'Stellen & Praktika', link: { type: 'page', href: '/kontakt' } }
  });
  const storyModern = section('about-story', 'global.textImage', 0, {
    eyebrow: 'Operations',
    headline: { plain: 'Küche als', accent: 'System.' },
    body:
      'Chargen, Temperaturen, Ruhezeiten — dokumentiert, aber nicht steril. Gäste sehen Rhythmus statt Chaos: das ist unser Qualitätsversprechen.',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=1200&q=80',
    imageSide: 'rechts',
    cta: { label: 'Speisekarte', link: { type: 'page', href: '/speisekarte' } }
  });

  const facts = section('about-facts', 'global.keyFactsGrid', 0, {
    eyebrow: 'Fakten',
    headline: { plain: 'Auf einen', accent: 'Blick.' },
    items: [
      { icon: '⌂', title: 'Standort', detail: 'Innsbruck Zentrum — 8 Gehminuten vom Goldenen Dachl.' },
      { icon: '☼', title: 'Öffnung', detail: '11:30–22:30 — Küche durchgehend, Sonntags Familienformat.' },
      { icon: '✎', title: 'Reservierung', detail: 'Online-Anfrage oder Telefon — Antwort meist am selben Tag.' }
    ]
  });

  const film = section('about-film', 'global.richArticle', 0, {
    eyebrow: 'Ein Blick hinein',
    headline: { plain: 'Küche,', accent: 'die man hört.' },
    content:
      'Wenn der Ofen auf Temperatur ist und der Teig ruht, riecht der ganze Block nach Basilikum und Hefe. In diesem kurzen Film begleiten Sie unser Team durch den Pass — von der ersten Rolle bis zum letzten Teller am Fenster.'
  });
  const video = section('about-video', 'global.videoEmbed', 0, {
    eyebrow: 'Film',
    headline: { plain: 'Hinter', accent: 'den Kulissen.' },
    embedUrl: 'https://www.youtube.com/watch?v=1IszT_guI08',
    caption: 'Impressionen aus Küche und Service — kein kommerzieller Trailer, sondern echte Arbeit.'
  });
  const pull = section('about-pull', 'global.pullQuote', 0, {
    quote: '„Gutes Essen braucht keine Erklärung — nur ehrliche Hände.“',
    attribution: 'Marco',
    role: 'Küche · Trattoria Flamingo'
  });
  const deep = section('about-deep', 'restaurant.deepDives', 0, {
    eyebrow: 'Transparenz',
    headline: { plain: 'Was wir', accent: 'erzählen.' },
    intro: 'Herkunft, Produzenten und Entscheidungen aus der Küche — für Gäste, die mehr wissen wollen.'
  });
  const voices = section('about-voices', 'global.testimonials', 0, {
    eyebrow: 'Teamstimmen',
    headline: { plain: 'Warum wir', accent: 'hier sind.' },
    items: [
      { quote: 'Jeder Service ist anders — hier darf man langsamer werden.', name: 'Sofia, Service' },
      { quote: 'Wenn der Ofen warm ist und der Teig ruht, fühlt sich der Tag richtig an.', name: 'Lorenzo, Pizza' },
      { quote: 'Wir kochen, was wir selbst essen würden. Punkt.', name: 'Marco, Küche' }
    ]
  });
  const faq = section('about-faq', 'global.faq', 0, {
    eyebrow: 'Gastgeber',
    headline: { plain: 'Das wollen', accent: 'wir sein.' },
    items: [
      {
        question: 'Was bedeutet „Trattoria“ für euch?',
        answer: 'Ein Ort, an dem man nicht perfekt sein muss — aber gut essen und laut lachen darf. Familien willkommen, Hunde auf der Terrasse, kein Dresscode.'
      },
      {
        question: 'Wie unterstützt ihr regionale Produzenten?',
        answer: 'Wir kaufen Gemüse, Käse und Wein überwiegend aus Tirol und Südtirol; für Spezialitäten aus Italien arbeiten wir mit Importeuren, die kleine Betriebe kennen.'
      }
    ]
  });
  const cta = section('about-cta', 'global.contactCta', 0, {
    eyebrow: 'Besuch',
    headline: { plain: 'Kommen Sie', accent: 'vorbei.' },
    subline: 'Reservierung, Feier oder Frage — wir freuen uns auf Ihre Nachricht.',
    cta: { label: 'Kontakt & Anfahrt', link: { type: 'page', href: '/kontakt' } }
  });

  if (styleKey === 'classic') {
    return orderSections([head, intro, storyClassic, film, pull, video, deep, voices, faq, cta]);
  }
  if (styleKey === 'modern') {
    return orderSections([head, intro, facts, storyModern, film, deep, voices, faq, cta]);
  }
  return orderSections([head, intro, asym, storyClassic, film, video, pull, deep, voices, faq, cta]);
}

function buildContactSections(styleKey: StyleKey): SectionInstance[] {
  const head = section('contact-head', 'global.pageHeader', 1, {
    eyebrow: 'Kontakt',
    headline: { plain: 'Wir freuen uns', accent: 'auf Sie.' },
    subline: 'Reservierungen, Feiern und Fragen — schreiben Sie uns oder rufen Sie an.',
    image: ''
  });

  const blockClassic = section('contact-block', 'global.textImage', 2, {
    eyebrow: 'Lokal',
    headline: { plain: 'Trattoria', accent: 'Flamingo.' },
    body: 'Maria-Theresien-Straße 12, 6020 Innsbruck\nTelefon +43 512 123 4567\nciao@trattoria-flamingo.test',
    image: heroImages[styleKey],
    imageSide: 'rechts',
    cta: { label: 'Route planen', link: { type: 'page', href: '/kontakt' } }
  });

  const blockModern = section('contact-block', 'global.introBlock', 2, {
    eyebrow: 'Kontakt',
    headline: { plain: 'Schnell', accent: 'erreichen.' },
    body: 'Zentrale Lage, klare Öffnungszeiten, direkte Kanäle — ideal für spontane Reservierungen und Event-Anfragen.',
    facts: [
      { label: 'Telefon', value: '+43 512 123 4567' },
      { label: 'Mail', value: 'ciao@…' },
      { label: 'Antwort', value: 'meist same day' }
    ]
  });

  const ribbon = section('contact-ribbon', 'global.ribbonCta', 0, {
    message: 'Gruppen ab 8 Personen: bitte kurz Vorlauf nennen — wir melden uns mit Menüvorschlag und Raumoption.',
    cta: { label: 'Event anfragen', link: { type: 'page', href: '/erlebnisse' } }
  });

  const map = section('contact-map', 'global.mapContact', 0, {
    eyebrow: 'Anfahrt',
    headline: { plain: 'Mitten', accent: 'in Innsbruck.' },
    subline: '',
    openingHours: 'Täglich 11:30–22:30'
  });
  const faq = section('contact-faq', 'global.faq', 0, {
    eyebrow: 'Kontakt',
    headline: { plain: 'Häufige', accent: 'Fragen.' },
    items: [
      {
        question: 'Wie reserviere ich am schnellsten?',
        answer: 'Telefonisch oder per E-Mail — wir bestätigen den Tisch und halten bei Bedarf einen Hinweis zu Allergien fest.'
      },
      {
        question: 'Kann ich mit dem Auto vorfahren?',
        answer: 'Ja; öffentliche Parkhäuser sind fußläufig erreichbar. Details finden Sie in der Karte unten.'
      }
    ]
  });
  const cta = section('contact-cta', 'global.contactCta', 0, {
    eyebrow: 'Reservierung',
    headline: { plain: 'Schreiben Sie', accent: 'uns.' },
    subline: 'Wir antworten schnell und unkompliziert.',
    cta: { label: 'E-Mail senden', link: { type: 'page', href: '/kontakt' } }
  });

  if (styleKey === 'classic') {
    return orderSections([head, blockClassic, map, faq, cta]);
  }
  if (styleKey === 'modern') {
    return orderSections([head, blockModern, map, faq, cta]);
  }
  return orderSections([head, blockClassic, map, ribbon, faq, cta]);
}

export function restaurantSeed(styleKey: StyleKey): SiteSeed {
  return {
    tenantName: 'Trattoria Flamingo',
    industryKey: 'restaurant',
    styleKey,
    global: {
      brand: {
        name: 'Trattoria Flamingo',
        tagline: 'Cucina italiana im Herzen der Stadt'
      },
      navigation: [
        { label: 'Start', href: '/' },
        { label: 'Speisekarte', href: '/speisekarte' },
        { label: 'Erlebnisse', href: '/erlebnisse' },
        { label: 'Galerie', href: '/galerie' },
        { label: 'Über uns', href: '/ueber-uns' },
        { label: 'Kontakt', href: '/kontakt' }
      ],
      contact: {
        phone: '+43 512 123 4567',
        email: 'ciao@trattoria-flamingo.test',
        address: 'Maria-Theresien-Straße 12, 6020 Innsbruck',
        openingHours: 'Täglich 11:30–22:30'
      }
    },
    collections: [
      {
        id: 'dish-tagliatelle',
        collectionKey: 'menuItem',
        title: 'Tagliatelle al Tartufo',
        slug: 'tagliatelle-al-tartufo',
        data: {
          summary: 'Hausgemachte Tagliatelle, schwarzer Sommertrüffel und Parmigiano 24 mesi.',
          price: '24,90 €',
          image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1000&q=80'
        }
      },
      {
        id: 'dish-margherita',
        collectionKey: 'menuItem',
        title: 'Pizza Margherita DOP',
        slug: 'pizza-margherita-dop',
        data: {
          summary: 'San-Marzano-Tomaten, Büffelmozzarella, Basilikum und 48-Stunden-Teig.',
          price: '15,50 €',
          image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1000&q=80'
        }
      },
      {
        id: 'dish-branzino',
        collectionKey: 'menuItem',
        title: 'Branzino al Forno',
        slug: 'branzino-al-forno',
        data: {
          summary: 'Wolfsbarsch aus dem Ofen, Zitrone, Rosmarin und sizilianisches Olivenöl.',
          price: '29,00 €',
          image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1000&q=80'
        }
      },
      {
        id: 'experience-wine',
        collectionKey: 'diningExperience',
        title: 'Weinabend am langen Tisch',
        slug: 'weinabend',
        data: {
          summary: 'Vier Gänge, passende Naturweine und persönliche Geschichten unserer Winzer:innen.',
          image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=80'
        }
      },
      {
        id: 'experience-family',
        collectionKey: 'diningExperience',
        title: 'Sonntag wie bei Nonna',
        slug: 'sonntag-wie-bei-nonna',
        data: {
          summary: 'Antipasti, Pasta aus der Manufaktur und Tiramisu nach Familienrezept.',
          image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1000&q=80'
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
          title: 'Trattoria Flamingo · Restaurant in Innsbruck',
          description: 'Handgemachte Pasta, Holzofenpizza und Naturweine.'
        },
        sections: buildHomeSections(styleKey)
      },
      {
        id: 'menu',
        key: 'menu',
        kind: 'core',
        title: 'Speisekarte',
        slug: '/speisekarte',
        seo: {
          title: 'Speisekarte · Trattoria Flamingo',
          description: 'Pasta, Pizza und saisonale Gerichte aus der Küche.'
        },
        sections: buildMenuSections(styleKey)
      },
      {
        id: 'experiences',
        key: 'experiences',
        kind: 'core',
        title: 'Erlebnisse',
        slug: '/erlebnisse',
        seo: {
          title: 'Erlebnisse · Trattoria Flamingo',
          description: 'Weinabende, Menüs und besondere Abende.'
        },
        sections: buildExperiencesSections(styleKey)
      },
      {
        id: 'gallery',
        key: 'gallery',
        kind: 'core',
        title: 'Galerie',
        slug: '/galerie',
        seo: {
          title: 'Galerie · Trattoria Flamingo',
          description: 'Raum, Küche und Tisch — Eindrücke aus dem Restaurant.'
        },
        sections: buildGallerySections(styleKey)
      },
      {
        id: 'about',
        key: 'about',
        kind: 'core',
        title: 'Über uns',
        slug: '/ueber-uns',
        seo: {
          title: 'Über uns · Trattoria Flamingo',
          description: 'Familie, Küche und Gastfreundschaft seit 1998.'
        },
        sections: buildAboutSections(styleKey)
      },
      {
        id: 'contact',
        key: 'contact',
        kind: 'core',
        title: 'Kontakt',
        slug: '/kontakt',
        seo: {
          title: 'Kontakt · Trattoria Flamingo',
          description: 'Reservierung, Anfahrt und Öffnungszeiten.'
        },
        sections: buildContactSections(styleKey)
      }
    ]
  };
}
