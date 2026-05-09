import { NextRequest, NextResponse } from 'next/server';
import type { SiteSeed } from '@/template-engine/seeds/model';
import { isDatabaseConfigured } from '@/db/client';
import { discardTenantDraft, loadTenantSiteDocument, publishTenantDraft, saveTenantDraft } from '@/platform/publishing/site-version-service';
import { isSessionFresh, readAdminSession } from '@/platform/auth/admin-session';

export async function GET(request: NextRequest) {
  if (!isDatabaseConfigured()) return databaseNotConfigured();

  const tenantSlug = request.nextUrl.searchParams.get('tenant');
  if (!tenantSlug) {
    return NextResponse.json({ error: 'Missing tenant query parameter.' }, { status: 400 });
  }
  const authError = await requireTenantSession(tenantSlug);
  if (authError) return authError;

  const preview = request.nextUrl.searchParams.get('preview') === '1';
  const document = await loadTenantSiteDocument(tenantSlug, preview);
  if (!document) {
    return NextResponse.json({ error: 'Content not found.' }, { status: 404 });
  }

  return NextResponse.json({ document });
}

export async function PUT(request: NextRequest) {
  if (!isDatabaseConfigured()) return databaseNotConfigured();

  const tenantSlug = request.nextUrl.searchParams.get('tenant');
  if (!tenantSlug) {
    return NextResponse.json({ error: 'Missing tenant query parameter.' }, { status: 400 });
  }
  const authError = await requireTenantSession(tenantSlug);
  if (authError) return authError;

  const body = await request.json() as { document?: SiteSeed };
  if (!body.document) {
    return NextResponse.json({ error: 'Missing document body.' }, { status: 400 });
  }

  const result = await saveTenantDraft(tenantSlug, body.document);
  if (!result.ok) {
    return NextResponse.json({ error: 'Draft validation failed.', issues: result.errors }, { status: 422 });
  }

  return NextResponse.json({ ok: true });
}

export async function POST(request: NextRequest) {
  if (!isDatabaseConfigured()) return databaseNotConfigured();

  const tenantSlug = request.nextUrl.searchParams.get('tenant');
  const action = request.nextUrl.searchParams.get('action');
  if (!tenantSlug) {
    return NextResponse.json({ error: 'Missing tenant query parameter.' }, { status: 400 });
  }
  const authError = await requireTenantSession(tenantSlug);
  if (authError) return authError;
  if (action !== 'publish' && action !== 'discard') {
    return NextResponse.json({ error: 'Unsupported action.' }, { status: 400 });
  }

  if (action === 'publish') {
    await publishTenantDraft(tenantSlug);
  } else {
    await discardTenantDraft(tenantSlug);
  }
  return NextResponse.json({ ok: true });
}

async function requireTenantSession(tenantSlug: string): Promise<NextResponse | undefined> {
  const session = await readAdminSession();
  if (!session || !isSessionFresh(session)) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }

  if (session.tenantSlug !== tenantSlug) {
    return NextResponse.json({ error: 'Tenant access denied.' }, { status: 403 });
  }

  return undefined;
}

function databaseNotConfigured() {
  return NextResponse.json(
    {
      error: 'Rebuild database is not configured.',
      required: ['FLAMINGO_REBUILD_DB=1', 'POSTGRES_URL for the new rebuild database']
    },
    { status: 503 }
  );
}
