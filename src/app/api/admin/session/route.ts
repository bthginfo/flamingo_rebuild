import { NextResponse } from 'next/server';
import { isSessionFresh, readAdminSession } from '@/platform/auth/admin-session';

export const runtime = 'nodejs';

export async function GET() {
  const session = await readAdminSession();
  if (!session || !isSessionFresh(session)) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({
    authenticated: true,
    tenantSlug: session.tenantSlug,
    role: session.role
  });
}
