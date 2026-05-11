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
          section('home-action', 'global.actionBar', 2, {
            useOpeningHours: true,
            statusOverride: 'Rezeption bis 22:00',
            primaryCta: { label: 'Zimmer anfragen', link: { type: 'page', href: '/kontakt' } },
            secondaryCta: { label: 'Angebote', link: { type: 'page', href: '/zimmer' } }
          }),
          section('home-rooms', 'hotel.roomHighlights', 3, {
            eyebrow: 'Zimmer',
            headline: { plain: 'Drei', accent: 'Gründe zu bleiben.' },
            intro: 'Vom kompakten Bergblick bis zur Suite — alles mit Materialien aus der Region.',
            items: ['room-berg', 'room-spa', 'room-family']
          }),
          section('home-offers', 'hotel.offers', 4, {
            eyebrow: 'Pakete',
            headline: { plain: 'Mehr', accent: 'als Übernachtung.' },
            intro: 'Saisonale Arrangements mit dem, was unsere Gäste wirklich nutzen.',
            items: ['offer-winter', 'offer-spa']
          }),
          section('home-stats', 'global.statsBand', 5, {
            eyebrow: 'Stubaital',
            headline: { plain: 'Zahlen,', accent: 'die zählen.' },
            items: [
              { value: '32', label: 'Zimmer & Suiten', hint: 'alle rauchfrei' },
              { value: '3', label: 'Generationen', hint: 'Familienbetrieb' },
              { value: '1.200 m²', label: 'Wellness', hint: 'Sauna & Pool' }
            ]
          }),
          section('home-testimonials', 'global.testimonials', 6, {
            eyebrow: 'Gäste',
            headline: { plain: 'Was man', accent: 'spürt.' },
            items: [
              { quote: 'Endlich ein Hotel, das nicht nach Flughafen-Lounge riecht. Holz, Wolle, Ruhe.', name: 'Familie H., Köln' },
              { quote: 'Der Blick beim Frühstück war jeden Tag anders — und das Team kennt jeden Wanderweg.', name: 'Thomas R.' }
            ]
          }),
          section('home-cta', 'global.contactCta', 7, {
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
          section('rooms-intro', 'global.introBlock', 2, {
            eyebrow: 'Buchung',
            headline: { plain: 'Check-in,', accent: 'Haustiere, Frühstück.' },
            body:
              'Hier finden Sie die wichtigsten Eckdaten, bevor Sie in die Zimmerdetails gehen — alles später auch im CMS anpassbar.',
            facts: [
              { label: 'Check-in', value: 'ab 15:00' },
              { label: 'Check-out', value: 'bis 11:00' },
              { label: 'Frühstück', value: '7:00–10:30' }
            ]
          }),
          section('rooms-grid', 'hotel.roomHighlights', 3, {
            eyebrow: 'Auswahl',
            headline: { plain: 'Unsere', accent: 'Kategorien.' },
            intro: 'Klicken Sie für Details, Ausstattung und Buchungsweg.',
            items: ['room-berg', 'room-spa', 'room-family']
          }),
          section('rooms-steps', 'global.stepsStrip', 4, {
            eyebrow: 'Reservierung',
            headline: { plain: 'Drei Schritte', accent: 'bis zur Buchung.' },
            steps: [
              { label: '1', title: 'Anfrage', body: 'Wunschzeitraum, Personen und Zimmerkategorie per Mail oder Formular.' },
              { label: '2', title: 'Angebot', body: 'Wir halten Optionen frei und schlagen passende Pakete vor.' },
              { label: '3', title: 'Bestätigung', body: 'Schriftliche Reservierung mit Anzahlung — Zugang zu Gästeportal und Wander-Tipps.' }
            ]
          }),
          section('rooms-scroll', 'global.scrollerHighlights', 5, {
            eyebrow: 'Aufenthalt',
            headline: { plain: 'Drei Gründe', accent: 'für uns.' },
            intro: 'Warum Gäste wiederkommen — kurz erklärt.',
            slides: [
              {
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
                title: 'Ruhe & Aussicht',
                body: 'Zimmer nach Süden, Balkon, Berge als Kulisse.',
                cta: { label: 'Zimmer wählen', link: { type: 'page', href: '/zimmer' } }
              },
              {
                image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80',
                title: 'Spa & Pools',
                body: '1.200 m² Wellness — Saunen, Außenpool, Ruheräume.',
                cta: { label: 'Angebote', link: { type: 'page', href: '/angebote' } }
              },
              {
                image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80',
                title: 'Kulinarik',
                body: 'Frühstück bis Fine Dining — regional eingekauft.',
                cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
              }
            ]
          }),
          section('rooms-faq', 'global.faq', 6, {
            eyebrow: 'Buchung',
            headline: { plain: 'Fragen zum', accent: 'Aufenthalt.' },
            items: [
              {
                question: 'Wann sind Check-in und Check-out?',
                answer: 'Check-in ab 15:00, Check-out bis 11:00. Auf Anfrage halten wir Ihr Zimmer gern länger frei.'
              },
              {
                question: 'Sind Haustiere erlaubt?',
                answer: 'Kleine Hunde nach Absprache in ausgewählten Zimmern — bitte bei Buchung angeben.'
              },
              {
                question: 'Parkplatz & E-Laden?',
                answer: 'Kostenfreie Parkplätze und Wallboxen (Aufpreis) sind verfügbar — reservieren Sie den Stellplatz mit.'
              }
            ]
          }),
          section('rooms-offers', 'hotel.offers', 7, {
            eyebrow: 'Kombinieren',
            headline: { plain: 'Mit', accent: 'Angebot.' },
            intro: 'Saisonale Pakete lassen sich mit jedem Zimmer kombinieren.',
            items: ['offer-winter', 'offer-spa']
          }),
          section('rooms-deep', 'hotel.deepDives', 8, {
            eyebrow: 'Haus',
            headline: { plain: 'Spa,', accent: 'Kulinarik & Service.' },
            intro: 'Kurzgeschichten zu Umbau, Team und Philosophie — im CMS als eigene Artikel gepflegt.'
          }),
          section('rooms-cta', 'global.contactCta', 9, {
            eyebrow: 'Direkt',
            headline: { plain: 'Unverbindlich', accent: 'anfragen.' },
            subline: 'Wir melden uns mit Verfügbarkeit und passenden Paketen.',
            cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
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
          section('gal-intro', 'global.introBlock', 2, {
            eyebrow: 'Galerie',
            headline: { plain: 'Was Sie', accent: 'hier sehen.' },
            body: 'Architektur, Wellness und Landschaft — drei Ebenen, die unseren Aufenthalt ausmachen. Jedes Bild ist im CMS ersetzbar.',
            facts: [
              { label: 'Spa', value: '1.200 m²' },
              { label: 'Zimmer', value: '32 Kategorien' },
              { label: 'Tal', value: 'Ski & Wander' }
            ]
          }),
          section('gal-grid', 'global.galleryGrid', 3, {
            eyebrow: 'Rundgang',
            headline: { plain: 'Ein', accent: 'Atemzug.' },
            images: [
              { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80', alt: 'Lobby' },
              { url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80', alt: 'Zimmer' },
              { url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80', alt: 'Spa' },
              { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80', alt: 'Berge' }
            ]
          }),
          section('gal-scroll', 'global.scrollerHighlights', 4, {
            eyebrow: 'Erlebnis',
            headline: { plain: 'Drei Momente', accent: 'im Haus.' },
            intro: 'Wellness, Aussicht, Kulinarik — warum Gäste länger bleiben.',
            slides: [
              {
                image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80',
                title: 'Spa & Ruhe',
                body: 'Saunen, Außenpool und Ruheräume — reservierbare Zeitfenster.',
                cta: { label: 'Angebote', link: { type: 'page', href: '/zimmer' } }
              },
              {
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
                title: 'Lobby & Kamin',
                body: 'Treffpunkt vor dem Abendessen, Bibliothek und Tee.',
                cta: { label: 'Haus', link: { type: 'page', href: '/haus' } }
              },
              {
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80',
                title: 'Berge vor der Tür',
                body: 'Lift, Wanderwege und Skilager — wir packen die Lunchbox.',
                cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
              }
            ]
          }),
          section('gal-deep', 'hotel.deepDives', 5, {
            eyebrow: 'Journal',
            headline: { plain: 'Hinter', accent: 'den Kulissen.' },
            intro: 'Renovierung, Team, Saison — Storys für wiederkehrende Gäste.'
          }),
          section('gal-cta', 'global.contactCta', 6, {
            eyebrow: 'Aufenthalt',
            headline: { plain: 'Lust auf', accent: 'echte Tage?' },
            subline: 'Schreiben Sie uns Ihr Wunschdatum — wir melden uns mit Vorschlägen.',
            cta: { label: 'Jetzt anfragen', link: { type: 'page', href: '/kontakt' } }
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
          section('about-intro', 'global.introBlock', 2, {
            eyebrow: 'Werte',
            headline: { plain: 'Gastgeber', accent: 'mit Verantwortung.' },
            body: 'Wir investieren lieber in langlebige Materialien und faire Löhne als in laute Marketing-Kampagnen — der Wald vor der Tür ist unser bestes Argument.',
            facts: [
              { label: 'Energie', value: 'Holz & Solar' },
              { label: 'Küche', value: '85 % regional' },
              { label: 'Team', value: '42 Menschen' }
            ]
          }),
          section('about-story', 'global.textImage', 3, {
            eyebrow: 'Familie',
            headline: { plain: 'Geführt', accent: 'von Menschen.' },
            body: 'Wir kochen, was die Bauern liefern, heizen mit Holz aus dem Tal und investieren jedes Jahr in sanfte Renovierung statt lauter Trends.',
            image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
            cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
          }),
          section('about-deep', 'hotel.deepDives', 4, {
            eyebrow: 'Hausgeschichten',
            headline: { plain: 'Mehr', accent: 'als Marketing.' },
            intro: 'Renovierungen, Saison-Highlights und Teamporträts — alles als eigene Storys im CMS.'
          }),
          section('about-voices', 'global.testimonials', 5, {
            eyebrow: 'Stimmen',
            headline: { plain: 'Warum Gäste', accent: 'wiederkommen.' },
            items: [
              { quote: 'Man spürt, dass hier jemand wohnt, der das Tal wirklich liebt.', name: 'Anna & Chris' },
              { quote: 'Klein, fein, null Stress. Genau das, was wir gesucht haben.', name: 'Dr. Weber' }
            ]
          }),
          section('about-cta', 'global.contactCta', 6, {
            eyebrow: 'Besuch',
            headline: { plain: 'Persönlich', accent: 'vorbeischauen?' },
            subline: 'Führung durch Haus und Spa auf Anfrage — melden Sie sich kurz.',
            cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
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
          section('contact-intro', 'global.introBlock', 2, {
            eyebrow: 'Erreichbarkeit',
            headline: { plain: 'Antwort', accent: 'innerhalb eines Tages.' },
            body: 'Schreiben Sie uns Ihr Wunschdatum und die ungefähre Personenzahl — wir melden uns mit Zimmer- und Paketvorschlägen.',
            facts: [
              { label: 'Rezeption', value: '7:00–22:00' },
              { label: 'Parken', value: '12 Plätze' },
              { label: 'Shuttle', value: 'auf Anfrage' }
            ]
          }),
          section('contact-map', 'global.mapContact', 3, {
            eyebrow: 'Anreise',
            headline: { plain: 'Mitten', accent: 'im Tal.' },
            subline: 'Adresse, Karte und schnelle Aktionen — alles im CMS editierbar.',
            openingHours: 'Rezeption täglich 7:00–22:00',
            conversionHighlights: [
              { badge: 'Winter', title: 'Skipass-Partner', body: 'Kombiangebote mit Talstation — fragen Sie nach Winterzauber-Paket.' },
              { badge: 'Parken', title: 'Stellplatz reservieren', body: 'E-Laden möglich — bitte bei Buchung mit anmelden.' }
            ],
            arrival: [
              { title: 'Mit dem Auto', body: 'A12 Ausfahrt Stubaital, dann 9 km Richtung Neustift — Hotelbeschilderung folgen.' },
              { title: 'Öffentlich', body: 'Bus STB bis Neustift — Haltestelle „Flamingoweg“ 3 Minuten Fussweg.' }
            ]
          }),
          section('contact-steps', 'global.stepsStrip', 4, {
            eyebrow: 'Buchung',
            headline: { plain: 'So sichern', accent: 'Sie den Termin.' },
            steps: [
              { label: '1', title: 'Anfrage', body: 'Wunschzeitraum und Zimmerkategorie per Mail oder Telefon.' },
              { label: '2', title: 'Angebot', body: 'Wir halten Optionen und schlagen Pakete vor — schriftlich.' },
              { label: '3', title: 'Bestätigung', body: 'Anzahlung und Buchungsbestätigung — danach Zugang zum Gästeportal.' }
            ]
          }),
          section('contact-faq', 'global.faq', 5, {
            eyebrow: 'Anreise',
            headline: { plain: 'Häufige', accent: 'Fragen.' },
            items: [
              {
                question: 'Gibt es eine Barrierefrei-Option?',
                answer: 'Ja — bitte bei Buchung angeben, wir weisen barrierearme Zimmer und Parkplätze zu.'
              },
              {
                question: 'Kann ich stornieren?',
                answer: 'Stornobedingungen stehen im Angebot; bei Unsicherheit helfen wir gern mit flexiblen Paketen.'
              }
            ]
          }),
          section('contact-cta', 'global.contactCta', 6, {
            eyebrow: 'Direkt',
            headline: { plain: 'Lieber', accent: 'telefonisch?' },
            subline: 'Unsere Rezeption nimmt auch kurzfristige Fragen entgegen.',
            cta: { label: 'Jetzt anrufen', link: { type: 'phone', href: '+43522612345' } }
          })
        ]
      }
    ]
  };
}
