import bcrypt from 'bcryptjs';
import { NextResponse, type NextRequest } from 'next/server';
import { getTenantAuthRecord } from '@/db/auth-repository';
import { getSingleTenantSlug } from '@/lib/deployment-mode';
import { ADMIN_SESSION_COOKIE, signAdminSession } from '@/platform/auth/admin-session';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  let body: { tenant?: string; password?: string };
  try {
    body = (await request.json()) as { tenant?: string; password?: string };
  } catch {
    return NextResponse.json({ error: 'Ungültiger Request-Body.' }, { status: 400 });
  }

  const tenant = String(body.tenant ?? '')
    .trim()
    .toLowerCase();
  const password = String(body.password ?? '');
  if (!tenant || !password) {
    return NextResponse.json({ error: 'Tenant und Passwort sind erforderlich.' }, { status: 400 });
  }

  const fixedSlug = getSingleTenantSlug();
  if (fixedSlug && tenant !== fixedSlug) {
    return NextResponse.json(
      { error: 'Auf dieser Installation ist nur ein Tenant vorgesehen (falscher Slug).' },
      { status: 403 }
    );
  }

  const record = await getTenantAuthRecord(tenant);
  if (!record || record.status !== 'active' || !record.passwordHash) {
    return NextResponse.json({ error: 'Zugangsdaten ungültig.' }, { status: 401 });
  }

  const ok = await bcrypt.compare(password, record.passwordHash);
  if (!ok) {
    return NextResponse.json({ error: 'Zugangsdaten ungültig.' }, { status: 401 });
  }

  const token = signAdminSession({ tenantSlug: tenant, role: 'owner', issuedAt: Date.now() });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });
  return res;
}
