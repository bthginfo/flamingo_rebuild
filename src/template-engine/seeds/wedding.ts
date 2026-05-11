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
        address: 'Weingut Flamingo, Rheinstraße 2, 55411 Bingen am Rhein',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Weingut%20Bingen%20am%20Rhein'
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
            successMessage: 'Danke — eure Antwort wurde erfasst.',
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
          }),
          section('home-cta', 'global.contactCta', 5, {
            eyebrow: 'Fragen',
            headline: { plain: 'Schreibt', accent: 'uns.' },
            subline: 'Für alles rund um Anreise, Unterkunft und Tagesablauf — wir antworten persönlich.',
            cta: { label: 'Zur FAQ', link: { type: 'page', href: '/faq' } }
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
          section('abl-intro', 'global.introBlock', 3, {
            eyebrow: 'Gäste',
            headline: { plain: 'Dresscode,', accent: 'Kinder, Geschenke.' },
            body: 'Hier sammeln wir die wichtigsten Hinweise zum Tag X — alles im CMS editierbar, damit ihr keine PDFs verschicken müsst.',
            facts: [
              { label: 'Dresscode', value: 'festlich' },
              { label: 'Kinder', value: 'willkommen' },
              { label: 'Geschenke', value: 'optional' }
            ]
          }),
          section('abl-scroll', 'global.scrollerHighlights', 4, {
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
          }),
          section('abl-faq', 'global.faq', 5, {
            eyebrow: 'Ablauf',
            headline: { plain: 'Zeitplan', accent: '& Puffer.' },
            items: [
              {
                question: 'Wie pünktlich müssen wir sein?',
                answer: 'Bitte 15 Minuten vor der Zeremonie am Treffpunkt — so bleibt Zeit für Fotos ohne Stress.'
              },
              {
                question: 'Was passiert bei Regen?',
                answer: 'Wir haben eine Indoor-Alternative in der Festscheune — Details stehen in den Gästeinfos.'
              }
            ]
          }),
          section('abl-deep', 'wedding.deepDives', 6, {
            eyebrow: 'Details',
            headline: { plain: 'Plan B,', accent: 'Shuttle, Kinder.' },
            intro: 'Längere Texte zu Ablauf und Logistik — eigene Artikel im CMS.'
          }),
          section('abl-cta', 'global.contactCta', 7, {
            eyebrow: 'Kontakt',
            headline: { plain: 'Noch', accent: 'Fragen?' },
            subline: 'Schreibt uns — wir helfen persönlich weiter.',
            cta: { label: 'FAQ lesen', link: { type: 'page', href: '/faq' } }
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
          section('loc-intro', 'global.introBlock', 3, {
            eyebrow: 'Logistik',
            headline: { plain: 'Parken,', accent: 'Shuttle, Timing.' },
            body: 'Parkplätze am Weingut sind begrenzt — bitte Fahrgemeinschaften bilden. Shuttle-Infos folgen eine Woche vor dem Event.',
            facts: [
              { label: 'Parken', value: 'begrenzt' },
              { label: 'Bahnhof', value: '12 min' },
              { label: 'Shuttle', value: 'Info folgt' }
            ]
          }),
          section('loc-acc', 'wedding.accommodation', 4, {
            eyebrow: 'Übernachten',
            headline: { plain: 'Zwei', accent: 'Optionen.' },
            intro: 'Kontingente — bitte rechtzeitig buchen.',
            items: ['acc-hotel', 'acc-pension']
          }),
          section('loc-map', 'global.mapContact', 5, {
            eyebrow: 'Ankommen',
            headline: { plain: 'Adresse, Route', accent: 'und Zeiten.' },
            subline:
              'Alle wichtigen Informationen für Anreise, Parken und Rückfahrt an einem Ort.',
            primaryActionLabel: 'Anrufen',
            secondaryActionLabel: 'E-Mail schreiben',
            arrival: [
              { title: 'Bahn', body: 'Bingen Hauptbahnhof ist etwa 12 Minuten zu Fuß entfernt.' },
              { title: 'Parken', body: 'Direkt am Weingut gibt es wenige Plätze. Bitte bildet Fahrgemeinschaften.' },
              { title: 'Taxi', body: 'Wir teilen am Abend lokale Taxi-Kontakte am Empfang.' }
            ]
          }),
          section('loc-faq', 'global.faq', 6, {
            eyebrow: 'Anreise',
            headline: { plain: 'Shuttle', accent: '& Taxi.' },
            items: [
              {
                question: 'Gibt es einen Shuttle vom Hotel?',
                answer: 'Für Hotel Zur Flamingo ja — bitte bei Buchung angeben, wir planen Kapazität.'
              },
              {
                question: 'Was ist mit Kindersitzen?',
                answer: 'Bitte im RSVP Kinder anmelden — wir organisieren Sitze für die Shuttles.'
              }
            ]
          }),
          section('loc-deep', 'wedding.deepDives', 7, {
            eyebrow: 'Gästeinfos',
            headline: { plain: 'Plan B', accent: '& Details.' },
            intro: 'Wetter, Dresscode, Geschenke — längere Hinweise als eigene Artikel im CMS.'
          }),
          section('loc-cta', 'global.contactCta', 8, {
            eyebrow: 'Hilfe',
            headline: { plain: 'Unklar', accent: 'bei der Route?' },
            subline: 'Schreibt uns — wir schicken eine Karte mit Markierungen.',
            cta: { label: 'Mail schreiben', link: { type: 'page', href: '/faq' } }
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
          section('rsvp-intro', 'global.introBlock', 2, {
            eyebrow: 'Deadline',
            headline: { plain: 'Bitte bis', accent: '1. Juli antworten.' },
            body: 'So können wir Menü, Sitzordnung und Shuttle planen — auch wenn sich später noch Kleinigkeiten ändern.',
            facts: [
              { label: 'Frist', value: '1. Juli' },
              { label: 'Plus-one', value: 'im Formular' },
              { label: 'Essen', value: 'Allergien' }
            ]
          }),
          section('rsvp-block', 'wedding.rsvp', 3, {
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
            successMessage: 'Danke — eure Antwort wurde erfasst. Mit aktivem Postfach landet sie direkt bei uns.',
            cta: { label: 'Antwort senden', link: { type: 'page', href: '/faq' } }
          }),
          section('rsvp-faq', 'global.faq', 4, {
            eyebrow: 'RSVP',
            headline: { plain: 'Kurz', accent: 'geklärt.' },
            items: [
              {
                question: 'Können wir später noch ändern?',
                answer: 'Bis 15. August bitte per Mail — danach wird die Liste an Catering und Location geschickt.'
              },
              {
                question: 'Was ist mit Babys?',
                answer: 'Bitte im Formular Alter nennen — wir planen Hochstuhl und Ruhezone.'
              }
            ]
          }),
          section('rsvp-deep', 'wedding.deepDives', 5, {
            eyebrow: 'Gästeinfos',
            headline: { plain: 'Mehr', accent: 'zum Tag.' },
            intro: 'Dresscode, Geschenke, Fotos — längere Texte im CMS.'
          }),
          section('rsvp-cta', 'global.contactCta', 6, {
            eyebrow: 'Hilfe',
            headline: { plain: 'Formular', accent: 'klemmt?' },
            subline: 'Schreibt uns — wir tragen die Daten gern für euch ein.',
            cta: { label: 'Kontakt', link: { type: 'page', href: '/faq' } }
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
          section('faq-intro', 'global.introBlock', 2, {
            eyebrow: 'Gäste',
            headline: { plain: 'Alles', accent: 'Wichtige.' },
            body: 'Diese Seite bündelt Antworten, die wir oft hören — ergänzt durch längere Artikel unten. Alles vollständig im CMS editierbar.',
            facts: [
              { label: 'RSVP', value: '1. Juli' },
              { label: 'Dresscode', value: 'festlich' },
              { label: 'Kinder', value: 'ja' }
            ]
          }),
          section('faq-list', 'global.faq', 3, {
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
          }),
          section('faq-long', 'global.richArticle', 4, {
            eyebrow: 'Ausführlich',
            headline: { plain: 'Noch', accent: 'mehr Details.' },
            content:
              'Hier könnt ihr längere Hinweise zu Geschenken, Fotografen, Kindern und Barrierefreiheit pflegen — ohne die FAQ-Liste zu überladen. Absätze, Links und Betonungen sind alles CMS-Felder.'
          }),
          section('faq-deep', 'wedding.deepDives', 5, {
            eyebrow: 'Stories',
            headline: { plain: 'Hintergrund', accent: 'zum Wochenende.' },
            intro: 'Geschichte des Weinguts, Musik, Plan B — eigene Artikel.'
          }),
          section('faq-cta', 'global.contactCta', 6, {
            eyebrow: 'Kontakt',
            headline: { plain: 'Persönlich', accent: 'erreichen.' },
            subline: 'Schreibt uns bei Sonderfällen — wir antworten schnell.',
            cta: { label: 'RSVP öffnen', link: { type: 'page', href: '/rsvp' } }
          })
        ]
      }
    ]
  };
}
