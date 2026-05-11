import { field } from '../fields';
import type { SectionDefinition } from '../model';

const rcIndustry = ['restaurant'] as const;
const rcStyles = ['classic', 'modern', 'bold'] as const;

function rc(
  key: string,
  label: string,
  fields: readonly SectionDefinition['fields'][number][],
  options: { repeatable?: boolean; allowedPageKinds?: SectionDefinition['allowedPageKinds'] } = {}
): SectionDefinition {
  return {
    key: `restaurantClassic.${key}`,
    label,
    description: 'Neues Restaurant-Classic-CMS-Modell (2026).',
    industries: rcIndustry,
    styles: rcStyles,
    allowedPageKinds: options.allowedPageKinds ?? ['core', 'custom'],
    repeatable: options.repeatable,
    fields
  };
}

const trustItemFields = [
  field.image('logo', 'Logo', { required: true }),
  field.text('name', 'Name', { required: true }),
  field.text('subtitle', 'Unterzeile'),
  field.url('href', 'Link (optional)')
] as const;

const reviewItemFields = [
  field.textarea('quote', 'Zitat', { required: true }),
  field.text('name', 'Name / Quelle'),
  field.text('source', 'Quelle (z. B. Google, Presse)'),
  { key: 'rating', label: 'Sterne (0–5)', type: 'number' as const },
  { key: 'date', label: 'Datum', type: 'date' as const },
  field.link('link', 'Link (optional)')
] as const;

const faqItemFields = [field.text('question', 'Frage', { required: true }), field.richText('answer', 'Antwort', { required: true })] as const;

