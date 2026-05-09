import type { SiteSeed } from '@/template-engine/seeds/model';
import { getIndustry, getSection } from '@/template-engine/registry';

export function validateSiteDocument(document: SiteSeed): string[] {
  const errors: string[] = [];
  const industry = getIndustry(document.industryKey);
  const collectionIds = new Set(document.collections.map((item) => item.id));

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

      if (Array.isArray(section.data.items) && !isInlineRepeaterSection(section.sectionKey)) {
        for (const rawId of section.data.items) {
          const id = String(rawId);
          if (!collectionIds.has(id)) {
            errors.push(`Section ${section.sectionKey} on page ${page.key} references missing collection item ${id}.`);
          }
        }
      }
    }
  }

  return errors;
}

function isInlineRepeaterSection(sectionKey: string): boolean {
  return sectionKey === 'global.testimonials' || sectionKey === 'global.faq';
}
