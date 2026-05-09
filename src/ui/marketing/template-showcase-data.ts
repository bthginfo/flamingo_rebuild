/**
 * Marketing / templates gallery copy & imagery aligned with the public
 * FlamingoMedia site (see legacy showcase reference). Preview URLs use the
 * rebuild route shape `/preview/[industry]/[style]`.
 */
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

export const STYLE_PREVIEW: Record<CoreTemplateKey, Record<StyleId, string>> = {
  restaurant: {
    classic: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80',
    modern: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80',
    bold: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1400&q=80'
  },
  hotel: {
    classic: 'https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1400&q=80',
    modern: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1400&q=80',
    bold: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=80'
  },
  tourism: {
    classic: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80',
    modern: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1400&q=80',
    bold: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80'
  }
};

export const CORE_TEMPLATE_META: Record<CoreTemplateKey, TemplateCardMeta> = {
  restaurant: {
    key: 'restaurant',
    label: 'Restaurant',
    tagline: 'Gastronomie · Trattoria · Café',
    description:
      'Speisekarte, Reservierungen, Foodie-Galerie und Story-Telling, das Hunger macht.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80',
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
    image: 'https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1400&q=80',
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
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80',
    accent: '#0e7490',
    bullets: [
      'Touren-Katalog mit Schwierigkeitsgrad',
      'Guide-Profile mit Sprachen',
      'Direkter Buchungs-Funnel',
      'Galerie mit Region & Erlebnis'
    ]
  }
};

export const EXTRA_TEMPLATE_META: Record<ExtraTemplateKey, TemplateCardMeta> = {
  salon: {
    key: 'salon',
    label: 'Salon & Beauty',
    tagline: 'Friseur · Spa · Kosmetik',
    description: 'Editorial-Stil, Online-Booking-Anbindung und eine Galerie, die Looks verkauft.',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1400&q=80',
    accent: '#be185d',
    bullets: ['Treatment-Liste mit Preisen', 'Booking-Tool-Integration', 'Look-Galerie mit Lightbox', 'Team-Vorstellung mit Bios']
  },
  tradesman: {
    key: 'tradesman',
    label: 'Handwerk',
    tagline: 'Installateur · Bau · Service',
    description: 'Lead-Generierung, Notdienst-Banner, Referenzen und Vertrauen auf den ersten Blick.',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1400&q=80',
    accent: '#1d4ed8',
    bullets: ['Notdienst-Sticky-Banner', 'Anfrage-Formular mit Versand', 'Referenz-Galerie', 'Förder-Übersicht mit Quote']
  },
  consulting: {
    key: 'consulting',
    label: 'Beratung & Kanzlei',
    tagline: 'Consulting · Steuer · Recht',
    description: 'Seriöser Auftritt mit klarer Hierarchie, Team-Profilen und durchgängigem Stil.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80',
    accent: '#1e3a8a',
    bullets: ['Team- & Expertise-Profile', 'Beratungs-Prozess in Schritten', 'Termin-Anfrage mit Vorab-Briefing', 'Stimmen, Referenzen & Vertrauen']
  },
  medical: {
    key: 'medical',
    label: 'Praxen & Ärzte',
    tagline: 'Arzt · Therapie · Praxis',
    description: 'Ruhige, vertrauenswürdige Ästhetik mit Online-Termin-Anbindung und barrierearmer Navigation.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80',
    accent: '#0e7490',
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
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1400&q=80',
    accent: '#9333ea',
    bullets: ['Programme & Kursformat', 'Trainer:innen mit Stories', 'Probetraining-CTA im Hero', 'Preise pro Kurs / Paket']
  },
  wedding: {
    key: 'wedding',
    label: 'Wedding Website',
    tagline: 'Einladung · Programm · RSVP',
    description: 'Eure Geschichte, Location, Ablauf und Gäste-Rückmeldung — alles auf einer schönen Seite.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80',
    accent: '#be123c',
    bullets: ['Ablauf & Timeline', 'RSVP & Gästeliste', 'Location & Unterkunft', 'FAQ & Story']
  }
};

export const STYLE_STRIP: { id: StyleId; label: string; tag: string }[] = [
  { id: 'classic', label: 'Klassisch', tag: 'Editorial · warm · klar' },
  { id: 'modern', label: 'Modern', tag: 'Klar · großzügig · SaaS' },
  { id: 'bold', label: 'Bold', tag: 'Magazin · Kontrast · große Typo' }
];

export function previewHref(industry: string, style: StyleId): string {
  return `/preview/${industry}/${style}`;
}
