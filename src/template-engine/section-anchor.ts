/**
 * Stable DOM fragment id for a section instance (used in hash links).
 * Must match between preview renderer and CMS link picker.
 */
export function sectionAnchorId(sectionInstanceId: string): string {
  const safe = sectionInstanceId.replace(/[^a-zA-Z0-9_-]/g, '-');
  return `section-${safe}`;
}
