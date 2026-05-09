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
          section('home-treat', 'salon.treatmentHighlights', 2, {
            eyebrow: 'Treatments',
            headline: { plain: 'Unsere', accent: 'Lieblinge.' },
            intro: 'Drei Behandlungen, die wir am häufigsten kombinieren — Details per Klick.',
            items: ['tr-cut-color', 'tr-spa-hands', 'tr-bridal']
          }),
          section('home-look', 'salon.lookbook', 3, {
            eyebrow: 'Lookbook',
            headline: { plain: 'Ergebnisse', accent: 'zum Anfassen.' },
            intro: 'Farbe, Schnitt und Styling — immer mit echtem Haar und echtem Licht.',
            items: ['look-rose', 'look-texture']
          }),
          section('home-testimonials', 'global.testimonials', 4, {
            eyebrow: 'Gäste',
            headline: { plain: 'Still', accent: 'und gründlich.' },
            items: [
              { quote: 'Zum ersten Mal seit Jahren vertraue ich wieder jemandem mit meiner Farbe.', name: 'Lea K.' },
              { quote: 'Kein Smalltalk-Zwang, dafür bestes Ergebnis bei meinem krausen Haar.', name: 'Robin F.' }
            ]
          }),
          section('home-cta', 'global.contactCta', 5, {
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
          section('svc-grid', 'salon.treatmentHighlights', 2, {
            eyebrow: 'Auswahl',
            headline: { plain: 'Treatments', accent: 'im Detail.' },
            intro: 'Klick für Kurzbeschreibung und Bild.',
            items: ['tr-cut-color', 'tr-spa-hands', 'tr-bridal']
          }),
          section('svc-scroll', 'global.scrollerHighlights', 3, {
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
          section('looks-book', 'salon.lookbook', 2, {
            eyebrow: 'Editorial',
            headline: { plain: 'Zwei', accent: 'Stimmungen.' },
            intro: 'Mehr Looks zeigen wir im Studio auf dem grossen Screen.',
            items: ['look-rose', 'look-texture']
          }),
          section('looks-grid', 'global.galleryGrid', 3, {
            eyebrow: 'Impressionen',
            headline: { plain: 'Licht', accent: 'und Textur.' },
            images: [
              { url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80', alt: 'Salon' },
              { url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80', alt: 'Styling' },
              { url: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=900&q=80', alt: 'Farbe' }
            ]
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
          section('about-story', 'global.textImage', 2, {
            eyebrow: 'Team',
            headline: { plain: 'Handwerk', accent: 'mit Herz.' },
            body: 'Wir schulen intern, tauschen uns mit Coloristen aus London und Paris aus und feiern kleine Fortschritte lieber als laute Trends.',
            image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80',
            cta: { label: 'Termin', link: { type: 'page', href: '/kontakt' } }
          }),
          section('about-voices', 'global.testimonials', 3, {
            eyebrow: 'Stimmen',
            headline: { plain: 'Warum', accent: 'Mitte.' },
            items: [{ quote: 'Endlich ein Salon, der nicht nach Chlor riecht.', name: 'Mira S.' }]
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
          section('contact-map', 'global.mapContact', 2, {
            eyebrow: 'Studio',
            headline: { plain: 'Auguststraße', accent: '12.' },
            subline: ''
          })
        ]
      }
    ]
  };
}
