import type { IndustryKey, StyleKey } from '@/template-engine/model';

export type ProvisioningRequest = {
  prospectId?: string;
  tenantName: string;
  slug: string;
  industryKey: IndustryKey;
  styleKey: StyleKey;
  seedMode: 'demo' | 'blank' | 'import';
  importedContent?: Record<string, unknown>;
};

export type ProvisioningResult = {
  tenantId: string;
  tenantSlug: string;
  adminUrl: string;
  siteUrl: string;
  initialPassword?: string;
  healthCheck: {
    registryValid: boolean;
    draftCreated: boolean;
    publishedCreated: boolean;
    defaultPagesCreated: boolean;
    collectionsSeeded: boolean;
  };
};