export const restaurantClassicSections: readonly SectionDefinition[] = [
  rc('announcementBar', 'Hinweis-Leiste', [
    { key: 'enabled', label: 'Anzeigen', type: 'boolean' },
    field.text('message', 'Nachricht', { required: true }),
    field.link('link', 'Link (optional)'),
    {
      key: 'tone',
      label: 'Darstellung',
      type: 'select',
      options: ['info', 'success', 'warning']
    },
    { key: 'dismissible', label: 'Schließbar', type: 'boolean' }
  ]),

  rc('hero', 'Hero', [
    field.text('eyebrow', 'Eyebrow'),
    field.splitHeading('headline', 'Überschrift', { required: true }),
    field.textarea('subheadline', 'Subheadline'),
    field.text('scrollHintLabel', 'Scroll-Hinweis'),
    field.text('badge', 'Badge'),
    field.image('backgroundImage', 'Hintergrundbild'),
    field.textarea('bookingWidgetEmbed', 'Optional: Embed-Code (HTML)'),
    { key: 'overlayStrength', label: 'Bild-Overlay (0–100)', type: 'number' },
    field.cta('primaryCta', 'Primärer Button', { required: true }),
    field.cta('secondaryCta', 'Sekundärer Button')
  ]),

  rc('trustStrip', 'Vertrauen / Logos', [
    field.text('eyebrow', 'Eyebrow'),
    field.splitHeading('headline', 'Überschrift'),
    field.textarea('intro', 'Einleitung'),
    field.repeater('items', 'Einträge', [...trustItemFields], { required: true })
  ]),

  rc('brandPhilosophy', 'Marke & Philosophie', [
    field.text('eyebrow', 'Eyebrow'),
    field.splitHeading('headline', 'Überschrift', { required: true }),
    field.textarea('subheadline', 'Subheadline'),
    field.richText('body', 'Text'),
    field.image('portraitImage', 'Bild'),
    field.textarea('quote', 'Zitat'),
    field.text('quoteAttribution', 'Zitat-Quelle'),
    field.cta('primaryCta', 'Button')
  ]),

  rc('uspGrid', 'USP-Raster', [
    field.text('eyebrow', 'Eyebrow'),
    field.splitHeading('headline', 'Überschrift'),
    field.textarea('intro', 'Einleitung'),
    field.repeater(
      'pillars',
      'Punkte',
      [
        field.text('icon', 'Icon / Emoji'),
        field.text('title', 'Titel', { required: true }),
        field.textarea('description', 'Text'),
        field.link('link', 'Link (optional)')
      ],
      { required: true }
    )
  ]),

  rc('menuTeaser', 'Menü-Teaser', [
    field.text('eyebrow', 'Eyebrow'),
    field.splitHeading('headline', 'Überschrift'),
    field.textarea('intro', 'Einleitung'),
    field.repeater(
      'categories',
      'Kategorien',
      [
        field.text('name', 'Name', { required: true }),
        field.textarea('description', 'Beschreibung'),
        field.text('priceHint', 'Preishinweis'),
        { key: 'highlight', label: 'Hervorheben', type: 'boolean' }
      ],
      { required: true }
    ),
    field.url('menuPdfUrl', 'Speisekarte PDF (URL)'),
    field.text('menuPdfLabel', 'PDF-Link-Label'),
    field.image('featuredImage', 'Teaser-Bild'),
    field.cta('viewMenuCta', 'Zur Speisekarte'),
    field.cta('reserveCta', 'Reservierung')
  ]),

  rc('signatureDishes', 'Signature-Gerichte', [
    field.text('eyebrow', 'Eyebrow'),
    field.splitHeading('headline', 'Überschrift'),
    field.textarea('intro', 'Einleitung'),
    field.repeater(
      'dishes',
      'Gerichte',
      [
        field.text('name', 'Name', { required: true }),
        field.text('tagline', 'Tagline'),
        field.textarea('description', 'Beschreibung'),
        field.text('price', 'Preis'),
        field.textarea('dietaryNote', 'Allergene / Hinweise'),
        field.textarea('chefNote', 'Chef-Notiz'),
        field.image('image', 'Bild'),
        field.link('detailLink', 'Detail-Link')
      ],
      { required: true }
    )
  ]),

  rc('chefSpotlight', 'Chef / Team-Spotlight', [
    field.text('eyebrow', 'Eyebrow'),
    field.splitHeading('headline', 'Überschrift'),
    field.text('roleTitle', 'Rolle'),
    field.textarea('bio', 'Biografie'),
    field.image('portrait', 'Portrait'),
    field.textarea('signatureQuote', 'Zitat'),
    field.cta('secondaryCta', 'Button')
  ]),

  rc('pairingBeverages', 'Getränke / Pairing', [
    field.text('eyebrow', 'Eyebrow'),
    field.splitHeading('headline', 'Überschrift'),
    field.richText('body', 'Text'),
    field.image('coverImage', 'Bild'),
    field.cta('cta', 'Button')
  ]),

  rc('reservation', 'Reservierung', [
    field.text('eyebrow', 'Eyebrow'),
    field.splitHeading('headline', 'Überschrift', { required: true }),
    field.textarea('intro', 'Einleitung'),
    field.textarea('microcopy', 'Mikrocopy (Storno, Hinweise)'),
    field.textarea('bookingWidgetEmbed', 'Buchungs-Widget (HTML)'),
    field.text('partySizeHint', 'Hinweis Personenzahl'),
    field.text('responseTimeNote', 'Antwortzeit'),
    field.cta('primaryCta', 'Primärer Button', { required: true }),
    field.cta('secondaryCta', 'Sekundärer Button'),
    field.repeater(
      'channels',
      'Kanäle',
      [
        field.text('label', 'Titel', { required: true }),
        field.text('sublabel', 'Untertitel'),
        field.link('link', 'Link'),
        field.text('icon', 'Icon / Emoji')
      ],
      { required: false }
    )
  ]),

  rc('hoursContact', 'Öffnungszeiten & Kontakt', [
    field.text('eyebrow', 'Eyebrow'),
    field.splitHeading('headline', 'Überschrift'),
    field.textarea('openingHoursText', 'Öffnungszeiten (Text)'),
    field.text('phoneLabel', 'Telefon-Label'),
    { key: 'phone', label: 'Telefon', type: 'phone' },
    field.text('emailLabel', 'E-Mail-Label'),
    { key: 'email', label: 'E-Mail', type: 'email' },
    { key: 'address', label: 'Adresse', type: 'address', required: true },
    field.textarea('noteHolidays', 'Hinweise (Feiertage)'),
    field.cta('ctaCall', 'Anruf-Button'),
    field.cta('ctaEmail', 'Mail-Button')
  ]),

  rc('locationMap', 'Lage & Anreise', [
    field.text('eyebrow', 'Eyebrow'),
    field.splitHeading('headline', 'Überschrift'),
    field.textarea('directionsIntro', 'Einleitung'),
    field.url('mapEmbedUrl', 'Karten-Embed-URL'),
    field.text('parkingTitle', 'Parken — Titel'),
    field.textarea('parkingBody', 'Parken — Text'),
    field.text('transitTitle', 'ÖPNV — Titel'),
    field.textarea('transitBody', 'ÖPNV — Text'),
    field.image('exteriorImage', 'Außenansicht'),
    field.cta('openInMapsCta', 'Route-Button')
  ]),

  rc('testimonials', 'Stimmen / Reviews', [
    field.text('eyebrow', 'Eyebrow'),
    field.splitHeading('headline', 'Überschrift'),
    field.repeater('reviews', 'Einträge', [...reviewItemFields], { required: true }),
    { key: 'aggregateRating', label: 'Ø Bewertung', type: 'number' },
    { key: 'reviewCount', label: 'Anzahl Reviews', type: 'number' }
  ]),

  rc('privateDining', 'Events & Private Dining', [
    field.text('eyebrow', 'Eyebrow'),
    field.splitHeading('headline', 'Überschrift'),
    field.richText('body', 'Text'),
    field.repeater(
      'packages',
      'Pakete',
      [
        field.text('title', 'Titel', { required: true }),
        field.textarea('description', 'Beschreibung'),
        field.text('capacity', 'Kapazität'),
        field.text('priceFrom', 'Preis ab'),
        field.image('image', 'Bild'),
        field.cta('inquiryCta', 'Anfrage-Button')
      ],
      { required: true }
    ),
    field.gallery('gallery', 'Galerie')
  ]),

  rc('socialGallery', 'Social / Galerie', [
    field.text('eyebrow', 'Eyebrow'),
    field.splitHeading('headline', 'Überschrift'),
    field.text('instagramHandle', 'Instagram-Handle'),
    field.url('instagramUrl', 'Instagram-URL'),
    field.repeater(
      'images',
      'Bilder',
      [field.image('image', 'Bild', { required: true }), field.link('postUrl', 'Post-Link')],
      { required: true }
    )
  ]),

  rc('newsletter', 'Newsletter', [
    field.text('eyebrow', 'Eyebrow'),
    field.splitHeading('headline', 'Überschrift'),
    field.textarea('body', 'Text'),
    field.textarea('consentHint', 'Consent-Hinweis'),
    field.textarea('successMessage', 'Erfolgsmeldung'),
    field.text('emailLabel', 'E-Mail-Feld-Label'),
    field.text('submitButton', 'Button-Label'),
    field.link('privacyLink', 'Datenschutz-Link')
  ]),

  rc('faq', 'FAQ', [
    field.text('eyebrow', 'Eyebrow'),
    field.splitHeading('headline', 'Überschrift'),
    field.repeater('items', 'Fragen', [...faqItemFields], { required: true })
  ]),

  rc('menuPageHero', 'Speisekarte — Hero', [
    field.text('eyebrow', 'Eyebrow'),
    field.splitHeading('headline', 'Überschrift'),
    field.textarea('subheadline', 'Subheadline'),
    field.textarea('intro', 'Einleitung'),
    field.text('lastUpdatedLabel', 'Stand / Aktualisiert'),
    field.image('coverImage', 'Titelbild'),
    field.cta('pdfCta', 'PDF-Button'),
    field.cta('reserveCta', 'Reservierung')
  ]),

  rc(
    'menuCategoryNav',
    'Speisekarte — Sprungmarken',
    [
      field.repeater(
        'items',
        'Einträge',
        [field.text('label', 'Label', { required: true }), field.link('target', 'Ziel (Anker/Seite)')],
        { required: true }
      )
    ],
    { repeatable: false }
  ),

  rc(
    'menuCategoryBlock',
    'Speisekarte — Kategorieblock',
    [
      field.text('eyebrow', 'Eyebrow'),
      field.text('categoryTitle', 'Kategorie-Titel', { required: true }),
      field.textarea('categoryDescription', 'Kategorie-Beschreibung'),
      field.repeater(
        'dishes',
        'Gerichte',
        [
          field.text('name', 'Name', { required: true }),
          field.textarea('description', 'Beschreibung'),
          field.text('price', 'Preis'),
          field.textarea('allergens', 'Allergene'),
          field.textarea('dietaryTags', 'Tags'),
          { key: 'highlight', label: 'Hervorheben', type: 'boolean' },
          field.image('image', 'Bild')
        ],
        { required: true }
      )
    ],
    { repeatable: true }
  ),

  rc('menuAddendum', 'Speisekarte — Zusatzinfos', [
    field.splitHeading('headline', 'Überschrift'),
    field.richText('body', 'Text'),
    field.text('footnote', 'Fußnote')
  ]),

  rc('menuFooterCta', 'Speisekarte — Abschluss-CTA', [
    field.splitHeading('headline', 'Überschrift'),
    field.textarea('body', 'Text'),
    field.cta('primaryCta', 'Primärer Button'),
    field.cta('secondaryCta', 'Sekundärer Button')
  ]),

  rc('bookingHero', 'Reservierung — Hero', [
    field.text('eyebrow', 'Eyebrow'),
    field.splitHeading('headline', 'Überschrift', { required: true }),
    field.textarea('subheadline', 'Subheadline'),
    field.text('trustLine', 'Vertrauenszeile'),
    field.image('heroImage', 'Bild')
  ]),

  rc('bookingChannels', 'Reservierung — Kanäle', [
    field.textarea('intro', 'Einleitung'),
    field.textarea('widgetEmbed', 'Widget (HTML)'),
    field.repeater(
      'channels',
      'Kanäle',
      [field.text('title', 'Titel', { required: true }), field.textarea('description', 'Text'), field.cta('cta', 'Button')],
      { required: true }
    )
  ]),

  rc('bookingPolicy', 'Reservierung — Richtlinien', [
    field.splitHeading('headline', 'Überschrift'),
    field.repeater(
      'items',
      'Punkte',
      [field.text('title', 'Titel', { required: true }), field.textarea('body', 'Text', { required: true })],
      { required: true }
    )
  ]),

  rc('bookingFaqMini', 'Reservierung — Mini-FAQ', [
    field.splitHeading('headline', 'Überschrift'),
    field.repeater('items', 'Fragen', [...faqItemFields], { required: true })
  ]),

  rc('bookingAlternateContact', 'Reservierung — Alternativkontakt', [
    field.splitHeading('headline', 'Überschrift'),
    field.textarea('body', 'Text'),
    { key: 'phone', label: 'Telefon', type: 'phone' },
    { key: 'email', label: 'E-Mail', type: 'email' },
    field.cta('ctaCall', 'Anruf-Button'),
    field.cta('ctaMail', 'Mail-Button')
  ]),

  rc('aboutHero', 'Über uns — Hero', [
    field.text('eyebrow', 'Eyebrow'),
    field.splitHeading('headline', 'Überschrift'),
    field.textarea('subheadline', 'Subheadline'),
    field.textarea('lede', 'Lead'),
    field.image('heroImage', 'Bild'),
    field.url('heroVideoUrl', 'Video-URL (optional)')
  ]),

  rc('aboutTimeline', 'Über uns — Timeline', [
    field.text('eyebrow', 'Eyebrow'),
    field.splitHeading('headline', 'Überschrift'),
    field.repeater(
      'milestones',
      'Meilensteine',
      [
        field.text('year', 'Jahr'),
        field.text('title', 'Titel', { required: true }),
        field.textarea('description', 'Text'),
        field.image('image', 'Bild')
      ],
      { required: true }
    )
  ]),

  rc('aboutValues', 'Über uns — Werte', [
    field.splitHeading('headline', 'Überschrift'),
    field.textarea('intro', 'Einleitung'),
    field.repeater(
      'values',
      'Werte',
      [
        field.text('icon', 'Icon'),
        field.text('title', 'Titel', { required: true }),
        field.textarea('description', 'Text')
      ],
      { required: true }
    )
  ]),

  rc('teamGrid', 'Über uns — Team', [
    field.text('eyebrow', 'Eyebrow'),
    field.splitHeading('headline', 'Überschrift'),
    field.textarea('intro', 'Einleitung'),
    field.repeater(
      'members',
      'Mitglieder',
      [
        field.text('name', 'Name', { required: true }),
        field.text('role', 'Rolle'),
        field.textarea('bio', 'Bio'),
        field.image('portrait', 'Portrait'),
        field.textarea('quote', 'Zitat')
      ],
      { required: true }
    )
  ]),

  rc('pressLogos', 'Über uns — Presse / Logos', [
    field.splitHeading('headline', 'Überschrift'),
    field.repeater('items', 'Einträge', [...trustItemFields], { required: true })
  ]),

  rc('aboutCta', 'Über uns — CTA', [
    field.splitHeading('headline', 'Überschrift'),
    field.textarea('body', 'Text'),
    field.cta('reserveCta', 'Reservierung'),
    field.cta('menuCta', 'Speisekarte')
  ]),

  rc('eventsHero', 'Events — Hero', [
    field.text('eyebrow', 'Eyebrow'),
    field.splitHeading('headline', 'Überschrift'),
    field.textarea('subheadline', 'Subheadline'),
    field.image('coverImage', 'Titelbild')
  ]),

  rc('eventsSpaces', 'Events — Räume', [
    field.splitHeading('headline', 'Überschrift'),
    field.textarea('intro', 'Einleitung'),
    field.repeater(
      'spaces',
      'Räume',
      [
        field.text('name', 'Name', { required: true }),
        field.textarea('description', 'Beschreibung'),
        { key: 'capacityMin', label: 'Kapazität min', type: 'number' },
        { key: 'capacityMax', label: 'Kapazität max', type: 'number' },
        field.textarea('amenities', 'Ausstattung (Text)'),
        field.image('floorplan', 'Grundriss'),
        field.gallery('gallery', 'Galerie'),
        field.cta('inquiryCta', 'Anfrage')
      ],
      { required: true }
    )
  ]),

  rc('eventsPackages', 'Events — Pakete', [
    field.repeater(
      'packages',
      'Pakete',
      [
        field.text('title', 'Titel', { required: true }),
        field.text('subtitle', 'Untertitel'),
        field.textarea('description', 'Beschreibung'),
        field.text('priceFrom', 'Preis ab'),
        field.text('duration', 'Dauer'),
        field.textarea('includesText', 'Inklusive (eine Zeile pro Punkt)'),
        field.image('image', 'Bild'),
        field.cta('cta', 'Button')
      ],
      { required: true }
    )
  ]),

  rc('eventsGallery', 'Events — Galerie', [
    field.text('eyebrow', 'Eyebrow'),
    field.splitHeading('headline', 'Überschrift'),
    field.gallery('images', 'Bilder', { required: true })
  ]),

  rc('eventsInquiryForm', 'Events — Anfrageformular (Felder)', [
    field.splitHeading('headline', 'Überschrift'),
    field.textarea('intro', 'Einleitung'),
    field.textarea('successMessage', 'Erfolgsmeldung'),
    field.textarea('privacyNote', 'Datenschutz-Hinweis'),
    field.text('nameLabel', 'Label: Name'),
    field.text('emailLabel', 'Label: E-Mail'),
    field.text('dateLabel', 'Label: Datum'),
    field.text('guestsLabel', 'Label: Personen'),
    field.text('messageLabel', 'Label: Nachricht'),
    field.text('submitLabel', 'Label: Absenden'),
    field.link('privacyLink', 'Datenschutz-Link')
  ]),

  rc('eventsFaq', 'Events — FAQ', [
    field.splitHeading('headline', 'Überschrift'),
    field.repeater('items', 'Fragen', [...faqItemFields], { required: true })
  ]),

  rc('contactHero', 'Kontakt — Hero', [
    field.text('eyebrow', 'Eyebrow'),
    field.splitHeading('headline', 'Überschrift'),
    field.textarea('intro', 'Einleitung')
  ]),

  rc('contactDetails', 'Kontakt — Details', [
    { key: 'address', label: 'Adresse', type: 'address', required: true },
    { key: 'phone', label: 'Telefon', type: 'phone' },
    { key: 'email', label: 'E-Mail', type: 'email' },
    field.textarea('openingHoursText', 'Öffnungszeiten'),
    field.textarea('note', 'Hinweis'),
    field.cta('ctaCall', 'Anruf'),
    field.cta('ctaMail', 'Mail'),
    field.cta('ctaReserve', 'Reservierung')
  ]),

  rc('contactMap', 'Kontakt — Karte', [
    field.splitHeading('headline', 'Überschrift'),
    field.textarea('directionsBody', 'Wegbeschreibung'),
    field.url('mapEmbedUrl', 'Karten-URL'),
    field.text('parkingTitle', 'Parken — Titel'),
    field.textarea('parkingBody', 'Parken — Text'),
    field.text('transitTitle', 'ÖPNV — Titel'),
    field.textarea('transitBody', 'ÖPNV — Text'),
    field.image('exteriorImage', 'Bild'),
    field.cta('openInMapsCta', 'Maps-Button')
  ]),

  rc('contactForm', 'Kontakt — Formular (Labels)', [
    field.splitHeading('headline', 'Überschrift'),
    field.textarea('intro', 'Einleitung'),
    field.text('nameLabel', 'Label: Name'),
    field.text('emailLabel', 'Label: E-Mail'),
    field.text('messageLabel', 'Label: Nachricht'),
    field.text('submitLabel', 'Label: Absenden'),
    field.textarea('successMessage', 'Erfolgsmeldung'),
    field.link('privacyLink', 'Datenschutz-Link')
  ]),

  rc('contactAccessibility', 'Kontakt — Barrierefreiheit', [
    field.splitHeading('headline', 'Überschrift'),
    field.richText('body', 'Text')
  ]),

  rc('newsIndexHero', 'Aktuelles — Hero', [
    field.text('eyebrow', 'Eyebrow'),
    field.splitHeading('headline', 'Überschrift'),
    field.textarea('intro', 'Einleitung')
  ]),

  rc('newsFeatured', 'Aktuelles — Featured', [
    field.text('title', 'Titel', { required: true }),
    field.textarea('excerpt', 'Teaser'),
    { key: 'date', label: 'Datum', type: 'date' },
    field.image('coverImage', 'Bild'),
    field.cta('readCta', 'Button')
  ]),

  rc('newsList', 'Aktuelles — Liste', [
    field.repeater(
      'items',
      'Einträge',
      [
        field.text('title', 'Titel', { required: true }),
        field.textarea('excerpt', 'Teaser'),
        { key: 'date', label: 'Datum', type: 'date' },
        field.text('category', 'Kategorie'),
        field.image('coverImage', 'Bild'),
        field.link('link', 'Link')
      ],
      { required: true }
    )
  ])
];

export const RESTAURANT_CLASSIC_SECTION_KEYS = restaurantClassicSections.map((s) => s.key);
