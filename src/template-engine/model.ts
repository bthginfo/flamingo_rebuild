export const INDUSTRY_KEYS = [
  'restaurant',
  'hotel',
  'tourism',
  'salon',
  'tradesman',
  'consulting',
  'medical',
  'fitness',
  'wedding'
] as const;

export const STYLE_KEYS = ['classic', 'modern', 'bold'] as const;

export type IndustryKey = (typeof INDUSTRY_KEYS)[number];
export type StyleKey = (typeof STYLE_KEYS)[number];

export type PageKind = 'core' | 'custom' | 'collectionDetail';

export type FieldType =
  | 'text'
  | 'textarea'
  | 'richText'
  | 'number'
  | 'boolean'
  | 'date'
  | 'time'
  | 'image'
  | 'gallery'
  | 'url'
  | 'email'
  | 'phone'
  | 'select'
  | 'multiSelect'
  | 'link'
  | 'cta'
  | 'seo'
  | 'group'
  | 'repeater'
  | 'collectionReference'
  | 'collectionReferenceList'
  | 'splitHeading'
  | 'openingHours'
  | 'address'
  | 'socialLinks';

export type FieldDefinition = {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  helpText?: string;
  options?: readonly string[];
  fields?: readonly FieldDefinition[];
  itemFields?: readonly FieldDefinition[];
  collectionKey?: string;
};

export type SectionDefinition = {
  key: string;
  label: string;
  description?: string;
  industries: readonly IndustryKey[] | 'all';
  styles: readonly StyleKey[] | 'all';
  allowedPageKinds: readonly PageKind[];
  fields: readonly FieldDefinition[];
  repeatable?: boolean;
};

export type PageDefinition = {
  key: string;
  label: string;
  kind: PageKind;
  defaultSlug: string;
  required?: boolean;
  allowedSections: readonly string[];
  defaultSections: readonly string[];
};

export type CollectionDefinition = {
  key: string;
  label: string;
  industry: IndustryKey;
  slugPrefix: string;
  fields: readonly FieldDefinition[];
  detailPage: {
    pathPattern: string;
    allowedSections: readonly string[];
    defaultSections: readonly string[];
  };
};

export type IndustryDefinition = {
  key: IndustryKey;
  label: string;
  positioning: string;
  corePages: readonly PageDefinition[];
  collections: readonly CollectionDefinition[];
};

export type StyleDefinition = {
  key: StyleKey;
  label: string;
  character: string;
  tokens: {
    fontPairing: string;
    density: 'airy' | 'balanced' | 'compact';
    imageTreatment: string;
    cardTreatment: string;
    ctaTreatment: string;
  };
};

export type SectionInstance = {
  id: string;
  sectionKey: string;
  visible: boolean;
  sortOrder: number;
  data: Record<string, unknown>;
};

export type PageInstance = {
  id: string;
  key: string;
  kind: PageKind;
  title: string;
  slug: string;
  seo: Record<string, unknown>;
  sections: readonly SectionInstance[];
};
