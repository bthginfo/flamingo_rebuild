import type { IndustryKey } from './model';
import type { SiteSeed } from './seeds/model';

export type TenantThemePreset = {
  id: string;
  label: string;
  primary: string;
  primaryFg: string;
  accent: string;
  accentFg?: string;
  surface: string;
  bg: string;
  text: string;
};

export type TenantCustomTheme = TenantThemePreset & {
  name?: string;
};

export const CUSTOM_THEME_PREFIX = 'custom:';

const shared = [
  { id: 'mono', label: 'Mono', primary: '#111111', primaryFg: '#ffffff', accent: '#111111', surface: '#f5f5f5', bg: '#ffffff', text: '#0a0a0a' },
  { id: 'midnight', label: 'Midnight', primary: '#fbbf24', primaryFg: '#0c0a09', accent: '#fbbf24', surface: '#1c1917', bg: '#0c0a09', text: '#f5f5f4' }
] satisfies TenantThemePreset[];

export const THEME_PRESETS: Record<IndustryKey, TenantThemePreset[]> = {
  restaurant: [
    { id: 'terracotta', label: 'Terracotta', primary: '#9a3412', primaryFg: '#fff7ed', accent: '#fb923c', surface: '#fffaf5', bg: '#ffffff', text: '#1c1917' },
    { id: 'olive', label: 'Olive & Cream', primary: '#3f6212', primaryFg: '#f7fee7', accent: '#a3e635', surface: '#fafaf3', bg: '#ffffff', text: '#1c1c14' },
    { id: 'wine', label: 'Wine', primary: '#7f1d1d', primaryFg: '#fef2f2', accent: '#f87171', surface: '#fdf6f6', bg: '#ffffff', text: '#1f1313' },
    { id: 'espresso', label: 'Espresso', primary: '#3e2723', primaryFg: '#fdf6e3', accent: '#c89f6b', surface: '#faf5ee', bg: '#ffffff', text: '#1f1714' },
    ...shared
  ],
  hotel: [
    { id: 'goldsand', label: 'Gold & Sand', primary: '#92400e', primaryFg: '#fffbeb', accent: '#d4a373', surface: '#faf6ef', bg: '#fffdf8', text: '#1c1812' },
    { id: 'alpine', label: 'Alpine Slate', primary: '#1f2937', primaryFg: '#f8fafc', accent: '#cbd5e1', surface: '#f1f5f9', bg: '#ffffff', text: '#0f172a' },
    { id: 'lakeside', label: 'Lakeside', primary: '#0c4a6e', primaryFg: '#f0f9ff', accent: '#7dd3fc', surface: '#f0f9ff', bg: '#ffffff', text: '#0c1f2e' },
    ...shared
  ],
  tourism: [
    { id: 'horizon', label: 'Horizon', primary: '#0369a1', primaryFg: '#f0f9ff', accent: '#fbbf24', surface: '#f0f9ff', bg: '#ffffff', text: '#0c1f2e' },
    { id: 'meadow', label: 'Meadow', primary: '#15803d', primaryFg: '#f0fdf4', accent: '#facc15', surface: '#f0fdf4', bg: '#ffffff', text: '#0c1f12' },
    { id: 'aurora', label: 'Aurora', primary: '#5eead4', primaryFg: '#0c1c1a', accent: '#5eead4', surface: '#134e4a', bg: '#042f2e', text: '#ecfdf5' },
    ...shared
  ],
  salon: [
    { id: 'rose', label: 'Rose', primary: '#be185d', primaryFg: '#fff1f5', accent: '#ec4899', surface: '#fff1f5', bg: '#ffffff', text: '#1f1521' },
    { id: 'lavender', label: 'Lavender', primary: '#6d28d9', primaryFg: '#f5f3ff', accent: '#a78bfa', surface: '#f7f5ff', bg: '#ffffff', text: '#1c1525' },
    { id: 'noir', label: 'Noir', primary: '#f5d0fe', primaryFg: '#18181b', accent: '#f5d0fe', surface: '#27272a', bg: '#18181b', text: '#fafafa' },
    ...shared
  ],
  tradesman: [
    { id: 'royal', label: 'Royal Blue', primary: '#1d4ed8', primaryFg: '#eff6ff', accent: '#fbbf24', surface: '#f1f5f9', bg: '#ffffff', text: '#0f172a' },
    { id: 'forest', label: 'Forest', primary: '#166534', primaryFg: '#f0fdf4', accent: '#84cc16', surface: '#f1f5f0', bg: '#ffffff', text: '#0f1f12' },
    { id: 'steel', label: 'Steel', primary: '#475569', primaryFg: '#f8fafc', accent: '#fbbf24', surface: '#f1f5f9', bg: '#ffffff', text: '#0f172a' },
    ...shared
  ],
  consulting: [
    { id: 'navy', label: 'Navy', primary: '#1e3a8a', primaryFg: '#eff6ff', accent: '#60a5fa', surface: '#f1f5f9', bg: '#ffffff', text: '#0f172a' },
    { id: 'graphite', label: 'Graphite', primary: '#1f2937', primaryFg: '#f9fafb', accent: '#fbbf24', surface: '#f3f4f6', bg: '#ffffff', text: '#111827' },
    { id: 'mid-blue', label: 'Midnight Blue', primary: '#60a5fa', primaryFg: '#0c1322', accent: '#60a5fa', surface: '#1e293b', bg: '#0f172a', text: '#e2e8f0' },
    ...shared
  ],
  medical: [
    { id: 'cyan', label: 'Cyan Calm', primary: '#0e7490', primaryFg: '#ecfeff', accent: '#22d3ee', surface: '#f0fdff', bg: '#ffffff', text: '#0c1f24' },
    { id: 'teal', label: 'Teal Soft', primary: '#0f766e', primaryFg: '#f0fdfa', accent: '#5eead4', surface: '#f0fdfa', bg: '#ffffff', text: '#0c1c1a' },
    { id: 'coral', label: 'Coral', primary: '#be123c', primaryFg: '#fff1f2', accent: '#fda4af', surface: '#fff5f5', bg: '#ffffff', text: '#1f1314' },
    ...shared
  ],
  fitness: [
    { id: 'violet', label: 'Violet', primary: '#9333ea', primaryFg: '#faf5ff', accent: '#c084fc', surface: '#faf5ff', bg: '#ffffff', text: '#1c1126' },
    { id: 'lime', label: 'Lime Energy', primary: '#365314', primaryFg: '#f7fee7', accent: '#a3e635', surface: '#f7fee7', bg: '#ffffff', text: '#0f1605' },
    { id: 'noir-vio', label: 'Noir Violet', primary: '#c084fc', primaryFg: '#1c1126', accent: '#c084fc', surface: '#27272a', bg: '#18181b', text: '#fafafa' },
    ...shared
  ],
  wedding: [
    { id: 'blush', label: 'Blush & Gold', primary: '#9f7a5a', primaryFg: '#fdf8f4', accent: '#d4a373', surface: '#fdf8f4', bg: '#fffdfb', text: '#2c2218' },
    { id: 'sage', label: 'Sage Garden', primary: '#4d7c5a', primaryFg: '#f0fdf4', accent: '#86efac', surface: '#f3faf5', bg: '#ffffff', text: '#1a2e20' },
    { id: 'midnight', label: 'Midnight Rose', primary: '#e8b4c8', primaryFg: '#1c1520', accent: '#e8b4c8', surface: '#2c1f28', bg: '#1a1218', text: '#f5eff2' },
    ...shared
  ]
};

