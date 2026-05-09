import type { SectionInstance, StyleKey } from '../model';
import type { SiteSeed } from './model';

const heroImages: Record<StyleKey, string> = {
  classic: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1800&q=82',
  modern: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1800&q=82',
  bold: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1800&q=82'
};

function section(id: string, sectionKey: string, sortOrder: number, data: Record<string, unknown>): SectionInstance {
  return { id, sectionKey, visible: true, sortOrder, data };
}

export function medicalSeed(styleKey: StyleKey): SiteSeed {
  return {
    tenantName: 'Praxisgemeinschaft Flamingo Mitte',
    industryKey: 'medical',
    styleKey,
    global: {
      brand: {
        name: 'Praxisgemeinschaft Flamingo Mitte',
        tagline: 'Allgemeinmedizin · Prävention · vernetzte Diagnostik'
      },
      navigation: [
        { label: 'Start', href: '/' },
        { label: 'Leistungen', href: '/leistungen' },
        { label: 'Team', href: '/team' },
        { label: 'Praxis', href: '/praxis' },
        { label: 'Termin', href: '/kontakt' }
      ],
      contact: {
        phone: '+49 30 210 88 40',
        email: 'praxis@flamingo-mitte.test',
        address: 'Torstrasse 49, 10119 Berlin'
      }
    },
    collections: [
      {
        id: 'tx-prevention',
        collectionKey: 'treatment',
        title: 'Check-up 35+',
        slug: 'check-up-35',
        data: {
          summary: 'Labor, EKG, Risikogespräch und schriftlicher Plan — alles in einem halben Tag.',
          image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80'
        }
      },
      {
        id: 'tx-chronic',
        collectionKey: 'treatment',
        title: 'Chronische Erkrankungen',
        slug: 'chronische-erkrankungen',
        data: {
          summary: 'Hypertonie, Diabetes Typ 2, Lipide — mit Telefon-Sprechstunde und gemeinsamen Zielen.',
          image: 'https://images.unsplash.com/photo-1579684385127-1ef15d5081de?auto=format&fit=crop&w=1200&q=80'
        }
      },
      {
        id: 'tx-travel',
        collectionKey: 'treatment',
        title: 'Reisemedizin',
        slug: 'reisemedizin',
        data: {
          summary: 'Impfberatung, Malariaprophylaxe, Reiseapotheke — abgestimmt auf Route und Dauer.',
          image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=1200&q=80'
        }
      },
      {
        id: 'doc-meyer',
        collectionKey: 'doctor',
        title: 'Dr. Anna Meyer',
        slug: 'dr-anna-meyer',
        data: {
          summary: 'Fachärztin für Allgemeinmedizin · Schwerpunkt Prävention und Frauengesundheit.',
          image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80'
        }
      },
      {
        id: 'doc-schulz',
        collectionKey: 'doctor',
        title: 'Dr. Jonas Schulz',
        slug: 'dr-jonas-schulz',
        data: {
          summary: 'Facharzt für Innere Medizin · Kardiologische Grundversorgung und Langzeit-EKG.',
          image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16b?auto=format&fit=crop&w=1200&q=80'
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
          title: 'Praxis Flamingo Mitte · Berlin',
          description: 'Leistungen, Team, Termin.'
        },
        sections: [
          section('home-hero', 'global.hero', 1, {
            eyebrow: 'Berlin Mitte',
            headline: { plain: 'Medizin', accent: 'mit Zeit.' },
            subline: 'Wir nehmen uns Raum für Erklärung, Vorsorge und Nachsorge — online und vor Ort.',
            body: 'Same-Day-Termine für Akutes, planbare Slots für Vorsorge. Videosprechstunde nach Vereinbarung.',
            image: heroImages[styleKey],
            primaryCta: { label: 'Leistungen', link: { type: 'page', href: '/leistungen' } },
            secondaryCta: { label: 'Team', link: { type: 'page', href: '/team' } }
          }),
          section('home-tx', 'medical.treatmentOverview', 2, {
            eyebrow: 'Leistungen',
            headline: { plain: 'Schwerpunkte', accent: 'unserer Praxis.' },
            intro: 'Auszug — Details auf den Folgeseiten.',
            items: ['tx-prevention', 'tx-chronic', 'tx-travel']
          }),
          section('home-team', 'medical.doctorTeam', 3, {
            eyebrow: 'Team',
            headline: { plain: 'Ihre', accent: 'Ansprechpartner:innen.' },
            intro: 'Klick für Kurzvita und Sprechzeiten.',
            items: ['doc-meyer', 'doc-schulz']
          }),
          section('home-cta', 'global.contactCta', 4, {
            eyebrow: 'Termin',
            headline: { plain: 'Online oder', accent: 'telefonisch.' },
            subline: 'Wir rufen zurück, wenn alle Leitungen besetzt sind.',
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
        seo: { title: 'Leistungen · Praxis Flamingo Mitte', description: 'Behandlungsschwerpunkte.' },
        sections: [
          section('svc-head', 'global.pageHeader', 1, {
            eyebrow: 'Leistungen',
            headline: { plain: 'Was wir', accent: 'anbieten.' },
            subline: 'Evidence-basiert, verständlich erklärt.',
            image: heroImages[styleKey]
          }),
          section('svc-grid', 'medical.treatmentOverview', 2, {
            eyebrow: 'Überblick',
            headline: { plain: 'Behandlungen', accent: 'im Detail.' },
            intro: 'Fachliche Informationen auf den Detailseiten.',
            items: ['tx-prevention', 'tx-chronic', 'tx-travel']
          }),
          section('svc-scroll', 'global.scrollerHighlights', 3, {
            eyebrow: 'Praxis',
            headline: { plain: 'Drei Schwerpunkte', accent: 'unserer Arbeit.' },
            intro: 'Prävention, chronische Versorgung und Reisemedizin — kurz erklärt.',
            slides: [
              {
                image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80',
                title: 'Zeit am Patienten',
                body: 'Längere Slots, weniger Hektik — damit Fragen nicht unter den Tisch fallen.',
                cta: { label: 'Team', link: { type: 'page', href: '/team' } }
              },
              {
                image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
                title: 'Evidence-basiert',
                body: 'Leitlinien und Studienlage fließen in jede Empfehlung ein.',
                cta: { label: 'Leistungen', link: { type: 'page', href: '/leistungen' } }
              },
              {
                image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80',
                title: 'Digitale Wege',
                body: 'Rezept und Termin online — wenn es medizinisch sinnvoll ist.',
                cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
              }
            ]
          })
        ]
      },
      {
        id: 'team',
        key: 'team',
        kind: 'core',
        title: 'Team',
        slug: '/team',
        seo: { title: 'Team · Praxis Flamingo Mitte', description: 'Ärztinnen und Ärzte.' },
        sections: [
          section('team-head', 'global.pageHeader', 1, {
            eyebrow: 'Team',
            headline: { plain: 'Menschen', accent: 'hinter der Medizin.' },
            subline: 'Gemeinschaftspraxis mit festen Vertretungsregeln.',
            image: heroImages[styleKey]
          }),
          section('team-grid', 'medical.doctorTeam', 2, {
            eyebrow: 'Ärztinnen',
            headline: { plain: 'Zwei', accent: 'Profile.' },
            intro: 'Mehr Teammitglieder in der Praxis — hier die Klick-Profile.',
            items: ['doc-meyer', 'doc-schulz']
          })
        ]
      },
      {
        id: 'about',
        key: 'about',
        kind: 'core',
        title: 'Praxis',
        slug: '/praxis',
        seo: { title: 'Praxis · Flamingo Mitte', description: 'Konzept und Räume.' },
        sections: [
          section('about-head', 'global.pageHeader', 1, {
            eyebrow: 'Praxis',
            headline: { plain: 'Barrierearm', accent: 'und ruhig.' },
            subline: 'Lift, Kinderwagenparkplätze, ruhige Wartezone.',
            image: ''
          }),
          section('about-story', 'global.textImage', 2, {
            eyebrow: 'Konzept',
            headline: { plain: 'Prävention', accent: 'zuerst.' },
            body: 'Wir kombinieren klassische Hausarztmedizin mit moderner Diagnostik — ohne Übermedikalisierung.',
            image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
            cta: { label: 'Termin', link: { type: 'page', href: '/kontakt' } }
          })
        ]
      },
      {
        id: 'contact',
        key: 'contact',
        kind: 'core',
        title: 'Termin',
        slug: '/kontakt',
        seo: { title: 'Kontakt · Praxis Flamingo Mitte', description: 'Anfahrt und Termin.' },
        sections: [
          section('contact-head', 'global.pageHeader', 1, {
            eyebrow: 'Kontakt',
            headline: { plain: 'Wir sind', accent: 'für Sie da.' },
            subline: 'Torstrasse 49, Aufgang B, 2. OG',
            image: ''
          }),
          section('contact-map', 'global.mapContact', 2, {
            eyebrow: 'Anfahrt',
            headline: { plain: 'Mitte', accent: 'Berlin.' },
            subline: ''
          })
        ]
      }
    ]
  };
}
