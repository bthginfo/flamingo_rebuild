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
          section('home-action', 'global.actionBar', 2, {
            useOpeningHours: false,
            statusOverride: 'Notdienst Sa–So für Vertragskunden',
            primaryCta: { label: 'Anfrage', link: { type: 'page', href: '/kontakt' } },
            secondaryCta: { label: 'Leistungen', link: { type: 'page', href: '/leistungen' } }
          }),
          section('home-svc', 'tradesman.serviceOverview', 3, {
            eyebrow: 'Leistungen',
            headline: { plain: 'Was wir', accent: 'gern tun.' },
            intro: 'Von der Erstberatung bis zur Abnahme — ein Team, eine Baustelle.',
            items: ['svc-heizung', 'svc-bad', 'svc-elektro']
          }),
          section('home-ref', 'tradesman.references', 4, {
            eyebrow: 'Referenzen',
            headline: { plain: 'Gebaut', accent: 'worden.' },
            intro: 'Auszug aus Projekten der letzten 18 Monate.',
            items: ['ref-efh', 'ref-gewerbe']
          }),
          section('home-stats', 'global.statsBand', 5, {
            eyebrow: 'Betrieb',
            headline: { plain: 'Zahlen', accent: 'mit Substanz.' },
            items: [
              { value: '1998', label: 'Gegründet', hint: 'Meisterbetrieb' },
              { value: '220+', label: 'Projekte', hint: 'pro Jahr' },
              { value: '22', label: 'Team', hint: 'Festangestellte' }
            ]
          }),
          section('home-cta', 'global.contactCta', 6, {
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
          section('svc-intro', 'global.introBlock', 2, {
            eyebrow: 'Region',
            headline: { plain: 'Einsatz,', accent: 'Notdienst, Planung.' },
            body: 'Wir arbeiten im Großraum München, koordinieren Subunternehmer und dokumentieren für Versicherer und Förderstellen.',
            facts: [
              { label: 'Radius', value: '50 km' },
              { label: 'Notdienst', value: 'für Kunden' },
              { label: 'Förderung', value: 'Beratung' }
            ]
          }),
          section('svc-grid', 'tradesman.serviceOverview', 3, {
            eyebrow: 'Pakete',
            headline: { plain: 'Drei', accent: 'Einstiege.' },
            intro: 'Details und Ablauf pro Leistung — per Klick.',
            items: ['svc-heizung', 'svc-bad', 'svc-elektro']
          }),
          section('svc-scroll', 'global.scrollerHighlights', 4, {
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
          section('svc-steps', 'global.stepsStrip', 5, {
            eyebrow: 'Ablauf',
            headline: { plain: 'Vom Anruf', accent: 'zur Abnahme.' },
            steps: [
              { label: '1', title: 'Erstbegehung', body: 'Wir nehmen Massen auf, fotografieren und skizzieren Varianten.' },
              { label: '2', title: 'Angebot', body: 'Transparente Etappen, Festpreis wo möglich — schriftlich.' },
              { label: '3', title: 'Ausführung', body: 'Ein Ansprechpartner, tägliche Fotos, saubere Übergabe.' }
            ]
          }),
          section('svc-faq', 'global.faq', 6, {
            eyebrow: 'Handwerk',
            headline: { plain: 'Typische', accent: 'Fragen.' },
            items: [
              {
                question: 'Wie schnell startet ihr?',
                answer: 'Bei Standard-Sanierungen innerhalb von 3–6 Wochen nach Auftragsfreigabe — Notfälle priorisieren wir separat.'
              },
              {
                question: 'Arbeitet ihr mit Fördermitteln?',
                answer: 'Ja — wir begleiten Anträge für Heizung und Sanierung und dokumentieren fotografisch.'
              }
            ]
          }),
          section('svc-deep', 'tradesman.deepDives', 7, {
            eyebrow: 'Qualität',
            headline: { plain: 'Material,', accent: 'Ablauf, Sicherheit.' },
            intro: 'Detailwissen zu Installationen — eigene Artikel im CMS.'
          }),
          section('svc-cta', 'global.contactCta', 8, {
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
          section('ref-intro', 'global.introBlock', 2, {
            eyebrow: 'Projekte',
            headline: { plain: 'Beweise', accent: 'statt Versprechen.' },
            body: 'Jede Referenz enthält Ausgangslage, Scope und Besonderheiten — nachvollziehbar für eure Entscheider.',
            facts: [
              { label: 'EFH', value: '6 Wochen' },
              { label: 'Gewerbe', value: 'dokumentiert' },
              { label: 'Meister', value: 'vor Ort' }
            ]
          }),
          section('ref-grid', 'tradesman.references', 3, {
            eyebrow: 'Auswahl',
            headline: { plain: 'Zwei', accent: 'Beispiele.' },
            intro: 'Mehr Referenzen zeigen wir im persönlichen Gespräch.',
            items: ['ref-efh', 'ref-gewerbe']
          }),
          section('ref-story', 'global.textImage', 4, {
            eyebrow: 'Qualität',
            headline: { plain: 'Dokumentation', accent: 'für Versicherer.' },
            body: 'Wir fotografieren Fortschritt, halten Abnahmen schriftlich fest und übergeben Checklisten für Heizung, Elektro und Sanitär.',
            image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
            cta: { label: 'Leistungen', link: { type: 'page', href: '/leistungen' } }
          }),
          section('ref-deep', 'tradesman.deepDives', 5, {
            eyebrow: 'Werkstatt',
            headline: { plain: 'Wissen', accent: 'vom Bau.' },
            intro: 'Materialentscheidungen, Normen und Praxis — Artikel im CMS.'
          }),
          section('ref-cta', 'global.contactCta', 6, {
            eyebrow: 'Nächstes Projekt',
            headline: { plain: 'Lasst uns', accent: 'rechnen.' },
            subline: 'Wir erstellen ein belastbares Angebot mit klaren Meilensteinen.',
            cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
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
          section('about-intro', 'global.introBlock', 2, {
            eyebrow: 'Team',
            headline: { plain: 'Handwerk', accent: 'mit Verantwortung.' },
            body: 'Wir investieren in Ausbildung, Werkstatt und Fuhrpark — damit eure Baustelle nicht zum Experimentierfeld wird.',
            facts: [
              { label: 'Meister', value: '3×' },
              { label: 'Azubis', value: 'jährlich' },
              { label: 'QS', value: 'fotodoku.' }
            ]
          }),
          section('about-story', 'global.textImage', 3, {
            eyebrow: 'Geschichte',
            headline: { plain: 'Seit 1998', accent: 'vor Ort.' },
            body: 'Gegründet als Zwei-Mann-Betrieb, heute mit eigener Werkstatt und Fuhrpark — aber immer noch mit Direktnummer zum Meister.',
            image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
            cta: { label: 'Anfrage', link: { type: 'page', href: '/kontakt' } }
          }),
          section('about-deep', 'tradesman.deepDives', 4, {
            eyebrow: 'Know-how',
            headline: { plain: 'Qualität', accent: 'sichtbar machen.' },
            intro: 'Material, Normen, Wartung — Artikel für Bauherren im CMS.'
          }),
          section('about-voices', 'global.testimonials', 5, {
            eyebrow: 'Kunden',
            headline: { plain: 'Verlässlichkeit', accent: 'zählt.' },
            items: [
              { quote: 'Transparente Angebote und pünktliche Teams — selten im Handwerk.', name: 'Familie Steiner' },
              { quote: 'Die Baustelle war sauberer als unsere Küche.', name: 'Gewerbehalle Puchheim' }
            ]
          }),
          section('about-cta', 'global.contactCta', 6, {
            eyebrow: 'Projekt',
            headline: { plain: 'Meister', accent: 'anfragen.' },
            subline: 'Wir melden uns mit zwei Terminvorschlägen für die Erstbegehung.',
            cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
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
          section('contact-intro', 'global.introBlock', 2, {
            eyebrow: 'Erreichbarkeit',
            headline: { plain: 'Direkt', accent: 'zum Team.' },
            body: 'Schickt Fotos, Grundriss und kurze Problemstellung — wir priorisieren Notfälle und melden uns mit realistischem Zeitfenster.',
            facts: [
              { label: 'Antwort', value: '< 4h' },
              { label: 'Notdienst', value: 'Sa–So' },
              { label: 'Region', value: 'München+' }
            ]
          }),
          section('contact-map', 'global.mapContact', 3, {
            eyebrow: 'Standort',
            headline: { plain: 'Werkstatt', accent: 'Germering.' },
            subline: 'Anfahrt, Parken und schnelle Aktionen — alles im CMS.',
            openingHours: 'Mo–Fr 7:30–17:00',
            conversionHighlights: [
              { badge: 'Notfall', title: 'Rohrbruch?', body: 'Bestandskunden: Hotline am Wochenende — bitte Vertragsnummer bereithalten.' },
              { badge: 'Angebot', title: 'Erstbegehung', body: 'Kostenlos im Umkreis von 25 km — Termin online oder telefonisch.' }
            ],
            arrival: [
              { title: 'Werkstatt', body: 'Industriestrasse 4 — Tor 2, klingeln bei „Flamingo Haustechnik“.' },
              { title: 'Parken', body: 'Besucherparkplätze vor dem Tor — bitte Kennzeichen nennen.' }
            ]
          }),
          section('contact-steps', 'global.stepsStrip', 4, {
            eyebrow: 'Ablauf',
            headline: { plain: 'Von der Mail', accent: 'zum Termin.' },
            steps: [
              { label: '1', title: 'Anfrage', body: 'Kurz beschreiben, Fotos anhängen — wir priorisieren.' },
              { label: '2', title: 'Rückruf', body: 'Meister meldet sich mit Rückfragen und Terminvorschlag.' },
              { label: '3', title: 'Angebot', body: 'Schriftliches Angebot mit Etappen — erst dann starten wir.' }
            ]
          }),
          section('contact-faq', 'global.faq', 5, {
            eyebrow: 'Service',
            headline: { plain: 'Noch', accent: 'Fragen?' },
            items: [
              {
                question: 'Arbeitet ihr mit Architekten zusammen?',
                answer: 'Ja — wir sind an Planungsrunden gewöhnt und liefern Ausschreibungstexte.'
              },
              {
                question: 'Gibt es Festpreise?',
                answer: 'Wo der Scope klar ist, ja — sonst arbeiten wir mit Budgetrahmen und Meilensteinen.'
              }
            ]
          }),
          section('contact-cta', 'global.contactCta', 6, {
            eyebrow: 'Direkt',
            headline: { plain: 'Projekt', accent: 'skizzieren.' },
            subline: 'Wir melden uns mit zwei Terminvorschlägen.',
            cta: { label: 'E-Mail senden', link: { type: 'page', href: '/kontakt' } }
          })
        ]
      }
    ]
  };
}
