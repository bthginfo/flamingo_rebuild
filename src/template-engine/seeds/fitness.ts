import type { SectionInstance, StyleKey } from '../model';
import type { SiteSeed } from './model';

const heroImages: Record<StyleKey, string> = {
  classic: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1800&q=82',
  modern: 'https://images.unsplash.com/photo-1571902941922-7f3d1eccc349?auto=format&fit=crop&w=1800&q=82',
  bold: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1800&q=82'
};

function section(id: string, sectionKey: string, sortOrder: number, data: Record<string, unknown>): SectionInstance {
  return { id, sectionKey, visible: true, sortOrder, data };
}

export function fitnessSeed(styleKey: StyleKey): SiteSeed {
  return {
    tenantName: 'Studio Flamingo Kraft',
    industryKey: 'fitness',
    styleKey,
    global: {
      brand: {
        name: 'Studio Flamingo Kraft',
        tagline: 'Kurse · Coaching · Community'
      },
      navigation: [
        { label: 'Start', href: '/' },
        { label: 'Kurse', href: '/kurse' },
        { label: 'Trainer:innen', href: '/trainer' },
        { label: 'Studio', href: '/studio' },
        { label: 'Probetraining', href: '/kontakt' }
      ],
      contact: {
        phone: '+49 221 88 77 30',
        email: 'willkommen@studio-flamingo-kraft.test',
        address: 'Aachener Straße 55, 50674 Köln'
      }
    },
    collections: [
      {
        id: 'class-hiit',
        collectionKey: 'fitnessClass',
        title: 'HIIT 45',
        slug: 'hiit-45',
        data: {
          summary: 'Intervalltraining mit kurzen Pausen — für Fortgeschrittene, moderierte Intensität.',
          image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80'
        }
      },
      {
        id: 'class-yoga',
        collectionKey: 'fitnessClass',
        title: 'Yoga Flow',
        slug: 'yoga-flow',
        data: {
          summary: '60 Minuten Mobility und Atmung — auch für Einsteiger geeignet.',
          image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80'
        }
      },
      {
        id: 'class-cycle',
        collectionKey: 'fitnessClass',
        title: 'Indoor Cycle',
        slug: 'indoor-cycle',
        data: {
          summary: 'Beatgetriebenes Training mit Watt-Anzeige und Pausen für Trinken.',
          image: 'https://images.unsplash.com/photo-1571902941922-7f3d1eccc349?auto=format&fit=crop&w=1200&q=80'
        }
      },
      {
        id: 'plan-mo-yoga',
        collectionKey: 'scheduleItem',
        title: 'Yoga Flow',
        slug: 'plan-mo-yoga',
        data: {
          summary: 'Montag · 07:30 · Studio A · mit Lena',
          image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80'
        }
      },
      {
        id: 'plan-di-hiit',
        collectionKey: 'scheduleItem',
        title: 'HIIT 45',
        slug: 'plan-di-hiit',
        data: {
          summary: 'Dienstag · 18:00 · Box · mit Marco',
          image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80'
        }
      },
      {
        id: 'plan-mi-cycle',
        collectionKey: 'scheduleItem',
        title: 'Indoor Cycle',
        slug: 'plan-mi-cycle',
        data: {
          summary: 'Mittwoch · 19:15 · Cycle Room · mit Sam',
          image: 'https://images.unsplash.com/photo-1571902941922-7f3d1eccc349?auto=format&fit=crop&w=900&q=80'
        }
      },
      {
        id: 'tr-lena',
        collectionKey: 'trainer',
        title: 'Lena Vogt',
        slug: 'lena-vogt',
        data: {
          summary: 'Yoga & Mobility · 500h Ausbildung · Fokus auf chronische Schultern.',
          image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=1200&q=80'
        }
      },
      {
        id: 'tr-marco',
        collectionKey: 'trainer',
        title: 'Marco Silva',
        slug: 'marco-silva',
        data: {
          summary: 'Athletic Training · ehemaliger Handball-Bundesliga · HIIT & Kraft.',
          image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fa?auto=format&fit=crop&w=1200&q=80'
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
          title: 'Studio Flamingo Kraft · Köln',
          description: 'Kurse, Trainer:innen, Probetraining.'
        },
        sections: [
          section('home-hero', 'global.hero', 1, {
            eyebrow: 'Köln · Ehrenfeld',
            headline: { plain: 'Kraft', accent: 'mit Rhythmus.' },
            subline: 'Kleine Kurse, klare Trainer:innen, keine versteckten Vertragsfallen — Probetraining geht online.',
            body: 'Mitgliedschaft oder Zehnerkarten. Sauna und Duschen inklusive.',
            image: heroImages[styleKey],
            primaryCta: { label: 'Kurse', link: { type: 'page', href: '/kurse' } },
            secondaryCta: { label: 'Trainer:innen', link: { type: 'page', href: '/trainer' } }
          }),
          section('home-action', 'global.actionBar', 2, {
            useOpeningHours: false,
            statusOverride: 'Heute: HIIT 18:00 · noch 4 Plätze',
            primaryCta: { label: 'Probetraining', link: { type: 'page', href: '/kontakt' } },
            secondaryCta: { label: 'Wochenplan', link: { type: 'page', href: '/kurse' } }
          }),
          section('home-classes', 'fitness.classOverview', 3, {
            eyebrow: 'Kurse',
            headline: { plain: 'Unsere', accent: 'Hits.' },
            intro: 'Buchbar über die App oder an der Rezeption.',
            items: ['class-hiit', 'class-yoga', 'class-cycle']
          }),
          section('home-plan', 'fitness.trainingPlan', 4, {
            eyebrow: 'Woche',
            headline: { plain: 'Ausschnitt', accent: 'Plan.' },
            intro: 'Vollständiger Plan hängt im Studio und in der App.',
            items: ['plan-mo-yoga', 'plan-di-hiit', 'plan-mi-cycle']
          }),
          section('home-trainers', 'fitness.trainerTeam', 5, {
            eyebrow: 'Team',
            headline: { plain: 'Coach', accent: 'Faces.' },
            intro: 'Klick für Kurzprofil.',
            items: ['tr-lena', 'tr-marco']
          }),
          section('home-cta', 'global.contactCta', 6, {
            eyebrow: 'Probetraining',
            headline: { plain: 'Erst', accent: 'reinschnuppern.' },
            subline: 'Wir zeigen Studio, Umkleide und einen Kurs nach Wahl.',
            cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
          })
        ]
      },
      {
        id: 'classes',
        key: 'classes',
        kind: 'core',
        title: 'Kurse',
        slug: '/kurse',
        seo: { title: 'Kurse · Studio Flamingo Kraft', description: 'Programme und Plan.' },
        sections: [
          section('cls-head', 'global.pageHeader', 1, {
            eyebrow: 'Kurse',
            headline: { plain: 'Programme', accent: 'mit Plan.' },
            subline: 'Kursbeschreibungen und Wochenhighlights.',
            image: heroImages[styleKey]
          }),
          section('cls-intro', 'global.introBlock', 2, {
            eyebrow: 'Buchung',
            headline: { plain: 'App,', accent: 'Rezeption, Warteliste.' },
            body: 'Slots sind begrenzt — wir halten Wartelisten fair und informieren euch per Push, wenn Plätze frei werden.',
            facts: [
              { label: 'Probetraining', value: 'kostenlos' },
              { label: 'Sauna', value: 'inkl.' },
              { label: 'Parken', value: 'hinten' }
            ]
          }),
          section('cls-grid', 'fitness.classOverview', 3, {
            eyebrow: 'Buchung',
            headline: { plain: 'Kurs', accent: 'wählen.' },
            intro: 'Details und Kapazität auf der Kursseite.',
            items: ['class-hiit', 'class-yoga', 'class-cycle']
          }),
          section('cls-scroll', 'global.scrollerHighlights', 4, {
            eyebrow: 'Studio',
            headline: { plain: 'Drei Gründe', accent: 'für unser Training.' },
            intro: 'Community, Coaching und klare Programme — auf einen Blick.',
            slides: [
              {
                image: 'https://images.unsplash.com/photo-1534438327276-14e6700d112c?auto=format&fit=crop&w=900&q=80',
                title: 'Coach im Blick',
                body: 'Korrekturen statt Show — wir arbeiten mit Technik-Checks und Feedback.',
                cta: { label: 'Trainer:innen', link: { type: 'page', href: '/trainer' } }
              },
              {
                image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80',
                title: 'Fester Wochenplan',
                body: 'HIIT, Yoga, Cycle — Slots, die ihr im Kalender verlassen könnt.',
                cta: { label: 'Kurse', link: { type: 'page', href: '/kurse' } }
              },
              {
                image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
                title: 'Community',
                body: 'Kein Egoshow — wir feiern Fortschritte aller Levels.',
                cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
              }
            ]
          }),
          section('cls-plan', 'fitness.trainingPlan', 5, {
            eyebrow: 'Wochenplan',
            headline: { plain: 'Drei', accent: 'Slots.' },
            intro: 'Gleicher Slug-Pfad wie Kurse — Detailseite unterscheidet Inhalt.',
            items: ['plan-mo-yoga', 'plan-di-hiit', 'plan-mi-cycle']
          }),
          section('cls-faq', 'global.faq', 6, {
            eyebrow: 'Studio',
            headline: { plain: 'Kurse', accent: 'und Levels.' },
            items: [
              {
                question: 'Kann ich als Einsteiger zu HIIT?',
                answer: 'Ja — unsere Coaches skalieren Intensität. Bitte im Probetraining kurz Bescheid sagen.'
              },
              {
                question: 'Was ist, wenn ein Kurs ausfällt?',
                answer: 'Ihr bekommt App-Push und Ersatzslot — Guthaben bleibt erhalten.'
              }
            ]
          }),
          section('cls-deep', 'fitness.deepDives', 7, {
            eyebrow: 'Training',
            headline: { plain: 'Community', accent: '& Ziele.' },
            intro: 'Ernährung, Regeneration, Mindset — Artikel im CMS.'
          }),
          section('cls-cta', 'global.contactCta', 8, {
            eyebrow: 'Probetraining',
            headline: { plain: 'Slot', accent: 'sichern.' },
            subline: 'Schreibt uns euren Wunschtag — wir melden uns mit Uhrzeit.',
            cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
          })
        ]
      },
      {
        id: 'trainers',
        key: 'trainers',
        kind: 'core',
        title: 'Trainer:innen',
        slug: '/trainer',
        seo: { title: 'Trainer:innen · Studio Flamingo Kraft', description: 'Team.' },
        sections: [
          section('tr-head', 'global.pageHeader', 1, {
            eyebrow: 'Team',
            headline: { plain: 'Coach', accent: 'mit Profil.' },
            subline: 'Qualifikationen und Schwerpunkte.',
            image: heroImages[styleKey]
          }),
          section('tr-intro', 'global.introBlock', 2, {
            eyebrow: 'Coaching',
            headline: { plain: 'Technik,', accent: 'Motivation, Sicherheit.' },
            body: 'Unsere Trainer:innen moderieren Intensität, korrigieren Haltung und kennen die nächsten Schritte für eure Ziele.',
            facts: [
              { label: 'Ausbildung', value: '500h+' },
              { label: 'Kurse', value: 'HIIT/Yoga' },
              { label: 'Feedback', value: 'jede Session' }
            ]
          }),
          section('tr-grid', 'fitness.trainerTeam', 3, {
            eyebrow: 'Trainer:innen',
            headline: { plain: 'Zwei', accent: 'Gesichter.' },
            intro: 'Persönliche Nachricht über die Rezeption.',
            items: ['tr-lena', 'tr-marco']
          }),
          section('tr-video', 'global.videoEmbed', 4, {
            eyebrow: 'Studio',
            headline: { plain: 'Ein', accent: 'Blick ins Training.' },
            embedUrl: 'https://www.youtube.com/watch?v=419glzkLwBA',
            caption: 'Kurzclip aus dem HIIT-Raum — echtes Studio, echte Athlet:innen.'
          }),
          section('tr-deep', 'fitness.deepDives', 5, {
            eyebrow: 'Journal',
            headline: { plain: 'Training', accent: 'im Detail.' },
            intro: 'Technik, Regeneration, Community — Artikel im CMS.'
          }),
          section('tr-cta', 'global.contactCta', 6, {
            eyebrow: 'Probetraining',
            headline: { plain: 'Coach', accent: 'wählen.' },
            subline: 'Wir reservieren euch einen Slot mit eurer Wunschperson.',
            cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
          })
        ]
      },
      {
        id: 'about',
        key: 'about',
        kind: 'core',
        title: 'Studio',
        slug: '/studio',
        seo: { title: 'Studio · Flamingo Kraft', description: 'Räume und Werte.' },
        sections: [
          section('about-head', 'global.pageHeader', 1, {
            eyebrow: 'Studio',
            headline: { plain: 'Hell', accent: 'und lautstark.' },
            subline: 'Zwei Trainingszonen, Cycle Room, Freihantelbereich.',
            image: ''
          }),
          section('about-intro', 'global.introBlock', 2, {
            eyebrow: 'Community',
            headline: { plain: 'Kein', accent: 'Elitismus.' },
            body: 'Wir mischen Niveaus bewusst, moderieren intensiv und feiern Fortschritt statt Instagram-Perfektion — alles Wortlaut im CMS anpassbar.',
            facts: [
              { label: 'Mitglieder', value: '800+' },
              { label: 'Kurse', value: '45/Woche' },
              { label: 'Sauna', value: 'inkl.' }
            ]
          }),
          section('about-story', 'global.textImage', 3, {
            eyebrow: 'Kultur',
            headline: { plain: 'Kein', accent: 'Elitismus.' },
            body: 'Wir mischen Niveaus bewusst, moderieren intensiv und feiern Fortschritt statt Instagram-Perfektion.',
            image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80',
            cta: { label: 'Probetraining', link: { type: 'page', href: '/kontakt' } }
          }),
          section('about-deep', 'fitness.deepDives', 4, {
            eyebrow: 'Studio',
            headline: { plain: 'Training', accent: 'smart aufbauen.' },
            intro: 'Einstieg, Regeneration, Ernährung — Artikel im CMS.'
          }),
          section('about-stats', 'global.statsBand', 5, {
            eyebrow: 'Zahlen',
            headline: { plain: 'Was', accent: 'zählt.' },
            items: [
              { value: '45', label: 'Kurse / Woche', hint: 'live' },
              { value: '92%', label: 'Weiterempfehlung', hint: 'Umfrage' },
              { value: '24/7', label: 'Zugang', hint: 'Mitglieder' }
            ]
          }),
          section('about-cta', 'global.contactCta', 6, {
            eyebrow: 'Probetraining',
            headline: { plain: 'Vorbei', accent: 'kommen.' },
            subline: 'Wir zeigen Umkleide, Sauna und einen Kurs nach Wahl.',
            cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
          })
        ]
      },
      {
        id: 'contact',
        key: 'contact',
        kind: 'core',
        title: 'Probetraining',
        slug: '/kontakt',
        seo: { title: 'Kontakt · Studio Flamingo Kraft', description: 'Anfahrt und Buchung.' },
        sections: [
          section('contact-head', 'global.pageHeader', 1, {
            eyebrow: 'Kontakt',
            headline: { plain: 'Wir freuen', accent: 'uns.' },
            subline: 'Schreibt uns euren Wunschtermin fürs Probetraining.',
            image: ''
          }),
          section('contact-intro', 'global.introBlock', 2, {
            eyebrow: 'Probetraining',
            headline: { plain: 'Was wir', accent: 'von euch brauchen.' },
            body: 'Aktuelles Trainingslevel, Verletzungen und Wunschkurs — dann reservieren wir passend.',
            facts: [
              { label: 'Dauer', value: '60 min' },
              { label: 'Kosten', value: '0 €' },
              { label: 'Mitbringen', value: 'Handtuch' }
            ]
          }),
          section('contact-map', 'global.mapContact', 3, {
            eyebrow: 'Studio',
            headline: { plain: 'Aachener Str.', accent: '55.' },
            subline: 'Köln Ehrenfeld — Anfahrt und Parken im CMS gepflegt.',
            openingHours: 'Mo–Fr 6:00–22:00, Sa 8–18',
            conversionHighlights: [
              { badge: 'Neu', title: 'Probetraining', body: 'Wir blocken 60 Minuten inklusive Studio-Rundgang.' },
              { badge: 'App', title: 'Buchung', body: 'Mitgliedschaft und Zehnerkarten digital verfügbar.' }
            ],
            arrival: [
              { title: 'ÖPNV', body: 'Bahnhof Ehrenfeld — 6 Minuten Fussweg.' },
              { title: 'Fahrrad', body: 'Stellplätze vor dem Eingang — bitte nicht blockieren.' }
            ]
          }),
          section('contact-steps', 'global.stepsStrip', 4, {
            eyebrow: 'Ablauf',
            headline: { plain: 'Probetraining', accent: 'in 3 Schritten.' },
            steps: [
              { label: '1', title: 'Anfrage', body: 'Wunschtag und Kurs nennen — wir bestätigen Slot.' },
              { label: '2', title: 'Check-in', body: 'Ausweis, kurze Gesundheitsfrage, Umkleide-Tour.' },
              { label: '3', title: 'Session', body: 'Coach erklärt Technik — danach Angebot für Mitgliedschaft.' }
            ]
          }),
          section('contact-faq', 'global.faq', 5, {
            eyebrow: 'Studio',
            headline: { plain: 'Mitgliedschaft', accent: 'FAQ.' },
            items: [
              {
                question: 'Kann ich pausieren?',
                answer: 'Ja — bis zu 8 Wochen pro Jahr kostenfrei, wenn ihr vorher Bescheid sagt.'
              },
              {
                question: 'Gibt es Studentenpreise?',
                answer: 'Ja — bitte gültigen Nachweis an der Rezeption vorlegen.'
              }
            ]
          }),
          section('contact-cta', 'global.contactCta', 6, {
            eyebrow: 'Hotline',
            headline: { plain: 'Kurz', accent: 'anrufen.' },
            subline: 'Rezeption hilft bei Buchung und Probetraining.',
            cta: { label: 'Anrufen', link: { type: 'phone', href: '+49221887730' } }
          })
        ]
      }
    ]
  };
}
