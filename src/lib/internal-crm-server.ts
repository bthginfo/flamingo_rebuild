import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { isInternalCrmSessionFresh, readInternalCrmSession } from '@/platform/auth/internal-crm-session';

export async function requireInternalCrmSession(): Promise<void> {
  const session = await readInternalCrmSession();
  if (!session || !isInternalCrmSessionFresh(session)) {
    const h = await headers();
    const next = h.get('x-flamingo-internal-path') ?? '/internal/crm/prospects';
    redirect(`/internal/crm/login?next=${encodeURIComponent(next)}`);
  }
}

export async function assertInternalCrmSession(): Promise<{ ok: true } | { ok: false; error: string }> {
  const session = await readInternalCrmSession();
  if (!session || !isInternalCrmSessionFresh(session)) {
    return { ok: false, error: 'Internes CRM: Sitzung abgelaufen oder nicht angemeldet.' };
  }
  return { ok: true };
}
