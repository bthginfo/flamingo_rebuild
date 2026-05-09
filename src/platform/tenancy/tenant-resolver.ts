export type ResolvedTenant =
  | { mode: 'marketing' }
  | { mode: 'tenant'; slug: string; host: string };

const marketingHosts = new Set(['localhost:3000', 'flamingomedia.online', 'www.flamingomedia.online']);

export function resolveTenantFromHost(host: string): ResolvedTenant {
  const normalized = host.toLowerCase();
  if (marketingHosts.has(normalized)) return { mode: 'marketing' };

  if (normalized.endsWith('.flamingomedia.online')) {
    return {
      mode: 'tenant',
      slug: normalized.replace('.flamingomedia.online', ''),
      host: normalized
    };
  }

  return {
    mode: 'tenant',
    slug: normalized,
    host: normalized
  };
}
