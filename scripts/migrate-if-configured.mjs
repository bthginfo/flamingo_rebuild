#!/usr/bin/env node
/**
 * Runs Drizzle migrations before `next build` when the rebuild DB env is present
 * (e.g. Vercel Production). Skips cleanly in CI / local builds without POSTGRES_URL.
 */
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(root);

const dbReady = process.env.FLAMINGO_REBUILD_DB === '1' && Boolean(process.env.POSTGRES_URL);
if (!dbReady) {
  console.log('[migrate-if-configured] Skipping drizzle-kit migrate (need FLAMINGO_REBUILD_DB=1 and POSTGRES_URL).');
  process.exit(0);
}

console.log('[migrate-if-configured] Running drizzle-kit migrate...');
const result = spawnSync('npm run db:migrate', {
  cwd: root,
  env: process.env,
  stdio: 'inherit',
  shell: true
});

if (result.error) {
  console.error('[migrate-if-configured]', result.error);
  process.exit(1);
}
process.exit(result.status === null ? 1 : result.status);
