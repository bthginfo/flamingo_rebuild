import { INDUSTRY_KEYS, STYLE_KEYS, type FieldDefinition } from './model';
import { industries } from './industries';
import { sections } from './sections';
import { styles } from './styles';
import { getDemoSeed } from './seeds';

export type RegistryValidationIssue = {
  code: string;
  message: string;
};

function collectFieldKeys(fields: readonly FieldDefinition[], prefix = ''): string[] {
  return fields.flatMap((field) => {
    const path = prefix ? `${prefix}.${field.key}` : field.key;
    const nested = field.fields ? collectFieldKeys(field.fields, path) : [];
    const repeated = field.itemFields ? collectFieldKeys(field.itemFields, `${path}[]`) : [];
    return [path, ...nested, ...repeated];
  });
}

export function validateTemplateRegistry(): RegistryValidationIssue[] {
  const issues: RegistryValidationIssue[] = [];
  const sectionKeys = new Set(sections.map((section) => section.key));
  const styleKeys = new Set(styles.map((style) => style.key));
  const industryKeys = new Set(industries.map((industry) => industry.key));

  for (const key of INDUSTRY_KEYS) {
    if (!industryKeys.has(key)) {
      issues.push({ code: 'missing-industry', message: `Industry ${key} is not registered.` });
    }
  }

  for (const key of STYLE_KEYS) {
    if (!styleKeys.has(key)) {
      issues.push({ code: 'missing-style', message: `Style ${key} is not registered.` });
    }
  }

  for (const section of sections) {
    const fieldKeys = collectFieldKeys(section.fields);
    if (fieldKeys.length !== new Set(fieldKeys).size) {
      issues.push({ code: 'duplicate-section-field', message: `Section ${section.key} contains duplicate field paths.` });
    }
  }

  for (const industry of industries) {
    if (industry.corePages.length === 0) {
      issues.push({ code: 'missing-core-pages', message: `Industry ${industry.key} has no core pages.` });
    }

    for (const page of industry.corePages) {
      for (const sectionKey of [...page.allowedSections, ...page.defaultSections]) {
        if (!sectionKeys.has(sectionKey)) {
          issues.push({
            code: 'unknown-page-section',
            message: `Page ${industry.key}.${page.key} references unknown section ${sectionKey}.`
          });
        }
      }

      for (const sectionKey of page.defaultSections) {
        if (!page.allowedSections.includes(sectionKey)) {
          issues.push({
            code: 'default-section-not-allowed',
            message: `Page ${industry.key}.${page.key} defaults to ${sectionKey}, but does not allow it.`
          });
        }
      }
    }

    for (const collection of industry.collections) {
      if (collection.industry !== industry.key) {
        issues.push({
          code: 'collection-industry-mismatch',
          message: `Collection ${collection.key} is registered under ${industry.key} but declares ${collection.industry}.`
        });
      }

      for (const sectionKey of collection.detailPage.defaultSections) {
        if (!collection.detailPage.allowedSections.includes(sectionKey)) {
          issues.push({
            code: 'detail-default-section-not-allowed',
            message: `Collection ${collection.key} detail page defaults to ${sectionKey}, but does not allow it.`
          });
        }
      }
    }
  }

  for (const industryKey of INDUSTRY_KEYS) {
    for (const style of STYLE_KEYS) {
      const seed = getDemoSeed(industryKey, style);
      if (!seed) {
        issues.push({
          code: 'missing-industry-seed',
          message: `Demo seed for industry ${industryKey} and style ${style} is missing.`
        });
        continue;
      }

      const collectionIds = new Set(seed.collections.map((item) => item.id));
      for (const page of seed.pages) {
        for (const section of page.sections) {
          if (!sectionKeys.has(section.sectionKey)) {
            issues.push({
              code: 'seed-unknown-section',
              message: `Seed ${industryKey} page ${page.key} references unknown section ${section.sectionKey}.`
            });
          }

          if (Array.isArray(section.data?.items)) {
            for (const rawId of section.data.items) {
              if (typeof rawId !== 'string') continue;
              if (!collectionIds.has(rawId)) {
                issues.push({
                  code: 'seed-missing-collection-item',
                  message: `Seed ${industryKey} section ${section.id} references missing collection item ${rawId}.`
                });
              }
            }
          }
        }
      }
    }
  }

  return issues;
}
