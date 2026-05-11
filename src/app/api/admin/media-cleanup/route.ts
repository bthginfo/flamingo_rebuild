import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isSessionFresh, readAdminSession } from '@/platform/auth/admin-session';
import { cleanupUnusedTenantMedia } from '@/platform/media/cleanup-unused-media';
import { listPublishedTenantSlugs } from '@/db/site-document-repository';

export const runtime = 'nodejs';

function ensureBlobConfigured() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: 'Blob-Speicher ist nicht konfiguriert. BLOB_READ_WRITE_TOKEN in der Umgebung setzen.' },
      { status: 503 }
    );
  }
  return null;
}

export async function POST() {
  const session = await readAdminSession();
  if (!session || !isSessionFresh(session)) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }

  const blobError = ensureBlobConfigured();
  if (blobError) return blobError;

  try {
    const result = await cleanupUnusedTenantMedia(session.tenantSlug);
    return NextResponse.json(result);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: `Bereinigung fehlgeschlagen: ${message}` }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET?.trim();
  if (!cronSecret) {
    return NextResponse.json(
      { error: 'Cron-Bereinigung ist nicht konfiguriert. CRON_SECRET in der Umgebung setzen.' },
      { status: 503 }
    );
  }
  const auth = request.headers.get('authorization') ?? '';
  if (auth !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const blobError = ensureBlobConfigured();
  if (blobError) return blobError;

  try {
    const tenantSlugs = await listPublishedTenantSlugs();
    const results = await Promise.all(
      tenantSlugs.map(async (tenantSlug) => ({
        tenantSlug,
        result: await cleanupUnusedTenantMedia(tenantSlug)
      }))
    );
    const totals = results.reduce(
      (acc, entry) => ({
        scanned: acc.scanned + entry.result.scanned,
        deleted: acc.deleted + entry.result.deleted,
        retainedActive: acc.retainedActive + entry.result.retainedActive,
        retainedFresh: acc.retainedFresh + entry.result.retainedFresh,
        retainedUnknownAge: acc.retainedUnknownAge + entry.result.retainedUnknownAge
      }),
      { scanned: 0, deleted: 0, retainedActive: 0, retainedFresh: 0, retainedUnknownAge: 0 }
    );
    return NextResponse.json({ tenantCount: tenantSlugs.length, totals, results });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: `Bereinigung fehlgeschlagen: ${message}` }, { status: 500 });
  }
}
