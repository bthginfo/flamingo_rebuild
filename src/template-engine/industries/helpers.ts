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
      allowedSections: ['global.pageHeader', 'global.textImage', 'global.galleryGrid', 'global.faq', 'global.contactCta'],
      defaultSections: ['global.pageHeader', 'global.textImage', 'global.contactCta']
    }
  };
}
