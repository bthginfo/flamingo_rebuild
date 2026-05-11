import type { SiteSeed } from './seeds/model';

/** Tenant-editable UI strings (defaults = German demo). */
export type SiteMicrocopy = {
  footerImprint: string;
  footerPrivacy: string;
  footerNavAriaLabel: string;
  mainNavAriaLabel: string;
  contactCardEyebrow: string;
  contactLabelAddress: string;
  contactLabelPhone: string;
  contactLabelEmail: string;
  contactLabelHours: string;
  contactMapOpen: string;
  contactMapRoute: string;
  /** Use `{n}` for location index (1-based). */
  contactLocationUntitled: string;
  collectionCardMetaAria: string;
  collectionCardFactsAria: string;
  collectionCardMoreHint: string;
  scrollerAriaFallback: string;
  quoteMarqueeAriaLabel: string;
  featureCompareColumnFeature: string;
  rsvpOptionYes: string;
  rsvpOptionNo: string;
  rsvpOptionMaybe: string;
  rsvpDietaryPlaceholder: string;
  rsvpFallbackName: string;
  rsvpFallbackAttendance: string;
  rsvpFallbackGuestCount: string;
  rsvpFallbackDietary: string;
  rsvpFallbackNote: string;
  rsvpFallbackSubmit: string;
  rsvpFallbackSuccess: string;
  actionHoursFallback: string;
  /** Replace `{time}` with HH:MM. */
  actionHoursOpenUntil: string;
  actionHoursClosedBeforeOpen: string;
  actionHoursClosedTomorrow: string;
};

export const DEFAULT_SITE_MICROCOPY: SiteMicrocopy = {
  footerImprint: 'Impressum',
  footerPrivacy: 'Datenschutz',
  footerNavAriaLabel: 'Fußzeile',
  mainNavAriaLabel: 'Hauptnavigation',
  contactCardEyebrow: 'Direkt',
  contactLabelAddress: 'Adresse',
  contactLabelPhone: 'Telefon',
  contactLabelEmail: 'E-Mail',
  contactLabelHours: 'Zeiten',
  contactMapOpen: 'Karte öffnen',
  contactMapRoute: 'Route',
  contactLocationUntitled: 'Standort {n}',
  collectionCardMetaAria: 'Details',
  collectionCardFactsAria: 'Kurzinfos',
  collectionCardMoreHint: 'Details ansehen',
  scrollerAriaFallback: 'Highlights',
  quoteMarqueeAriaLabel: 'Zitate',
  featureCompareColumnFeature: 'Merkmal',
  rsvpOptionYes: 'Ja, ich bin dabei',
  rsvpOptionNo: 'Leider nein',
  rsvpOptionMaybe: 'Ich kläre es noch',
  rsvpDietaryPlaceholder: 'z. B. vegetarisch, glutenfrei',
  rsvpFallbackName: 'Name',
  rsvpFallbackAttendance: 'Teilnahme',
  rsvpFallbackGuestCount: 'Anzahl Personen',
  rsvpFallbackDietary: 'Essen / Allergien',
  rsvpFallbackNote: 'Nachricht',
  rsvpFallbackSubmit: 'Antwort senden',
  rsvpFallbackSuccess: 'Danke, deine Antwort wurde erfasst.',
  actionHoursFallback: 'Wir sind für Sie da.',
  actionHoursOpenUntil: 'Geöffnet · bis {time} Uhr',
  actionHoursClosedBeforeOpen: 'Geschlossen · ab {time} Uhr',
  actionHoursClosedTomorrow: 'Geschlossen · morgen ab {time} Uhr'
};

