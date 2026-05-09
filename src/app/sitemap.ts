import type { MetadataRoute } from 'next';
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

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteOrigin();
  const lastModified = new Date();
  return paths.map((path) => ({
    url: `${origin}${path}`,
    lastModified,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.7
  }));
}
