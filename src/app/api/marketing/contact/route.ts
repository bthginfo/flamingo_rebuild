import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { getMarketingSmtpConfig } from '@/lib/marketing-smtp-config';

export const runtime = 'nodejs';

const MAX_MESSAGE = 8000;
const MAX_NAME = 200;

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const cfg = getMarketingSmtpConfig();
  if (!cfg) {
    return NextResponse.json(
      { ok: false, error: 'Kontakt-Mail ist nicht konfiguriert (SMTP_HOST, SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO).' },
      { status: 503 }
    );
  }

  let body: {
    name?: string;
    email?: string;
    branch?: string;
    paket?: string;
    message?: string;
    /** Honeypot — must stay empty */
    company?: string;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: 'Ungültiger Request.' }, { status: 400 });
  }

  if (typeof body.company === 'string' && body.company.trim().length > 0) {
    return new NextResponse(null, { status: 204 });
  }

  const name = String(body.name ?? '').trim().slice(0, MAX_NAME);
  const email = String(body.email ?? '').trim().toLowerCase();
  const branch = String(body.branch ?? '').trim().slice(0, 200);
  const paket = String(body.paket ?? '').trim().slice(0, 200);
  const message = String(body.message ?? '').trim().slice(0, MAX_MESSAGE);

  if (!name || !email || !isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: 'Bitte gültigen Namen und eine E-Mail angeben.' }, { status: 400 });
  }

  const text = [
    `Neue Anfrage über flamingomedia.online (Showcase / Kontakt)`,
    ``,
    `Name: ${name}`,
    `E-Mail: ${email}`,
    `Branche: ${branch || '—'}`,
    `Paket-Interesse: ${paket || '—'}`,
    ``,
    message || '(keine Nachricht)'
  ].join('\n');

  try {
    const transporter = nodemailer.createTransport({
      host: cfg.host,
      port: cfg.port,
      secure: cfg.port === 465,
      auth: { user: cfg.user, pass: cfg.pass }
    });

    await transporter.sendMail({
      from: cfg.mailFrom,
      to: cfg.mailTo,
      replyTo: email,
      subject: `Website-Anfrage – ${name}`,
      text
    });

    if (cfg.autoReply) {
      await transporter.sendMail({
        from: cfg.mailFrom,
        to: email,
        subject: 'Deine Anfrage bei FlamingoMedia',
        text: [
          `Hallo ${name},`,
          ``,
          `vielen Dank für Deine Nachricht — wir haben sie erhalten und melden uns werktags in der Regel innerhalb von 24 Stunden.`,
          ``,
          `Herzliche Grüße`,
          `FlamingoMedia`
        ].join('\n')
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: msg }, { status: 502 });
  }
}
