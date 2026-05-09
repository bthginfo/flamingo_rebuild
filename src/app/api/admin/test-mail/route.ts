import nodemailer from 'nodemailer';
import { NextResponse, type NextRequest } from 'next/server';
import { isDatabaseConfigured } from '@/db/client';
import { loadPublishedSmtpSecretsByTenantSlug } from '@/db/site-document-repository';
import { isSessionFresh, readAdminSession } from '@/platform/auth/admin-session';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ ok: false, error: 'Datenbank nicht konfiguriert.' }, { status: 503 });
  }
  const session = await readAdminSession();
  if (!session || !isSessionFresh(session)) {
    return NextResponse.json({ ok: false, error: 'Authentifizierung erforderlich.' }, { status: 401 });
  }

  const tenant = request.nextUrl.searchParams.get('slug')?.trim().toLowerCase() ?? session.tenantSlug;
  if (tenant !== session.tenantSlug) {
    return NextResponse.json({ ok: false, error: 'Forbidden.' }, { status: 403 });
  }

  const mail = await loadPublishedSmtpSecretsByTenantSlug(tenant);
  if (!mail?.enabled || !mail.host || !mail.user || !mail.pass) {
    return NextResponse.json(
      { ok: false, error: 'Eigenes SMTP ist nicht vollständig konfiguriert (Host, Benutzer, Passwort).' },
      { status: 400 }
    );
  }

  const port = typeof mail.port === 'number' && mail.port > 0 ? mail.port : 587;
  const from = typeof mail.from === 'string' && mail.from.length > 0 ? mail.from : mail.user;
  const to = typeof mail.to === 'string' && mail.to.length > 0 ? mail.to : mail.user;

  try {
    const transporter = nodemailer.createTransport({
      host: mail.host,
      port,
      secure: port === 465,
      auth: { user: mail.user, pass: mail.pass }
    });

    await transporter.sendMail({
      from,
      to,
      subject: 'Flamingo · SMTP-Test',
      text: `Dies ist eine Testnachricht für den Tenant „${tenant}“. Wenn Sie diese lesen, funktioniert der SMTP-Versand.`
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}
