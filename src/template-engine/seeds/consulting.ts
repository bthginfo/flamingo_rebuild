import type { SectionInstance, StyleKey } from '../model';
import type { SiteSeed } from './model';

const heroImages: Record<StyleKey, string> = {
  classic: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=82',
  modern: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=82',
  bold: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1800&q=82'
};

function section(id: string, sectionKey: string, sortOrder: number, data: Record<string, unknown>): SectionInstance {
  return { id, sectionKey, visible: true, sortOrder, data };
}

export function consultingSeed(styleKey: StyleKey): SiteSeed {
  return {
    tenantName: 'Flamingo Advisory Partners',
    industryKey: 'consulting',
    styleKey,
    global: {
      brand: {
        name: 'Flamingo Advisory Partners',
        tagline: 'Strategie, Transformation, klare Umsetzung'
      },
      navigation: [
        { label: 'Start', href: '/' },
        { label: 'Leistungen', href: '/leistungen' },
        { label: 'Cases', href: '/cases' },
        { label: 'Expertise', href: '/expertise' },
        { label: 'Kontakt', href: '/kontakt' }
      ],
      contact: {
        phone: '+49 69 900 44 10',
        email: 'hello@flamingo-advisory.test',
        address: 'Taunusanlage 8, 60329 Frankfurt am Main'
      }
    },
    collections: [
      {
        id: 'off-strategy',
        collectionKey: 'consultingService',
        title: 'Strategie-Sprint',
        slug: 'strategie-sprint',
        data: {
          summary: 'Fünf Tage, klarer Scope, Entscheidungsdossier für den Vorstand — ohne Folien-Wüste.',
          image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80'
        }
      },
      {
        id: 'off-pm',
        collectionKey: 'consultingService',
        title: 'Programm-Office',
        slug: 'programm-office',
        data: {
          summary: 'Steuerung von Multi-Vendor-Programmen mit Steuerungs-Cockpit und klaren Risiko-Frühindikatoren.',
          image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80'
        }
      },
      {
        id: 'off-data',
        collectionKey: 'consultingService',
        title: 'Data & Reporting',
        slug: 'data-reporting',
        data: {
          summary: 'Vom Rohchaos zur wiederholbaren Reporting-Linie — inklusive Datenvertrag mit IT.',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
        }
      },
      {
        id: 'case-bank',
        collectionKey: 'caseStudy',
        title: 'Retail-Bank · Omnichannel',
        slug: 'retail-bank-omnichannel',
        data: {
          summary: 'Kernbank-Programm in 18 Monaten live — mit kontrolliertem Cutover und 40% weniger Hotline-Last.',
          image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1200&q=80'
        }
      },
      {
        id: 'case-logistics',
        collectionKey: 'caseStudy',
        title: 'Logistik · Netzwerk-Redesign',
        slug: 'logistik-netzwerk',
        data: {
          summary: 'Standort- und Routenlogik neu modelliert — 12% Kostensenkung bei gleicher Servicezeit.',
          image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
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
          title: 'Flamingo Advisory Partners · Beratung Frankfurt',
          description: 'Strategie, Programme, Cases.'
        },
        sections: [
          section('home-hero', 'global.hero', 1, {
            eyebrow: 'Frankfurt · DACH',
            headline: { plain: 'Klarheit', accent: 'vor Tempo.' },
            subline: 'Wir arbeiten mit CFO, COO und CIO — immer mit messbarem Ergebnis und einem Owner pro Arbeitspaket.',
            body: 'Kein Dauer-Deck: unsere Mandate haben ein Enddatum und ein gemeinsames Definition-of-Done.',
            image: heroImages[styleKey],
            primaryCta: { label: 'Leistungen', link: { type: 'page', href: '/leistungen' } },
            secondaryCta: { label: 'Cases', link: { type: 'page', href: '/cases' } }
          }),
          section('home-action', 'global.actionBar', 2, {
            useOpeningHours: false,
            statusOverride: 'Erstgespräch: 30 Minuten · aktuell 4 Slots diese Woche',
            primaryCta: { label: 'Termin sichern', link: { type: 'page', href: '/kontakt' } },
            secondaryCta: { label: 'Expertise', link: { type: 'page', href: '/expertise' } }
          }),
          section('home-offers', 'consulting.offerOverview', 3, {
            eyebrow: 'Angebote',
            headline: { plain: 'Drei', accent: 'Einstiege.' },
            intro: 'Modular buchbar — Details und Referenzen pro Klick.',
            items: ['off-strategy', 'off-pm', 'off-data']
          }),
          section('home-cases', 'consulting.caseStudies', 4, {
            eyebrow: 'Cases',
            headline: { plain: 'Aus der', accent: 'Praxis.' },
            intro: 'Anonymisiert wo nötig, zahlenfähig wo möglich.',
            items: ['case-bank', 'case-logistics']
          }),
          section('home-stats', 'global.statsBand', 5, {
            eyebrow: 'Track record',
            headline: { plain: 'Messbar', accent: 'gedacht.' },
            items: [
              { value: '120+', label: 'Mandate', hint: '5 Jahre' },
              { value: '18', label: 'Branchen', hint: 'DACH' },
              { value: '4.8', label: 'NPS Ø', hint: 'intern' }
            ]
          }),
          section('home-cta', 'global.contactCta', 6, {
            eyebrow: 'Erstgespräch',
            headline: { plain: '30 Minuten', accent: 'Zoom.' },
            subline: 'Wir klären Fit und nächste Schritte — ohne Pitch-Show.',
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
        seo: { title: 'Leistungen · Flamingo Advisory', description: 'Beratungsmodule.' },
        sections: [
          section('svc-head', 'global.pageHeader', 1, {
            eyebrow: 'Leistungen',
            headline: { plain: 'Module', accent: 'statt Dauerprojekt.' },
            subline: 'Klare Deliverables, feste Teams, dokumentierte Entscheidungen.',
            image: heroImages[styleKey]
          }),
          section('svc-intro', 'global.introBlock', 2, {
            eyebrow: 'Engagement',
            headline: { plain: 'Senior', accent: 'on the tools.' },
            body: 'Wir staffen klein, arbeiten mit klaren Definition-of-Done und dokumentieren jede Entscheidung — damit Boards nachvollziehen können, was passiert.',
            facts: [
              { label: 'Team', value: '2–5' },
              { label: 'Remote', value: 'DACH' },
              { label: 'NDA', value: 'Standard' }
            ]
          }),
          section('svc-grid', 'consulting.offerOverview', 3, {
            eyebrow: 'Überblick',
            headline: { plain: 'Was wir', accent: 'anbieten.' },
            intro: 'Klick für Kurzbeschreibung.',
            items: ['off-strategy', 'off-pm', 'off-data']
          }),
          section('svc-scroll', 'global.scrollerHighlights', 4, {
            eyebrow: 'Beratung',
            headline: { plain: 'Drei Prinzipien', accent: 'unserer Arbeit.' },
            intro: 'Wie wir Entscheidungen beschleunigen — ohne Theater.',
            slides: [
              {
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
                title: 'Messbar statt mood',
                body: 'Deliverables und messbare Ergebnisse — damit Boards Entscheidungen nachvollziehen können.',
                cta: { label: 'Cases', link: { type: 'page', href: '/cases' } }
              },
              {
                image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80',
                title: 'Kleine Teams',
                body: 'Senior:innen on the tools — keine anonyme Armada aus Juniors.',
                cta: { label: 'Expertise', link: { type: 'page', href: '/expertise' } }
              },
              {
                image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
                title: 'Dokumentiert',
                body: 'Jede Session endet mit klaren nächsten Schritten — schriftlich.',
                cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
              }
            ]
          }),
          section('svc-steps', 'global.stepsStrip', 5, {
            eyebrow: 'Erstgespräch',
            headline: { plain: 'Von der Mail', accent: 'zum Mandat.' },
            steps: [
              { label: '1', title: 'Fit-Call', body: '30 Minuten — Scope, Risiko, nächste Schritte ohne Pitch-Show.' },
              { label: '2', title: 'Proposal', body: 'Schriftliches Angebot mit Deliverables, Team und Zeitfenster.' },
              { label: '3', title: 'Kick-off', body: 'Gemeinsames Definition-of-Done und Kommunikationsrhythmus.' }
            ]
          }),
          section('svc-faq', 'global.faq', 6, {
            eyebrow: 'Arbeit',
            headline: { plain: 'Typische', accent: 'Fragen.' },
            items: [
              {
                question: 'Arbeitet ihr auch embedded?',
                answer: 'Ja — nach Absprache integrieren wir uns in Programme und Teams, behalten aber klare Ownership-Linien.'
              },
              {
                question: 'Wie geht ihr mit Vertraulichkeit um?',
                answer: 'NDA vor Unterlagen, getrennte Repos — Details im Erstgespräch.'
              }
            ]
          }),
          section('svc-deep', 'consulting.deepDives', 7, {
            eyebrow: 'Methodik',
            headline: { plain: 'Playbooks', accent: 'und Learnings.' },
            intro: 'Templates, Workshops und Entscheidungsmuster — eigene Artikel im CMS.'
          }),
          section('svc-cta', 'global.contactCta', 8, {
            eyebrow: 'Nächster Schritt',
            headline: { plain: '30 Minuten', accent: 'Zoom.' },
            subline: 'Wir klären Fit und nächste Schritte — ohne Pitch-Show.',
            cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
          })
        ]
      },
      {
        id: 'cases',
        key: 'cases',
        kind: 'core',
        title: 'Cases',
        slug: '/cases',
        seo: { title: 'Cases · Flamingo Advisory', description: 'Referenzprojekte.' },
        sections: [
          section('cases-head', 'global.pageHeader', 1, {
            eyebrow: 'Cases',
            headline: { plain: 'Messbar', accent: 'gedacht.' },
            subline: 'Auswahl — vollständige Papers auf Anfrage.',
            image: heroImages[styleKey]
          }),
          section('cases-intro', 'global.introBlock', 2, {
            eyebrow: 'Referenzen',
            headline: { plain: 'Kontext', accent: 'vor Zahlen.' },
            body: 'Jedes Case beschreibt Ausgangslage, Intervention und Ergebnis — anonymisiert, wo Kunden es wünschen.',
            facts: [
              { label: 'Bank', value: '18 Monate' },
              { label: 'Logistik', value: '12 %' },
              { label: 'NDA', value: 'auf Wunsch' }
            ]
          }),
          section('cases-grid', 'consulting.caseStudies', 3, {
            eyebrow: 'Stories',
            headline: { plain: 'Zwei', accent: 'Programme.' },
            intro: 'Detailseiten mit Kontext und Ergebnissen.',
            items: ['case-bank', 'case-logistics']
          }),
          section('cases-steps', 'global.stepsStrip', 4, {
            eyebrow: 'Due diligence',
            headline: { plain: 'So leser', accent: 'ihr Cases.' },
            steps: [
              { label: '1', title: 'Hypothese', body: 'Welches Problem wurde adressiert?' },
              { label: '2', title: 'Intervention', body: 'Welche Hebel haben wir gezogen — Daten, Prozess, Organisation?' },
              { label: '3', title: 'Outcome', body: 'Welche Kennzahlen haben sich bewegt — und was bleibt?' }
            ]
          }),
          section('cases-deep', 'consulting.deepDives', 5, {
            eyebrow: 'Deep dives',
            headline: { plain: 'Hinter', accent: 'den Headlines.' },
            intro: 'Methodenartikel, Tooling und Lessons Learned — im CMS gepflegt.'
          }),
          section('cases-cta', 'global.contactCta', 6, {
            eyebrow: 'Vergleichbar',
            headline: { plain: 'Ähnliches', accent: 'Mandat?' },
            subline: 'Wir ordnen eure Situation ein und nennen realistische nächste Schritte.',
            cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
          })
        ]
      },
      {
        id: 'about',
        key: 'about',
        kind: 'core',
        title: 'Expertise',
        slug: '/expertise',
        seo: { title: 'Expertise · Flamingo Advisory', description: 'Team und Ansatz.' },
        sections: [
          section('about-head', 'global.pageHeader', 1, {
            eyebrow: 'Expertise',
            headline: { plain: 'Partner', accent: 'mit Linie.' },
            subline: 'Ehemalige Industry- und Strategy-Leads — jetzt unabhängig.',
            image: ''
          }),
          section('about-intro', 'global.introBlock', 2, {
            eyebrow: 'Prinzipien',
            headline: { plain: 'Weniger', accent: 'Theater.' },
            body: 'Wir dokumentieren Entscheidungen in kurzen Memos, halten Workshops eng und schulen eure Teams, damit das Ergebnis bleibt.',
            facts: [
              { label: 'Senior', value: '100 %' },
              { label: 'Remote', value: 'DACH' },
              { label: 'Enddatum', value: 'pro Mandat' }
            ]
          }),
          section('about-story', 'global.textImage', 3, {
            eyebrow: 'Arbeitsweise',
            headline: { plain: 'Weniger', accent: 'Folien.' },
            body: 'Wir dokumentieren Entscheidungen in kurzen Memos, halten Workshops eng und schulen eure Teams, damit das Ergebnis bleibt.',
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
            cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
          }),
          section('about-deep', 'consulting.deepDives', 4, {
            eyebrow: 'Playbooks',
            headline: { plain: 'Methoden', accent: 'zum Nachlesen.' },
            intro: 'Board-Formate, Research-Sprints und Delivery — Artikel im CMS.'
          }),
          section('about-quote', 'global.pullQuote', 5, {
            quote:
              '„Klarheit vor Tempo“ ist nicht Marketing — wir beenden Mandate, wenn das Definition-of-Done erreicht ist.',
            attribution: 'Leitung Advisory',
            role: 'Internes Prinzip'
          }),
          section('about-cta', 'global.contactCta', 6, {
            eyebrow: 'Erstgespräch',
            headline: { plain: 'Passt', accent: 'der Fit?' },
            subline: 'Wir melden uns innerhalb eines Werktags mit zwei Slots.',
            cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
          })
        ]
      },
      {
        id: 'contact',
        key: 'contact',
        kind: 'core',
        title: 'Kontakt',
        slug: '/kontakt',
        seo: { title: 'Kontakt · Flamingo Advisory', description: 'Erstgespräch.' },
        sections: [
          section('contact-head', 'global.pageHeader', 1, {
            eyebrow: 'Kontakt',
            headline: { plain: 'Sprecht', accent: 'mit uns.' },
            subline: 'Antwort innerhalb eines Werktags.',
            image: ''
          }),
          section('contact-intro', 'global.introBlock', 2, {
            eyebrow: 'Erstgespräch',
            headline: { plain: 'Was wir', accent: 'vorbereiten.' },
            body: 'Schickt uns Kontext, Zielhorizont und interne Stakeholder — wir kommen mit Agenda und klaren Fragen zum Fit-Call.',
            facts: [
              { label: 'Dauer', value: '30 min' },
              { label: 'Format', value: 'Zoom' },
              { label: 'NDA', value: 'vorab' }
            ]
          }),
          section('contact-map', 'global.mapContact', 3, {
            eyebrow: 'Büro',
            headline: { plain: 'Frankfurt', accent: 'Main.' },
            subline: 'Taunusanlage — Besuch nach Termin.',
            openingHours: 'Mo–Fr 9:00–18:00',
            conversionHighlights: [
              { badge: 'Board', title: 'Vorstandstermin', body: 'Wir unterstützen mit Entscheidungsvorlagen und klaren Optionen.' },
              { badge: 'Remote', title: 'Hybrid', body: 'Teams in Berlin/München — wir reisen für Workshops.' }
            ],
            arrival: [
              { title: 'Bahn', body: 'Hauptwache oder Taunusanlage — 5 Minuten Fussweg.' },
              { title: 'Auto', body: 'Parkhaus OpernTurm — Quittung für Kundenmeetings erstattungsfähig nach Absprache.' }
            ]
          }),
          section('contact-steps', 'global.stepsStrip', 4, {
            eyebrow: 'Sales',
            headline: { plain: 'Kein', accent: 'Pitch-Marathon.' },
            steps: [
              { label: '1', title: 'Fit', body: 'Wir prüfen, ob unsere Seniorität zu eurer Phase passt.' },
              { label: '2', title: 'Scope', body: 'Klare Deliverables und Out-of-Scope — schriftlich.' },
              { label: '3', title: 'Kick-off', body: 'Team, Kommunikationskanäle, erste Meilensteine.' }
            ]
          }),
          section('contact-faq', 'global.faq', 5, {
            eyebrow: 'Formalitäten',
            headline: { plain: 'Rechnung,', accent: 'MSA, Remote.' },
            items: [
              {
                question: 'Arbeitet ihr auf Time & Material?',
                answer: 'Nur in klar abgegrenzten Discovery-Phasen — danach bevorzugen wir Festpreis pro Modul.'
              },
              {
                question: 'Könnt ihr unter NDAs vorab Daten sehen?',
                answer: 'Ja — bitte NDA vorab unterschreiben, dann teilen wir sichere Uploads.'
              }
            ]
          }),
          section('contact-cta', 'global.contactCta', 6, {
            eyebrow: 'Direkt',
            headline: { plain: 'Mail', accent: 'schreiben.' },
            subline: 'hello@flamingo-advisory.test — wir priorisieren Boards und Programme.',
            cta: { label: 'Kontaktseite', link: { type: 'page', href: '/kontakt' } }
          })
        ]
      }
    ]
  };
}
