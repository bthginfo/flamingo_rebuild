/**
 * Single-tenant deployments: one Vercel project per customer with
 * `FLAMINGO_SINGLE_TENANT_SLUG` set. The same codebase + DB can still host
 * many tenants on the platform deployment without this variable.
 */
export function getSingleTenantSlug(): string | null {
  const raw = process.env.FLAMINGO_SINGLE_TENANT_SLUG?.trim().toLowerCase() ?? '';
  if (raw.length < 2) return null;
  return raw;
}

export function isSingleTenantDeployment(): boolean {
  return getSingleTenantSlug() !== null;
}
