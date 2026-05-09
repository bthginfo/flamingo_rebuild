import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse, type NextRequest } from 'next/server';
import { isSessionFresh, readAdminSession } from '@/platform/auth/admin-session';

const MAX_BYTES = Math.floor(1.5 * 1024 * 1024);
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'] as const;

export const runtime = 'nodejs';

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

  const tenantSlug = session.tenantSlug;
  const allowedPrefix = `${tenantSlug}/media/`;

  try {
    const body = (await request.json()) as HandleUploadBody;
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith(allowedPrefix) || pathname.includes('..')) {
          throw new Error('Ungültiger Zielpfad für den Upload.');
        }
        const rest = pathname.slice(allowedPrefix.length);
        if (!rest || rest.includes('/') || !/^[a-zA-Z0-9._-]+$/.test(rest)) {
          throw new Error('Ungültiger Dateiname oder Pfad.');
        }

        return {
          allowedContentTypes: [...ALLOWED_TYPES],
          maximumSizeInBytes: MAX_BYTES,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({ tenantSlug, pathname })
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log('[blob-upload] completed', blob.url, tokenPayload);
      }
    });

    return NextResponse.json(json);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: `Upload fehlgeschlagen: ${message}` }, { status: 400 });
  }
}
