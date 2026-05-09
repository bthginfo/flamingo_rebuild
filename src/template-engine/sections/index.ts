import type { SectionDefinition } from '../model';
import { globalSections } from './global';
import { industrySections } from './industry';

export const sections: readonly SectionDefinition[] = [...globalSections, ...industrySections];

export function getSectionDefinition(sectionKey: string): SectionDefinition | undefined {
  return sections.find((section) => section.key === sectionKey);
}
