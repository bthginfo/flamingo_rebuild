import type { SiteSeed } from './seeds/model';
import { sectionAnchorId } from './section-anchor';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function pagePathForPreview(slug: string): string {
  if (!slug || slug === '/') return '';
  return slug.startsWith('/') ? slug : `/${slug}`;
}

/** Legacy + new link shapes → final href for preview / site. */
export function resolveCtaLinkHref(link: unknown, seed: SiteSeed, previewBasePath: string): string {
  if (!isRecord(link)) return '#';
  const type = asString(link.type);
  const href = asString(link.href);

  if (type === 'url') {
    return resolveTenantHref(asString(link.href), previewBasePath);
  }

  if (type === 'section') {
    const pageKey = asString(link.pageKey);
    const sectionId = asString(link.sectionId);
    const page = seed.pages.find((p) => p.key === pageKey);
    if (!page || !sectionId) return '#';
    const path = pagePathForPreview(page.slug);
    const joined = `${previewBasePath}${path}`;
    const base = joined === '' ? '/' : joined;
    const hash = sectionAnchorId(sectionId);
    return `${base}#${hash}`;
  }

  if (type === 'page') {
    const pageKey = asString(link.pageKey);
    if (pageKey) {
      const page = seed.pages.find((p) => p.key === pageKey);
      if (!page) return '#';
      const path = pagePathForPreview(page.slug);
      const joined = `${previewBasePath}${path}`;
      return joined === '' ? '/' : joined;
    }
    return resolveTenantHref(href, previewBasePath);
  }

  return resolveTenantHref(href, previewBasePath);
}

function resolveTenantHref(href: string, previewBasePath: string): string {
  if (!href || href === '#') return '#';
  if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http')) return href;
  if (href.startsWith('/')) return `${previewBasePath}${href}`;
  return href;
}

export type LinkTargetMode = 'url' | 'page' | 'section';

export type NormalizedLinkTarget = {
  mode: LinkTargetMode;
  /** Raw href for url mode (external or relative path). */
  url: string;
  pageKey: string;
  sectionPageKey: string;
  sectionId: string;
};

function normalizeSlugForMatch(slug: string): string {
  const s = slug.trim();
  if (!s || s === '/') return '/';
  const withSlash = s.startsWith('/') ? s : `/${s}`;
  return withSlash.replace(/\/+$/, '') || '/';
}

/** Derive editor state from stored link JSON (supports legacy seeds). */
export function normalizeLinkTarget(link: unknown, seed: SiteSeed): NormalizedLinkTarget {
  if (!isRecord(link)) {
    return { mode: 'url', url: '', pageKey: seed.pages[0]?.key ?? 'home', sectionPageKey: seed.pages[0]?.key ?? 'home', sectionId: '' };
  }

  const type = asString(link.type);
  const href = asString(link.href);
  const pageKey = asString(link.pageKey);
  const sectionId = asString(link.sectionId);

  const firstPage = seed.pages[0];
  const defaultPageKey = firstPage?.key ?? 'home';

  if (type === 'url') {
    return { mode: 'url', url: href, pageKey: defaultPageKey, sectionPageKey: defaultPageKey, sectionId: '' };
  }

  if (type === 'section' && pageKey && sectionId) {
    return { mode: 'section', url: '', pageKey: defaultPageKey, sectionPageKey: pageKey, sectionId };
  }

  if (type === 'page' && pageKey) {
    return { mode: 'page', url: '', pageKey, sectionPageKey: pageKey, sectionId: '' };
  }

  if (type === 'page' && href) {
    const norm = normalizeSlugForMatch(href);
    const matched = seed.pages.find((p) => normalizeSlugForMatch(p.slug) === norm);
    if (matched) {
      return { mode: 'page', url: '', pageKey: matched.key, sectionPageKey: matched.key, sectionId: '' };
    }
  }

  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return { mode: 'url', url: href, pageKey: defaultPageKey, sectionPageKey: defaultPageKey, sectionId: '' };
  }

  if (href.startsWith('/')) {
    const norm = normalizeSlugForMatch(href);
    const matched = seed.pages.find((p) => normalizeSlugForMatch(p.slug) === norm);
    if (matched) {
      return { mode: 'page', url: '', pageKey: matched.key, sectionPageKey: matched.key, sectionId: '' };
    }
  }

  return { mode: 'url', url: href, pageKey: defaultPageKey, sectionPageKey: defaultPageKey, sectionId: '' };
}

export function serializeLinkTarget(
  normalized: NormalizedLinkTarget,
  seed: SiteSeed
): Record<string, unknown> {
  if (normalized.mode === 'url') {
    return { type: 'url', href: normalized.url };
  }
  if (normalized.mode === 'page') {
    const page = seed.pages.find((p) => p.key === normalized.pageKey);
    const slugPath = page ? pagePathForPreview(page.slug) : '/';
    return { type: 'page', pageKey: normalized.pageKey, href: slugPath || '/' };
  }
  return {
    type: 'section',
    pageKey: normalized.sectionPageKey,
    sectionId: normalized.sectionId
  };
}
