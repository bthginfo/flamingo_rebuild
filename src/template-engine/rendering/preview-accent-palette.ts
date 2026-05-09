import type { StyleKey } from '../model';

/** Query param `accent=` — matches the legacy showcase FAB swatches. */
export const PREVIEW_ACCENT_IDS = ['orange', 'green', 'red', 'brown', 'black', 'yellow'] as const;
export type PreviewAccentId = (typeof PREVIEW_ACCENT_IDS)[number];

/** Per-style hex so bold (dark) previews stay readable on primary buttons. */
const PALETTE: Record<PreviewAccentId, Record<StyleKey, string>> = {
  orange: { classic: '#ea580c', modern: '#c2410c', bold: '#fb923c' },
  green: { classic: '#15803d', modern: '#0f766e', bold: '#4ade80' },
  red: { classic: '#b91c1c', modern: '#be123c', bold: '#f87171' },
  brown: { classic: '#92400e', modern: '#78350f', bold: '#d4a574' },
  black: { classic: '#292524', modern: '#0f172a', bold: '#e7e5e4' },
  yellow: { classic: '#ca8a04', modern: '#a16207', bold: '#facc15' }
};

export function isPreviewAccentId(value: string | null | undefined): value is PreviewAccentId {
  return value != null && (PREVIEW_ACCENT_IDS as readonly string[]).includes(value);
}

/** Returns `null` when the accent should follow `.tenant-preview--*` defaults in CSS. */
export function resolvePreviewAccentHex(accentId: string | null | undefined, styleKey: StyleKey): string | null {
  if (!isPreviewAccentId(accentId)) return null;
  return PALETTE[accentId][styleKey];
}
