import { NextResponse } from 'next/server';
import { INTERNAL_CRM_SESSION_COOKIE } from '@/platform/auth/internal-crm-session';

export const runtime = 'nodejs';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(INTERNAL_CRM_SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0
  });
  return res;
}
