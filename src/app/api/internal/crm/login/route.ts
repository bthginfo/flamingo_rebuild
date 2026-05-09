import bcrypt from 'bcryptjs';
import { NextResponse, type NextRequest } from 'next/server';
import {
  INTERNAL_CRM_SESSION_COOKIE,
  signInternalCrmSession
} from '@/platform/auth/internal-crm-session';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const hash = process.env.FLAMINGO_INTERNAL_CRM_PASSWORD_HASH?.trim();
  if (!hash || hash.length < 20) {
    return NextResponse.json(
      { error: 'Internes CRM ist nicht konfiguriert (FLAMINGO_INTERNAL_CRM_PASSWORD_HASH fehlt).' },
      { status: 503 }
    );
  }

  let body: { password?: string };
  try {
    body = (await request.json()) as { password?: string };
  } catch {
    return NextResponse.json({ error: 'Ungültiger Request-Body.' }, { status: 400 });
  }

  const password = String(body.password ?? '');
  if (password.length < 8) {
    return NextResponse.json({ error: 'Passwort muss mindestens 8 Zeichen haben.' }, { status: 400 });
  }

  const ok = await bcrypt.compare(password, hash);
  if (!ok) {
    return NextResponse.json({ error: 'Zugangsdaten ungültig.' }, { status: 401 });
  }

  const token = signInternalCrmSession({ role: 'operator', issuedAt: Date.now() });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(INTERNAL_CRM_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });
  return res;
}
