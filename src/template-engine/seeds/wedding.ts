import type { SectionInstance, StyleKey } from '../model';
import type { SiteSeed } from './model';

const heroImages: Record<StyleKey, string> = {
  classic: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=82',
  modern: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1800&q=82',
  bold: 'https://images.unsplash.com/photo-1522673607260-14d1f34b1a31?auto=format&fit=crop&w=1800&q=82'
};

function section(id: string, sectionKey: string, sortOrder: number, data: Record<string, unknown>): SectionInstance {
  return { id, sectionKey, visible: true, sortOrder, data };
}

export function weddingSeed(styleKey: StyleKey): SiteSeed {
  return {
    tenantName: 'Hochzeit Lena & Jonas',
    industryKey: 'wedding',
    styleKey,
    global: {
      brand: {
        name: 'Lena & Jonas',
        tagline: '12. September 2026 · Weingut am Rhein'
      },
      navigation: [
        { label: 'Start', href: '/' },
        { label: 'Ablauf', href: '/ablauf' },
        { label: 'Location', href: '/location' },
        { label: 'RSVP', href: '/rsvp' },
        { label: 'FAQ', href: '/faq' }
      ],
      contact: {
        phone: '+49 171 000 77 88',
        email: 'wedding@lena-jonas.test',
        address: 'Weingut Flamingo, Rheinstraße 2, 55411 Bingen am Rhein'
      }
    },
    collections: [
      {
        id: 'sch-trauung',
        collectionKey: 'scheduleItem',
        title: 'Freie Trauung im Weinberg',
        slug: 'freie-trauung',
        data: {
          summary: '15:00 · Zeremonie mit musikalischer Begleitung · Bitte 15 Minuten früher da sein.',
          image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'
        }
      },
      {
        id: 'sch-sekt',
        collectionKey: 'scheduleItem',
        title: 'Sektempfang & Fotos',
        slug: 'sektempfang',
        data: {
          summary: '16:15 · Innenhof · Gruppenfotos direkt danach am alten Kesselhaus.',
          image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80'
        }
      },
      {
        id: 'sch-dinner',
        collectionKey: 'scheduleItem',
        title: 'Dinner & Reden',
        slug: 'dinner-reden',
        data: {
          summary: '18:30 · Festscheune · vegetarische und vegane Optionen sind angekündigt.',
          image: 'https://images.unsplash.com/photo-1522673607260-14d1f34b1a31?auto=format&fit=crop&w=1200&q=80'
        }
      },
      {
        id: 'acc-hotel',
        collectionKey: 'accommodation',
        title: 'Hotel Zur Flamingo',
        slug: 'hotel-zur-flamingo',
        data: {
          summary: 'Kontingent bis 15.08. reserviert — Code „LENAJONAS2026“ bei Buchung angeben.',
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
        }
      },
      {
        id: 'acc-pension',
        collectionKey: 'accommodation',
        title: 'Pension Rheinblick',
        slug: 'pension-rheinblick',
        data: {
          summary: '10 Gehminuten, familiär, Frühstück inklusive — bitte früh buchen.',
          image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
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
          title: 'Lena & Jonas · Hochzeit 2026',
          description: 'Ablauf, RSVP und Location.'
        },
        sections: [
          section('home-hero', 'global.hero', 1, {
            eyebrow: 'Save the date',
            headline: { plain: 'Wir heiraten', accent: 'am Rhein.' },
            subline: '12. September 2026 · Weingut Flamingo · festliche Garderobe, bequeme Schuhe für den Weinberg.',
            body: 'Wir freuen uns riesig, diesen Tag mit euch zu feiern — bitte RSVP bis 1. Juli, damit wir planen können.',
            image: heroImages[styleKey],
            primaryCta: { label: 'RSVP', link: { type: 'page', href: '/rsvp' } },
            secondaryCta: { label: 'Ablauf', link: { type: 'page', href: '/ablauf' } }
          }),
          section('home-schedule', 'wedding.schedule', 2, {
            eyebrow: 'Tag',
            headline: { plain: 'So läuft', accent: 'der Tag.' },
            intro: 'Kurzüberblick — Details auf der Ablauf-Seite.',
            items: ['sch-trauung', 'sch-sekt', 'sch-dinner']
          }),
          section('home-rsvp', 'wedding.rsvp', 3, {
            eyebrow: 'Antwort',
            headline: { plain: 'Seid', accent: 'dabei?' },
            intro: 'Bitte bis 1. Juli 2026 Bescheid sagen — auch bei Plus-one und Ernährung.',
            deadlineLabel: 'Antwortfrist: 1. Juli 2026',
            nameLabel: 'Euer Name',
            attendanceLabel: 'Seid ihr dabei?',
            guestCountLabel: 'Anzahl Personen',
            dietaryLabel: 'Essen, Allergien oder Kinder',
            noteLabel: 'Nachricht an uns',
            submitLabel: 'Antwort senden',
            successMessage: 'Danke, eure Demo-Antwort wurde erfasst.',
            cta: { label: 'Zur RSVP-Seite', link: { type: 'page', href: '/rsvp' } }
          }),
          section('home-gallery', 'global.galleryGrid', 4, {
            eyebrow: 'Momente',
            headline: { plain: 'Ein', accent: 'Vorgeschmack.' },
            images: [
              { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80', alt: 'Paar' },
              { url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80', alt: 'Location' },
              { url: 'https://images.unsplash.com/photo-1522673607260-14d1f34b1a31?auto=format&fit=crop&w=900&q=80', alt: 'Feier' }
            ]
          })
        ]
      },
      {
        id: 'schedule',
        key: 'schedule',
        kind: 'core',
        title: 'Ablauf',
        slug: '/ablauf',
        seo: { title: 'Ablauf · Lena & Jonas', description: 'Tagesprogramm.' },
        sections: [
          section('abl-head', 'global.pageHeader', 1, {
            eyebrow: 'Programm',
            headline: { plain: 'Der', accent: 'Fahrplan.' },
            subline: 'Zeiten können sich um wenige Minuten verschieben — wir halten euch am Tag auf dem Laufenden.',
            image: heroImages[styleKey]
          }),
          section('abl-schedule', 'wedding.schedule', 2, {
            eyebrow: 'Details',
            headline: { plain: 'Alle', accent: 'Programmpunkte.' },
            intro: 'Klick für Kurzinfo — ideal auf dem Handy.',
            items: ['sch-trauung', 'sch-sekt', 'sch-dinner']
          }),
          section('abl-scroll', 'global.scrollerHighlights', 3, {
            eyebrow: 'Hochzeit',
            headline: { plain: 'Drei Momente', accent: 'am Tag X.' },
            intro: 'Was Gäste besonders in Erinnerung behalten — kurz und bildlich.',
            slides: [
              {
                image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
                title: 'Zeremonie im Licht',
                body: 'Kurz, emotional, mit Raum für eure Texte — nichts wird gehetzt.',
                cta: { label: 'Location', link: { type: 'page', href: '/location' } }
              },
              {
                image: 'https://images.unsplash.com/photo-1522673607260-14d1f34b1a31?auto=format&fit=crop&w=900&q=80',
                title: 'Essen & Reden',
                body: 'Menü mit Optionen — inklusive klarer Zeiten für Reden und Tanz.',
                cta: { label: 'RSVP', link: { type: 'page', href: '/rsvp' } }
              },
              {
                image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80',
                title: 'Übernachten',
                body: 'Hotel und Pension in der Nähe — mit reservierten Kontingenten.',
                cta: { label: 'Unterkünfte', link: { type: 'page', href: '/location' } }
              }
            ]
          })
        ]
      },
      {
        id: 'location',
        key: 'location',
        kind: 'core',
        title: 'Location',
        slug: '/location',
        seo: { title: 'Location · Lena & Jonas', description: 'Weingut und Unterkünfte.' },
        sections: [
          section('loc-head', 'global.pageHeader', 1, {
            eyebrow: 'Weingut',
            headline: { plain: 'Flamingo', accent: 'am Rhein.' },
            subline: 'Parken auf dem Gelände begrenzt — bitte Fahrgemeinschaften bilden.',
            image: heroImages[styleKey]
          }),
          section('loc-story', 'global.textImage', 2, {
            eyebrow: 'Anreise',
            headline: { plain: 'Mit Bahn', accent: 'oder Auto.' },
            body: 'Bingen Hauptbahnhof ist 12 Minuten Fussweg. Vom Bahnhof aus dem Rhein folgen, dann zweite Brücke links.',
            image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
            cta: { label: 'RSVP', link: { type: 'page', href: '/rsvp' } }
          }),
          section('loc-acc', 'wedding.accommodation', 3, {
            eyebrow: 'Übernachten',
            headline: { plain: 'Zwei', accent: 'Optionen.' },
            intro: 'Kontingente — bitte rechtzeitig buchen.',
            items: ['acc-hotel', 'acc-pension']
          })
        ]
      },
      {
        id: 'rsvp',
        key: 'rsvp',
        kind: 'core',
        title: 'RSVP',
        slug: '/rsvp',
        seo: { title: 'RSVP · Lena & Jonas', description: 'Zu- oder Absage.' },
        sections: [
          section('rsvp-head', 'global.pageHeader', 1, {
            eyebrow: 'Antwort',
            headline: { plain: 'Wir zählen', accent: 'auf euch.' },
            subline: 'Bitte auch Ernährung und Kinder angeben.',
            image: ''
          }),
          section('rsvp-block', 'wedding.rsvp', 2, {
            eyebrow: 'Formular',
            headline: { plain: 'Online', accent: 'antworten.' },
            intro: 'Gebt uns kurz Bescheid, ob ihr dabei seid, mit wie vielen Personen ihr kommt und ob wir beim Essen etwas beachten sollen.',
            deadlineLabel: 'Bitte bis 1. Juli 2026 antworten.',
            nameLabel: 'Euer Name',
            attendanceLabel: 'Seid ihr dabei?',
            guestCountLabel: 'Anzahl Personen',
            dietaryLabel: 'Essen, Allergien oder Kinder',
            noteLabel: 'Nachricht an uns',
            submitLabel: 'Antwort senden',
            successMessage: 'Danke, eure Demo-Antwort wurde erfasst. In einem echten Kundenprojekt geht sie an das hinterlegte Postfach.',
            cta: { label: 'Demo: Antwort senden', link: { type: 'page', href: '/faq' } }
          })
        ]
      },
      {
        id: 'faq',
        key: 'faq',
        kind: 'core',
        title: 'FAQ',
        slug: '/faq',
        seo: { title: 'FAQ · Lena & Jonas', description: 'Häufige Fragen.' },
        sections: [
          section('faq-head', 'global.pageHeader', 1, {
            eyebrow: 'Hilfe',
            headline: { plain: 'Fragen', accent: 'und Antworten.' },
            subline: 'Wenn etwas fehlt: schreibt uns per E-Mail.',
            image: ''
          }),
          section('faq-list', 'global.faq', 2, {
            eyebrow: 'FAQ',
            headline: { plain: 'Das', accent: 'Wichtigste.' },
            items: [
              {
                question: 'Kann ich ein Plus-one mitbringen?',
                answer: 'Bitte im RSVP angeben — wir planen mit euch individuell.'
              },
              {
                question: 'Gibt es vegane Speisen?',
                answer: 'Ja, beim Dinner sind vegane und vegetarische Menüs vorgesehen — bitte im RSVP ankreuzen.'
              },
              {
                question: 'Was ist die Dresscode?',
                answer: 'Festlich, aber Schuhe für Rasen und Kies im Weinberg sind eine gute Idee.'
              }
            ]
          })
        ]
      }
    ]
  };
}
