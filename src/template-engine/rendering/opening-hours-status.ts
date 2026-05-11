/**
 * Best-effort status line from free-text opening hours (German demo / CMS).
 * When parsing fails, callers should fall back to `statusOverride`.
 */

import type { SiteMicrocopy } from '../site-microcopy';

function toMinutes(h: number, m: number): number {
  return h * 60 + m;
}

function formatClock(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60) % 24;
  const m = totalMinutes % 60;
  return `${h}:${m.toString().padStart(2, '0')}`;
}

/** First same-day window HH:MM–HH:MM (or colon/dot variants). */
function extractFirstSameDayWindow(text: string): { open: number; close: number } | null {
  const re = /(\d{1,2})[.:](\d{2})\s*[–\-]\s*(\d{1,2})[.:](\d{2})/u;
  const m = text.match(re);
  if (!m) return null;
  const oH = Number(m[1]);
  const oM = Number(m[2]);
  const cH = Number(m[3]);
  const cM = Number(m[4]);
  if (![oH, oM, cH, cM].every((n) => Number.isFinite(n))) return null;
  if (oH > 23 || cH > 23 || oM > 59 || cM > 59) return null;
  const open = toMinutes(oH, oM);
  const close = toMinutes(cH, cM);
  if (open === close) return null;
  if (close < open) return null; // overnight: not handled in v1
  return { open, close };
}

function withTime(template: string, time: string): string {
  return template.includes('{time}') ? template.replaceAll('{time}', time) : `${template} ${time}`.trim();
}

export function resolveActionBarStatusLine(input: {
  useOpeningHours: boolean;
  statusOverride: string;
  openingHoursText: string;
  microcopy: Pick<
    SiteMicrocopy,
    'actionHoursFallback' | 'actionHoursOpenUntil' | 'actionHoursClosedBeforeOpen' | 'actionHoursClosedTomorrow'
  >;
  now?: Date;
}): string {
  const { useOpeningHours, statusOverride, openingHoursText, microcopy, now = new Date() } = input;
  const fallback =
    statusOverride.trim().length > 0 ? statusOverride : microcopy.actionHoursFallback;
  if (!useOpeningHours) return fallback;

  const text = openingHoursText.trim();
  if (!text) return fallback;

  const win = extractFirstSameDayWindow(text);
  if (!win) {
    const line = text.split('\n')[0]?.trim() ?? '';
    return line.length > 0 ? line : fallback;
  }

  const cur = now.getHours() * 60 + now.getMinutes();
  const { open, close } = win;
  const timeClose = formatClock(close);
  const timeOpen = formatClock(open);
  if (cur >= open && cur < close) {
    return withTime(microcopy.actionHoursOpenUntil, timeClose);
  }
  if (cur < open) {
    return withTime(microcopy.actionHoursClosedBeforeOpen, timeOpen);
  }
  return withTime(microcopy.actionHoursClosedTomorrow, timeOpen);
}
