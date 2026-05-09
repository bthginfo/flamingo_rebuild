/**
 * Creates (or reuses) a Vercel project linked to the rebuild GitHub repo and
 * pushes env vars for a **single-tenant** deployment (one customer per project).
 *
 * Requires: VERCEL_TOKEN, VERCEL_TEAM_ID, plaintext POSTGRES_URL (+ optional BLOB_READ_WRITE_TOKEN).
 * Optional: GITHUB_REPO (default bthginfo/flamingo_rebuild).
 */
import { randomBytes } from 'crypto';

export type VercelTenantProvisionInput = {
  slug: string;
  onLog?: (line: string) => void;
};

export type VercelTenantProvisionOk = {
  ok: true;
  vercelProjectId: string;
  vercelProjectName: string;
  projectUrl: string;
  loginUrl: string;
  deploymentUrl: string;
  deploymentState: string;
};

export type VercelTenantProvisionResult = VercelTenantProvisionOk | { ok: false; error: string };

const COPY_ENV_KEYS = [
  'POSTGRES_URL',
  'POSTGRES_URL_NON_POOLING',
  'BLOB_READ_WRITE_TOKEN',
  'FLAMINGO_TENANT_HOST_ROUTING',
  'FLAMINGO_TENANT_HOST_SUFFIX'
] as const;

function vercelClient(token: string, teamId: string) {
  return async function vercel(path: string, init: RequestInit = {}): Promise<unknown> {
    const sep = path.includes('?') ? '&' : '?';
    const url = `https://api.vercel.com${path}${sep}teamId=${encodeURIComponent(teamId)}`;
    const r = await fetch(url, {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...(init.headers || {})
      }
    });
    const text = await r.text();
    const json: unknown = text ? JSON.parse(text) : {};
    if (!r.ok) {
      throw new Error(`Vercel API ${r.status} ${path}: ${JSON.stringify(json)}`);
    }
    return json;
  };
}

function githubRepoId(project: { link?: { repoId?: string | number } }): string | number | null {
  const repoId = project?.link?.repoId;
  return typeof repoId === 'string' || typeof repoId === 'number' ? repoId : null;
}

function isBlob(value: string): boolean {
  return value.startsWith('eyJ') && value.length > 200;
}

export async function provisionVercelProjectForTenantSlug(
  input: VercelTenantProvisionInput
): Promise<VercelTenantProvisionResult> {
  const log = input.onLog ?? (() => {});
  const slug = input.slug.trim().toLowerCase();
  const token = process.env.VERCEL_TOKEN?.trim();
  const teamId = process.env.VERCEL_TEAM_ID?.trim();
  if (!token) return { ok: false, error: 'VERCEL_TOKEN fehlt.' };
  if (!teamId) return { ok: false, error: 'VERCEL_TEAM_ID fehlt.' };

  const repo = process.env.GITHUB_REPO?.trim() || 'bthginfo/flamingo_rebuild';
  const vercel = vercelClient(token, teamId);

  const envMap = new Map<string, string>();
  for (const k of COPY_ENV_KEYS) {
    const v = process.env[k];
    if (!v || !v.trim()) continue;
    if (isBlob(v)) {
      log(`  überspringe ${k} (Vercel-Verschlüsselung — bitte Plaintext in der Plattform-.env.local setzen)`);
      continue;
    }
    envMap.set(k, v.trim());
  }
  if (!envMap.has('POSTGRES_URL')) {
    return { ok: false, error: 'POSTGRES_URL fehlt oder ist nur als Vercel-Blob gesetzt.' };
  }

  const childAuthSecret = randomBytes(32).toString('hex');
  envMap.set('AUTH_SECRET', childAuthSecret);
  envMap.set('FLAMINGO_REBUILD_DB', '1');
  envMap.set('FLAMINGO_SINGLE_TENANT_SLUG', slug);

  const projectName = slug;
  log(`→ Vercel-Projekt '${projectName}' (Repo ${repo})`);

  let project: { id: string; name?: string; link?: { repoId?: string | number } };
  try {
    project = (await vercel(`/v9/projects/${projectName}`)) as typeof project;
    log(`  bestehendes Projekt ${project.id}`);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    if (!msg.includes('not_found') && !msg.includes('404')) {
      return { ok: false, error: msg };
    }
    project = (await vercel('/v11/projects', {
      method: 'POST',
      body: JSON.stringify({
        name: projectName,
        framework: 'nextjs',
        gitRepository: { type: 'github', repo }
      })
    })) as typeof project;
    log(`  Projekt angelegt ${project.id}`);
  }

  const vercelProjectName =
    project && typeof project.name === 'string' && project.name.trim() ? project.name.trim() : projectName;
  if (vercelProjectName !== projectName) {
    log(`  Hinweis: Vercel-Projektname ist „${vercelProjectName}“ (Slug war „${projectName}“).`);
  }

  const projectUrl = `https://${vercelProjectName}.vercel.app`;
  envMap.set('NEXT_PUBLIC_SITE_URL', projectUrl);

  const existingEnv = (await vercel(`/v9/projects/${vercelProjectName}/env`)) as {
    envs: Array<{ id: string; key: string }>;
  };
  const byKey = new Map<string, string>();
  for (const e of existingEnv.envs ?? []) {
    byKey.set(e.key, e.id);
  }

  log(`→ setze ${envMap.size} Umgebungsvariablen`);
  await Promise.all(
    [...envMap.entries()].map(async ([key, value]) => {
      if (byKey.has(key)) {
        await vercel(`/v9/projects/${vercelProjectName}/env/${byKey.get(key)}`, {
          method: 'PATCH',
          body: JSON.stringify({
            value,
            target: ['production', 'preview', 'development'],
            type: 'encrypted'
          })
        });
        return;
      }
      await vercel(`/v10/projects/${vercelProjectName}/env`, {
        method: 'POST',
        body: JSON.stringify({
          key,
          value,
          target: ['production', 'preview', 'development'],
          type: 'encrypted'
        })
      });
    })
  );

  await vercel(`/v9/projects/${vercelProjectName}`, {
    method: 'PATCH',
    body: JSON.stringify({ ssoProtection: null })
  });
  log('  SSO-Schutz deaktiviert');

  const full = (await vercel(`/v9/projects/${vercelProjectName}`)) as typeof project;
  const repoId = githubRepoId(full);
  if (!repoId) {
    return {
      ok: false,
      error: `Projekt ist nicht mit GitHub-Repo „${repo}“ verknüpft (repoId fehlt). In Vercel Dashboard verknüpfen.`
    };
  }

  const deployment = (await vercel('/v13/deployments', {
    method: 'POST',
    body: JSON.stringify({
      name: vercelProjectName,
      target: 'production',
      project: full.id,
      gitSource: { type: 'github', repoId, ref: 'main' }
    })
  })) as { url?: string; readyState?: string; id?: string; uid?: string };

  const deploymentUrl = deployment.url ? `https://${deployment.url}` : '';
  const deploymentState = deployment.readyState ?? 'QUEUED';

  return {
    ok: true,
    vercelProjectId: full.id,
    vercelProjectName,
    projectUrl,
    loginUrl: `${projectUrl}/admin/login`,
    deploymentUrl,
    deploymentState
  };
}
