import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { isDatabaseConfigured } from '@/db/client';
import { getTenantAuthRecord } from '@/db/auth-repository';
import { ADMIN_SESSION_COOKIE, signAdminSession } from '@/platform/auth/admin-session';

export async function POST(request: NextRequest) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: 'Rebuild database is not configured.' }, { status: 503 });
  }

  const body = await request.json() as { tenant?: string; password?: string };
  const tenantSlug = body.tenant?.trim().toLowerCase();
  if (!tenantSlug || !body.password) {
    return NextResponse.json({ error: 'Tenant and password are required.' }, { status: 400 });
  }

  const tenant = await getTenantAuthRecord(tenantSlug);
  if (!tenant || tenant.status !== 'active' || !tenant.passwordHash) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
  }

  const valid = await bcrypt.compare(body.password, tenant.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, tenantSlug });
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: signAdminSession({ tenantSlug, role: 'owner', issuedAt: Date.now() }),
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });
  return response;
}
