import type { MetadataRoute } from 'next';
import { isDatabaseConfigured } from '@/db/client';
import { listPublishedTenantSlugs, loadSiteDocumentByTenantSlug } from '@/db/site-document-repository';
import { getSingleTenantSlug } from '@/lib/deployment-mode';
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
    const singleTenantSlug = getSingleTenantSlug();
    const slugs = singleTenantSlug ? [singleTenantSlug] : await listPublishedTenantSlugs();
    const tenantDocs = await Promise.all(
      slugs.map(async (slug) => ({ slug, doc: await loadSiteDocumentByTenantSlug(slug, 'published') }))
    );
    const tenantEntries: MetadataRoute.Sitemap = tenantDocs.flatMap(({ slug, doc }) => {
      if (!doc) return [];
      return doc.pages.map((page) => {
        const pagePath = page.slug === '/' ? '' : page.slug.startsWith('/') ? page.slug : `/${page.slug}`;
        const platformPath = `/site/${slug}${pagePath}`;
        const singleTenantPath = pagePath || '/';
        return {
          url: `${origin}${singleTenantSlug ? singleTenantPath : platformPath}`,
          lastModified,
          changeFrequency: page.key === 'home' ? 'weekly' : 'monthly',
          priority: page.key === 'home' ? 0.85 : 0.6
        } satisfies MetadataRoute.Sitemap[number];
      });
    });
    return singleTenantSlug ? tenantEntries : [...staticEntries, ...tenantEntries];
  } catch {
    return staticEntries;
  }
}
