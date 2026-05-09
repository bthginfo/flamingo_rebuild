import { NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE } from '@/platform/auth/admin-session';

export const runtime = 'nodejs';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_SESSION_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 });
  return res;
}
