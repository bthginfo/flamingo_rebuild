import type { IndustryKey, PageInstance, StyleKey } from '../model';

export type CollectionSeedItem = {
  id: string;
  collectionKey: string;
  title: string;
  slug: string;
  data: Record<string, unknown>;
  seo?: Record<string, unknown>;
};

/** Tenant SMTP (optional). Password is never returned to the browser from the API. */
export type TenantMailSmtpSettings = {
  enabled?: boolean;
  host?: string;
  port?: number;
  user?: string;
  /** Plain password — only accepted on write; stripped on read. */
  pass?: string;
  from?: string;
  to?: string;
  autoReply?: boolean;
  /** Populated when loading from API — password itself is never sent. */
  passPresent?: boolean;
};

export type TenantCustomScript = {
  id: string;
  name: string;
  category: 'necessary' | 'functional' | 'analytics' | 'marketing';
  code: string;
  enabled: boolean;
  placement: 'head' | 'body';
};

export type TenantCookieUiMode = 'full' | 'simple' | 'off';

export type SiteGlobalIntegrations = {
  mail?: TenantMailSmtpSettings;
  customScripts?: readonly TenantCustomScript[];
  /** Default `off` for demo HTML seeds; DB-backed tenants often use `full`. */
  cookieUi?: TenantCookieUiMode;
  privacyHref?: string;
  imprintHref?: string;
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
    integrations?: SiteGlobalIntegrations;
  };
  pages: readonly PageInstance[];
  collections: readonly CollectionSeedItem[];
};
