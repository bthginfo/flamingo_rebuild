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
          section('home-tours', 'tourism.tourHighlights', 2, {
            eyebrow: 'Programm',
            headline: { plain: 'Drei', accent: 'Lieblinge.' },
            intro: 'Auszug aus dem laufenden Kalender — Details und Termine auf der Tour-Seite.',
            items: ['tour-gipfel', 'tour-see', 'tour-stadt']
          }),
          section('home-testimonials', 'global.testimonials', 3, {
            eyebrow: 'Feedback',
            headline: { plain: 'Was Gruppen', accent: 'berichten.' },
            items: [
              { quote: 'Endlich eine Tour, die nicht hetzt. Unser Guide kannte jeden Schattenplatz bei Hitze.', name: 'Lisa & Team, Hamburg' },
              { quote: 'Kinder und Senioren im Mix — hat trotzdem geklappt. Sehr professionell organisiert.', name: 'Familie Novak' }
            ]
          }),
          section('home-cta', 'global.contactCta', 4, {
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
          section('tours-grid', 'tourism.tourHighlights', 2, {
            eyebrow: 'Auswahl',
            headline: { plain: 'Touren', accent: 'im Überblick.' },
            intro: 'Gleiche Qualität — unterschiedliche Schwierigkeiten. Fragen Sie nach Privatvarianten.',
            items: ['tour-gipfel', 'tour-see', 'tour-stadt']
          }),
          section('tours-scroll', 'global.scrollerHighlights', 3, {
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
          section('gal-grid', 'global.galleryGrid', 2, {
            eyebrow: 'Auswahl',
            headline: { plain: 'Still &', accent: 'laut.' },
            images: [
              { url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80', alt: 'Bergpanorama' },
              { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80', alt: 'Wandergruppe' },
              { url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80', alt: 'Stadt und Berge' }
            ]
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
          section('guides-story', 'global.textImage', 2, {
            eyebrow: 'Arbeit',
            headline: { plain: 'Sicherheit', accent: 'trifft Geschichten.' },
            body: 'Wir trainieren jährlich Erste Hilfe am Berg, kennen Notfallrouten und erzählen trotzdem gern vom Tal, das wir selbst bewohnen.',
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
            cta: { label: 'Touren', link: { type: 'page', href: '/touren' } }
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
          section('contact-map', 'global.mapContact', 2, {
            eyebrow: 'Treffpunkt',
            headline: { plain: 'Innsbruck', accent: 'und Umland.' },
            subline: ''
          })
        ]
      }
    ]
  };
}
