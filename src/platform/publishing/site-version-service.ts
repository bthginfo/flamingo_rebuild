import type { SiteSeed } from '@/template-engine/seeds/model';
import { validateSiteDocument } from './validate-site-document';
import { discardDraftForTenant, loadSiteDocumentByTenantSlug, publishDraftForTenant, saveDraftSiteDocument } from '@/db/site-document-repository';

export async function loadTenantSiteDocument(tenantSlug: string, preview: boolean): Promise<SiteSeed | undefined> {
  if (preview) {
    const draft = await loadSiteDocumentByTenantSlug(tenantSlug, 'draft');
    if (draft) return draft;
  }

  return loadSiteDocumentByTenantSlug(tenantSlug, 'published');
}

export async function saveTenantDraft(tenantSlug: string, document: SiteSeed): Promise<{ ok: true } | { ok: false; errors: string[] }> {
  const errors = validateSiteDocument(document);
  if (errors.length > 0) return { ok: false, errors };
  await saveDraftSiteDocument(tenantSlug, document);
  return { ok: true };
}

export async function publishTenantDraft(tenantSlug: string): Promise<void> {
  await publishDraftForTenant(tenantSlug);
}

export async function discardTenantDraft(tenantSlug: string): Promise<void> {
  await discardDraftForTenant(tenantSlug);
}
