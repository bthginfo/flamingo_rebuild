import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

/** HttpOnly cookie; name is distinct from tenant admin (`flamingo_rebuild_admin`). Path `/` so `/api/internal/crm/login` can set it. */
export const INTERNAL_CRM_SESSION_COOKIE = 'flamingo_internal_crm';

export type InternalCrmSession = {
  role: 'operator';
  issuedAt: number;
};

export function signInternalCrmSession(session: InternalCrmSession): string {
  const payload = Buffer.from(JSON.stringify(session), 'utf8').toString('base64url');
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export function verifyInternalCrmSession(token: string | undefined): InternalCrmSession | undefined {
  if (!token) return undefined;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return undefined;
  const expected = sign(payload);
  if (!safeEqual(signature, expected)) return undefined;

  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as Partial<InternalCrmSession>;
    if (parsed.role !== 'operator') return undefined;
    if (typeof parsed.issuedAt !== 'number') return undefined;
    return { role: 'operator', issuedAt: parsed.issuedAt };
  } catch {
    return undefined;
  }
}

export async function readInternalCrmSession(): Promise<InternalCrmSession | undefined> {
  const cookieStore = await cookies();
  return verifyInternalCrmSession(cookieStore.get(INTERNAL_CRM_SESSION_COOKIE)?.value);
}

export function isInternalCrmSessionFresh(session: InternalCrmSession): boolean {
  const maxAgeMs = 1000 * 60 * 60 * 24 * 7;
  return Date.now() - session.issuedAt < maxAgeMs;
}

function sign(payload: string): string {
  return createHmac('sha256', getSecret()).update(payload).digest('base64url');
}

function getSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 24) {
    throw new Error('AUTH_SECRET must be set to at least 24 characters for internal CRM sessions.');
  }
  return secret;
}

function safeEqual(a: string, b: string): boolean {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);
  if (aBuffer.byteLength !== bBuffer.byteLength) return false;
  return timingSafeEqual(aBuffer, bBuffer);
}