export function resolveTenantTheme(seed: SiteSeed): TenantThemePreset | null {
  const id = seed.global.brand.themePresetId || '';
  if (id.startsWith(CUSTOM_THEME_PREFIX)) {
    const customId = id.slice(CUSTOM_THEME_PREFIX.length);
    const theme = (seed.global.brand.customThemes ?? []).find((item) => item.id === customId);
    return theme ? { ...theme, label: theme.label || theme.name || 'Eigenes Schema' } : null;
  }
  return THEME_PRESETS[seed.industryKey]?.find((preset) => preset.id === id) ?? null;
}

export function normalizeTheme(theme: TenantCustomTheme): TenantCustomTheme {
  return {
    id: theme.id,
    label: theme.label || theme.name || 'Eigenes Schema',
    name: theme.name || theme.label || 'Eigenes Schema',
    primary: theme.primary,
    primaryFg: theme.primaryFg || autoContrastFg(theme.primary),
    accent: theme.accent,
    accentFg: theme.accentFg || autoContrastFg(theme.accent),
    surface: theme.surface,
    bg: theme.bg,
    text: theme.text
  };
}

export function autoContrastFg(hex: string): string {
  const m = hex.replace('#', '');
  const v = m.length === 3 ? m.split('').map((c) => c + c).join('') : m;
  const r = parseInt(v.slice(0, 2), 16);
  const g = parseInt(v.slice(2, 4), 16);
  const b = parseInt(v.slice(4, 6), 16);
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  const l = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  return l > 0.5 ? '#0a0a0a' : '#ffffff';
}
