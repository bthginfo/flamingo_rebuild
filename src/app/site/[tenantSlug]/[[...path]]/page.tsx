import { notFound } from 'next/navigation';
import { loadSiteDocumentByTenantSlug } from '@/db/site-document-repository';
import { PublishedSiteClient } from '@/template-engine/rendering/PublishedSiteClient';

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
