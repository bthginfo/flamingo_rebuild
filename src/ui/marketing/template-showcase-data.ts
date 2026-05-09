/**
 * Marketing / templates gallery copy & imagery. Preview URLs use
 * `/preview/[industry]/[style]` — industry keys match the template engine.
 */
import { INDUSTRY_KEYS, type IndustryKey } from '@/template-engine/model';

export type StyleId = 'classic' | 'modern' | 'bold';

export type CoreTemplateKey = 'restaurant' | 'hotel' | 'tourism';
export type ExtraTemplateKey = 'salon' | 'tradesman' | 'consulting' | 'medical' | 'fitness' | 'wedding';

export type TemplateCardMeta = {
  key: string;
  label: string;
  tagline: string;
  description: string;
  image: string;
  accent: string;
  bullets: readonly string[];
};

/** Order of industries on /templates and in marketing grids. */
export const SHOWCASE_INDUSTRY_ORDER: readonly IndustryKey[] = INDUSTRY_KEYS;

const Q = 'auto=format&fit=crop&w=1400&q=80';

/** Per industry × style — distinct moods for Classic / Modern / Bold. */
export const STYLE_PREVIEW: Record<IndustryKey, Record<StyleId, string>> = {
  restaurant: {
    classic: `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?${Q}`,
    modern: `https://images.unsplash.com/photo-1559339352-11d035aa65de?${Q}`,
    bold: `https://images.unsplash.com/photo-1551183053-bf91a1d81141?${Q}`
  },
  hotel: {
    classic: `https://images.unsplash.com/photo-1455587734955-081b22074882?${Q}`,
    modern: `https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?${Q}`,
    bold: `https://images.unsplash.com/photo-1564501049412-61c2a3083791?${Q}`
  },
  tourism: {
    classic: `https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?${Q}`,
    modern: `https://images.unsplash.com/photo-1488646953014-85cb44e25828?${Q}`,
    bold: `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?${Q}`
  },
  salon: {
    classic: `https://images.unsplash.com/photo-1560066984-138dadb4c035?${Q}`,
    modern: `https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?${Q}`,
    bold: `https://images.unsplash.com/photo-1596462502278-27bfdc403348?${Q}`
  },
  tradesman: {
    classic: `https://images.unsplash.com/photo-1504307651254-35680f356dfd?${Q}`,
    modern: `https://images.unsplash.com/photo-1581094794329-c8112a89af12?${Q}`,
    bold: `https://images.unsplash.com/photo-1621905252507-b35492cc74b4?${Q}`
  },
  consulting: {
    classic: `https://images.unsplash.com/photo-1521737604893-d14cc237f11d?${Q}`,
    modern: `https://images.unsplash.com/photo-1553877522-43269d4ea984?${Q}`,
    bold: `https://images.unsplash.com/photo-1559526324-4b87b5e36e44?${Q}`
  },
  medical: {
    classic: `https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?${Q}`,
    modern: `https://images.unsplash.com/photo-1631217868264-e5d43c02dae6?${Q}`,
    bold: `https://images.unsplash.com/photo-1579684385127-1ef15d5081ad?${Q}`
  },
  fitness: {
    classic: `https://images.unsplash.com/photo-1517836357463-d25dfeac3438?${Q}`,
    modern: `https://images.unsplash.com/photo-1534438327276-14e5300d3a4d?${Q}`,
    bold: `https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?${Q}`
  },
  wedding: {
    classic: `https://images.unsplash.com/photo-1519741497674-611481863552?${Q}`,
    modern: `https://images.unsplash.com/photo-1460978811222-4c29b61785a9?${Q}`,
    bold: `https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?${Q}`
  }
};

