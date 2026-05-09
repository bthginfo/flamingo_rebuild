import type { SiteSeed } from '@/template-engine/seeds/model';
import { getIndustry, getSection } from '@/template-engine/registry';

export function validateSiteDocument(document: SiteSeed): string[] {
  const errors: string[] = [];
  const industry = getIndustry(document.industryKey);
  const collectionIds = new Set(document.collections.map((item) => item.id));

  const slugMap = new Map<string, string>();
  for (const page of document.pages) {
    const norm = page.slug.replace(/\s/g, '').toLowerCase() || '/';
    const prev = slugMap.get(norm);
    if (prev && prev !== page.key) {
      errors.push(`Duplicate slug "${page.slug}" on pages ${prev} and ${page.key}.`);
    }
    slugMap.set(norm, page.key);
  }

  for (const page of document.pages) {
    const pageDefinition = industry.corePages.find((entry) => entry.key === page.key);
    const allowedSections = new Set(pageDefinition?.allowedSections ?? []);

    for (const section of page.sections) {
      try {
        getSection(section.sectionKey);
      } catch {
        errors.push(`Unknown section ${section.sectionKey} on page ${page.key}.`);
      }

      if (pageDefinition && !allowedSections.has(section.sectionKey)) {
        errors.push(`Section ${section.sectionKey} is not allowed on page ${page.key}.`);
      }

      if (Array.isArray(section.data?.items)) {
        for (const rawId of section.data.items) {
          if (typeof rawId !== 'string') continue;
          if (!collectionIds.has(rawId)) {
            errors.push(`Section ${section.sectionKey} on page ${page.key} references missing collection item ${rawId}.`);
          }
        }
      }
    }
  }

  return errors;
}
