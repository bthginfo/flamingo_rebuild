import type { SectionInstance, StyleKey } from '../model';
import type { SiteSeed } from './model';

const heroImages: Record<StyleKey, string> = {
  classic: 'https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1800&q=82',
  modern: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1800&q=82',
  bold: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1800&q=82'
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

export function hotelSeed(styleKey: StyleKey): SiteSeed {
  return {
    tenantName: 'Hotel Flamingo Stubai',
    industryKey: 'hotel',
    styleKey,
    global: {
      brand: {
        name: 'Hotel Flamingo Stubai',
        tagline: 'Berg. Wald. Gute Nacht.'
      },
      navigation: [
        { label: 'Start', href: '/' },
        { label: 'Zimmer', href: '/zimmer' },
        { label: 'Galerie', href: '/galerie' },
        { label: 'Haus', href: '/haus' },
        { label: 'Kontakt', href: '/kontakt' }
      ],
      contact: {
        phone: '+43 5226 12345',
        email: 'aufenthalt@hotel-flamingo-stubai.test',
        address: 'Flamingoweg 3, 6167 Neustift im Stubaital'
      }
    },
    collections: [
      {
        id: 'room-berg',
        collectionKey: 'room',
        title: 'Bergblick Doppelzimmer',
        slug: 'bergblick-doppel',
        data: {
          summary: 'Hoch liegend, ruhig, mit Balkon Richtung Gletscher — ideal nach langen Touren.',
          image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80'
        }
      },
      {
        id: 'room-spa',
        collectionKey: 'room',
        title: 'Spa-Suite',
        slug: 'spa-suite',
        data: {
          summary: 'Separate Lounge, Regendusche und Zugang zum Spa-Bereich inklusive.',
          image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
        }
      },
      {
        id: 'room-family',
        collectionKey: 'room',
        title: 'Familienzimmer',
        slug: 'familienzimmer',
        data: {
          summary: 'Zwei Schlafnischen, viel Stauraum und Blick ins Tal — perfekt mit Kindern.',
          image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
        }
      },
      {
        id: 'offer-winter',
        collectionKey: 'hotelOffer',
        title: 'Winterzauber 4 Nächte',
        slug: 'winterzauber',
        data: {
          summary: 'Skipass-Partnerhotel, Abendmenü und Late-Check-out am Abreisetag.',
          image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80'
        }
      },
      {
        id: 'offer-spa',
        collectionKey: 'hotelOffer',
        title: 'Spa & Ruhe',
        slug: 'spa-ruhe',
        data: {
          summary: 'Zwei Massagebehandlungen, Saunazeiten reserviert, Prosecco auf dem Zimmer.',
          image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
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
          title: 'Hotel Flamingo Stubai · Boutique in den Bergen',
          description: 'Zimmer, Angebote und Stimmung zwischen Gletscher und Tal.'
        },
        sections: [
          section('home-hero', 'global.hero', 1, {
            eyebrow: 'Stubaital · Boutique',
            headline: { plain: 'Schlafen, wo der', accent: 'Wald leise wird.' },
            subline: 'Persönlich geführtes Haus mit regionaler Küche, kleinem Spa und vielen Wegen vor der Tür.',
            body: 'Wir reservieren gern Wander- und Skitage für Euch, packen Lunchpakete und freuen uns auf Gäste, die das Tempo selbst wählen.',
            image: heroImages[styleKey],
            primaryCta: { label: 'Zimmer ansehen', link: { type: 'page', href: '/zimmer' } },
            secondaryCta: { label: 'Galerie', link: { type: 'page', href: '/galerie' } }
          }),
          section('home-rooms', 'hotel.roomHighlights', 2, {
            eyebrow: 'Zimmer',
            headline: { plain: 'Drei', accent: 'Gründe zu bleiben.' },
            intro: 'Vom kompakten Bergblick bis zur Suite — alles mit Materialien aus der Region.',
            items: ['room-berg', 'room-spa', 'room-family']
          }),
          section('home-offers', 'hotel.offers', 3, {
            eyebrow: 'Pakete',
            headline: { plain: 'Mehr', accent: 'als Übernachtung.' },
            intro: 'Saisonale Arrangements mit dem, was unsere Gäste wirklich nutzen.',
            items: ['offer-winter', 'offer-spa']
          }),
          section('home-testimonials', 'global.testimonials', 4, {
            eyebrow: 'Gäste',
            headline: { plain: 'Was man', accent: 'spürt.' },
            items: [
              { quote: 'Endlich ein Hotel, das nicht nach Flughafen-Lounge riecht. Holz, Wolle, Ruhe.', name: 'Familie H., Köln' },
              { quote: 'Der Blick beim Frühstück war jeden Tag anders — und das Team kennt jeden Wanderweg.', name: 'Thomas R.' }
            ]
          }),
          section('home-cta', 'global.contactCta', 5, {
            eyebrow: 'Direkt',
            headline: { plain: 'Unverbindlich', accent: 'anfragen.' },
            subline: 'Wir melden uns mit Verfügbarkeit und passenden Paketen.',
            cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
          })
        ]
      },
      {
        id: 'rooms',
        key: 'rooms',
        kind: 'core',
        title: 'Zimmer',
        slug: '/zimmer',
        seo: { title: 'Zimmer · Hotel Flamingo Stubai', description: 'Zimmer, Suiten und Familienzimmer.' },
        sections: [
          section('rooms-head', 'global.pageHeader', 1, {
            eyebrow: 'Übernachten',
            headline: { plain: 'Zimmer mit', accent: 'Charakter.' },
            subline: 'Kein Standard-Katalog — jedes Zimmer hat eine eigene Geschichte.',
            image: heroImages[styleKey]
          }),
          section('rooms-grid', 'hotel.roomHighlights', 2, {
            eyebrow: 'Auswahl',
            headline: { plain: 'Unsere', accent: 'Kategorien.' },
            intro: 'Klicken Sie für Details, Ausstattung und Buchungsweg.',
            items: ['room-berg', 'room-spa', 'room-family']
          }),
          section('rooms-offers', 'hotel.offers', 3, {
            eyebrow: 'Kombinieren',
            headline: { plain: 'Mit', accent: 'Angebot.' },
            intro: 'Saisonale Pakete lassen sich mit jedem Zimmer kombinieren.',
            items: ['offer-winter', 'offer-spa']
          })
        ]
      },
      {
        id: 'gallery',
        key: 'gallery',
        kind: 'core',
        title: 'Galerie',
        slug: '/galerie',
        seo: { title: 'Galerie · Hotel Flamingo Stubai', description: 'Impressionen aus Haus und Landschaft.' },
        sections: [
          section('gal-head', 'global.pageHeader', 1, {
            eyebrow: 'Impressionen',
            headline: { plain: 'Licht, Holz', accent: 'und Weite.' },
            subline: 'Momente aus dem Haus, dem Spa und dem Tal.',
            image: heroImages[styleKey]
          }),
          section('gal-grid', 'global.galleryGrid', 2, {
            eyebrow: 'Rundgang',
            headline: { plain: 'Ein', accent: 'Atemzug.' },
            images: [
              { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80', alt: 'Lobby' },
              { url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80', alt: 'Zimmer' },
              { url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80', alt: 'Spa' },
              { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80', alt: 'Berge' }
            ]
          })
        ]
      },
      {
        id: 'about',
        key: 'about',
        kind: 'core',
        title: 'Haus',
        slug: '/haus',
        seo: { title: 'Über unser Haus · Hotel Flamingo Stubai', description: 'Geschichte, Team und Werte.' },
        sections: [
          section('about-head', 'global.pageHeader', 1, {
            eyebrow: 'Geschichte',
            headline: { plain: 'Ein Haus', accent: 'mit Rückenwind.' },
            subline: 'Seit drei Generationen Gastgeber im Tal — mit Respekt vor Natur und Nachbarn.',
            image: ''
          }),
          section('about-story', 'global.textImage', 2, {
            eyebrow: 'Familie',
            headline: { plain: 'Geführt', accent: 'von Menschen.' },
            body: 'Wir kochen, was die Bauern liefern, heizen mit Holz aus dem Tal und investieren jedes Jahr in sanfte Renovierung statt lauter Trends.',
            image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
            cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
          }),
          section('about-voices', 'global.testimonials', 3, {
            eyebrow: 'Stimmen',
            headline: { plain: 'Warum Gäste', accent: 'wiederkommen.' },
            items: [
              { quote: 'Man spürt, dass hier jemand wohnt, der das Tal wirklich liebt.', name: 'Anna & Chris' },
              { quote: 'Klein, fein, null Stress. Genau das, was wir gesucht haben.', name: 'Dr. Weber' }
            ]
          })
        ]
      },
      {
        id: 'contact',
        key: 'contact',
        kind: 'core',
        title: 'Anreise & Kontakt',
        slug: '/kontakt',
        seo: { title: 'Kontakt · Hotel Flamingo Stubai', description: 'Anfahrt, Telefon, E-Mail.' },
        sections: [
          section('contact-head', 'global.pageHeader', 1, {
            eyebrow: 'Kontakt',
            headline: { plain: 'Wir freuen uns', accent: 'auf Sie.' },
            subline: 'Reservierungen, Fragen zu Angeboten und Wegbeschreibung.',
            image: ''
          }),
          section('contact-map', 'global.mapContact', 2, {
            eyebrow: 'Anreise',
            headline: { plain: 'Mitten', accent: 'im Tal.' },
            subline: ''
          })
        ]
      }
    ]
  };
}
