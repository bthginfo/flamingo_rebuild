/**
 * Absolute origin for metadata (Open Graph, canonical URLs).
 * Set `NEXT_PUBLIC_SITE_URL` in production (e.g. https://flamingomedia.online).
 */
export function getSiteOrigin(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    return explicit.startsWith('http') ? explicit : `https://${explicit}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/^https?:\/\//, '')}`;
  }
  return 'http://localhost:3000';
}

export function getSiteUrl(): URL {
  try {
    return new URL(getSiteOrigin());
  } catch {
    return new URL('http://localhost:3000');
  }
}
