/**
 * FlamingoMedia showcase / marketing contact mail — server-side only.
 * Env names match production Vercel (SMTP_*, MAIL_*).
 */
export type MarketingSmtpConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  mailFrom: string;
  mailTo: string;
  autoReply: boolean;
};

function truthyEnv(raw: string | undefined): boolean {
  const v = (raw ?? '').trim().toLowerCase();
  return v === '1' || v === 'true' || v === 'yes' || v === 'on';
}

export function getMarketingSmtpConfig(): MarketingSmtpConfig | null {
  const host = process.env.SMTP_HOST?.trim() ?? '';
  const user = process.env.SMTP_USER?.trim() ?? '';
  const pass = process.env.SMTP_PASS?.trim() ?? '';
  const mailFrom = process.env.MAIL_FROM?.trim() ?? '';
  const mailTo = process.env.MAIL_TO?.trim() ?? '';
  if (!host || !user || !pass || !mailFrom || !mailTo) {
    return null;
  }
  const portRaw = process.env.SMTP_PORT?.trim() ?? '587';
  const port = Number.parseInt(portRaw, 10);
  if (!Number.isFinite(port) || port < 1 || port > 65535) {
    return null;
  }
  return {
    host,
    port,
    user,
    pass,
    mailFrom,
    mailTo,
    autoReply: truthyEnv(process.env.MAIL_AUTOREPLY)
  };
}
