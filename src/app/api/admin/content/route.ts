import { NextRequest, NextResponse } from 'next/server';
import { isDatabaseConfigured } from '@/db/client';
import {
  discardDraftForTenant,
  loadSiteDocumentByTenantSlug,
  publishDraftForTenant,
  saveDraftSiteDocument,
  stripSiteSeedForAdminApi
} from '@/db/site-document-repository';
import { isSessionFresh, readAdminSession } from '@/platform/auth/admin-session';
import { validateSiteDocument } from '@/platform/publishing/validate-site-document';
import type { SiteSeed } from '@/template-engine/seeds/model';

function stripPassPresentFromSiteSeed(document: SiteSeed): SiteSeed {
  const int = document.global.integrations;
  if (!int?.mail) return document;
  const mail = { ...int.mail };
  delete mail.passPresent;
  return {
    ...document,
    global: {
      ...document.global,
      integrations: { ...int, mail }
    }
  };
}

export const runtime = 'nodejs';

function jsonError(message: string, status: number, issues?: string[]) {
  return NextResponse.json({ error: message, issues }, { status });
}

export async function GET(request: NextRequest) {
  if (!isDatabaseConfigured()) {
    return jsonError('Datenbank nicht konfiguriert.', 503);
  }
  const session = await readAdminSession();
  if (!session || !isSessionFresh(session)) {
    return jsonError('Authentifizierung erforderlich.', 401);
  }

  const tenant = request.nextUrl.searchParams.get('tenant')?.trim().toLowerCase();
  if (!tenant || tenant !== session.tenantSlug) {
    return jsonError('Forbidden.', 403);
  }

  const preview = request.nextUrl.searchParams.get('preview') === '1';
  const doc = await loadSiteDocumentByTenantSlug(tenant, preview ? 'draft' : 'published');
  if (!doc) {
    return jsonError('Kein Dokument gefunden.', 404);
  }
  return NextResponse.json({ document: stripSiteSeedForAdminApi(doc) });
}

export async function PUT(request: NextRequest) {
  if (!isDatabaseConfigured()) {
    return jsonError('Datenbank nicht konfiguriert.', 503);
  }
  const session = await readAdminSession();
  if (!session || !isSessionFresh(session)) {
    return jsonError('Authentifizierung erforderlich.', 401);
  }

  const tenant = request.nextUrl.searchParams.get('tenant')?.trim().toLowerCase();
  if (!tenant || tenant !== session.tenantSlug) {
    return jsonError('Forbidden.', 403);
  }

  let body: { document?: SiteSeed };
  try {
    body = (await request.json()) as { document?: SiteSeed };
  } catch {
    return jsonError('Ungültiger JSON-Body.', 400);
  }
  const document = body.document ? stripPassPresentFromSiteSeed(body.document) : undefined;
  if (!document) {
    return jsonError('Feld „document“ fehlt.', 400);
  }

  const issues = validateSiteDocument(document);
  if (issues.length > 0) {
    return jsonError('Validierung fehlgeschlagen.', 422, issues);
  }

  await saveDraftSiteDocument(tenant, document);
  const saved = await loadSiteDocumentByTenantSlug(tenant, 'draft');
  return NextResponse.json({ ok: true, document: saved ? stripSiteSeedForAdminApi(saved) : undefined });
}

export async function POST(request: NextRequest) {
  if (!isDatabaseConfigured()) {
    return jsonError('Datenbank nicht konfiguriert.', 503);
  }
  const session = await readAdminSession();
  if (!session || !isSessionFresh(session)) {
    return jsonError('Authentifizierung erforderlich.', 401);
  }

  const tenant = request.nextUrl.searchParams.get('tenant')?.trim().toLowerCase();
  if (!tenant || tenant !== session.tenantSlug) {
    return jsonError('Forbidden.', 403);
  }

  const action = request.nextUrl.searchParams.get('action');
  try {
    if (action === 'publish') {
      await publishDraftForTenant(tenant);
      const published = await loadSiteDocumentByTenantSlug(tenant, 'published');
      return NextResponse.json({ ok: true, document: published ? stripSiteSeedForAdminApi(published) : undefined });
    }
    if (action === 'discard') {
      await discardDraftForTenant(tenant);
      const fallback = await loadSiteDocumentByTenantSlug(tenant, 'published');
      return NextResponse.json({ ok: true, document: fallback ? stripSiteSeedForAdminApi(fallback) : undefined });
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return jsonError(message, 400);
  }

  return jsonError('Unbekannte Aktion.', 400);
}
