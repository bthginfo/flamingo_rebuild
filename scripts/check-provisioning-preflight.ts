import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { INDUSTRY_KEYS, STYLE_KEYS } from '../src/template-engine/model';
import { getDemoSeed } from '../src/template-engine/seeds';
import { validateSiteDocument } from '../src/platform/publishing/validate-site-document';

type Finding = { level: 'ok' | 'warn' | 'fail'; message: string };

const strict = process.argv.includes('--strict');
const findings: Finding[] = [];

loadDotEnvLocal();

function loadDotEnvLocal() {
  const path = resolve(process.cwd(), '.env.local');
  if (!existsSync(path)) {
    findings.push({ level: 'warn', message: '.env.local nicht gefunden; pruefe nur Prozess-Env und statische Seeds.' });
    return;
  }
  const raw = readFileSync(path, 'utf8');
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx <= 0) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
    if (!process.env[key]) process.env[key] = value;
  }
  findings.push({ level: 'ok', message: '.env.local geladen.' });
}

function requireEnv(key: string) {
  if (process.env[key]?.trim()) {
    findings.push({ level: 'ok', message: `${key} ist gesetzt.` });
  } else {
    findings.push({ level: strict ? 'fail' : 'warn', message: `${key} fehlt.` });
  }
}

requireEnv('AUTH_SECRET');
requireEnv('POSTGRES_URL');

if (process.env.FLAMINGO_REBUILD_DB === '1') {
  findings.push({ level: 'ok', message: 'FLAMINGO_REBUILD_DB=1.' });
} else {
  findings.push({ level: strict ? 'fail' : 'warn', message: 'FLAMINGO_REBUILD_DB ist nicht 1; DB-Provisioning waere deaktiviert.' });
}

if (process.env.FLAMINGO_PROVISION_VERCEL === '1') {
  requireEnv('VERCEL_TOKEN');
  requireEnv('VERCEL_TEAM_ID');
  requireEnv('GITHUB_REPO');
} else {
  findings.push({ level: 'warn', message: 'FLAMINGO_PROVISION_VERCEL ist nicht 1; Tenant wird lokal publiziert, aber kein Vercel-Projekt angelegt.' });
}

let invalidSeedCount = 0;

for (const industry of INDUSTRY_KEYS) {
  for (const style of STYLE_KEYS) {
    const seed = getDemoSeed(industry, style);
    if (!seed) {
      invalidSeedCount += 1;
      findings.push({ level: 'fail', message: `Seed fehlt fuer ${industry}/${style}.` });
      continue;
    }
    const issues = validateSiteDocument(seed);
    if (issues.length > 0) {
      invalidSeedCount += 1;
      findings.push({ level: 'fail', message: `Seed ${industry}/${style} ungueltig: ${issues.join(' | ')}` });
    }
  }
}

if (invalidSeedCount === 0) {
  findings.push({ level: 'ok', message: 'Alle Demo-Seeds bestehen die Publishing-Validierung.' });
}

const failCount = findings.filter((finding) => finding.level === 'fail').length;
const warnCount = findings.filter((finding) => finding.level === 'warn').length;

for (const finding of findings) {
  const prefix = finding.level === 'ok' ? 'OK' : finding.level === 'warn' ? 'WARN' : 'FAIL';
  console.log(`[${prefix}] ${finding.message}`);
}

console.log(`Provisioning preflight finished: ${failCount} fail(s), ${warnCount} warning(s).`);

if (failCount > 0) process.exit(1);
