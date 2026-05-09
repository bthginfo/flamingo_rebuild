import { del } from '@vercel/blob';
import { NextResponse, type NextRequest } from 'next/server';
import { isSessionFresh, readAdminSession } from '@/platform/auth/admin-session';

export const runtime = 'nodejs';

function tenantOwnsBlobUrl(url: string, tenantSlug: string): boolean {
  try {
    const u = new URL(url);
    const host = u.hostname.toLowerCase();
    const isVercelBlob =
      host.endsWith('.public.blob.vercel-storage.com') || host === 'public.blob.vercel-storage.com';
    if (!isVercelBlob) return false;
    const pathname = u.pathname.startsWith('/') ? u.pathname.slice(1) : u.pathname;
    return pathname.startsWith(`${tenantSlug}/media/`) && !pathname.includes('..');
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
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

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Ungültiger JSON-Body.' }, { status: 400 });
  }

  const url = typeof body === 'object' && body !== null && 'url' in body ? String((body as { url: unknown }).url) : '';
  if (!url) {
    return NextResponse.json({ error: 'url fehlt.' }, { status: 400 });
  }

  if (!tenantOwnsBlobUrl(url, session.tenantSlug)) {
    return NextResponse.json({ error: 'URL gehört nicht zu diesem Mandanten oder ist ungültig.' }, { status: 403 });
  }

  try {
    await del(url, { token: process.env.BLOB_READ_WRITE_TOKEN });
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: `Löschen fehlgeschlagen: ${message}` }, { status: 400 });
  }
}
