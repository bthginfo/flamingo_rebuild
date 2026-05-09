'use client';

import type { StyleKey } from '@/template-engine/model';
import type { SiteSeed } from '@/template-engine/seeds/model';

export type DemoContentMode = 'published' | 'draft';

function storageBase(styleKey: StyleKey): string {
  return `flamingo-rebuild.demo.restaurant.${styleKey}`;
}

export function cloneSeed(seed: SiteSeed): SiteSeed {
  return structuredClone(seed);
}

export function loadDemoContent(seed: SiteSeed, mode: DemoContentMode): SiteSeed {
  if (typeof window === 'undefined') return seed;
  const baseKey = storageBase(seed.styleKey);
  const draft = readSeed(`${baseKey}.draft`);
  const published = readSeed(`${baseKey}.published`);
  if (mode === 'draft') return draft ?? published ?? seed;
  return published ?? seed;
}

export function saveDraft(seed: SiteSeed) {
  if (typeof window === 'undefined') return;
  const baseKey = storageBase(seed.styleKey);
  localStorage.setItem(`${baseKey}.draft`, JSON.stringify(seed));
}

export function publishDraft(seed: SiteSeed) {
  if (typeof window === 'undefined') return;
  const baseKey = storageBase(seed.styleKey);
  localStorage.setItem(`${baseKey}.published`, JSON.stringify(seed));
  localStorage.removeItem(`${baseKey}.draft`);
}

export function discardDraft(styleKey: StyleKey) {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(`${storageBase(styleKey)}.draft`);
}

export function resetPublished(styleKey: StyleKey) {
  if (typeof window === 'undefined') return;
  const base = storageBase(styleKey);
  localStorage.removeItem(`${base}.published`);
  localStorage.removeItem(`${base}.draft`);
}

export function hasDraft(styleKey: StyleKey): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(`${storageBase(styleKey)}.draft`) !== null;
}

function readSeed(key: string): SiteSeed | undefined {
  const raw = localStorage.getItem(key);
  if (!raw) return undefined;
  try {
    return JSON.parse(raw) as SiteSeed;
  } catch {
    return undefined;
  }
}
