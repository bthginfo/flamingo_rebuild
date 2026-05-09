import type { FieldDefinition } from './model';

export const field = {
  text: (key: string, label: string, options: Partial<FieldDefinition> = {}): FieldDefinition => ({
    key,
    label,
    type: 'text',
    ...options
  }),
  textarea: (key: string, label: string, options: Partial<FieldDefinition> = {}): FieldDefinition => ({
    key,
    label,
    type: 'textarea',
    ...options
  }),
  richText: (key: string, label: string, options: Partial<FieldDefinition> = {}): FieldDefinition => ({
    key,
    label,
    type: 'richText',
    ...options
  }),
  image: (key: string, label: string, options: Partial<FieldDefinition> = {}): FieldDefinition => ({
    key,
    label,
    type: 'image',
    ...options
  }),
  gallery: (key: string, label: string, options: Partial<FieldDefinition> = {}): FieldDefinition => ({
    key,
    label,
    type: 'gallery',
    ...options
  }),
  link: (key: string, label: string, options: Partial<FieldDefinition> = {}): FieldDefinition => ({
    key,
    label,
    type: 'link',
    ...options
  }),
  url: (key: string, label: string, options: Partial<FieldDefinition> = {}): FieldDefinition => ({
    key,
    label,
    type: 'url',
    ...options
  }),
  cta: (key: string, label: string, options: Partial<FieldDefinition> = {}): FieldDefinition => ({
    key,
    label,
    type: 'cta',
    fields: [
      { key: 'label', label: 'Button-Text', type: 'text', required: true },
      { key: 'link', label: 'Ziel', type: 'link', required: true }
    ],
    ...options
  }),
  splitHeading: (key: string, label: string, options: Partial<FieldDefinition> = {}): FieldDefinition => ({
    key,
    label,
    type: 'splitHeading',
    fields: [
      { key: 'plain', label: 'Titel - Teil 1', type: 'text', required: true },
      { key: 'accent', label: 'Titel - Teil 2', type: 'text' }
    ],
    ...options
  }),
  repeater: (
    key: string,
    label: string,
    itemFields: readonly FieldDefinition[],
    options: Partial<FieldDefinition> = {}
  ): FieldDefinition => ({
    key,
    label,
    type: 'repeater',
    itemFields,
    ...options
  }),
  collectionList: (key: string, label: string, collectionKey: string, options: Partial<FieldDefinition> = {}): FieldDefinition => ({
    key,
    label,
    type: 'collectionReferenceList',
    collectionKey,
    ...options
  }),
  seo: (): FieldDefinition => ({
    key: 'seo',
    label: 'SEO',
    type: 'seo'
  })
};
