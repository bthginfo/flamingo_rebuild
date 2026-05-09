'use client';

import type { SiteSeed } from '@/template-engine/seeds/model';

export type DemoContentMode = 'published' | 'draft';

function storageBase(seed: SiteSeed): string {
  return `flamingo-rebuild.demo.${seed.industryKey}.${seed.styleKey}`;
}

export function cloneSeed(seed: SiteSeed): SiteSeed {
  return structuredClone(seed);
}

export function loadDemoContent(seed: SiteSeed, mode: DemoContentMode): SiteSeed {
  if (typeof window === 'undefined') return seed;
  const baseKey = storageBase(seed);
  const draft = readSeed(`${baseKey}.draft`);
  const published = readSeed(`${baseKey}.published`);
  if (mode === 'draft') return draft ?? published ?? seed;
  return published ?? seed;
}

export function saveDraft(seed: SiteSeed) {
  if (typeof window === 'undefined') return;
  const baseKey = storageBase(seed);
  localStorage.setItem(`${baseKey}.draft`, JSON.stringify(seed));
}

export function publishDraft(seed: SiteSeed) {
  if (typeof window === 'undefined') return;
  const baseKey = storageBase(seed);
  localStorage.setItem(`${baseKey}.published`, JSON.stringify(seed));
  localStorage.removeItem(`${baseKey}.draft`);
}

export function discardDraft(seed: SiteSeed) {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(`${storageBase(seed)}.draft`);
}

export function resetPublished(seed: SiteSeed) {
  if (typeof window === 'undefined') return;
  const base = storageBase(seed);
  localStorage.removeItem(`${base}.published`);
  localStorage.removeItem(`${base}.draft`);
}

export function hasDraft(seed: SiteSeed): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(`${storageBase(seed)}.draft`) !== null;
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
