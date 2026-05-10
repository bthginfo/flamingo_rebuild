import { NextResponse } from 'next/server';
import { isSessionFresh, readAdminSession } from '@/platform/auth/admin-session';
import { cleanupUnusedTenantMedia } from '@/platform/media/cleanup-unused-media';

export const runtime = 'nodejs';

export async function POST() {
  const session = await readAdminSession();
  if (!session || !isSessionFresh(session)) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: 'Blob-Speicher ist nicht konfiguriert. BLOB_READ_WRITE_TOKEN in der Umgebung setzen.' },
      { status: 503 }
    );
  }

  try {
    const result = await cleanupUnusedTenantMedia(session.tenantSlug);
    return NextResponse.json(result);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: `Bereinigung fehlgeschlagen: ${message}` }, { status: 500 });
  }
}
