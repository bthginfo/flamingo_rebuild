import { INDUSTRY_KEYS, STYLE_KEYS, type FieldDefinition } from '../src/template-engine/model';
import { industries } from '../src/template-engine/industries';
import { sections } from '../src/template-engine/sections';
import { getDemoSeed } from '../src/template-engine/seeds';

type Issue = { scope: string; message: string };

const issues: Issue[] = [];
const sectionDefs = new Map(sections.map((section) => [section.key, section]));
const industryDefs = new Map(industries.map((industry) => [industry.key, industry]));

const rendererSectionFields: Record<string, readonly string[]> = {
  'global.hero': ['eyebrow', 'headline', 'subline', 'body', 'image', 'primaryCta', 'secondaryCta'],
  'global.pageHeader': ['eyebrow', 'headline', 'subline', 'image'],
  'global.textImage': ['eyebrow', 'headline', 'body', 'image', 'cta'],
  'global.mapContact': ['eyebrow', 'headline', 'subline', 'address', 'phone', 'email', 'openingHours', 'mapsUrl', 'locations', 'arrival'],
  'global.galleryGrid': ['eyebrow', 'headline', 'images'],
  'global.actionBar': ['statusOverride', 'primaryCta', 'secondaryCta'],
  'global.testimonials': ['eyebrow', 'headline', 'items'],
  'global.faq': ['eyebrow', 'headline', 'items'],
  'global.contactCta': ['eyebrow', 'headline', 'subline', 'cta'],
  'global.statsBand': ['eyebrow', 'headline', 'items'],
  'global.trustLogos': ['eyebrow', 'headline', 'items'],
  'global.bentoHighlights': ['eyebrow', 'headline', 'items'],
  'global.scrollerHighlights': ['eyebrow', 'headline', 'intro', 'slides'],
  'global.iconHighlights': ['eyebrow', 'headline', 'intro', 'items'],
  'global.storyTimeline': ['eyebrow', 'headline', 'steps'],
  'global.mediaSpotlight': ['eyebrow', 'headline', 'subline', 'image', 'mood', 'primaryCta', 'secondaryCta'],
  'global.quoteMarquee': ['eyebrow', 'headline', 'items'],
  'global.asymmetricSpot': ['eyebrow', 'headline', 'body', 'image', 'imageSide'],
  'global.pricingTiers': ['eyebrow', 'headline', 'intro', 'tiers'],
  'global.ribbonCta': ['message', 'cta'],
  'global.keyFactsGrid': ['eyebrow', 'headline', 'items'],
  'global.videoEmbed': ['eyebrow', 'headline', 'embedUrl', 'caption'],
  'global.pullQuote': ['quote', 'attribution', 'role'],
  'global.stepsStrip': ['eyebrow', 'headline', 'steps'],
  'global.featureCompare': ['eyebrow', 'headline', 'columnUs', 'columnThem', 'rows'],
  'wedding.rsvp': ['eyebrow', 'headline', 'intro', 'deadlineLabel', 'cta']
};

const collectionSectionFields = ['eyebrow', 'headline', 'intro', 'items'] as const;
for (const section of sections) {
  if (!rendererSectionFields[section.key] && section.key.includes('.')) {
    const hasCollectionList = section.fields.some((field) => field.type === 'collectionReferenceList');
    if (hasCollectionList) rendererSectionFields[section.key] = collectionSectionFields;
  }
}

const collectionRendererFields = new Set(['title', 'slug', 'summary', 'image', 'price', 'time', 'weekday', 'level', 'trainer']);

function fieldPathSet(fields: readonly FieldDefinition[], prefix = ''): Set<string> {
  const out = new Set<string>();
  for (const field of fields) {
    const path = prefix ? `${prefix}.${field.key}` : field.key;
    out.add(path);
    if (field.fields) {
      for (const child of fieldPathSet(field.fields, path)) out.add(child);
    }
    if (field.itemFields) {
      for (const child of fieldPathSet(field.itemFields, `${path}[]`)) out.add(child);
    }
  }
  return out;
}

function dataPathSet(value: unknown, prefix = ''): Set<string> {
  const out = new Set<string>();
  if (!value || typeof value !== 'object') return out;
  const entries = Array.isArray(value)
    ? value.flatMap((item) => (item && typeof item === 'object' && !Array.isArray(item) ? Object.entries(item) : []))
    : Object.entries(value);

  for (const [key, child] of entries) {
    const path = prefix ? `${prefix}.${key}` : key;
    out.add(path);
    if (Array.isArray(child)) {
      for (const item of child) {
        if (item && typeof item === 'object' && !Array.isArray(item)) {
          for (const nested of dataPathSet(item, `${path}[]`)) out.add(nested);
        }
      }
    } else if (child && typeof child === 'object') {
      for (const nested of dataPathSet(child, path)) out.add(nested);
    }
  }
  return out;
}

function hasEditablePath(path: string, fields: Set<string>): boolean {
  if (fields.has(path)) return true;
  const parent = path.split('.').slice(0, -1).join('.');
  if (parent && fields.has(parent)) return true;
  const arrayParent = parent.replace(/\[\]$/g, '');
  if (arrayParent && fields.has(arrayParent)) return true;
  return false;
}

for (const [sectionKey, renderedFields] of Object.entries(rendererSectionFields)) {
  const def = sectionDefs.get(sectionKey);
  if (!def) {
    issues.push({ scope: sectionKey, message: 'Renderer handles section but no SectionDefinition exists.' });
    continue;
  }
  const editable = fieldPathSet(def.fields);
  for (const fieldKey of renderedFields) {
    if (!editable.has(fieldKey)) {
      issues.push({ scope: sectionKey, message: `Renderer uses section.data.${fieldKey}, but CMS has no matching field.` });
    }
  }
}

for (const industryKey of INDUSTRY_KEYS) {
  const industry = industryDefs.get(industryKey);
  if (!industry) continue;
  for (const collection of industry.collections) {
    const editable = fieldPathSet(collection.fields);
    for (const key of collectionRendererFields) {
      if (!editable.has(key) && ['price', 'time', 'weekday', 'level', 'trainer'].includes(key)) continue;
      if (!editable.has(key)) {
        issues.push({ scope: `${industryKey}.${collection.key}`, message: `Collection renderer expects ${key}, but collection editor has no field.` });
      }
    }
  }

  for (const styleKey of STYLE_KEYS) {
    const seed = getDemoSeed(industryKey, styleKey);
    if (!seed) {
      issues.push({ scope: `${industryKey}.${styleKey}`, message: 'No demo seed returned.' });
      continue;
    }
    for (const page of seed.pages) {
      for (const section of page.sections) {
        const def = sectionDefs.get(section.sectionKey);
        if (!def) continue;
        const editable = fieldPathSet(def.fields);
        for (const path of dataPathSet(section.data)) {
          if (!hasEditablePath(path, editable)) {
            issues.push({
              scope: `${industryKey}.${styleKey}.${page.key}.${section.sectionKey}`,
              message: `Seed data path "${path}" is not editable in CMS field definitions.`
            });
          }
        }
      }
    }
  }
}

if (issues.length > 0) {
  console.error(`CMS surface audit failed with ${issues.length} issue(s):`);
  for (const issue of issues) {
    console.error(`- ${issue.scope}: ${issue.message}`);
  }
  process.exit(1);
}

console.log('CMS surface audit passed.');
