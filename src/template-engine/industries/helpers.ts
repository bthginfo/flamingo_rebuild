import { field } from '../fields';
import type { CollectionDefinition, IndustryKey, PageDefinition } from '../model';

export function page(
  key: string,
  label: string,
  defaultSlug: string,
  defaultSections: readonly string[],
  allowedSections: readonly string[] = defaultSections
): PageDefinition {
  return {
    key,
    label,
    kind: 'core',
    defaultSlug,
    required: true,
    allowedSections,
    defaultSections
  };
}

export function standardServiceCollection(
  industry: IndustryKey,
  key: string,
  label: string,
  slugPrefix: string
): CollectionDefinition {
  return {
    key,
    label,
    industry,
    slugPrefix,
    fields: [
      field.text('title', 'Titel', { required: true }),
      field.text('slug', 'Slug', { required: true }),
      field.textarea('summary', 'Kurzbeschreibung', { required: true }),
      field.richText('description', 'Beschreibung'),
      field.image('image', 'Bild'),
      field.cta('cta', 'Button'),
      field.seo()
    ],
    detailPage: {
      pathPattern: `${slugPrefix}/[slug]`,
      allowedSections: [
        'global.pageHeader',
        'global.textImage',
        'global.galleryGrid',
        'global.faq',
        'global.contactCta',
        'global.statsBand',
        'global.trustLogos',
        'global.bentoHighlights',
        'global.iconHighlights',
        'global.storyTimeline',
        'global.mediaSpotlight',
        'global.quoteMarquee'
      ],
      defaultSections: ['global.pageHeader', 'global.textImage', 'global.contactCta']
    }
  };
}

export function premiumContentCollection(
  industry: IndustryKey,
  key: string,
  label: string,
  slugPrefix: string
): CollectionDefinition {
  return {
    key,
    label,
    industry,
    slugPrefix,
    fields: [
      field.text('title', 'Titel', { required: true }),
      field.text('slug', 'Slug', { required: true }),
      field.textarea('summary', 'Kurzbeschreibung', { required: true }),
      field.richText('description', 'Beschreibung'),
      field.image('image', 'Bild'),
      field.text('kicker', 'Kicker'),
      field.text('metric', 'Kennzahl / Signal'),
      field.text('detail', 'Detailzeile'),
      field.cta('cta', 'Button'),
      field.seo()
    ],
    detailPage: {
      pathPattern: `${slugPrefix}/[slug]`,
      allowedSections: [
        'global.pageHeader',
        'global.textImage',
        'global.galleryGrid',
        'global.faq',
        'global.contactCta',
        'global.statsBand',
        'global.bentoHighlights',
        'global.iconHighlights',
        'global.storyTimeline',
        'global.mediaSpotlight',
        'global.quoteMarquee',
        'global.keyFactsGrid',
        'global.stepsStrip'
      ],
      defaultSections: ['global.pageHeader', 'global.textImage', 'global.contactCta']
    }
  };
}
