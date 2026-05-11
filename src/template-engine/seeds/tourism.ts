import type { SectionInstance, StyleKey } from '../model';
import type { SiteSeed } from './model';

const heroImages: Record<StyleKey, string> = {
  classic: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=82',
  modern: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1800&q=82',
  bold: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1800&q=82'
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

export function tourismSeed(styleKey: StyleKey): SiteSeed {
  return {
    tenantName: 'Alpenflamingo Touren',
    industryKey: 'tourism',
    styleKey,
    global: {
      brand: {
        name: 'Alpenflamingo Touren',
        tagline: 'Geführte Tage · kleine Gruppen · echte Guides'
      },
      navigation: [
        { label: 'Start', href: '/' },
        { label: 'Touren', href: '/touren' },
        { label: 'Eindrücke', href: '/galerie' },
        { label: 'Guides', href: '/guides' },
        { label: 'Buchen', href: '/kontakt' }
      ],
      contact: {
        phone: '+43 512 998 770',
        email: 'hallo@alpenflamingo-touren.test',
        address: 'Hofgasse 4, 6020 Innsbruck'
      }
    },
    collections: [
      {
        id: 'tour-gipfel',
        collectionKey: 'tour',
        title: 'Gipfelglück am Morgen',
        slug: 'gipfelglueck-morgen',
        data: {
          summary: 'Sonnenaufgang über den Wolken, kleines Frühstück am Gipfelkreuz, zurück bis zum Mittagessen im Tal.',
          image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
        }
      },
      {
        id: 'tour-see',
        collectionKey: 'tour',
        title: 'Seen & Alpenrosen',
        slug: 'seen-alpenrosen',
        data: {
          summary: 'Leichte Wanderung mit drei Bergseen, botanischen Stopps und Fotopausen für ruhige Bilder.',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80'
        }
      },
      {
        id: 'tour-stadt',
        collectionKey: 'tour',
        title: 'Innsbruck Altstadt & Bergblick',
        slug: 'innsbruck-bergblick',
        data: {
          summary: 'Stadtrundgang mit Lift aufs Hausberg-Plateau — perfekt bei wechselhaftem Wetter.',
          image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80'
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
          title: 'Alpenflamingo Touren · Geführte Erlebnisse in Tirol',
          description: 'Touren, Guides und Buchung — kleine Gruppen, klare Abläufe.'
        },
        sections: [
          section('home-hero', 'global.hero', 1, {
            eyebrow: 'Tirol · Ganzjährig',
            headline: { plain: 'Touren, die', accent: 'bleiben.' },
            subline: 'Wir planen Tages- und Halbtagestouren mit festen Gruppengrössen, lizenzierten Guides und fairer Strecke.',
            body: 'Kein Massentourismus: ihr wandert mit Menschen, die das Gelände kennen und das Tempo an die Gruppe anpassen.',
            image: heroImages[styleKey],
            primaryCta: { label: 'Touren ansehen', link: { type: 'page', href: '/touren' } },
            secondaryCta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
          }),
          section('home-action', 'global.actionBar', 2, {
            useOpeningHours: false,
            statusOverride: 'Nächste öffentliche Tour: Fr 08:30 · Treffpunkt Hofgasse',
            primaryCta: { label: 'Tour buchen', link: { type: 'page', href: '/kontakt' } },
            secondaryCta: { label: 'Programm', link: { type: 'page', href: '/touren' } }
          }),
          section('home-tours', 'tourism.tourHighlights', 3, {
            eyebrow: 'Programm',
            headline: { plain: 'Drei', accent: 'Lieblinge.' },
            intro: 'Auszug aus dem laufenden Kalender — Details und Termine auf der Tour-Seite.',
            items: ['tour-gipfel', 'tour-see', 'tour-stadt']
          }),
          section('home-stats', 'global.statsBand', 4, {
            eyebrow: 'Erfahrung',
            headline: { plain: 'Klein', accent: 'aber stabil.' },
            items: [
              { value: '12', label: 'Jahre Guides', hint: 'am Berg' },
              { value: '8', label: 'Max. Gruppe', hint: 'öffentliche Touren' },
              { value: 'Plan B', label: 'Bei Wetter', hint: 'immer dabei' }
            ]
          }),
          section('home-testimonials', 'global.testimonials', 5, {
            eyebrow: 'Feedback',
            headline: { plain: 'Was Gruppen', accent: 'berichten.' },
            items: [
              { quote: 'Endlich eine Tour, die nicht hetzt. Unser Guide kannte jeden Schattenplatz bei Hitze.', name: 'Lisa & Team, Hamburg' },
              { quote: 'Kinder und Senioren im Mix — hat trotzdem geklappt. Sehr professionell organisiert.', name: 'Familie Novak' }
            ]
          }),
          section('home-cta', 'global.contactCta', 6, {
            eyebrow: 'Planung',
            headline: { plain: 'Wunschdatum', accent: 'senden.' },
            subline: 'Wir melden uns mit Kapazität, Preis und Packliste.',
            cta: { label: 'Jetzt anfragen', link: { type: 'page', href: '/kontakt' } }
          })
        ]
      },
      {
        id: 'tours',
        key: 'tours',
        kind: 'core',
        title: 'Touren',
        slug: '/touren',
        seo: { title: 'Touren · Alpenflamingo', description: 'Alle geführten Touren im Überblick.' },
        sections: [
          section('tours-head', 'global.pageHeader', 1, {
            eyebrow: 'Kalender',
            headline: { plain: 'Unsere', accent: 'Routen.' },
            subline: 'Klicken Sie für Detailseiten mit Ablauf, Dauer und Buchungsweg.',
            image: heroImages[styleKey]
          }),
          section('tours-intro', 'global.introBlock', 2, {
            eyebrow: 'Outdoor',
            headline: { plain: 'Schwierigkeit,', accent: 'Ausrüstung, Tempo.' },
            body: 'Jede Tour hat ein klares Profil: Höhenmeter, Dauer und empfohlenes Schuhwerk. Fragt nach Privatvarianten für Firmen oder Familien.',
            facts: [
              { label: 'Treffpunkt', value: 'Innsbruck Zentrum' },
              { label: 'Sprachen', value: 'DE / EN' },
              { label: 'Versicherung', value: 'Empfehlung im Briefing' }
            ]
          }),
          section('tours-grid', 'tourism.tourHighlights', 3, {
            eyebrow: 'Auswahl',
            headline: { plain: 'Touren', accent: 'im Überblick.' },
            intro: 'Gleiche Qualität — unterschiedliche Schwierigkeiten. Fragen Sie nach Privatvarianten.',
            items: ['tour-gipfel', 'tour-see', 'tour-stadt']
          }),
          section('tours-scroll', 'global.scrollerHighlights', 4, {
            eyebrow: 'Outdoor',
            headline: { plain: 'Drei Gründe', accent: 'mit uns zu gehen.' },
            intro: 'Kleine Gruppen, klare Kommunikation, echte Guides vor Ort.',
            slides: [
              {
                image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80',
                title: 'Kleine Gruppen',
                body: 'Wir skalieren nicht auf Busse — ihr wandert mit Menschen, die das Gelände kennen.',
                cta: { label: 'Buchen', link: { type: 'page', href: '/kontakt' } }
              },
              {
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80',
                title: 'Sicherheit zuerst',
                body: 'Wetter-Plan B, Erste Hilfe und ruhiges Tempo — besonders mit gemischten Gruppen.',
                cta: { label: 'Guides', link: { type: 'page', href: '/guides' } }
              },
              {
                image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80',
                title: 'Regional verwurzelt',
                body: 'Geschichten vom Tal, in dem wir leben — nicht aus dem Reiseführer.',
                cta: { label: 'Galerie', link: { type: 'page', href: '/galerie' } }
              }
            ]
          }),
          section('tours-steps', 'global.stepsStrip', 5, {
            eyebrow: 'Buchung',
            headline: { plain: 'Von der Idee', accent: 'zur Tour.' },
            steps: [
              { label: '1', title: 'Anfrage', body: 'Datum, Gruppengrösse und gewünschte Route — wir prüfen Kapazität.' },
              { label: '2', title: 'Briefing', body: 'Packliste, Treffpunkt, Wetter-Plan B — schriftlich vorab.' },
              { label: '3', title: 'Go', body: 'Check-in am Treffpunkt, kurze Sicherheitseinweisung, los gehts.' }
            ]
          }),
          section('tours-faq', 'global.faq', 6, {
            eyebrow: 'Sicherheit',
            headline: { plain: 'Was ihr', accent: 'wissen solltet.' },
            items: [
              {
                question: 'Was passiert bei schlechtem Wetter?',
                answer: 'Wir haben immer einen Plan B (Talvariante oder verkürzte Route) und entscheiden transparent in der Gruppe.'
              },
              {
                question: 'Kann ich kurzfristig stornieren?',
                answer: 'Bis 48 Stunden vor Tourstart kostenfrei — danach fällt eine Ausfallgebühr an, ausser wir finden Ersatz.'
              }
            ]
          }),
          section('tours-deep', 'tourism.deepDives', 7, {
            eyebrow: 'Guide-Wissen',
            headline: { plain: 'Tiefer', accent: 'als die Route.' },
            intro: 'Sicherheit, Ausrüstung und Geschichten vom Tal — eigene Artikel im CMS.'
          }),
          section('tours-cta', 'global.contactCta', 8, {
            eyebrow: 'Planung',
            headline: { plain: 'Wunschdatum', accent: 'senden.' },
            subline: 'Wir melden uns mit Kapazität, Preis und Packliste.',
            cta: { label: 'Jetzt anfragen', link: { type: 'page', href: '/kontakt' } }
          })
        ]
      },
      {
        id: 'gallery',
        key: 'gallery',
        kind: 'core',
        title: 'Eindrücke',
        slug: '/galerie',
        seo: { title: 'Eindrücke · Alpenflamingo Touren', description: 'Bilder von Touren und Landschaft.' },
        sections: [
          section('gal-head', 'global.pageHeader', 1, {
            eyebrow: 'Galerie',
            headline: { plain: 'Momente', accent: 'am Weg.' },
            subline: 'Farben, Nebel, Sonne — so erleben Gäste die Berge mit uns.',
            image: heroImages[styleKey]
          }),
          section('gal-intro', 'global.introBlock', 2, {
            eyebrow: 'Eindrücke',
            headline: { plain: 'Farben,', accent: 'Nebel, Sonne.' },
            body: 'Die Galerie zeigt echte Tourmomente — nicht nur Postkartenmotive. Jedes Bild ist im CMS austauschbar.',
            facts: [
              { label: 'Gruppen', value: 'max. 8' },
              { label: 'Guides', value: 'zertifiziert' },
              { label: 'Saison', value: 'ganzjährig' }
            ]
          }),
          section('gal-grid', 'global.galleryGrid', 3, {
            eyebrow: 'Auswahl',
            headline: { plain: 'Still &', accent: 'laut.' },
            images: [
              { url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80', alt: 'Bergpanorama' },
              { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80', alt: 'Wandergruppe' },
              { url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80', alt: 'Stadt und Berge' }
            ]
          }),
          section('gal-scroll', 'global.scrollerHighlights', 4, {
            eyebrow: 'Momente',
            headline: { plain: 'Drei Gründe', accent: 'für echte Bilder.' },
            intro: 'Licht, Gruppe, Guide — warum unsere Touren fotogen sind.',
            slides: [
              {
                image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80',
                title: 'Früh starten',
                body: 'Morgensonne und leere Wege — dafür stehen wir auf.',
                cta: { label: 'Touren', link: { type: 'page', href: '/touren' } }
              },
              {
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80',
                title: 'Kleine Gruppe',
                body: 'Kein Gedränge an den Fotospots — wir nehmen uns Zeit.',
                cta: { label: 'Guides', link: { type: 'page', href: '/guides' } }
              },
              {
                image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80',
                title: 'Stadt & Berg',
                body: 'Kombi-Touren für wechselhaftes Wetter — flexibel geplant.',
                cta: { label: 'Buchen', link: { type: 'page', href: '/kontakt' } }
              }
            ]
          }),
          section('gal-deep', 'tourism.deepDives', 5, {
            eyebrow: 'Insider',
            headline: { plain: 'Mehr', accent: 'als Fotos.' },
            intro: 'Sicherheit, Packlisten und Geschichten — als kurze Artikel im CMS.'
          }),
          section('gal-cta', 'global.contactCta', 6, {
            eyebrow: 'Nächster Schritt',
            headline: { plain: 'Wunschroute', accent: 'skizzieren.' },
            subline: 'Wir antworten mit konkreter Empfehlung und Preis.',
            cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
          })
        ]
      },
      {
        id: 'about',
        key: 'about',
        kind: 'core',
        title: 'Guides',
        slug: '/guides',
        seo: { title: 'Guides · Alpenflamingo Touren', description: 'Team und Arbeitsweise.' },
        sections: [
          section('guides-head', 'global.pageHeader', 1, {
            eyebrow: 'Team',
            headline: { plain: 'Menschen', accent: 'vor Ort.' },
            subline: 'Staatlich geprüfte Bergführer:innen und Stadtguides mit Herz für Details.',
            image: ''
          }),
          section('guides-intro', 'global.introBlock', 2, {
            eyebrow: 'Qualität',
            headline: { plain: 'Zertifikate,', accent: 'Erfahrung, Ruhe.' },
            body: 'Unsere Guides leben im Tal — sie kennen Wetterfenster, Notfallwege und die besten Kaffee-Pausen. Alles hier ist CMS-editierbar.',
            facts: [
              { label: 'Erste Hilfe', value: 'jährlich' },
              { label: 'Sprachen', value: 'DE / EN / IT' },
              { label: 'Gruppen', value: 'max. 8' }
            ]
          }),
          section('guides-story', 'global.textImage', 3, {
            eyebrow: 'Arbeit',
            headline: { plain: 'Sicherheit', accent: 'trifft Geschichten.' },
            body: 'Wir trainieren jährlich Erste Hilfe am Berg, kennen Notfallrouten und erzählen trotzdem gern vom Tal, das wir selbst bewohnen.',
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
            cta: { label: 'Touren', link: { type: 'page', href: '/touren' } }
          }),
          section('guides-deep', 'tourism.deepDives', 4, {
            eyebrow: 'Wissen',
            headline: { plain: 'Guides', accent: 'schreiben mit.' },
            intro: 'Sicherheit, Kultur und Insider-Tipps — eigene Storys im CMS.'
          }),
          section('guides-voices', 'global.testimonials', 5, {
            eyebrow: 'Gäste',
            headline: { plain: 'Vertrauen', accent: 'ins Team.' },
            items: [
              { quote: 'Man merkt sofort: die Guides kennen jeden Schatten und jede Quelle.', name: 'Team Offsite, Zürich' },
              { quote: 'Kinder durften Fragen stellen — der Guide hat echte Zeit genommen.', name: 'Familie Brandt' }
            ]
          }),
          section('guides-cta', 'global.contactCta', 6, {
            eyebrow: 'Privat',
            headline: { plain: 'Eigene', accent: 'Gruppe?' },
            subline: 'Wir planen Firmen- und Familientouren mit eigenem Tempo.',
            cta: { label: 'Jetzt anfragen', link: { type: 'page', href: '/kontakt' } }
          })
        ]
      },
      {
        id: 'contact',
        key: 'contact',
        kind: 'core',
        title: 'Buchen',
        slug: '/kontakt',
        seo: { title: 'Buchen · Alpenflamingo Touren', description: 'Anfrage und Anfahrt.' },
        sections: [
          section('contact-head', 'global.pageHeader', 1, {
            eyebrow: 'Kontakt',
            headline: { plain: 'Wir planen', accent: 'mit Euch.' },
            subline: 'Gruppengrösse, Datum, Schwierigkeit — schreibt uns frei.',
            image: ''
          }),
          section('contact-intro', 'global.introBlock', 2, {
            eyebrow: 'Antwortzeit',
            headline: { plain: 'Innerhalb', accent: 'eines Werktags.' },
            body: 'Schickt uns Datum, ungefähre Gruppengrösse und ob ihr lieber leicht, moderat oder sportlich unterwegs seid — wir melden uns mit konkreter Tour und Preis.',
            facts: [
              { label: 'Telefon', value: 'Mo–Fr 9–17' },
              { label: 'Mail', value: '24h Eingang' },
              { label: 'Privat', value: 'auf Anfrage' }
            ]
          }),
          section('contact-map', 'global.mapContact', 3, {
            eyebrow: 'Treffpunkt',
            headline: { plain: 'Innsbruck', accent: 'und Umland.' },
            subline: 'Büro und typische Startpunkte — Karte und Kontaktdaten im CMS.',
            openingHours: 'Büro Mo–Fr 9:00–17:00',
            conversionHighlights: [
              { badge: 'Schnell', title: 'Last-Minute?', body: 'Freitags prüfen wir noch freie Slots fürs Wochenende — kurz anrufen.' },
              { badge: 'Gruppe', title: 'Firmen', body: 'Wir organisieren Rechnung, Teilnehmerliste und individuelles Briefing.' }
            ],
            arrival: [
              { title: 'Treffpunkt Stadt', body: 'Hofgasse 4 — Eingang neben dem Café, Guide trägt pinkes Flamingo-Band.' },
              { title: 'Treffpunkt Berg', body: 'Je nach Tour — steht 24h vorher in der Mail und im CMS-Newsletter.' }
            ]
          }),
          section('contact-steps', 'global.stepsStrip', 4, {
            eyebrow: 'Ablauf',
            headline: { plain: 'Von der Mail', accent: 'zur Tour.' },
            steps: [
              { label: '1', title: 'Anfrage', body: 'Datum und Tourtyp — wir bestätigen Verfügbarkeit.' },
              { label: '2', title: 'Briefing', body: 'Packliste, Treffpunkt, Zahlungslink — alles schriftlich.' },
              { label: '3', title: 'Go-live', body: 'Check-in vor Ort, kurze Sicherheitsrunde, dann Start.' }
            ]
          }),
          section('contact-faq', 'global.faq', 5, {
            eyebrow: 'Buchung',
            headline: { plain: 'Noch', accent: 'unsicher?' },
            items: [
              {
                question: 'Braucht ihr eine Anzahlung?',
                answer: 'Bei privaten Touren ja — bei öffentlichen Touren reicht die Online-Zahlung 48h vorher.'
              },
              {
                question: 'Können Kinder mit?',
                answer: 'Ja — bitte Alter und Erfahrung nennen, dann wählen wir passende Route und Tempo.'
              }
            ]
          }),
          section('contact-cta', 'global.contactCta', 6, {
            eyebrow: 'Direkt',
            headline: { plain: 'Lieber', accent: 'kurz telefonieren?' },
            subline: 'Wir nehmen auch komplexe Wünsche entgegen und rufen zurück.',
            cta: { label: 'Nummer anzeigen', link: { type: 'phone', href: '+43512998770' } }
          })
        ]
      }
    ]
  };
}
