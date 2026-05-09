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
      { key: 'address', label: 'Adresse', type: 'address', required: true },
      { key: 'phone', label: 'Telefon', type: 'phone' },
      { key: 'email', label: 'E-Mail', type: 'email' },
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
        field.text('logo', 'Logo-URL', { required: true }),
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
        field.text('image', 'Bild-URL'),
        field.text('layoutSpan', 'Breite (1 oder 2)')
      ])
    ]
  }
];
