import type { IndustryKey, PageInstance, StyleKey } from '../model';

export type CollectionSeedItem = {
  id: string;
  collectionKey: string;
  title: string;
  slug: string;
  data: Record<string, unknown>;
};

export type SiteSeed = {
  tenantName: string;
  industryKey: IndustryKey;
  styleKey: StyleKey;
  global: {
    brand: {
      name: string;
      tagline: string;
    };
    navigation: readonly { label: string; href: string }[];
    contact: Record<string, unknown>;
  };
  pages: readonly PageInstance[];
  collections: readonly CollectionSeedItem[];
};
