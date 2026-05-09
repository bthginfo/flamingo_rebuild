import type { SectionInstance } from '../model';
import type { SiteSeed } from './model';
import { buildWowSectionInstances } from './wow-section-data';

function renumber(sections: readonly SectionInstance[]): SectionInstance[] {
  const cleaned = sections.filter(
    (s): s is SectionInstance =>
      s != null && typeof s === 'object' && typeof s.sectionKey === 'string' && s.sectionKey.length > 0
  );
  return cleaned.map((s, i) => ({ ...s, sortOrder: i + 1 }));
}

function insertAfterMarker(
  sections: readonly SectionInstance[],
  markerKey: string,
  inserts: readonly SectionInstance[]
): SectionInstance[] {
  const idx = sections.findIndex((s) => s.sectionKey === markerKey);
  const at = idx >= 0 ? idx + 1 : sections.length;
  return renumber([...sections.slice(0, at), ...inserts, ...sections.slice(at)]);
}

function pickHomeMarker(sections: readonly SectionInstance[]): string {
  if (sections.some((s) => s.sectionKey === 'global.actionBar')) return 'global.actionBar';
  return 'global.hero';
}

/** Erste Section als Anker, falls kein Page-Header (z. B. experimentelle Seeds). */
function pickSubpageMarker(sections: readonly SectionInstance[]): string {
  if (sections.some((s) => s.sectionKey === 'global.pageHeader')) return 'global.pageHeader';
  return sections[0]?.sectionKey ?? '';
}

export function applyWowToSeed(seed: SiteSeed): SiteSeed {
  const { industryKey, styleKey } = seed;

  const pages = seed.pages.map((page) => {
    if (page.key === 'home') {
      const marker = pickHomeMarker(page.sections);
      const wow = buildWowSectionInstances(industryKey, styleKey);
      return { ...page, sections: insertAfterMarker(page.sections, marker, wow) };
    }

    const marker = pickSubpageMarker(page.sections);
    const inserts = buildWowSectionInstances(industryKey, styleKey, { pageKey: page.key, pageTitle: page.title });
    if (!marker) {
      return { ...page, sections: renumber([...inserts, ...page.sections]) };
    }
    return { ...page, sections: insertAfterMarker(page.sections, marker, inserts) };
  });

  return { ...seed, pages };
}
