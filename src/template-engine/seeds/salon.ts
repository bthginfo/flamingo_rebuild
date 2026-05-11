import type { SectionInstance, StyleKey } from '../model';
import type { SiteSeed } from './model';

const heroImages: Record<StyleKey, string> = {
  classic: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1800&q=82',
  modern: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1800&q=82',
  bold: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1800&q=82'
};

function section(id: string, sectionKey: string, sortOrder: number, data: Record<string, unknown>): SectionInstance {
  return { id, sectionKey, visible: true, sortOrder, data };
}

export function salonSeed(styleKey: StyleKey): SiteSeed {
  return {
    tenantName: 'Salon Flamingo Rosa',
    industryKey: 'salon',
    styleKey,
    global: {
      brand: {
        name: 'Salon Flamingo Rosa',
        tagline: 'Color, Cut, Ruhe — mitten in der Stadt'
      },
      navigation: [
        { label: 'Start', href: '/' },
        { label: 'Leistungen', href: '/leistungen' },
        { label: 'Looks', href: '/looks' },
        { label: 'Studio', href: '/studio' },
        { label: 'Termin', href: '/kontakt' }
      ],
      contact: {
        phone: '+49 30 123 88 44',
        email: 'hello@salon-flamingo-rosa.test',
        address: 'Auguststraße 12, 10117 Berlin'
      }
    },
    collections: [
      {
        id: 'tr-cut-color',
        collectionKey: 'treatment',
        title: 'Cut & Color Signature',
        slug: 'cut-color-signature',
        data: {
          summary: 'Beratung, Glossing und Schnitt — alles in einem ruhigen Block mit Tee und Kopfmassage.',
          image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80'
        }
      },
      {
        id: 'tr-spa-hands',
        collectionKey: 'treatment',
        title: 'Spa Maniküre',
        slug: 'spa-manikuere',
        data: {
          summary: 'Feilen, Ölbad, Lack oder clean — ohne Hektik, mit warmen Handtüchern.',
          image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=80'
        }
      },
      {
        id: 'tr-bridal',
        collectionKey: 'treatment',
        title: 'Bridal Styling',
        slug: 'bridal-styling',
        data: {
          summary: 'Probe-Termin, Tag-X-Begleitung und Touch-up-Kit für die Trauzeugin.',
          image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=80'
        }
      },
      {
        id: 'look-rose',
        collectionKey: 'look',
        title: 'Editorial Rose',
        slug: 'editorial-rose',
        data: {
          summary: 'Weiches Rosa, strukturierter Pony — für Abendlicht und Fotos.',
          image: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=1200&q=80'
        }
      },
      {
        id: 'look-texture',
        collectionKey: 'look',
        title: 'Textur & Kurz',
        slug: 'textur-kurz',
        data: {
          summary: 'Curly Girl freundlich, viel Bewegung, wenig Produkt.',
          image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80'
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
          title: 'Salon Flamingo Rosa · Cut, Color, Looks',
          description: 'Treatments, Lookbook und Termin in Berlin-Mitte.'
        },
        sections: [
          section('home-hero', 'global.hero', 1, {
            eyebrow: 'Berlin · Mitte',
            headline: { plain: 'Haar, das sich', accent: 'leicht anfühlt.' },
            subline: 'Wir arbeiten mit sanften Produkten, klaren Preisen und viel Ruhe zwischen den Terminen.',
            body: 'Ob Farbveränderung oder Pflege-Routine: ihr bekommt eine ehrliche Empfehlung und einen Plan, der zu eurem Alltag passt.',
            image: heroImages[styleKey],
            primaryCta: { label: 'Leistungen', link: { type: 'page', href: '/leistungen' } },
            secondaryCta: { label: 'Looks', link: { type: 'page', href: '/looks' } }
          }),
          section('home-action', 'global.actionBar', 2, {
            useOpeningHours: false,
            statusOverride: 'Heute noch 2 Cut-Slots frei',
            primaryCta: { label: 'Termin', link: { type: 'page', href: '/kontakt' } },
            secondaryCta: { label: 'Leistungen', link: { type: 'page', href: '/leistungen' } }
          }),
          section('home-treat', 'salon.treatmentHighlights', 3, {
            eyebrow: 'Treatments',
            headline: { plain: 'Unsere', accent: 'Lieblinge.' },
            intro: 'Drei Behandlungen, die wir am häufigsten kombinieren — Details per Klick.',
            items: ['tr-cut-color', 'tr-spa-hands', 'tr-bridal']
          }),
          section('home-look', 'salon.lookbook', 4, {
            eyebrow: 'Lookbook',
            headline: { plain: 'Ergebnisse', accent: 'zum Anfassen.' },
            intro: 'Farbe, Schnitt und Styling — immer mit echtem Haar und echtem Licht.',
            items: ['look-rose', 'look-texture']
          }),
          section('home-stats', 'global.statsBand', 5, {
            eyebrow: 'Studio',
            headline: { plain: 'Ruhig', accent: 'und fokussiert.' },
            items: [
              { value: '8', label: 'Stühle', hint: 'weniger Hektik' },
              { value: '45 min', label: 'Puffer', hint: 'pro Color' },
              { value: '100%', label: 'Preise', hint: 'vorher klar' }
            ]
          }),
          section('home-testimonials', 'global.testimonials', 6, {
            eyebrow: 'Gäste',
            headline: { plain: 'Still', accent: 'und gründlich.' },
            items: [
              { quote: 'Zum ersten Mal seit Jahren vertraue ich wieder jemandem mit meiner Farbe.', name: 'Lea K.' },
              { quote: 'Kein Smalltalk-Zwang, dafür bestes Ergebnis bei meinem krausen Haar.', name: 'Robin F.' }
            ]
          }),
          section('home-cta', 'global.contactCta', 7, {
            eyebrow: 'Termin',
            headline: { plain: 'Wir halten', accent: 'Platz frei.' },
            subline: 'Schreibt uns euren Wunschtermin — wir melden uns mit Vorschlägen.',
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
        seo: { title: 'Leistungen · Salon Flamingo Rosa', description: 'Treatments und Pakete.' },
        sections: [
          section('svc-head', 'global.pageHeader', 1, {
            eyebrow: 'Leistungen',
            headline: { plain: 'Klar', accent: 'strukturiert.' },
            subline: 'Von der ersten Beratung bis zur Nachpflege — ihr wisst immer, was passiert.',
            image: heroImages[styleKey]
          }),
          section('svc-intro', 'global.introBlock', 2, {
            eyebrow: 'Beratung',
            headline: { plain: 'Dauer,', accent: 'Allergie, Pflege.' },
            body: 'Jedes Treatment startet mit ehrlicher Einordnung: was geht in einer Session, was braucht Serien-Termine, was solltet ihr zu Hause tun.',
            facts: [
              { label: 'Color', value: 'Strähnen-Check' },
              { label: 'Kids', value: 'willkommen' },
              { label: 'Ruhe', value: 'Pufferzeit' }
            ]
          }),
          section('svc-grid', 'salon.treatmentHighlights', 3, {
            eyebrow: 'Auswahl',
            headline: { plain: 'Treatments', accent: 'im Detail.' },
            intro: 'Klick für Kurzbeschreibung und Bild.',
            items: ['tr-cut-color', 'tr-spa-hands', 'tr-bridal']
          }),
          section('svc-scroll', 'global.scrollerHighlights', 4, {
            eyebrow: 'Salon',
            headline: { plain: 'Drei Gründe', accent: 'für einen Termin.' },
            intro: 'Was Gäste an unserem Rhythmus schätzen — kurz und visuell.',
            slides: [
              {
                image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80',
                title: 'Ruhe zwischen den Terminen',
                body: 'Weniger Stühle, mehr Zeit pro Gast — ohne Warteschlangen-Gefühl.',
                cta: { label: 'Studio', link: { type: 'page', href: '/studio' } }
              },
              {
                image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80',
                title: 'Color mit Plan',
                body: 'Strähnen, Glossing oder Reset — wir dokumentieren jeden Schritt.',
                cta: { label: 'Looks', link: { type: 'page', href: '/looks' } }
              },
              {
                image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=900&q=80',
                title: 'Klare Preise',
                body: 'Vor dem Start wisst ihr, was auf dem Zettel steht — ohne Überraschungen.',
                cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
              }
            ]
          }),
          section('svc-steps', 'global.stepsStrip', 5, {
            eyebrow: 'Ablauf',
            headline: { plain: 'Ersttermin', accent: 'in 4 Schritten.' },
            steps: [
              { label: '1', title: 'Anamnese', body: 'Haarhistorie, Wünsche, Alltag — wir dokumentieren.' },
              { label: '2', title: 'Plan', body: 'Klare Empfehlung mit Preisrahmen und Pflege zu Hause.' },
              { label: '3', title: 'Umsetzung', body: 'Ruhe, Tee, Kopfmassage — dann Styling.' },
              { label: '4', title: 'Nachsorge', body: 'Produkte und nächster Termin — alles im CMS editierbar.' }
            ]
          }),
          section('svc-faq', 'global.faq', 6, {
            eyebrow: 'Salon',
            headline: { plain: 'Häufige', accent: 'Fragen.' },
            items: [
              {
                question: 'Wie lange dauert ein Color-Termin?',
                answer: 'Je nach Technik 2–4 Stunden — wir nennen vorab eine realistische Spanne.'
              },
              {
                question: 'Kann ich während der Schwangerschaft färben?',
                answer: 'Wir beraten individuell und dokumentieren — sprecht uns gern vorab an.'
              }
            ]
          }),
          section('svc-deep', 'salon.deepDives', 7, {
            eyebrow: 'Wissen',
            headline: { plain: 'Pflege', accent: 'und Trends.' },
            intro: 'Beratungsartikel, Produktnews und Studio-Rituale — eigene Storys im CMS.'
          }),
          section('svc-cta', 'global.contactCta', 8, {
            eyebrow: 'Termin',
            headline: { plain: 'Wunschdatum', accent: 'schicken.' },
            subline: 'Wir melden uns mit Slots und Preisrahmen.',
            cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
          })
        ]
      },
      {
        id: 'gallery',
        key: 'gallery',
        kind: 'core',
        title: 'Looks',
        slug: '/looks',
        seo: { title: 'Looks · Salon Flamingo Rosa', description: 'Styling und Farben.' },
        sections: [
          section('looks-head', 'global.pageHeader', 1, {
            eyebrow: 'Portfolio',
            headline: { plain: 'Looks', accent: 'mit Charakter.' },
            subline: 'Kombination aus Schnitt, Farbe und Finish.',
            image: heroImages[styleKey]
          }),
          section('looks-intro', 'global.introBlock', 2, {
            eyebrow: 'Looks',
            headline: { plain: 'Echt', accent: 'Haar, echtes Licht.' },
            body: 'Unser Lookbook zeigt Ergebnisse unter Studio-Licht und im Alltag — keine überzeichneten Filter.',
            facts: [
              { label: 'Color', value: 'Goldwell' },
              { label: 'Cut', value: 'trocken & nass' },
              { label: 'Styling', value: 'inklusive' }
            ]
          }),
          section('looks-book', 'salon.lookbook', 3, {
            eyebrow: 'Editorial',
            headline: { plain: 'Zwei', accent: 'Stimmungen.' },
            intro: 'Mehr Looks zeigen wir im Studio auf dem grossen Screen.',
            items: ['look-rose', 'look-texture']
          }),
          section('looks-grid', 'global.galleryGrid', 4, {
            eyebrow: 'Impressionen',
            headline: { plain: 'Licht', accent: 'und Textur.' },
            images: [
              { url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80', alt: 'Salon' },
              { url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80', alt: 'Styling' },
              { url: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=900&q=80', alt: 'Farbe' }
            ]
          }),
          section('looks-deep', 'salon.deepDives', 5, {
            eyebrow: 'Studio',
            headline: { plain: 'Hinter', accent: 'den Looks.' },
            intro: 'Pflegepläne, Produktentscheidungen und Team-Stimmen — Artikel im CMS.'
          }),
          section('looks-cta', 'global.contactCta', 6, {
            eyebrow: 'Termin',
            headline: { plain: 'Eigenen', accent: 'Look planen.' },
            subline: 'Schickt uns Referenzbilder — wir antworten mit realistischem Plan.',
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
        seo: { title: 'Studio · Salon Flamingo Rosa', description: 'Team und Werte.' },
        sections: [
          section('about-head', 'global.pageHeader', 1, {
            eyebrow: 'Studio',
            headline: { plain: 'Ruhig', accent: 'eingerichtet.' },
            subline: 'Weniger Stühle, mehr Zeit pro Gast — so bleibt der Raum atembar.',
            image: ''
          }),
          section('about-intro', 'global.introBlock', 2, {
            eyebrow: 'Team',
            headline: { plain: 'Handwerk', accent: 'mit Herz.' },
            body: 'Wir schulen intern, tauschen uns mit Coloristen aus London und Paris aus — und dokumentieren jeden Schritt transparent.',
            facts: [
              { label: 'Ausbildung', value: 'laufend' },
              { label: 'Produkte', value: 'low-tox' },
              { label: 'Termine', value: 'Puffer' }
            ]
          }),
          section('about-story', 'global.textImage', 3, {
            eyebrow: 'Kultur',
            headline: { plain: 'Handwerk', accent: 'mit Herz.' },
            body: 'Wir schulen intern, tauschen uns mit Coloristen aus London und Paris aus und feiern kleine Fortschritte lieber als laute Trends.',
            image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80',
            cta: { label: 'Termin', link: { type: 'page', href: '/kontakt' } }
          }),
          section('about-deep', 'salon.deepDives', 4, {
            eyebrow: 'Wissen',
            headline: { plain: 'Pflege', accent: 'und Ritual.' },
            intro: 'Beratung, Produktentscheidungen und Studio-Updates — eigene Artikel im CMS.'
          }),
          section('about-voices', 'global.testimonials', 5, {
            eyebrow: 'Stimmen',
            headline: { plain: 'Warum', accent: 'Mitte.' },
            items: [{ quote: 'Endlich ein Salon, der nicht nach Chlor riecht.', name: 'Mira S.' }]
          }),
          section('about-cta', 'global.contactCta', 6, {
            eyebrow: 'Besuch',
            headline: { plain: 'Studio', accent: 'live sehen.' },
            subline: 'Schreibt uns für eine Führung oder direkt einen Termin.',
            cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
          })
        ]
      },
      {
        id: 'contact',
        key: 'contact',
        kind: 'core',
        title: 'Termin',
        slug: '/kontakt',
        seo: { title: 'Kontakt · Salon Flamingo Rosa', description: 'Anfahrt und Buchung.' },
        sections: [
          section('contact-head', 'global.pageHeader', 1, {
            eyebrow: 'Kontakt',
            headline: { plain: 'Schreibt', accent: 'uns.' },
            subline: 'Wir antworten werktags innerhalb von 24 Stunden.',
            image: ''
          }),
          section('contact-intro', 'global.introBlock', 2, {
            eyebrow: 'Termin',
            headline: { plain: 'Was wir', accent: 'von euch brauchen.' },
            body: 'Wunschbehandlung, ungefähre Verfügbarkeit und ob ihr Color-Historie mitbringt — dann können wir euch passende Slots schicken.',
            facts: [
              { label: 'Antwort', value: '< 24h' },
              { label: 'Samstag', value: '8–16' },
              { label: 'Parken', value: 'Street' }
            ]
          }),
          section('contact-map', 'global.mapContact', 3, {
            eyebrow: 'Studio',
            headline: { plain: 'Auguststraße', accent: '12.' },
            subline: 'Anfahrt, Öffnungszeiten und schnelle Aktionen — alles im CMS.',
            openingHours: 'Di–Sa 9:00–19:00',
            conversionHighlights: [
              { badge: 'Neu', title: 'Ersttermin', body: 'Wir blocken extra Zeit für Beratung und Teststrähnen.' },
              { badge: 'Hochzeit', title: 'Bridal', body: 'Probe-Termin und Tag-X-Paket — fragt nach freien Daten.' }
            ],
            arrival: [
              { title: 'ÖPNV', body: 'U8 Rosenthaler Platz — 4 Minuten Fussweg.' },
              { title: 'Fahrrad', body: 'Abstellplätze vor dem Haus — bitte nicht den Eingang blockieren.' }
            ]
          }),
          section('contact-steps', 'global.stepsStrip', 4, {
            eyebrow: 'Buchung',
            headline: { plain: 'So sichert', accent: 'ihr den Slot.' },
            steps: [
              { label: '1', title: 'Nachricht', body: 'Wunschtermin und Treatment — wir bestätigen Verfügbarkeit.' },
              { label: '2', title: 'Reminder', body: '24h vorher Erinnerung per Mail — bitte pünktlich erscheinen.' },
              { label: '3', title: 'Nachbereitung', body: 'Pflegeplan und Produktvorschlag — alles dokumentiert.' }
            ]
          }),
          section('contact-faq', 'global.faq', 5, {
            eyebrow: 'Salon',
            headline: { plain: 'Kurz', accent: 'geklärt.' },
            items: [
              {
                question: 'Kann ich ohne Termin vorbeikommen?',
                answer: 'Nur für Beratung kurz möglich — für Color und Cut braucht ihr immer einen Slot.'
              },
              {
                question: 'Was kostet eine Beratung?',
                answer: 'Die Erstberatung ist kostenfrei, wenn ihr ein Treatment bucht — sonst 25 €.'
              }
            ]
          }),
          section('contact-cta', 'global.contactCta', 6, {
            eyebrow: 'Direkt',
            headline: { plain: 'Lieber', accent: 'anrufen?' },
            subline: 'Unsere Rezeption nimmt kurzfristige Fragen entgegen.',
            cta: { label: 'Jetzt anrufen', link: { type: 'phone', href: '+49301238844' } }
          })
        ]
      }
    ]
  };
}