export const SHOWCASE_TEMPLATE_META: Record<IndustryKey, TemplateCardMeta> = {
  restaurant: {
    key: 'restaurant',
    label: 'Restaurant',
    tagline: 'Gastronomie · Trattoria · Café',
    description:
      'Speisekarte, Reservierungen, Foodie-Galerie und Story-Telling, das Hunger macht.',
    image: STYLE_PREVIEW.restaurant.classic,
    accent: '#9a3412',
    bullets: [
      'Mehrseitige Speisekarte',
      'Online-Reservierungs-Anbindung',
      'Foto-Galerie & Stimmungs-Mood',
      'Mehrsprachig auf Wunsch'
    ]
  },
  hotel: {
    key: 'hotel',
    label: 'Hotels',
    tagline: 'Hotel · Pension · Resort',
    description:
      'Zimmer-Showcase, Spa- und Lage-Storytelling, direkte Reservierungs-Funnel ohne Provision.',
    image: STYLE_PREVIEW.hotel.classic,
    accent: '#7c5e3c',
    bullets: [
      'Zimmer- & Suiten-Galerie',
      'Spa- und Halbpension-Module',
      'Direkt-Reservierung statt Booking-Provision',
      'Gästestimmen aus echten Erlebnissen'
    ]
  },
  tourism: {
    key: 'tourism',
    label: 'Tourismus',
    tagline: 'Touren · Guides · Erlebnisse',
    description:
      'Touren-Katalog, Guide-Profile, Buchungs-Funnel und kraftvolle Bildwelten für Region und Erlebnis.',
    image: STYLE_PREVIEW.tourism.classic,
    accent: '#0e7490',
    bullets: [
      'Touren-Katalog mit Schwierigkeitsgrad',
      'Guide-Profile mit Sprachen',
      'Direkter Buchungs-Funnel',
      'Galerie mit Region & Erlebnis'
    ]
  },
  salon: {
    key: 'salon',
    label: 'Salon & Beauty',
    tagline: 'Friseur · Spa · Kosmetik',
    description: 'Editorial-Stil, Online-Booking-Anbindung und eine Galerie, die Looks verkauft.',
    image: STYLE_PREVIEW.salon.classic,
    accent: '#be185d',
    bullets: [
      'Treatment-Liste mit Preisen',
      'Booking-Tool-Integration',
      'Look-Galerie mit Lightbox',
      'Team-Vorstellung mit Bios'
    ]
  },
  tradesman: {
    key: 'tradesman',
    label: 'Handwerk',
    tagline: 'Installateur · Bau · Service',
    description: 'Lead-Generierung, Notdienst-Banner, Referenzen und Vertrauen auf den ersten Blick.',
    image: STYLE_PREVIEW.tradesman.classic,
    accent: '#1d4ed8',
    bullets: [
      'Notdienst-Sticky-Banner',
      'Anfrage-Formular mit Versand',
      'Referenz-Galerie',
      'Förder-Übersicht mit Quote'
    ]
  },
  consulting: {
    key: 'consulting',
    label: 'Beratung & Kanzlei',
    tagline: 'Consulting · Steuer · Recht',
    description: 'Seriöser Auftritt mit klarer Hierarchie, Team-Profilen und durchgängigem Stil.',
    image: STYLE_PREVIEW.consulting.classic,
    accent: '#1e3a8a',
    bullets: [
      'Team- & Expertise-Profile',
      'Beratungs-Prozess in Schritten',
      'Termin-Anfrage mit Vorab-Briefing',
      'Stimmen, Referenzen & Vertrauen'
    ]
  },
  medical: {
    key: 'medical',
    label: 'Praxen & Ärzte',
    tagline: 'Arzt · Therapie · Praxis',
    description: 'Ruhige, vertrauenswürdige Ästhetik mit Online-Termin-Anbindung und barrierearmer Navigation.',
    image: STYLE_PREVIEW.medical.classic,
    accent: '#0f766e',
    bullets: [
      'Leistungs- & Therapie-Übersicht',
      'Online-Termin (Doctolib / jameda)',
      'Notfall-Hinweise & Sprechzeiten',
      'Praxis-Galerie & Eindrücke'
    ]
  },
  fitness: {
    key: 'fitness',
    label: 'Studios & Coaching',
    tagline: 'Fitness · Yoga · Personal',
    description: 'Energiegeladenes Editorial mit Kurs-Plan, Trainer-Bios und Probetraining-Funnel.',
    image: STYLE_PREVIEW.fitness.classic,
    accent: '#9333ea',
    bullets: [
      'Programme & Kursformat',
      'Trainer:innen mit Stories',
      'Probetraining-CTA im Hero',
      'Preise pro Kurs / Paket'
    ]
  },
  wedding: {
    key: 'wedding',
    label: 'Wedding Website',
    tagline: 'Einladung · Programm · RSVP',
    description: 'Eure Geschichte, Location, Ablauf und Gäste-Rückmeldung — alles auf einer schönen Seite.',
    image: STYLE_PREVIEW.wedding.classic,
    accent: '#be123c',
    bullets: ['Ablauf & Timeline', 'RSVP & Gästeliste', 'Location & Unterkunft', 'FAQ & Story']
  }
};

/** @deprecated Prefer `SHOWCASE_TEMPLATE_META` — kept for home page slices. */
export const CORE_TEMPLATE_META: Record<CoreTemplateKey, TemplateCardMeta> = {
  restaurant: SHOWCASE_TEMPLATE_META.restaurant,
  hotel: SHOWCASE_TEMPLATE_META.hotel,
  tourism: SHOWCASE_TEMPLATE_META.tourism
};

/** @deprecated Prefer `SHOWCASE_TEMPLATE_META` — kept for home page slices. */
export const EXTRA_TEMPLATE_META: Record<ExtraTemplateKey, TemplateCardMeta> = {
  salon: SHOWCASE_TEMPLATE_META.salon,
  tradesman: SHOWCASE_TEMPLATE_META.tradesman,
  consulting: SHOWCASE_TEMPLATE_META.consulting,
  medical: SHOWCASE_TEMPLATE_META.medical,
  fitness: SHOWCASE_TEMPLATE_META.fitness,
  wedding: SHOWCASE_TEMPLATE_META.wedding
};

export const STYLE_STRIP: { id: StyleId; label: string; tag: string }[] = [
  { id: 'classic', label: 'Klassisch', tag: 'Editorial · warm · klar' },
  { id: 'modern', label: 'Modern', tag: 'Klar · großzügig · SaaS' },
  { id: 'bold', label: 'Bold', tag: 'Magazin · Kontrast · große Typo' }
];

export function previewHref(industry: IndustryKey | string, style: StyleId): string {
  return `/preview/${industry}/${style}`;
}
