import { field } from '../fields';
import type { SectionDefinition } from '../model';

export const globalSections: readonly SectionDefinition[] = [
  {
    key: 'global.hero',
    label: 'Hero',
    industries: 'all',
    styles: 'all',
    allowedPageKinds: ['core', 'custom'],
    fields: [
      field.text('eyebrow', 'Eyebrow'),
      field.splitHeading('headline', 'Überschrift', { required: true }),
      field.textarea('subline', 'Untertitel'),
      field.richText('body', 'Fließtext'),
      field.image('image', 'Bild'),
      field.cta('primaryCta', 'Primärer Button'),
      field.cta('secondaryCta', 'Sekundärer Button')
    ]
  },
  {
    key: 'global.pageHeader',
    label: 'Seitenkopf',
    industries: 'all',
    styles: 'all',
    allowedPageKinds: ['core', 'custom', 'collectionDetail'],
    fields: [
      field.text('eyebrow', 'Eyebrow'),
      field.splitHeading('headline', 'Überschrift', { required: true }),
      field.textarea('subline', 'Untertitel'),
      field.image('image', 'Bild')
    ]
  },
  {
    key: 'global.introBlock',
    label: 'Einleitung mit Fakten',
    industries: 'all',
    styles: 'all',
    allowedPageKinds: ['core', 'custom', 'collectionDetail'],
    repeatable: true,
    fields: [
      field.text('eyebrow', 'Eyebrow'),
      field.splitHeading('headline', 'Überschrift', { required: true }),
      field.richText('body', 'Fließtext'),
      field.repeater(
        'facts',
        'Fakten / Kennzahlen',
        [
          field.text('label', 'Label', { required: true }),
          field.text('value', 'Wert', { required: true })
        ],
        { helpText: 'Kurze Kennzahlen unter dem Text — z. B. Öffnungszeiten, Kapazität, Standort.' }
      )
    ]
  },
  {
    key: 'global.richArticle',
    label: 'Langtext-Abschnitt',
    industries: 'all',
    styles: 'all',
    allowedPageKinds: ['core', 'custom', 'collectionDetail'],
    repeatable: true,
    fields: [
      field.text('eyebrow', 'Eyebrow'),
      field.splitHeading('headline', 'Überschrift'),
      field.richText('content', 'Inhalt', { required: true })
    ]
  },
  {
    key: 'global.textImage',
    label: 'Text mit Bild',
    industries: 'all',
    styles: 'all',
    allowedPageKinds: ['core', 'custom', 'collectionDetail'],
    repeatable: true,
    fields: [
      field.text('eyebrow', 'Eyebrow'),
      field.splitHeading('headline', 'Überschrift'),
      field.richText('body', 'Text', { required: true }),
      field.image('image', 'Bild'),
      field.cta('cta', 'Button')
    ]
  },
  {
    key: 'global.galleryGrid',
    label: 'Galerie',
    industries: 'all',
    styles: 'all',
    allowedPageKinds: ['core', 'custom', 'collectionDetail'],
    repeatable: true,
    fields: [
      field.text('eyebrow', 'Eyebrow'),
      field.splitHeading('headline', 'Überschrift'),
      field.gallery('images', 'Bilder', { required: true })
    ]
  },
  {
    key: 'global.testimonials',
    label: 'Bewertungen',
    industries: 'all',
    styles: 'all',
    allowedPageKinds: ['core', 'custom'],
    repeatable: true,
    fields: [
      field.text('eyebrow', 'Eyebrow'),
      field.splitHeading('headline', 'Überschrift'),
      field.repeater('items', 'Bewertungen', [
        field.text('quote', 'Zitat', { required: true }),
        field.text('name', 'Name / Quelle')
      ])
    ]
  },
  {
    key: 'global.newsTeaser',
    label: 'News & Blog Teaser',
    industries: 'all',
    styles: 'all',
    allowedPageKinds: ['core', 'custom'],
    repeatable: true,
    fields: [
      field.text('eyebrow', 'Eyebrow'),
      field.splitHeading('headline', 'Ueberschrift'),
      field.textarea('intro', 'Einleitung'),
      { key: 'limit', label: 'Anzahl sichtbarer Artikel', type: 'number' },
      field.collectionList('items', 'Artikel', 'newsArticle', { required: true }),
      field.cta('cta', 'Button')
    ]
  },
  {
    key: 'global.faq',
    label: 'FAQ',
    industries: 'all',
    styles: 'all',
    allowedPageKinds: ['core', 'custom', 'collectionDetail'],
    repeatable: true,
    fields: [
      field.text('eyebrow', 'Eyebrow'),
      field.splitHeading('headline', 'Überschrift'),
      field.repeater('items', 'Fragen', [
        field.text('question', 'Frage', { required: true }),
        field.richText('answer', 'Antwort', { required: true })
      ])
    ]
  },
  {
    key: 'global.contactCta',
    label: 'Kontakt CTA',
    industries: 'all',
    styles: 'all',
    allowedPageKinds: ['core', 'custom', 'collectionDetail'],
    repeatable: true,
    fields: [
      field.text('eyebrow', 'Eyebrow'),
      field.splitHeading('headline', 'Überschrift'),
      field.textarea('subline', 'Untertitel'),
      field.cta('cta', 'Button')
    ]
  },
  {
    key: 'global.actionBar',
    label: 'Aktionsleiste',
    industries: 'all',
    styles: 'all',
    allowedPageKinds: ['core', 'custom'],
    fields: [
      { key: 'useOpeningHours', label: 'Status automatisch aus Öffnungszeiten', type: 'boolean' },
      field.text('statusOverride', 'Status-Text'),
      field.cta('primaryCta', 'Primärer Button'),
      field.cta('secondaryCta', 'Sekundärer Button')
    ]
  },
  {
    key: 'global.mapContact',
    label: 'Kontakt & Karte',
    industries: 'all',
    styles: 'all',
    allowedPageKinds: ['core', 'custom'],
    fields: [
      field.text('eyebrow', 'Eyebrow'),
      field.splitHeading('headline', 'Überschrift'),
      field.textarea('subline', 'Einleitung'),
      field.text('primaryActionLabel', 'Primäre Schnellaktion'),
      field.text('secondaryActionLabel', 'Sekundäre Schnellaktion'),
      { key: 'address', label: 'Adresse', type: 'address', required: true },
      { key: 'phone', label: 'Telefon', type: 'phone' },
      { key: 'email', label: 'E-Mail', type: 'email' },
      field.url('mapsUrl', 'Google-Maps-Link / Embed-Link'),
      field.repeater('locations', 'Weitere Standorte mit eigener Karte', [
        field.text('name', 'Name'),
        { key: 'address', label: 'Adresse', type: 'address' },
        field.text('city', 'Ort'),
        { key: 'phone', label: 'Telefon', type: 'phone' },
        { key: 'email', label: 'E-Mail', type: 'email' },
        field.url('mapsUrl', 'Maps-Link / Embed-Link')
      ]),
      field.repeater('arrival', 'Anreise / Ablauf', [
        field.text('title', 'Titel'),
        field.textarea('body', 'Beschreibung')
      ]),
      field.repeater(
        'conversionHighlights',
        'Conversion-Highlights (über Karte)',
        [
          field.text('badge', 'Badge (optional)'),
          field.text('title', 'Titel', { required: true }),
          field.textarea('body', 'Text', { required: true })
        ],
        {
          helpText:
            'Erscheint zwischen Einleitung und Karte — z. B. Reservierungsfenster, Notfallkontakt, Probetraining, Erstgespräch oder RSVP-Hinweis.'
        }
      ),
      { key: 'openingHours', label: 'Öffnungszeiten', type: 'openingHours' }
    ]
  },
  {
    key: 'global.statsBand',
    label: 'Kennzahlen-Band',
    industries: 'all',
    styles: 'all',
    allowedPageKinds: ['core', 'custom'],
    repeatable: true,
    fields: [
      field.text('eyebrow', 'Eyebrow'),
      field.splitHeading('headline', 'Überschrift'),
      field.repeater('items', 'Zahlen', [
        field.text('value', 'Wert', { required: true }),
        field.text('label', 'Label', { required: true }),
        field.text('hint', 'Zusatz')
      ])
    ]
  },
  {
    key: 'global.trustLogos',
    label: 'Partner & Logos',
    industries: 'all',
    styles: 'all',
    allowedPageKinds: ['core', 'custom'],
    repeatable: true,
    fields: [
      field.text('eyebrow', 'Eyebrow'),
      field.splitHeading('headline', 'Überschrift'),
      field.repeater('items', 'Logos', [
        field.text('name', 'Name', { required: true }),
        field.image('logo', 'Logo', { required: true }),
        field.text('href', 'Link (optional)')
      ])
    ]
  },
  {
    key: 'global.bentoHighlights',
    label: 'Bento-Highlights',
    industries: 'all',
    styles: 'all',
    allowedPageKinds: ['core', 'custom'],
    repeatable: true,
    fields: [
      field.text('eyebrow', 'Eyebrow'),
      field.splitHeading('headline', 'Überschrift'),
      field.repeater('items', 'Kacheln', [
        field.text('kicker', 'Kicker'),
        field.text('title', 'Titel', { required: true }),
        field.textarea('body', 'Text'),
        field.image('image', 'Bild'),
        field.text('layoutSpan', 'Breite (1 oder 2)')
      ])
    ]
  },
  {
    key: 'global.scrollerHighlights',
    label: 'Highlight-Streifen (scroll)',
    industries: 'all',
    styles: 'all',
    allowedPageKinds: ['core', 'custom', 'collectionDetail'],
    repeatable: true,
    fields: [
      field.text('eyebrow', 'Eyebrow'),
      field.splitHeading('headline', 'Überschrift'),
      field.textarea('intro', 'Einleitung'),
      field.repeater('slides', 'Karten', [
        field.image('image', 'Bild', { required: true }),
        field.text('title', 'Titel', { required: true }),
        field.textarea('body', 'Text'),
        field.cta('cta', 'Button (optional)')
      ])
    ]
  },
  {
    key: 'global.iconHighlights',
    label: 'Icon-Highlights (Karten)',
    industries: 'all',
    styles: 'all',
    allowedPageKinds: ['core', 'custom', 'collectionDetail'],
    repeatable: true,
    fields: [
      field.text('eyebrow', 'Eyebrow'),
      field.splitHeading('headline', 'Überschrift'),
      field.textarea('intro', 'Einleitung'),
      field.repeater(
        'items',
        'Karten',
        [
          field.text('icon', 'Icon / Emoji'),
          field.text('title', 'Titel', { required: true }),
          field.textarea('body', 'Text'),
          field.cta('cta', 'Button (optional)')
        ],
        { required: true }
      )
    ]
  },
  {
    key: 'global.storyTimeline',
    label: 'Story-Timeline',
    industries: 'all',
    styles: 'all',
    allowedPageKinds: ['core', 'custom', 'collectionDetail'],
    repeatable: true,
    fields: [
      field.text('eyebrow', 'Eyebrow'),
      field.splitHeading('headline', 'Überschrift'),
      field.repeater(
        'steps',
        'Schritte',
        [
          field.text('label', 'Schritt-Label'),
          field.text('title', 'Titel', { required: true }),
          field.textarea('body', 'Text', { required: true })
        ],
        { required: true }
      )
    ]
  },
  {
    key: 'global.mediaSpotlight',
    label: 'Media Spotlight',
    industries: 'all',
    styles: 'all',
    allowedPageKinds: ['core', 'custom', 'collectionDetail'],
    repeatable: true,
    fields: [
      field.text('eyebrow', 'Eyebrow'),
      field.splitHeading('headline', 'Überschrift'),
      field.textarea('subline', 'Untertitel'),
      field.image('image', 'Key-Visual', { required: true }),
      field.text('mood', 'Stimmung (soft oder stark)'),
      field.cta('primaryCta', 'Primärer Button'),
      field.cta('secondaryCta', 'Sekundärer Button')
    ]
  },
  {
    key: 'global.quoteMarquee',
    label: 'Zitat-Marquee',
    industries: 'all',
    styles: 'all',
    allowedPageKinds: ['core', 'custom', 'collectionDetail'],
    repeatable: true,
    fields: [
      field.text('eyebrow', 'Eyebrow'),
      field.splitHeading('headline', 'Überschrift'),
      field.repeater(
        'items',
        'Zitate',
        [
          field.text('quote', 'Zitat', { required: true }),
          field.text('name', 'Name'),
          field.text('role', 'Rolle / Ort')
        ],
        { required: true }
      )
    ]
  },
  {
    key: 'global.asymmetricSpot',
    label: 'Asymmetrischer Spot',
    industries: 'all',
    styles: 'all',
    allowedPageKinds: ['core', 'custom', 'collectionDetail'],
    repeatable: true,
    fields: [
      field.text('eyebrow', 'Eyebrow'),
      field.splitHeading('headline', 'Überschrift'),
      field.richText('body', 'Text', { required: true }),
      field.image('image', 'Bild', { required: true }),
      field.text('imageSide', 'Bild-Seite', { helpText: 'left oder right' })
    ]
  },
  {
    key: 'global.pricingTiers',
    label: 'Preis-Stufen',
    industries: 'all',
    styles: 'all',
    allowedPageKinds: ['core', 'custom', 'collectionDetail'],
    repeatable: true,
    fields: [
      field.text('eyebrow', 'Eyebrow'),
      field.splitHeading('headline', 'Überschrift'),
      field.textarea('intro', 'Einleitung'),
      field.repeater(
        'tiers',
        'Tarife',
        [
          field.text('name', 'Name', { required: true }),
          field.text('priceLine', 'Preiszeile', { required: true }),
          field.textarea('summary', 'Kurzbeschreibung'),
          field.textarea('bullets', 'Leistungen (eine Zeile pro Punkt)'),
          { key: 'highlighted', label: 'Hervorheben', type: 'boolean' },
          field.text('ctaLabel', 'Button-Text'),
          field.url('ctaHref', 'Button-Link (URL)')
        ],
        { required: true }
      )
    ]
  },
  {
    key: 'global.ribbonCta',
    label: 'Hinweis-Leiste mit CTA',
    industries: 'all',
    styles: 'all',
    allowedPageKinds: ['core', 'custom', 'collectionDetail'],
    repeatable: true,
    fields: [
      field.text('message', 'Nachricht', { required: true }),
      field.cta('cta', 'Button')
    ]
  },
  {
    key: 'global.keyFactsGrid',
    label: 'Key-Facts (Raster)',
    industries: 'all',
    styles: 'all',
    allowedPageKinds: ['core', 'custom', 'collectionDetail'],
    repeatable: true,
    fields: [
      field.text('eyebrow', 'Eyebrow'),
      field.splitHeading('headline', 'Überschrift'),
      field.repeater(
        'items',
        'Fakten',
        [
          field.text('icon', 'Icon / Emoji'),
          field.text('title', 'Titel', { required: true }),
          field.textarea('detail', 'Detail', { required: true })
        ],
        { required: true }
      )
    ]
  },
  {
    key: 'global.videoEmbed',
    label: 'Video (YouTube)',
    industries: 'all',
    styles: 'all',
    allowedPageKinds: ['core', 'custom', 'collectionDetail'],
    repeatable: true,
    fields: [
      field.text('eyebrow', 'Eyebrow'),
      field.splitHeading('headline', 'Überschrift'),
      field.url('embedUrl', 'YouTube-URL', { required: true }),
      field.textarea('caption', 'Untertitel')
    ]
  },
  {
    key: 'global.pullQuote',
    label: 'Zitat-Block',
    industries: 'all',
    styles: 'all',
    allowedPageKinds: ['core', 'custom', 'collectionDetail'],
    repeatable: true,
    fields: [
      field.textarea('quote', 'Zitat', { required: true }),
      field.text('attribution', 'Quelle / Name'),
      field.text('role', 'Rolle / Kontext')
    ]
  },
  {
    key: 'global.stepsStrip',
    label: 'Schritte (Streifen)',
    industries: 'all',
    styles: 'all',
    allowedPageKinds: ['core', 'custom', 'collectionDetail'],
    repeatable: true,
    fields: [
      field.text('eyebrow', 'Eyebrow'),
      field.splitHeading('headline', 'Überschrift'),
      field.repeater(
        'steps',
        'Schritte',
        [
          field.text('label', 'Schritt-Label'),
          field.text('title', 'Titel', { required: true }),
          field.textarea('body', 'Text')
        ],
        { required: true }
      )
    ]
  },
  {
    key: 'global.featureCompare',
    label: 'Vergleich (Du vs. Standard)',
    industries: 'all',
    styles: 'all',
    allowedPageKinds: ['core', 'custom', 'collectionDetail'],
    repeatable: true,
    fields: [
      field.text('eyebrow', 'Eyebrow'),
      field.splitHeading('headline', 'Überschrift'),
      field.text('columnUs', 'Spalte: Du', { required: true }),
      field.text('columnThem', 'Spalte: Andere', { required: true }),
      field.repeater(
        'rows',
        'Zeilen',
        [
          field.text('feature', 'Merkmal', { required: true }),
          field.text('us', 'Bei dir', { required: true }),
          field.text('them', 'Typisch sonst', { required: true })
        ],
        { required: true }
      )
    ]
  }
];
