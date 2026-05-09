import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { loadSiteDocumentByTenantSlug } from '@/db/site-document-repository';
import { PublishedSiteClient } from '@/template-engine/rendering/PublishedSiteClient';

function asMetaString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ tenantSlug: string; path?: string[] }>;
}): Promise<Metadata> {
  const { tenantSlug } = await params;
  const seed = await loadSiteDocumentByTenantSlug(tenantSlug, 'published');
  if (!seed) {
    return { title: 'Flamingo' };
  }
  const home = seed.pages.find((page) => page.key === 'home');
  const metaTitle = asMetaString(home?.seo.title);
  const metaDescription = asMetaString(home?.seo.description);
  return {
    title: metaTitle || seed.global.brand.name || tenantSlug,
    description: metaDescription || seed.global.brand.tagline || undefined
  };
}

export default async function TenantPublishedSitePage({
  params
}: {
  params: Promise<{ tenantSlug: string; path?: string[] }>;
}) {
  const { tenantSlug, path } = await params;
  const seed = await loadSiteDocumentByTenantSlug(tenantSlug, 'published');
  if (!seed) {
    notFound();
  }

  return <PublishedSiteClient seed={seed} pathSegments={path ?? []} />;
}
