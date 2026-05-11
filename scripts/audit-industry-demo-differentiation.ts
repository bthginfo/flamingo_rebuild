import { INDUSTRY_KEYS, STYLE_KEYS } from '../src/template-engine/model';
import { getDemoSeed } from '../src/template-engine/seeds';

type Headline = { plain?: unknown; accent?: unknown };

function splitHeadline(value: unknown): { plain: string; accent: string } {
  if (!value || typeof value !== 'object') return { plain: '', accent: '' };
  const h = value as Headline;
  return { plain: String(h.plain ?? ''), accent: String(h.accent ?? '') };
}

function homeHeroSignature(seed: NonNullable<ReturnType<typeof getDemoSeed>>): string {
  const home = seed.pages.find((p) => p.key === 'home');
  const hero = home?.sections.find((s) => s.sectionKey === 'global.hero');
  const { plain, accent } = splitHeadline(hero?.data.headline);
  return `${plain}||${accent}`;
}

function homeIndustrySectionCount(seed: NonNullable<ReturnType<typeof getDemoSeed>>, industryKey: string): number {
  const home = seed.pages.find((p) => p.key === 'home');
  const keys = home?.sections.map((s) => s.sectionKey) ?? [];
  return keys.filter((k) => k.startsWith(`${industryKey}.`)).length;
}

const issues: string[] = [];

for (const styleKey of STYLE_KEYS) {
  const sigToIndustries = new Map<string, string[]>();
  for (const industryKey of INDUSTRY_KEYS) {
    const seed = getDemoSeed(industryKey, styleKey);
    if (!seed) {
      issues.push(`Missing seed: ${industryKey}.${styleKey}`);
      continue;
    }
    const sig = homeHeroSignature(seed);
    if (!sig || sig === '||') {
      issues.push(`Empty home hero headline: ${industryKey}.${styleKey}`);
    }
    const list = sigToIndustries.get(sig) ?? [];
    list.push(industryKey);
    sigToIndustries.set(sig, list);
  }
  for (const [sig, list] of sigToIndustries) {
    if (list.length > 1) {
      issues.push(`Duplicate home hero signature for style "${styleKey}" (${list.join(', ')}): "${sig}"`);
    }
  }
}

for (const industryKey of INDUSTRY_KEYS) {
  const seed = getDemoSeed(industryKey, 'classic');
  if (!seed) continue;
  const n = homeIndustrySectionCount(seed, industryKey);
  if (n < 1) {
    issues.push(`Home has no ${industryKey}.* sections (expected ≥1 industry module on home): ${industryKey}`);
  }
}

if (issues.length > 0) {
  console.error(`Industry demo differentiation audit failed (${issues.length} issue(s)):`);
  for (const m of issues) console.error(`- ${m}`);
  process.exit(1);
}

console.log('Industry demo differentiation audit passed.');
