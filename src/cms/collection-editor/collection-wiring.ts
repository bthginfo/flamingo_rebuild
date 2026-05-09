import type { FieldDefinition } from '@/template-engine/model';
import { getSection } from '@/template-engine/registry';
import type { SiteSeed } from '@/template-engine/seeds/model';

function fieldTreeReferencesCollection(fields: readonly FieldDefinition[], collectionKey: string): boolean {
  for (const field of fields) {
    if (field.type === 'collectionReferenceList' && field.collectionKey === collectionKey) {
      return true;
    }
    if (field.fields && fieldTreeReferencesCollection(field.fields, collectionKey)) return true;
    if (field.itemFields && fieldTreeReferencesCollection(field.itemFields, collectionKey)) return true;
  }
  return false;
}

export function sectionReferencesCollectionKey(sectionKey: string, collectionKey: string): boolean {
  try {
    const definition = getSection(sectionKey);
    return fieldTreeReferencesCollection(definition.fields, collectionKey);
  } catch {
    return false;
  }
}

export function appendCollectionItemToReferencingSections(
  seed: SiteSeed,
  collectionKey: string,
  newItemId: string
): SiteSeed {
  return {
    ...seed,
    pages: seed.pages.map((page) => ({
      ...page,
      sections: page.sections.map((section) => {
        if (!sectionReferencesCollectionKey(section.sectionKey, collectionKey)) return section;
        const items = Array.isArray(section.data.items) ? section.data.items.map(String) : [];
        if (items.includes(newItemId)) return section;
        return {
          ...section,
          data: {
            ...section.data,
            items: [...items, newItemId]
          }
        };
      })
    }))
  };
}

export function removeCollectionItemFromAllSectionLists(seed: SiteSeed, itemId: string): SiteSeed {
  return {
    ...seed,
    pages: seed.pages.map((page) => ({
      ...page,
      sections: page.sections.map((section) => {
        if (!Array.isArray(section.data.items)) return section;
        return {
          ...section,
          data: {
            ...section.data,
            items: section.data.items.filter((id) => String(id) !== itemId)
          }
        };
      })
    }))
  };
}

export function defaultNewCollectionItemData(collectionKey: string): Record<string, unknown> {
  if (collectionKey === 'menuItem') {
    return { summary: '', price: '', image: '' };
  }
  return { summary: '', image: '' };
}