export const MICROCOPY_EDITOR_FIELDS: readonly { key: keyof SiteMicrocopy; label: string; helpText?: string }[] = [
  { key: 'footerImprint', label: 'Footer · Impressum-Link' },
  { key: 'footerPrivacy', label: 'Footer · Datenschutz-Link' },
  { key: 'footerNavAriaLabel', label: 'Footer · Nav (Aria-Label)', helpText: 'Barrierefreiheit, nicht sichtbar.' },
  { key: 'mainNavAriaLabel', label: 'Kopf · Nav (Aria-Label)' },
  { key: 'contactCardEyebrow', label: 'Kontakt · Karten-Eyebrow (Hauptstandort)' },
  { key: 'contactLabelAddress', label: 'Kontakt · Label Adresse' },
  { key: 'contactLabelPhone', label: 'Kontakt · Label Telefon' },
  { key: 'contactLabelEmail', label: 'Kontakt · Label E-Mail' },
  { key: 'contactLabelHours', label: 'Kontakt · Label Zeiten' },
  { key: 'contactMapOpen', label: 'Kontakt · Karte groß (Button)' },
  { key: 'contactMapRoute', label: 'Kontakt · Route (Mini-Karte)' },
  { key: 'contactLocationUntitled', label: 'Kontakt · Standort ohne Namen', helpText: 'Platzhalter {n} = Nummer.' },
  { key: 'collectionCardMetaAria', label: 'Sammlung · Meta-Zeile (Aria)' },
  { key: 'collectionCardFactsAria', label: 'Sammlung · Fakten-Liste (Aria)' },
  { key: 'collectionCardMoreHint', label: 'Sammlung · Hinweis auf verlinkter Karte', helpText: 'Visuell dezent; bei verlinkten Karten sichtbar.' },
  { key: 'scrollerAriaFallback', label: 'Scroller · Aria ohne Überschrift' },
  { key: 'quoteMarqueeAriaLabel', label: 'Zitat-Lauf · Aria-Label' },
  { key: 'featureCompareColumnFeature', label: 'Vergleich · Spalte „Merkmal“' },
  { key: 'rsvpOptionYes', label: 'RSVP · Option „Ja“' },
  { key: 'rsvpOptionNo', label: 'RSVP · Option „Nein“' },
  { key: 'rsvpOptionMaybe', label: 'RSVP · Option „Unklar“' },
  { key: 'rsvpDietaryPlaceholder', label: 'RSVP · Platzhalter Ernährung' },
  { key: 'rsvpFallbackName', label: 'RSVP · Fallback Label Name' },
  { key: 'rsvpFallbackAttendance', label: 'RSVP · Fallback Label Teilnahme' },
  { key: 'rsvpFallbackGuestCount', label: 'RSVP · Fallback Label Personen' },
  { key: 'rsvpFallbackDietary', label: 'RSVP · Fallback Label Essen/Allergien' },
  { key: 'rsvpFallbackNote', label: 'RSVP · Fallback Label Nachricht' },
  { key: 'rsvpFallbackSubmit', label: 'RSVP · Fallback Button' },
  { key: 'rsvpFallbackSuccess', label: 'RSVP · Erfolgstext' },
  { key: 'actionHoursFallback', label: 'Aktionsleiste · Status ohne Text' },
  { key: 'actionHoursOpenUntil', label: 'Aktionsleiste · Geöffnet', helpText: 'Platzhalter {time} = Ende (HH:MM).' },
  { key: 'actionHoursClosedBeforeOpen', label: 'Aktionsleiste · Geschlossen vor Öffnung', helpText: 'Platzhalter {time}.' },
  { key: 'actionHoursClosedTomorrow', label: 'Aktionsleiste · Geschlossen nach Ende', helpText: 'Platzhalter {time} = nächste Öffnung.' }
];

export function resolveSiteMicrocopy(seed: SiteSeed): SiteMicrocopy {
  const raw = seed.global.microcopy;
  if (!raw) return DEFAULT_SITE_MICROCOPY;
  const out: SiteMicrocopy = { ...DEFAULT_SITE_MICROCOPY };
  for (const key of Object.keys(DEFAULT_SITE_MICROCOPY) as (keyof SiteMicrocopy)[]) {
    const v = raw[key];
    if (typeof v === 'string' && v.trim().length > 0) {
      out[key] = v.trim();
    }
  }
  return out;
}
