import type { PageInstance, SectionInstance } from '@/template-engine/model';

function section(id: string, sectionKey: string, sortOrder: number, data: Record<string, unknown>): SectionInstance {
  return {
    id,
    sectionKey,
    visible: true,
    sortOrder,
    data
  };
}

function slugToKey(slug: string): string {
  const trimmed = slug.trim().replace(/^\/+|\/+$/g, '');
  const safe = trimmed.replace(/[^a-z0-9-]+/gi, '-').replace(/-+/g, '-').toLowerCase();
  return safe ? `page-${safe}` : 'page-custom';
}

/**
 * Creates a minimal custom page (not tied to industry core blueprint).
 * Validation allows any registered section keys; unknown page keys skip allowed-section checks.
 */
export function buildBlankCustomPage(input: { title: string; slug: string; key?: string }): PageInstance {
  const slugNorm = input.slug.trim().startsWith('/') ? input.slug.trim() : `/${input.slug.trim()}`;
  const key = input.key?.trim() || slugToKey(slugNorm);
  const id = `custom-${key}-${Date.now()}`;

  return {
    id,
    key,
    kind: 'custom',
    title: input.title.trim() || 'Neue Seite',
    slug: slugNorm,
    seo: {
      title: `${input.title.trim() || 'Neue Seite'} · Website`,
      description: ''
    },
    sections: [
      section(`${id}-head`, 'global.pageHeader', 1, {
        eyebrow: 'Seite',
        headline: { plain: input.title.trim() || 'Neue Seite', accent: '' },
        subline: 'Bearbeite Text und Bilder im Admin — diese Seite wurde neu angelegt.',
        image: ''
      }),
      section(`${id}-body`, 'global.textImage', 2, {
        eyebrow: 'Inhalt',
        headline: { plain: 'Willkommen', accent: 'auf dieser Seite.' },
        body: 'Ersetze diesen Platzhalter-Text im Admin-Bereich. Du kannst weitere Abschnitte hinzufügen, solange sie für diese Seite erlaubt sind.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
      })
    ]
  };
}
