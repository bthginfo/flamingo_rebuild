import type { SectionInstance, StyleKey } from '../model';
import type { SiteSeed } from './model';

const heroImages: Record<StyleKey, string> = {
  classic: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=82',
  modern: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1800&q=82',
  bold: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1800&q=82'
};

function section(id: string, sectionKey: string, sortOrder: number, data: Record<string, unknown>): SectionInstance {
  return {
    id,
    sectionKey,
    visible: true,
    sortOrder,
    data
  };
}

export function restaurantSeed(styleKey: StyleKey): SiteSeed {
  return {
    tenantName: 'Trattoria Flamingo',
    industryKey: 'restaurant',
    styleKey,
    global: {
      brand: {
        name: 'Trattoria Flamingo',
        tagline: 'Cucina italiana im Herzen der Stadt'
      },
      navigation: [
        { label: 'Start', href: '/' },
        { label: 'Speisekarte', href: '/speisekarte' },
        { label: 'Erlebnisse', href: '/erlebnisse' },
        { label: 'Galerie', href: '/galerie' },
        { label: 'Über uns', href: '/ueber-uns' },
        { label: 'Kontakt', href: '/kontakt' }
      ],
      contact: {
        phone: '+43 512 123 4567',
        email: 'ciao@trattoria-flamingo.test',
        address: 'Maria-Theresien-Straße 12, 6020 Innsbruck',
        openingHours: 'Täglich 11:30–22:30'
      }
    },
    collections: [
      {
        id: 'dish-tagliatelle',
        collectionKey: 'menuItem',
        title: 'Tagliatelle al Tartufo',
        slug: 'tagliatelle-al-tartufo',
        data: {
          summary: 'Hausgemachte Tagliatelle, schwarzer Sommertrüffel und Parmigiano 24 mesi.',
          price: '24,90 €',
          image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1000&q=80'
        }
      },
      {
        id: 'dish-margherita',
        collectionKey: 'menuItem',
        title: 'Pizza Margherita DOP',
        slug: 'pizza-margherita-dop',
        data: {
          summary: 'San-Marzano-Tomaten, Büffelmozzarella, Basilikum und 48-Stunden-Teig.',
          price: '15,50 €',
          image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1000&q=80'
        }
      },
      {
        id: 'dish-branzino',
        collectionKey: 'menuItem',
        title: 'Branzino al Forno',
        slug: 'branzino-al-forno',
        data: {
          summary: 'Wolfsbarsch aus dem Ofen, Zitrone, Rosmarin und sizilianisches Olivenöl.',
          price: '29,00 €',
          image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1000&q=80'
        }
      },
      {
        id: 'experience-wine',
        collectionKey: 'diningExperience',
        title: 'Weinabend am langen Tisch',
        slug: 'weinabend',
        data: {
          summary: 'Vier Gänge, passende Naturweine und persönliche Geschichten unserer Winzer:innen.',
          image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=80'
        }
      },
      {
        id: 'experience-family',
        collectionKey: 'diningExperience',
        title: 'Sonntag wie bei Nonna',
        slug: 'sonntag-wie-bei-nonna',
        data: {
          summary: 'Antipasti, Pasta aus der Manufaktur und Tiramisu nach Familienrezept.',
          image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1000&q=80'
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
          title: 'Trattoria Flamingo · Restaurant in Innsbruck',
          description: 'Handgemachte Pasta, Holzofenpizza und Naturweine.'
        },
        sections: [
          section('home-hero', 'global.hero', 1, {
            eyebrow: 'Cucina italiana · seit 1998',
            headline: { plain: 'Italien beginnt', accent: 'am ersten Bissen.' },
            subline: 'Pasta, Pizza, Naturweine und ein Tisch, an dem der Abend länger bleiben darf.',
            body: 'Wir kochen täglich frisch, arbeiten mit Produzenten aus Tirol und Italien und servieren italienische Küche ohne Theater.',
            image: heroImages[styleKey],
            primaryCta: { label: 'Tisch reservieren', link: { type: 'page', href: '/kontakt' } },
            secondaryCta: { label: 'Speisekarte ansehen', link: { type: 'page', href: '/speisekarte' } }
          }),
          section('home-action', 'global.actionBar', 2, {
            useOpeningHours: true,
            statusOverride: 'Heute geöffnet',
            primaryCta: { label: 'Reservieren', link: { type: 'page', href: '/kontakt' } },
            secondaryCta: { label: 'Anrufen', link: { type: 'phone', href: '+435121234567' } }
          }),
          section('home-dishes', 'restaurant.menuHighlights', 3, {
            eyebrow: 'Empfehlungen',
            headline: { plain: 'Unsere', accent: 'Karte.' },
            intro: 'Eine kleine Auswahl aus unserer aktuellen Küche.',
            items: ['dish-tagliatelle', 'dish-margherita', 'dish-branzino']
          }),
          section('home-experiences', 'restaurant.diningExperiences', 4, {
            eyebrow: 'Erlebnisse',
            headline: { plain: 'Abende, die', accent: 'bleiben.' },
            intro: 'Ob Weinabend oder Familien-Sonntag: diese Formate bringen Menschen an einen Tisch.',
            items: ['experience-wine', 'experience-family']
          }),
          section('home-testimonials', 'global.testimonials', 5, {
            eyebrow: 'Stimmen',
            headline: { plain: 'Was unsere', accent: 'Gäste sagen.' },
            items: [
              { quote: 'Ein Geheimtipp. Wir machen extra einen Umweg, wenn wir in Tirol sind.', name: 'Markus W., München' },
              { quote: 'Tolle Pasta, herzliche Bedienung und faire Preise. Unsere Kinder lieben Giulia.', name: 'Familie Berger' },
              { quote: 'Authentisch wie selten. Die Trüffel-Tagliatelle ist legendär.', name: 'Andrea L., Bozen' }
            ]
          }),
          section('home-cta', 'global.contactCta', 6, {
            eyebrow: 'Reservierung',
            headline: { plain: 'Heute Abend noch', accent: 'einen Tisch?' },
            subline: 'Schreiben Sie uns oder reservieren Sie direkt telefonisch.',
            cta: { label: 'Kontakt aufnehmen', link: { type: 'page', href: '/kontakt' } }
          })
        ]
      },
      {
        id: 'menu',
        key: 'menu',
        kind: 'core',
        title: 'Speisekarte',
        slug: '/speisekarte',
        seo: {
          title: 'Speisekarte · Trattoria Flamingo',
          description: 'Pasta, Pizza und saisonale Gerichte aus der Küche.'
        },
        sections: [
          section('menu-head', 'global.pageHeader', 1, {
            eyebrow: 'Menü',
            headline: { plain: 'Speisekarte', accent: 'zum Teilen.' },
            subline: 'Hausgemachte Pasta, Holzofenpizza und Antipasti — täglich frisch.',
            image: heroImages[styleKey]
          }),
          section('menu-intro', 'global.introBlock', 2, {
            eyebrow: 'Philosophie',
            headline: { plain: 'Was auf dem', accent: 'Teller landet.' },
            body:
              'Unsere Karte folgt dem Rhythmus der Jahreszeiten: kurze Wege, klare Zutaten, viel Handarbeit. Die folgenden Gerichte sind eine Auswahl — im Restaurant finden Sie die volle Karte inklusive Tagesangeboten.',
            facts: [
              { label: 'Manufaktur', value: 'Pasta täglich frisch' },
              { label: 'Ofen', value: 'Neapel · 485 °C' },
              { label: 'Weinkeller', value: '120+ Positionen' }
            ]
          }),
          section('menu-grid', 'restaurant.menuHighlights', 3, {
            eyebrow: 'Gerichte',
            headline: { plain: 'Aus der', accent: 'Küche.' },
            intro: 'Alle Signature-Gerichte mit Preisen und Bildern — klicken Sie für Details.',
            items: ['dish-tagliatelle', 'dish-margherita', 'dish-branzino']
          }),
          section('menu-scroller', 'global.scrollerHighlights', 4, {
            eyebrow: 'Besonderheiten',
            headline: { plain: 'Drei Gründe', accent: 'vorbeizukommen.' },
            intro: 'Kurz & knackig: was uns von anderen unterscheidet.',
            slides: [
              {
                image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=900&q=80',
                title: 'Holzofen aus Neapel',
                body: 'Pizza in 90 Sekunden bei 485 °C — knusprig, luftig, authentisch.',
                cta: { label: 'Pizza ansehen', link: { type: 'page', href: '/speisekarte' } }
              },
              {
                image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80',
                title: 'Pasta frisch täglich',
                body: 'Eigene Manufaktur, lange Teigruhe, Saucen aus dem Sud.',
                cta: { label: 'Menü-PDF', link: { type: 'page', href: '/speisekarte' } }
              },
              {
                image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=80',
                title: 'Wein & Natur',
                body: 'Über 120 Positionen — Schwerpunkt Italien & Alpen.',
                cta: { label: 'Weinabend', link: { type: 'page', href: '/erlebnisse' } }
              }
            ]
          }),
          section('menu-deep', 'restaurant.deepDives', 5, {
            eyebrow: 'Küche & Herkunft',
            headline: { plain: 'Storys', accent: 'vom Teller.' },
            intro: 'Produzenten, Pairings und Hintergründe — alles im CMS als eigene Storys gepflegt.'
          }),
          section('menu-faq', 'global.faq', 6, {
            eyebrow: 'Gastronomie',
            headline: { plain: 'Häufige', accent: 'Fragen.' },
            items: [
              {
                question: 'Könnt ihr Allergien berücksichtigen?',
                answer: 'Ja. Bitte bei Reservierung oder beim Service Bescheid sagen — unsere Küche trennt Arbeitsgänge und kann auf Gluten, Laktose und Nüsse Rücksicht nehmen.'
              },
              {
                question: 'Gibt es eine Kinderkarte?',
                answer: 'Wir haben kleinere Portionen und Pasta-Formen, die Kinder lieben. Fragt einfach das Team am Tisch.'
              },
              {
                question: 'Wie lange im Voraus reservieren?',
                answer: 'Am Wochenende empfehlen wir 3–5 Tage Vorlauf. Unter der Woche oft auch spontan möglich.'
              }
            ]
          }),
          section('menu-cta', 'global.contactCta', 7, {
            eyebrow: 'Reservierung',
            headline: { plain: 'Tisch', accent: 'für heute?' },
            subline: 'Wir halten Ihnen gern einen Platz frei.',
            cta: { label: 'Kontakt & Anfahrt', link: { type: 'page', href: '/kontakt' } }
          })
        ]
      },
      {
        id: 'experiences',
        key: 'experiences',
        kind: 'core',
        title: 'Erlebnisse',
        slug: '/erlebnisse',
        seo: {
          title: 'Erlebnisse · Trattoria Flamingo',
          description: 'Weinabende, Menüs und besondere Abende.'
        },
        sections: [
          section('exp-head', 'global.pageHeader', 1, {
            eyebrow: 'Events',
            headline: { plain: 'Abende, die', accent: 'bleiben.' },
            subline: 'Wein, Familie, langer Tisch — unsere Formate mit Charakter.',
            image: heroImages[styleKey]
          }),
          section('exp-intro', 'global.introBlock', 2, {
            eyebrow: 'Erlebnisse',
            headline: { plain: 'Formate mit', accent: 'Persönlichkeit.' },
            body:
              'Jedes Event hat eine eigene Dramaturgie: Weinbegleitung, Menüverlauf und Raum — abgestimmt auf Ihre Gruppe. Unten finden Sie unsere festen Formate; für Firmen und Feiern planen wir gern individuell.',
            facts: [
              { label: 'Kapazität', value: 'bis 48 Gäste' },
              { label: 'Planung', value: '4–8 Wochen Vorlauf' },
              { label: 'Menü', value: 'vegetarisch möglich' }
            ]
          }),
          section('exp-grid', 'restaurant.diningExperiences', 3, {
            eyebrow: 'Kalender',
            headline: { plain: 'Unsere', accent: 'Erlebnisse.' },
            intro: 'Klicken Sie für Details und Buchungsweg.',
            items: ['experience-wine', 'experience-family']
          }),
          section('exp-steps', 'global.stepsStrip', 4, {
            eyebrow: 'Buchung',
            headline: { plain: 'So läuft', accent: 'Ihre Anfrage.' },
            steps: [
              { label: '1', title: 'Kurz beschreiben', body: 'Anlass, Personenzahl, Wunschdatum und Budgetrahmen per Mail oder Telefon.' },
              { label: '2', title: 'Menü & Raum', body: 'Wir schlagen Menüfolge, Getränke und Tischformation vor — bis alles passt.' },
              { label: '3', title: 'Fixierung', body: 'Schriftliche Bestätigung mit Anzahlung — danach blocken wir Küche und Personal.' }
            ]
          }),
          section('exp-deep', 'restaurant.deepDives', 5, {
            eyebrow: 'Hintergrund',
            headline: { plain: 'Mehr', accent: 'zum Erlebnis.' },
            intro: 'Wein, Menülogik und Abläufe — als kurze Storys für Gäste und Planer:innen.'
          }),
          section('exp-cta', 'global.contactCta', 6, {
            eyebrow: 'Planung',
            headline: { plain: 'Privat oder', accent: 'geschlossene Gesellschaft?' },
            subline: 'Wir beraten Sie gern zu Kapazität, Menü und Timing.',
            cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
          })
        ]
      },
      {
        id: 'gallery',
        key: 'gallery',
        kind: 'core',
        title: 'Galerie',
        slug: '/galerie',
        seo: {
          title: 'Galerie · Trattoria Flamingo',
          description: 'Raum, Küche und Tisch — Eindrücke aus dem Restaurant.'
        },
        sections: [
          section('gallery-head', 'global.pageHeader', 1, {
            eyebrow: 'Impressionen',
            headline: { plain: 'Licht, Holz', accent: 'und Teller.' },
            subline: 'Ein Blick in unsere Küche, den Saal und die Details, die den Abend ausmachen.',
            image: heroImages[styleKey]
          }),
          section('gallery-intro', 'global.introBlock', 2, {
            eyebrow: 'Raum',
            headline: { plain: 'Ein Haus', accent: 'für lange Abende.' },
            body:
              'Zwischen Holzofen, Bar und Saal entsteht ein fließender Raum — mal laut und festlich, mal leise und intim. Die Galerie zeigt Momente aus dem Alltag der Trattoria, nicht nur inszenierte Shots.',
            facts: [
              { label: 'Saal', value: '52 Plätze' },
              { label: 'Bar', value: 'Walk-in' },
              { label: 'Terrasse', value: 'Saisonal' }
            ]
          }),
          section('gallery-grid', 'global.galleryGrid', 3, {
            eyebrow: 'Rundgang',
            headline: { plain: 'Momente', accent: 'am Tisch.' },
            images: [
              { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80', alt: 'Gedeckter Tisch' },
              { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80', alt: 'Service' },
              { url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80', alt: 'Bar' },
              { url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80', alt: 'Holzofen' },
              { url: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1200&q=80', alt: 'Antipasti' },
              { url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1200&q=80', alt: 'Pasta' }
            ]
          }),
          section('gallery-carousel', 'global.imageCarousel', 4, {
            eyebrow: 'Stimmung',
            headline: { plain: 'Ein Abend', accent: 'in Bildern.' },
            intro: 'Wischen oder Pfeile: dasselbe Karussell steuern Sie vollständig im CMS (Folien, Texte, Links).',
            slides: [
              {
                image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=82',
                alt: 'Gäste im Restaurant',
                title: 'Tisch im Saal',
                body: 'Abendlicht, Leinen, Gespräch — der Raum, in dem unsere Gäste am längsten bleiben.',
                cta: { label: 'Reservieren', link: { type: 'page', href: '/kontakt' } }
              },
              {
                image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=82',
                alt: 'Bar mit Flaschen',
                title: 'Bar & Aperitivo',
                body: 'Kurze Wege zwischen Küche und Bar — perfekt für den ersten Drink.',
                cta: { label: 'Speisekarte', link: { type: 'page', href: '/speisekarte' } }
              },
              {
                image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1400&q=82',
                alt: 'Ofen und Pizza',
                title: 'Holzofen',
                body: 'Neapel-Technik, lokaler Teig — Bild links/rechts steuern Sie bei „Text mit Bild“.',
                cta: { label: 'Erlebnisse', link: { type: 'page', href: '/erlebnisse' } }
              }
            ]
          }),
          section('gallery-scroller', 'global.scrollerHighlights', 5, {
            eyebrow: 'Küche & Saal',
            headline: { plain: 'Hinter den', accent: 'Kulissen.' },
            intro: 'Wo gekocht, gegossen und gelacht wird — ein Blick in unsere Räume.',
            slides: [
              {
                image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=900&q=80',
                title: 'Pass',
                body: 'Handgemachte Pasta, täglich frisch gewalzt.',
                cta: { label: 'Speisekarte', link: { type: 'page', href: '/speisekarte' } }
              },
              {
                image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80',
                title: 'Service',
                body: 'Aufmerksam, persönlich, ohne aufdringlich zu sein.',
                cta: { label: 'Reservieren', link: { type: 'page', href: '/kontakt' } }
              },
              {
                image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80',
                title: 'Ambiente',
                body: 'Holz, Leinen, Kerzen — Abende, die länger werden dürfen.',
                cta: { label: 'Erlebnisse', link: { type: 'page', href: '/erlebnisse' } }
              }
            ]
          }),
          section('gallery-deep', 'restaurant.deepDives', 6, {
            eyebrow: 'Kulinarik',
            headline: { plain: 'Details', accent: 'die zählen.' },
            intro: 'Produzenten, Saison und Pairings — tiefer als die reine Galerie.'
          }),
          section('gallery-cta', 'global.contactCta', 7, {
            eyebrow: 'Reservierung',
            headline: { plain: 'Selbst', accent: 'vorbeischauen?' },
            subline: 'Wir freuen uns, wenn Sie live statt nur auf Fotos neugierig werden.',
            cta: { label: 'Kontakt & Anfahrt', link: { type: 'page', href: '/kontakt' } }
          })
        ]
      },
      {
        id: 'about',
        key: 'about',
        kind: 'core',
        title: 'Über uns',
        slug: '/ueber-uns',
        seo: {
          title: 'Über uns · Trattoria Flamingo',
          description: 'Familie, Küche und Gastfreundschaft seit 1998.'
        },
        sections: [
          section('about-head', 'global.pageHeader', 1, {
            eyebrow: 'Geschichte',
            headline: { plain: 'Aus Leidenschaft', accent: 'für Gäste.' },
            subline: 'Was als kleine Osteria begann, ist heute ein Haus voller Stimmen, Düfte und langen Abenden.',
            image: ''
          }),
          section('about-intro', 'global.introBlock', 2, {
            eyebrow: 'Über uns',
            headline: { plain: 'Zwei Generationen', accent: 'ein Tisch.' },
            body:
              'Giulia und Marco führen die Trattoria in zweiter Generation. Wir glauben an Handarbeit, ehrliche Preise und Gäste, die wiederkommen — nicht wegen eines Trends, sondern weil es sich wie Zuhause anfühlt.',
            facts: [
              { label: 'Seit', value: '1998' },
              { label: 'Team', value: '28 Menschen' },
              { label: 'Lieferanten', value: 'regional' }
            ]
          }),
          section('about-story', 'global.textImage', 3, {
            eyebrow: 'Team',
            headline: { plain: 'Küche mit', accent: 'Herz.' },
            body:
              'Unsere Manufaktur arbeitet in kleinen Chargen: Teigruhe über Nacht, Saucen aus dem Sud, Kräuter aus dem eigenen Hochbeet. Gäste schauen gern in die offene Küche — wir erklären Schritte am Tresen und lassen probieren, wenn es passt.',
            image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
            imageSide: 'links',
            cta: { label: 'Stellen & Praktika', link: { type: 'page', href: '/kontakt' } }
          }),
          section('about-film', 'global.richArticle', 4, {
            eyebrow: 'Ein Blick hinein',
            headline: { plain: 'Küche,', accent: 'die man hört.' },
            content:
              'Wenn der Ofen auf Temperatur ist und der Teig ruht, riecht der ganze Block nach Basilikum und Hefe. In diesem kurzen Film begleiten Sie unser Team durch den Pass — von der ersten Rolle bis zum letzten Teller am Fenster.'
          }),
          section('about-video', 'global.videoEmbed', 5, {
            eyebrow: 'Film',
            headline: { plain: 'Hinter', accent: 'den Kulissen.' },
            embedUrl: 'https://www.youtube.com/watch?v=1IszT_guI08',
            caption: 'Impressionen aus Küche und Service — kein kommerzieller Trailer, sondern echte Arbeit.'
          }),
          section('about-deep', 'restaurant.deepDives', 6, {
            eyebrow: 'Transparenz',
            headline: { plain: 'Was wir', accent: 'erzählen.' },
            intro: 'Herkunft, Produzenten und Entscheidungen aus der Küche — für Gäste, die mehr wissen wollen.'
          }),
          section('about-voices', 'global.testimonials', 7, {
            eyebrow: 'Teamstimmen',
            headline: { plain: 'Warum wir', accent: 'hier sind.' },
            items: [
              { quote: 'Jeder Service ist anders — hier darf man langsamer werden.', name: 'Sofia, Service' },
              { quote: 'Wenn der Ofen warm ist und der Teig ruht, fühlt sich der Tag richtig an.', name: 'Lorenzo, Pizza' },
              { quote: 'Wir kochen, was wir selbst essen würden. Punkt.', name: 'Marco, Küche' }
            ]
          }),
          section('about-faq', 'global.faq', 8, {
            eyebrow: 'Gastgeber',
            headline: { plain: 'Das wollen', accent: 'wir sein.' },
            items: [
              {
                question: 'Was bedeutet „Trattoria“ für euch?',
                answer: 'Ein Ort, an dem man nicht perfekt sein muss — aber gut essen und laut lachen darf. Familien willkommen, Hunde auf der Terrasse, kein Dresscode.'
              },
              {
                question: 'Wie unterstützt ihr regionale Produzenten?',
                answer: 'Wir kaufen Gemüse, Käse und Wein überwiegend aus Tirol und Südtirol; für Spezialitäten aus Italien arbeiten wir mit Importeuren, die kleine Betriebe kennen.'
              }
            ]
          }),
          section('about-cta', 'global.contactCta', 9, {
            eyebrow: 'Besuch',
            headline: { plain: 'Kommen Sie', accent: 'vorbei.' },
            subline: 'Reservierung, Feier oder Frage — wir freuen uns auf Ihre Nachricht.',
            cta: { label: 'Kontakt & Anfahrt', link: { type: 'page', href: '/kontakt' } }
          })
        ]
      },
      {
        id: 'contact',
        key: 'contact',
        kind: 'core',
        title: 'Kontakt',
        slug: '/kontakt',
        seo: {
          title: 'Kontakt · Trattoria Flamingo',
          description: 'Reservierung, Anfahrt und Öffnungszeiten.'
        },
        sections: [
          section('contact-head', 'global.pageHeader', 1, {
            eyebrow: 'Kontakt',
            headline: { plain: 'Wir freuen uns', accent: 'auf Sie.' },
            subline: 'Reservierungen, Feiern und Fragen — schreiben Sie uns oder rufen Sie an.',
            image: ''
          }),
          section('contact-block', 'global.textImage', 2, {
            eyebrow: 'Lokal',
            headline: { plain: 'Trattoria', accent: 'Flamingo.' },
            body: 'Maria-Theresien-Straße 12, 6020 Innsbruck\nTelefon +43 512 123 4567\nciao@trattoria-flamingo.test',
            image: heroImages[styleKey],
            cta: { label: 'Route planen', link: { type: 'page', href: '/kontakt' } }
          }),
          section('contact-map', 'global.mapContact', 3, {
            eyebrow: 'Anfahrt',
            headline: { plain: 'Mitten', accent: 'in Innsbruck.' },
            subline: '',
            openingHours: 'Täglich 11:30–22:30'
          }),
          section('contact-faq', 'global.faq', 4, {
            eyebrow: 'Kontakt',
            headline: { plain: 'Häufige', accent: 'Fragen.' },
            items: [
              {
                question: 'Wie reserviere ich am schnellsten?',
                answer: 'Telefonisch oder per E-Mail — wir bestätigen den Tisch und halten bei Bedarf einen Hinweis zu Allergien fest.'
              },
              {
                question: 'Kann ich mit dem Auto vorfahren?',
                answer: 'Ja; öffentliche Parkhäuser sind fußläufig erreichbar. Details finden Sie in der Karte unten.'
              }
            ]
          }),
          section('contact-cta', 'global.contactCta', 5, {
            eyebrow: 'Reservierung',
            headline: { plain: 'Schreiben Sie', accent: 'uns.' },
            subline: 'Wir antworten schnell und unkompliziert.',
            cta: { label: 'E-Mail senden', link: { type: 'page', href: '/kontakt' } }
          })
        ]
      }
    ]
  };
}
