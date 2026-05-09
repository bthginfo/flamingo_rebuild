import type { MetadataRoute } from 'next';
import { isDatabaseConfigured } from '@/db/client';
import { listPublishedTenantSlugs } from '@/db/site-document-repository';
import { getSiteOrigin } from '@/lib/site-url';

const paths = [
  '/',
  '/templates',
  '/prozess',
  '/preise',
  '/ueber-uns',
  '/kontakt',
  '/impressum',
  '/datenschutz',
  '/admin-demo'
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = getSiteOrigin();
  const lastModified = new Date();
  const staticEntries: MetadataRoute.Sitemap = paths.map((path) => ({
    url: `${origin}${path}`,
    lastModified,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.7
  }));

  if (!isDatabaseConfigured()) {
    return staticEntries;
  }

  try {
    const slugs = await listPublishedTenantSlugs();
    const tenantEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
      url: `${origin}/site/${slug}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.55
    }));
    return [...staticEntries, ...tenantEntries];
  } catch {
    return staticEntries;
  }
}
