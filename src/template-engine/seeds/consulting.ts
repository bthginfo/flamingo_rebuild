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
          summary: 'Steuerung von Multi-Vendor-Programmen mit KPI-Cockpit und Risiko-Frühindikatoren.',
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
          section('home-offers', 'consulting.offerOverview', 2, {
            eyebrow: 'Angebote',
            headline: { plain: 'Drei', accent: 'Einstiege.' },
            intro: 'Modular buchbar — Details und Referenzen pro Klick.',
            items: ['off-strategy', 'off-pm', 'off-data']
          }),
          section('home-cases', 'consulting.caseStudies', 3, {
            eyebrow: 'Cases',
            headline: { plain: 'Aus der', accent: 'Praxis.' },
            intro: 'Anonymisiert wo nötig, zahlenfähig wo möglich.',
            items: ['case-bank', 'case-logistics']
          }),
          section('home-cta', 'global.contactCta', 4, {
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
          section('svc-grid', 'consulting.offerOverview', 2, {
            eyebrow: 'Überblick',
            headline: { plain: 'Was wir', accent: 'anbieten.' },
            intro: 'Klick für Kurzbeschreibung.',
            items: ['off-strategy', 'off-pm', 'off-data']
          }),
          section('svc-scroll', 'global.scrollerHighlights', 3, {
            eyebrow: 'Beratung',
            headline: { plain: 'Drei Prinzipien', accent: 'unserer Arbeit.' },
            intro: 'Wie wir Entscheidungen beschleunigen — ohne Theater.',
            slides: [
              {
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
                title: 'Messbar statt mood',
                body: 'Deliverables und KPIs — damit Boards Entscheidungen nachvollziehen können.',
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
          section('cases-grid', 'consulting.caseStudies', 2, {
            eyebrow: 'Stories',
            headline: { plain: 'Zwei', accent: 'Programme.' },
            intro: 'Detailseiten mit Kontext und Ergebnissen.',
            items: ['case-bank', 'case-logistics']
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
          section('about-story', 'global.textImage', 2, {
            eyebrow: 'Arbeitsweise',
            headline: { plain: 'Weniger', accent: 'Folien.' },
            body: 'Wir dokumentieren Entscheidungen in kurzen Memos, halten Workshops eng und schulen eure Teams, damit das Ergebnis bleibt.',
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
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
          section('contact-map', 'global.mapContact', 2, {
            eyebrow: 'Büro',
            headline: { plain: 'Frankfurt', accent: 'Main.' },
            subline: ''
          })
        ]
      }
    ]
  };
}
