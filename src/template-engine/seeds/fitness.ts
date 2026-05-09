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
        address: 'Aachener Strasse 55, 50674 Köln'
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
          section('home-classes', 'fitness.classOverview', 2, {
            eyebrow: 'Kurse',
            headline: { plain: 'Unsere', accent: 'Hits.' },
            intro: 'Buchbar über die App oder an der Rezeption.',
            items: ['class-hiit', 'class-yoga', 'class-cycle']
          }),
          section('home-plan', 'fitness.trainingPlan', 3, {
            eyebrow: 'Woche',
            headline: { plain: 'Ausschnitt', accent: 'Plan.' },
            intro: 'Vollständiger Plan hängt im Studio und in der App.',
            items: ['plan-mo-yoga', 'plan-di-hiit', 'plan-mi-cycle']
          }),
          section('home-trainers', 'fitness.trainerTeam', 4, {
            eyebrow: 'Team',
            headline: { plain: 'Coach', accent: 'Faces.' },
            intro: 'Klick für Kurzprofil.',
            items: ['tr-lena', 'tr-marco']
          }),
          section('home-cta', 'global.contactCta', 5, {
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
          section('cls-grid', 'fitness.classOverview', 2, {
            eyebrow: 'Buchung',
            headline: { plain: 'Kurs', accent: 'wählen.' },
            intro: 'Details und Kapazität auf der Kursseite.',
            items: ['class-hiit', 'class-yoga', 'class-cycle']
          }),
          section('cls-plan', 'fitness.trainingPlan', 3, {
            eyebrow: 'Wochenplan',
            headline: { plain: 'Drei', accent: 'Slots.' },
            intro: 'Gleicher Slug-Pfad wie Kurse — Detailseite unterscheidet Inhalt.',
            items: ['plan-mo-yoga', 'plan-di-hiit', 'plan-mi-cycle']
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
          section('tr-grid', 'fitness.trainerTeam', 2, {
            eyebrow: 'Trainer:innen',
            headline: { plain: 'Zwei', accent: 'Gesichter.' },
            intro: 'Persönliche Nachricht über die Rezeption.',
            items: ['tr-lena', 'tr-marco']
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
          section('about-story', 'global.textImage', 2, {
            eyebrow: 'Community',
            headline: { plain: 'Kein', accent: 'Elitismus.' },
            body: 'Wir mischen Niveaus bewusst, moderieren intensiv und feiern Fortschritt statt Instagram-Perfektion.',
            image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80',
            cta: { label: 'Probetraining', link: { type: 'page', href: '/kontakt' } }
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
          section('contact-map', 'global.mapContact', 2, {
            eyebrow: 'Studio',
            headline: { plain: 'Aachener Str.', accent: '55.' },
            subline: ''
          })
        ]
      }
    ]
  };
}
