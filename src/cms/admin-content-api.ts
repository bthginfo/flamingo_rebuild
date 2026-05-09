'use client';

import type { SiteSeed } from '@/template-engine/seeds/model';

export type AdminContentSession = {
  authenticated: true;
  tenantSlug: string;
  role: 'owner' | 'editor';
};

export type AdminContentMode = 'api' | 'demo';

export type AdminContentState = {
  mode: AdminContentMode;
  tenantSlug?: string;
  role?: 'owner' | 'editor';
  unavailableReason?: string;
};

export async function resolveAdminContentState(): Promise<AdminContentState> {
  const response = await fetch('/api/admin/session', { cache: 'no-store' });
  if (!response.ok) {
    return { mode: 'demo', unavailableReason: 'Keine aktive Admin-Session.' };
  }

  const session = await response.json() as Partial<AdminContentSession>;
  if (session.authenticated !== true || !session.tenantSlug) {
    return { mode: 'demo', unavailableReason: 'Keine aktive Admin-Session.' };
  }

  return {
    mode: 'api',
    tenantSlug: session.tenantSlug,
    role: session.role === 'editor' ? 'editor' : 'owner'
  };
}

export async function loadAdminDocument(tenantSlug: string, preview: boolean): Promise<SiteSeed> {
  const response = await fetch(`/api/admin/content?tenant=${encodeURIComponent(tenantSlug)}${preview ? '&preview=1' : ''}`, {
    cache: 'no-store'
  });
  if (!response.ok) throw new Error(await readApiError(response));
  const payload = await response.json() as { document?: SiteSeed };
  if (!payload.document) throw new Error('Die Content-API hat kein Dokument geliefert.');
  return payload.document;
}

export async function saveAdminDraft(tenantSlug: string, document: SiteSeed): Promise<void> {
  const response = await fetch(`/api/admin/content?tenant=${encodeURIComponent(tenantSlug)}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ document })
  });
  if (!response.ok) throw new Error(await readApiError(response));
}

export async function publishAdminDraft(tenantSlug: string): Promise<void> {
  const response = await fetch(`/api/admin/content?tenant=${encodeURIComponent(tenantSlug)}&action=publish`, {
    method: 'POST'
  });
  if (!response.ok) throw new Error(await readApiError(response));
}

export async function discardAdminDraft(tenantSlug: string): Promise<void> {
  const response = await fetch(`/api/admin/content?tenant=${encodeURIComponent(tenantSlug)}&action=discard`, {
    method: 'POST'
  });
  if (!response.ok) throw new Error(await readApiError(response));
}

async function readApiError(response: Response): Promise<string> {
  try {
    const payload = await response.json() as { error?: string; issues?: string[] };
    const issues = payload.issues?.length ? ` ${payload.issues.join(' ')}` : '';
    return `${payload.error ?? `HTTP ${response.status}`}${issues}`;
  } catch {
    return `HTTP ${response.status}`;
  }
}
