import { isDatabaseConfigured } from '@/db/client';

export type ProvisioningReadiness = {
  dbConfigured: boolean;
  schemaReady: boolean;
  authSecretReady: boolean;
  blobReady: boolean;
  vercelProvisioningEnabled: boolean;
  vercelReady: boolean;
  requiredVercelKeys: string[];
  missingVercelKeys: string[];
  canCreateTenant: boolean;
  canCreateVercelProject: boolean;
};

function hasEnv(key: string): boolean {
  return Boolean(process.env[key]?.trim());
}

export function getProvisioningReadiness(schemaMissing = false): ProvisioningReadiness {
  const requiredVercelKeys = ['VERCEL_TOKEN', 'VERCEL_TEAM_ID', 'GITHUB_REPO'];
  const missingVercelKeys = requiredVercelKeys.filter((key) => !hasEnv(key));
  const vercelProvisioningEnabled = process.env.FLAMINGO_PROVISION_VERCEL === '1';
  const dbConfigured = isDatabaseConfigured();
  const schemaReady = dbConfigured && !schemaMissing;
  const authSecretReady = hasEnv('AUTH_SECRET');
  const blobReady = hasEnv('BLOB_READ_WRITE_TOKEN');
  const vercelReady = missingVercelKeys.length === 0;

  return {
    dbConfigured,
    schemaReady,
    authSecretReady,
    blobReady,
    vercelProvisioningEnabled,
    vercelReady,
    requiredVercelKeys,
    missingVercelKeys,
    canCreateTenant: dbConfigured && schemaReady && authSecretReady,
    canCreateVercelProject: !vercelProvisioningEnabled || vercelReady
  };
}
