import type { SectionDefinition } from '../model';
import { globalSections } from './global';
import { industrySections } from './industry';
import { restaurantClassicSections } from './restaurant-classic';

export const sections: readonly SectionDefinition[] = [
  ...globalSections,
  ...industrySections,
  ...restaurantClassicSections
];

export function getSectionDefinition(sectionKey: string): SectionDefinition | undefined {
  return sections.find((section) => section.key === sectionKey);
}
