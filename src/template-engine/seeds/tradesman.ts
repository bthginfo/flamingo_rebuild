import type { SectionInstance, StyleKey } from '../model';
import type { SiteSeed } from './model';

const heroImages: Record<StyleKey, string> = {
  classic: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1800&q=82',
  modern: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1800&q=82',
  bold: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1800&q=82'
};

function section(id: string, sectionKey: string, sortOrder: number, data: Record<string, unknown>): SectionInstance {
  return { id, sectionKey, visible: true, sortOrder, data };
}

export function tradesmanSeed(styleKey: StyleKey): SiteSeed {
  return {
    tenantName: 'Flamingo Haustechnik Süd',
    industryKey: 'tradesman',
    styleKey,
    global: {
      brand: {
        name: 'Flamingo Haustechnik Süd',
        tagline: 'Heizung · Sanitär · Elektro — sauber geplant'
      },
      navigation: [
        { label: 'Start', href: '/' },
        { label: 'Leistungen', href: '/leistungen' },
        { label: 'Referenzen', href: '/referenzen' },
        { label: 'Betrieb', href: '/betrieb' },
        { label: 'Anfrage', href: '/kontakt' }
      ],
      contact: {
        phone: '+49 89 555 12 90',
        email: 'auftrag@flamingo-haustechnik.test',
        address: 'Industriestrasse 4, 82110 Germering'
      }
    },
    collections: [
      {
        id: 'svc-heizung',
        collectionKey: 'tradeService',
        title: 'Heizung modernisieren',
        slug: 'heizung-modernisieren',
        data: {
          summary: 'Hydraulischer Abgleich, Wärmepumpen-Vorbereitung und Fördermittel-Check in einem Termin.',
          image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80'
        }
      },
      {
        id: 'svc-bad',
        collectionKey: 'tradeService',
        title: 'Bad auf einen Punkt',
        slug: 'bad-sanierung',
        data: {
          summary: 'En-bloc Sanierung in 14 Tagen mit festem Ansprechpartner und täglicher Baustellen-Photo.',
          image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80'
        }
      },
      {
        id: 'svc-elektro',
        collectionKey: 'tradeService',
        title: 'Elektro & Smart Home',
        slug: 'elektro-smart-home',
        data: {
          summary: 'Wallbox, Zählerschrank-Erweiterung und sichere Verkabelung für Büro und Garage.',
          image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80'
        }
      },
      {
        id: 'ref-efh',
        collectionKey: 'referenceProject',
        title: 'EFH Germering',
        slug: 'efh-germering',
        data: {
          summary: 'Komplettsanierung Heizung + Bad, 6 Wochen, ohne Leerstand für die Familie.',
          image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80'
        }
      },
      {
        id: 'ref-gewerbe',
        collectionKey: 'referenceProject',
        title: 'Gewerbehalle Puchheim',
        slug: 'gewerbehalle-puchheim',
        data: {
          summary: 'Neue Heizverteilung, Brandschutz-Türen, dokumentiert für Versicherer.',
          image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80'
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
          title: 'Flamingo Haustechnik Süd · Heizung, Bad, Elektro',
          description: 'Regional, termintreu, mit klaren Fixpreisen.'
        },
        sections: [
          section('home-hero', 'global.hero', 1, {
            eyebrow: 'München West',
            headline: { plain: 'Technik, die', accent: 'hält.' },
            subline: 'Wir planen vor Ort, liefern transparente Angebote und halten uns an den Zeitplan — auch wenn die Baustelle ungemütlich wird.',
            body: 'Meisterbetrieb mit 22 Kolleg:innen. Notdienst für Bestandskunden am Wochenende.',
            image: heroImages[styleKey],
            primaryCta: { label: 'Leistungen', link: { type: 'page', href: '/leistungen' } },
            secondaryCta: { label: 'Referenzen', link: { type: 'page', href: '/referenzen' } }
          }),
          section('home-svc', 'tradesman.serviceOverview', 2, {
            eyebrow: 'Leistungen',
            headline: { plain: 'Was wir', accent: 'gern tun.' },
            intro: 'Von der Erstberatung bis zur Abnahme — ein Team, eine Baustelle.',
            items: ['svc-heizung', 'svc-bad', 'svc-elektro']
          }),
          section('home-ref', 'tradesman.references', 3, {
            eyebrow: 'Referenzen',
            headline: { plain: 'Gebaut', accent: 'worden.' },
            intro: 'Auszug aus Projekten der letzten 18 Monate.',
            items: ['ref-efh', 'ref-gewerbe']
          }),
          section('home-cta', 'global.contactCta', 4, {
            eyebrow: 'Anfrage',
            headline: { plain: 'Kostenlose', accent: 'Erstbegehung.' },
            subline: 'Wir melden uns mit zwei Terminvorschlägen.',
            cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
          })
        ]
      },
      {
        id: 'services',
        key: 'services',
        kind: 'core',
        title: 'Leistungen',
        slug: '/leistungen',
        seo: { title: 'Leistungen · Flamingo Haustechnik', description: 'Heizung, Sanitär, Elektro.' },
        sections: [
          section('svc-head', 'global.pageHeader', 1, {
            eyebrow: 'Leistungen',
            headline: { plain: 'Alles aus', accent: 'einer Hand.' },
            subline: 'Koordination zwischen Gewerken übernehmen wir.',
            image: heroImages[styleKey]
          }),
          section('svc-grid', 'tradesman.serviceOverview', 2, {
            eyebrow: 'Pakete',
            headline: { plain: 'Drei', accent: 'Einstiege.' },
            intro: 'Details und Ablauf pro Leistung — per Klick.',
            items: ['svc-heizung', 'svc-bad', 'svc-elektro']
          }),
          section('svc-scroll', 'global.scrollerHighlights', 3, {
            eyebrow: 'Handwerk',
            headline: { plain: 'Drei Gründe', accent: 'für unsere Kundschaft.' },
            intro: 'Koordination, Termintreue und saubere Baustelle — kompakt erklärt.',
            slides: [
              {
                image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80',
                title: 'Ein Ansprechpartner',
                body: 'Heizung, Sanitär, Elektro — wir koordinieren die Gewerke für euch.',
                cta: { label: 'Referenzen', link: { type: 'page', href: '/referenzen' } }
              },
              {
                image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&q=80',
                title: 'Feste Termine',
                body: 'Realistische Planung statt leerer Versprechen — ihr wisst, wann was passiert.',
                cta: { label: 'Leistungen', link: { type: 'page', href: '/leistungen' } }
              },
              {
                image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80',
                title: 'Saubere Übergabe',
                body: 'Dokumentation und Einweisung — damit ihr nach dem Einbau entspannt seid.',
                cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
              }
            ]
          }),
          section('svc-cta', 'global.contactCta', 4, {
            eyebrow: 'Projekt',
            headline: { plain: 'Unverbindlich', accent: 'anfragen.' },
            subline: 'Fotos und Grundrisse helfen uns beim ersten Call.',
            cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
          })
        ]
      },
      {
        id: 'references',
        key: 'references',
        kind: 'core',
        title: 'Referenzen',
        slug: '/referenzen',
        seo: { title: 'Referenzen · Flamingo Haustechnik', description: 'Projekte.' },
        sections: [
          section('ref-head', 'global.pageHeader', 1, {
            eyebrow: 'Referenzen',
            headline: { plain: 'Vertrauen', accent: 'durch Tat.' },
            subline: 'Private und gewerbliche Kunden — gleiche Sorgfalt.',
            image: heroImages[styleKey]
          }),
          section('ref-grid', 'tradesman.references', 2, {
            eyebrow: 'Auswahl',
            headline: { plain: 'Zwei', accent: 'Beispiele.' },
            intro: 'Mehr Referenzen zeigen wir im persönlichen Gespräch.',
            items: ['ref-efh', 'ref-gewerbe']
          })
        ]
      },
      {
        id: 'about',
        key: 'about',
        kind: 'core',
        title: 'Betrieb',
        slug: '/betrieb',
        seo: { title: 'Betrieb · Flamingo Haustechnik', description: 'Team und Werte.' },
        sections: [
          section('about-head', 'global.pageHeader', 1, {
            eyebrow: 'Betrieb',
            headline: { plain: 'Meister', accent: 'geführt.' },
            subline: 'Ausbildung, faire Löhne, klare Prozesse.',
            image: ''
          }),
          section('about-story', 'global.textImage', 2, {
            eyebrow: 'Geschichte',
            headline: { plain: 'Seit 1998', accent: 'vor Ort.' },
            body: 'Gegründet als Zwei-Mann-Betrieb, heute mit eigener Werkstatt und Fuhrpark — aber immer noch mit Direktnummer zum Meister.',
            image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
            cta: { label: 'Anfrage', link: { type: 'page', href: '/kontakt' } }
          })
        ]
      },
      {
        id: 'contact',
        key: 'contact',
        kind: 'core',
        title: 'Anfrage',
        slug: '/kontakt',
        seo: { title: 'Kontakt · Flamingo Haustechnik', description: 'Anfahrt und Erstgespräch.' },
        sections: [
          section('contact-head', 'global.pageHeader', 1, {
            eyebrow: 'Kontakt',
            headline: { plain: 'Wir melden', accent: 'uns schnell.' },
            subline: 'Mo–Fr 7:30–17:00, Notdienst für Vertragskunden.',
            image: ''
          }),
          section('contact-map', 'global.mapContact', 2, {
            eyebrow: 'Standort',
            headline: { plain: 'Werkstatt', accent: 'Germering.' },
            subline: ''
          })
        ]
      }
    ]
  };
}
