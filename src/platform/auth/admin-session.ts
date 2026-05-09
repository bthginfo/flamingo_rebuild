import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

export const ADMIN_SESSION_COOKIE = 'flamingo_rebuild_admin';

export type AdminSession = {
  tenantSlug: string;
  role: 'owner' | 'editor';
  issuedAt: number;
};

export function signAdminSession(session: AdminSession): string {
  const payload = Buffer.from(JSON.stringify(session), 'utf8').toString('base64url');
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export function verifyAdminSession(token: string | undefined): AdminSession | undefined {
  if (!token) return undefined;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return undefined;
  const expected = sign(payload);
  if (!safeEqual(signature, expected)) return undefined;

  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as Partial<AdminSession>;
    if (typeof parsed.tenantSlug !== 'string' || parsed.tenantSlug.length === 0) return undefined;
    if (parsed.role !== 'owner' && parsed.role !== 'editor') return undefined;
    if (typeof parsed.issuedAt !== 'number') return undefined;
    return {
      tenantSlug: parsed.tenantSlug,
      role: parsed.role,
      issuedAt: parsed.issuedAt
    };
  } catch {
    return undefined;
  }
}

export async function readAdminSession(): Promise<AdminSession | undefined> {
  const cookieStore = await cookies();
  return verifyAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}

export function isSessionFresh(session: AdminSession): boolean {
  const maxAgeMs = 1000 * 60 * 60 * 24 * 7;
  return Date.now() - session.issuedAt < maxAgeMs;
}

function sign(payload: string): string {
  return createHmac('sha256', getSecret()).update(payload).digest('base64url');
}

function getSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 24) {
    throw new Error('AUTH_SECRET must be set to at least 24 characters for admin sessions.');
  }
  return secret;
}

function safeEqual(a: string, b: string): boolean {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);
  if (aBuffer.byteLength !== bBuffer.byteLength) return false;
  return timingSafeEqual(aBuffer, bBuffer);
}
