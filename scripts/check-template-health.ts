import { INDUSTRY_KEYS, STYLE_KEYS } from '../src/template-engine/model';
import { getDemoSeed } from '../src/template-engine/seeds';
import { validateSiteDocument } from '../src/platform/publishing/validate-site-document';

type Issue = { scope: string; message: string };

const issues: Issue[] = [];
const premiumSections = new Set([
  'global.statsBand',
  'global.trustLogos',
  'global.bentoHighlights',
  'global.scrollerHighlights',
  'global.iconHighlights',
  'global.storyTimeline',
  'global.mediaSpotlight',
  'global.quoteMarquee',
  'global.asymmetricSpot',
  'global.pricingTiers',
  'global.ribbonCta',
  'global.keyFactsGrid',
  'global.videoEmbed',
  'global.pullQuote',
  'global.stepsStrip',
  'global.featureCompare'
]);

const deepDiveSectionByIndustry: Record<string, string> = {
  restaurant: 'restaurant.deepDives',
  hotel: 'hotel.deepDives',
  tourism: 'tourism.deepDives',
  salon: 'salon.deepDives',
  tradesman: 'tradesman.deepDives',
  consulting: 'consulting.deepDives',
  medical: 'medical.deepDives',
  fitness: 'fitness.deepDives',
  wedding: 'wedding.deepDives'
};

for (const industry of INDUSTRY_KEYS) {
  for (const style of STYLE_KEYS) {
    const seed = getDemoSeed(industry, style);
    const scope = `${industry}/${style}`;
    if (!seed) {
      issues.push({ scope, message: 'No demo seed returned.' });
      continue;
    }

    for (const issue of validateSiteDocument(seed)) {
      issues.push({ scope, message: issue });
    }

    for (const page of seed.pages) {
      const pageScope = `${scope}/${page.key}`;
      const visible = page.sections.filter((section) => section.visible);
      const premiumCount = visible.filter((section) => premiumSections.has(section.sectionKey)).length;

      if (visible.length < 3) {
        issues.push({ scope: pageScope, message: 'Page has fewer than three visible sections.' });
      }
      if (page.key !== 'home' && visible.length < 4) {
        issues.push({ scope: pageScope, message: 'Subpage has fewer than four visible sections.' });
      }
      if (page.key !== 'home' && !visible.some((section) => section.sectionKey === deepDiveSectionByIndustry[industry])) {
        issues.push({ scope: pageScope, message: 'Subpage is missing its industry deep-dive CMS section.' });
      }
      if (page.key === 'home' && premiumCount < 2) {
        issues.push({ scope: pageScope, message: 'Home page has fewer than two premium interaction sections.' });
      }

      for (const section of visible) {
        if ((section.sectionKey === 'global.hero' || section.sectionKey === 'global.pageHeader') && hasEmptyHeadline(section.data)) {
          issues.push({ scope: `${pageScope}/${section.sectionKey}`, message: 'Hero/page header headline is empty.' });
        }
        if (section.sectionKey === 'global.faq') {
          checkFaq(`${pageScope}/${section.sectionKey}`, section.data);
        }
        checkLongTokens(`${pageScope}/${section.sectionKey}`, section.data);
      }
    }

    const byCollection = new Map<string, number>();
    for (const item of seed.collections) {
      byCollection.set(item.collectionKey, (byCollection.get(item.collectionKey) ?? 0) + 1);
    }
    for (const [collectionKey, count] of byCollection) {
      if (count < 6) {
        issues.push({ scope: `${scope}/${collectionKey}`, message: 'Collection has fewer than six demo items.' });
      }
    }
  }
}

if (issues.length > 0) {
  console.error(`Template health check failed with ${issues.length} issue(s):`);
  for (const issue of issues) {
    console.error(`- ${issue.scope}: ${issue.message}`);
  }
  process.exit(1);
}

console.log('Template health check passed.');

function hasEmptyHeadline(data: Record<string, unknown>): boolean {
  const headline = data.headline;
  if (typeof headline === 'string') return headline.trim().length === 0;
  if (!isRecord(headline)) return true;
  return !clean(headline.plain) && !clean(headline.accent);
}

function checkFaq(scope: string, data: Record<string, unknown>) {
  const items = Array.isArray(data.items) ? data.items : [];
  if (items.length === 0) {
    issues.push({ scope, message: 'FAQ section has no items.' });
    return;
  }
  items.forEach((raw, index) => {
    if (!isRecord(raw) || !clean(raw.question) || !clean(raw.answer)) {
      issues.push({ scope: `${scope}[${index}]`, message: 'FAQ item needs question and answer.' });
    }
  });
}

function checkLongTokens(scope: string, value: unknown, path = '') {
  if (typeof value === 'string') {
    if (!looksLikeAssetOrUrl(path, value)) {
      const longest = value.split(/\s+/).reduce((max, token) => Math.max(max, token.length), 0);
      if (longest > 72) {
        issues.push({ scope, message: `Very long unbroken text token at ${path || 'value'} can cause overflow.` });
      }
    }
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => checkLongTokens(scope, item, `${path}[${index}]`));
    return;
  }

  if (isRecord(value)) {
    for (const [key, child] of Object.entries(value)) {
      checkLongTokens(scope, child, path ? `${path}.${key}` : key);
    }
  }
}

function looksLikeAssetOrUrl(path: string, value: string): boolean {
  return /(^https?:|^\/|data:)/.test(value) || /(image|url|href|maps|embed|src)$/i.test(path);
}

function clean(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
