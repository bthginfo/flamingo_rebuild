import { industries } from './industries';
import { sections } from './sections';
import { styles } from './styles';
import type { IndustryDefinition, IndustryKey, SectionDefinition, StyleKey } from './model';

export const templateRegistry = {
  industries,
  styles,
  sections
};

export function getIndustry(key: IndustryKey): IndustryDefinition {
  const industry = industries.find((entry) => entry.key === key);
  if (!industry) throw new Error(`Unknown industry: ${key}`);
  return industry;
}

export function getStyle(key: StyleKey) {
  const style = styles.find((entry) => entry.key === key);
  if (!style) throw new Error(`Unknown style: ${key}`);
  return style;
}

export function getSection(key: string): SectionDefinition {
  const section = sections.find((entry) => entry.key === key);
  if (!section) throw new Error(`Unknown section: ${key}`);
  return section;
}

export function getAllowedSectionsForPage(industryKey: IndustryKey, pageKey: string): readonly SectionDefinition[] {
  const industry = getIndustry(industryKey);
  const page = industry.corePages.find((entry) => entry.key === pageKey);
  if (!page) return [];
  return page.allowedSections.map(getSection);
}
