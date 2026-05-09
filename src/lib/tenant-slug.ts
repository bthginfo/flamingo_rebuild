const SLUG_RE = /^[a-z0-9](?:[a-z0-9-]{0,48}[a-z0-9])?$/;

export function slugifyTenantSlug(input: string): string {
  const raw = input
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');

  if (!raw) return '';
  if (raw.length === 1) return raw.padEnd(2, 'x');
  if (raw.length > 50) return raw.slice(0, 50).replace(/-+$/g, '');
  return raw;
}

export function isValidTenantSlug(slug: string): boolean {
  return SLUG_RE.test(slug) && slug.length >= 2 && slug.length <= 50;
}
