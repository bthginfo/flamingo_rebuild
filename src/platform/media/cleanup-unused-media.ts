import { del, list } from '@vercel/blob';
import { loadSiteDocumentByTenantSlug } from '@/db/site-document-repository';

const RETENTION_DAYS = 14;
const RETENTION_MS = RETENTION_DAYS * 24 * 60 * 60 * 1000;

type BlobListItem = {
  url: string;
  pathname: string;
  uploadedAt?: Date | string;
};

type BlobListPage = {
  blobs: BlobListItem[];
  cursor?: string;
  hasMore?: boolean;
};

export type MediaCleanupResult = {
  scanned: number;
  deleted: number;
  retainedActive: number;
  retainedFresh: number;
  retainedUnknownAge: number;
};

export async function cleanupUnusedTenantMedia(tenantSlug: string, now = new Date()): Promise<MediaCleanupResult> {
  const prefix = `${tenantSlug}/media/`;
  const activeUrls = await collectActiveMediaUrls(tenantSlug);
  const cutoff = now.getTime() - RETENTION_MS;
  const result: MediaCleanupResult = {
    scanned: 0,
    deleted: 0,
    retainedActive: 0,
    retainedFresh: 0,
    retainedUnknownAge: 0
  };

  let cursor: string | undefined;
  do {
    const page = (await list({ prefix, cursor, limit: 100 })) as BlobListPage;
    for (const blob of page.blobs) {
      result.scanned += 1;
      if (activeUrls.has(blob.url)) {
        result.retainedActive += 1;
        continue;
      }

      const uploadedAt = blob.uploadedAt ? new Date(blob.uploadedAt).getTime() : Number.NaN;
      if (Number.isNaN(uploadedAt)) {
        result.retainedUnknownAge += 1;
        continue;
      }
      if (uploadedAt > cutoff) {
        result.retainedFresh += 1;
        continue;
      }

      await del(blob.url);
      result.deleted += 1;
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  return result;
}

async function collectActiveMediaUrls(tenantSlug: string): Promise<Set<string>> {
  const urls = new Set<string>();
  for (const status of ['draft', 'published'] as const) {
    const document = await loadSiteDocumentByTenantSlug(tenantSlug, status);
    if (document) collectUrls(document, urls);
  }
  return urls;
}

function collectUrls(value: unknown, urls: Set<string>) {
  if (typeof value === 'string') {
    if (isBlobUrl(value)) urls.add(value);
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectUrls(item, urls);
    return;
  }
  if (value && typeof value === 'object') {
    for (const child of Object.values(value)) collectUrls(child, urls);
  }
}

function isBlobUrl(value: string): boolean {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    return host.endsWith('.public.blob.vercel-storage.com') || host === 'public.blob.vercel-storage.com';
  } catch {
    return false;
  }
}
