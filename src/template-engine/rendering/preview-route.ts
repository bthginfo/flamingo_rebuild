import type { IndustryKey, PageInstance, SectionInstance } from '../model';
import type { CollectionSeedItem, SiteSeed } from '../seeds/model';

type CollectionDetailRule = {
  industry: IndustryKey;
  segment: string;
  collectionKey: string;
  eyebrow: string;
  listHref: string;
  listLabel: string;
  ctaHref: string;
};

const COLLECTION_DETAIL_RULES: readonly CollectionDetailRule[] = [
  { industry: 'salon', segment: 'leistungen', collectionKey: 'treatment', eyebrow: 'Leistung', listHref: '/leistungen', listLabel: 'Alle Leistungen', ctaHref: '/kontakt' },
  { industry: 'salon', segment: 'looks', collectionKey: 'look', eyebrow: 'Look', listHref: '/looks', listLabel: 'Alle Looks', ctaHref: '/kontakt' },
  { industry: 'tradesman', segment: 'leistungen', collectionKey: 'tradeService', eyebrow: 'Leistung', listHref: '/leistungen', listLabel: 'Alle Leistungen', ctaHref: '/kontakt' },
  { industry: 'tradesman', segment: 'referenzen', collectionKey: 'referenceProject', eyebrow: 'Referenz', listHref: '/referenzen', listLabel: 'Alle Referenzen', ctaHref: '/kontakt' },
  { industry: 'consulting', segment: 'leistungen', collectionKey: 'consultingService', eyebrow: 'Angebot', listHref: '/leistungen', listLabel: 'Alle Angebote', ctaHref: '/kontakt' },
  { industry: 'consulting', segment: 'cases', collectionKey: 'caseStudy', eyebrow: 'Case', listHref: '/cases', listLabel: 'Alle Cases', ctaHref: '/kontakt' },
  { industry: 'medical', segment: 'leistungen', collectionKey: 'treatment', eyebrow: 'Leistung', listHref: '/leistungen', listLabel: 'Alle Leistungen', ctaHref: '/kontakt' },
  { industry: 'medical', segment: 'team', collectionKey: 'doctor', eyebrow: 'Team', listHref: '/team', listLabel: 'Zum Team', ctaHref: '/kontakt' },
  { industry: 'fitness', segment: 'trainer', collectionKey: 'trainer', eyebrow: 'Trainer:in', listHref: '/trainer', listLabel: 'Alle Trainer:innen', ctaHref: '/kontakt' },
  { industry: 'wedding', segment: 'ablauf', collectionKey: 'scheduleItem', eyebrow: 'Programm', listHref: '/ablauf', listLabel: 'Zum Ablauf', ctaHref: '/rsvp' },
  { industry: 'wedding', segment: 'unterkunft', collectionKey: 'accommodation', eyebrow: 'Unterkunft', listHref: '/location', listLabel: 'Alle Unterkünfte', ctaHref: '/rsvp' }
];

export function previewPathFromSegments(segments: string[] | undefined): string {
  if (!segments?.length) return '/';
  return `/${segments.map((s) => decodeURIComponent(s)).join('/')}`;
}

export function resolvePreviewPage(seed: SiteSeed, segments: string[] | undefined): PageInstance {
  const path = previewPathFromSegments(segments);
  const match = seed.pages.find((page) => page.slug === path);
  if (match) return match;

  const parts = segments?.length ? segments.map((s) => decodeURIComponent(s)) : [];

  if (seed.industryKey === 'restaurant' && parts.length === 2 && parts[0] === 'speisekarte') {
    const item = seed.collections.find((c) => c.collectionKey === 'menuItem' && c.slug === parts[1]);
    if (item) return buildMenuItemDetailPage(item);
  }

  if (seed.industryKey === 'restaurant' && parts.length === 2 && parts[0] === 'erlebnisse') {
    const item = seed.collections.find((c) => c.collectionKey === 'diningExperience' && c.slug === parts[1]);
    if (item) return buildDiningExperienceDetailPage(item);
  }

  if (seed.industryKey === 'hotel' && parts.length === 2 && parts[0] === 'zimmer') {
    const item = seed.collections.find((c) => c.collectionKey === 'room' && c.slug === parts[1]);
    if (item) return buildHotelRoomDetailPage(item);
  }

  if (seed.industryKey === 'hotel' && parts.length === 2 && parts[0] === 'angebote') {
    const item = seed.collections.find((c) => c.collectionKey === 'hotelOffer' && c.slug === parts[1]);
    if (item) return buildHotelOfferDetailPage(item);
  }

  if (seed.industryKey === 'tourism' && parts.length === 2 && parts[0] === 'touren') {
    const item = seed.collections.find((c) => c.collectionKey === 'tour' && c.slug === parts[1]);
    if (item) return buildTourDetailPage(item);
  }

  if (seed.industryKey === 'fitness' && parts.length === 2 && parts[0] === 'kurse') {
    const item = seed.collections.find(
      (c) => (c.collectionKey === 'fitnessClass' || c.collectionKey === 'scheduleItem') && c.slug === parts[1]
    );
    if (item) {
      const eyebrow = item.collectionKey === 'scheduleItem' ? 'Termin' : 'Kurs';
      return buildStandardCollectionDetailPage(item, {
        eyebrow,
        urlSegment: 'kurse',
        listHref: '/kurse',
        listLabel: 'Zur Kurs-Übersicht',
        ctaHref: '/kontakt'
      });
    }
  }

  for (const rule of COLLECTION_DETAIL_RULES) {
    if (seed.industryKey !== rule.industry || parts.length !== 2 || parts[0] !== rule.segment) continue;
    const item = seed.collections.find((c) => c.collectionKey === rule.collectionKey && c.slug === parts[1]);
    if (item) {
      return buildStandardCollectionDetailPage(item, {
        eyebrow: rule.eyebrow,
        urlSegment: rule.segment,
        listHref: rule.listHref,
        listLabel: rule.listLabel,
        ctaHref: rule.ctaHref
      });
    }
  }

  return seed.pages.find((page) => page.key === 'home') ?? seed.pages[0];
}

function buildStandardCollectionDetailPage(
  item: CollectionSeedItem,
  config: { eyebrow: string; urlSegment: string; listHref: string; listLabel: string; ctaHref: string }
): PageInstance {
  const summary = typeof item.data.summary === 'string' ? item.data.summary : '';
  const image = typeof item.data.image === 'string' ? item.data.image : '';

  const sections: SectionInstance[] = [
    {
      id: `std-${item.id}-head`,
      sectionKey: 'global.pageHeader',
      visible: true,
      sortOrder: 1,
      data: {
        eyebrow: config.eyebrow,
        headline: { plain: item.title, accent: '' },
        subline: summary,
        image
      }
    },
    {
      id: `std-${item.id}-body`,
      sectionKey: 'global.textImage',
      visible: true,
      sortOrder: 2,
      data: {
        eyebrow: 'Details',
        headline: { plain: 'Mehr', accent: 'Infos.' },
        body:
          summary ||
          'Alle weiteren Informationen und Buchungswege besprechen wir gern persönlich oder über das Kontaktformular.',
        image: image || '',
        cta: { label: config.listLabel, link: { type: 'page', href: config.listHref } }
      }
    },
    {
      id: `std-${item.id}-cta`,
      sectionKey: 'global.contactCta',
      visible: true,
      sortOrder: 3,
      data: {
        eyebrow: 'Nächster Schritt',
        headline: { plain: 'Fragen', accent: 'oder Buchung?' },
        subline: 'Wir freuen uns auf eure Nachricht.',
        cta: { label: 'Weiter', link: { type: 'page', href: config.ctaHref } }
      }
    }
  ];

  return {
    id: `collection-std-${item.id}`,
    key: 'collection-detail',
    kind: 'collectionDetail',
    title: item.title,
    slug: `/${config.urlSegment}/${item.slug}`,
    seo: { title: `${item.title}` },
    sections
  };
}

function buildHotelRoomDetailPage(item: CollectionSeedItem): PageInstance {
  const summary = typeof item.data.summary === 'string' ? item.data.summary : '';
  const image = typeof item.data.image === 'string' ? item.data.image : '';

  const sections: SectionInstance[] = [
    {
      id: `room-${item.id}-head`,
      sectionKey: 'global.pageHeader',
      visible: true,
      sortOrder: 1,
      data: {
        eyebrow: 'Zimmer',
        headline: { plain: item.title, accent: '' },
        subline: summary,
        image
      }
    },
    {
      id: `room-${item.id}-body`,
      sectionKey: 'global.textImage',
      visible: true,
      sortOrder: 2,
      data: {
        eyebrow: 'Ausstattung',
        headline: { plain: 'Zum', accent: 'Wohlfühlen.' },
        body: summary || 'Hochwertige Betten, regionale Materialien und Blick ins Tal oder in den Wald.',
        image: image || '',
        cta: { label: 'Alle Zimmer', link: { type: 'page', href: '/zimmer' } }
      }
    },
    {
      id: `room-${item.id}-cta`,
      sectionKey: 'global.contactCta',
      visible: true,
      sortOrder: 3,
      data: {
        eyebrow: 'Buchen',
        headline: { plain: 'Dieses', accent: 'Zimmer?' },
        subline: 'Wir halten Ihnen gern Verfügbarkeit frei und beraten zu Paketen.',
        cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
      }
    }
  ];

  return {
    id: `collection-room-${item.id}`,
    key: 'room-detail',
    kind: 'collectionDetail',
    title: item.title,
    slug: `/zimmer/${item.slug}`,
    seo: { title: `${item.title} · Zimmer` },
    sections
  };
}

function buildTourDetailPage(item: CollectionSeedItem): PageInstance {
  const summary = typeof item.data.summary === 'string' ? item.data.summary : '';
  const image = typeof item.data.image === 'string' ? item.data.image : '';

  const sections: SectionInstance[] = [
    {
      id: `tour-${item.id}-head`,
      sectionKey: 'global.pageHeader',
      visible: true,
      sortOrder: 1,
      data: {
        eyebrow: 'Tour',
        headline: { plain: item.title, accent: '' },
        subline: summary,
        image
      }
    },
    {
      id: `tour-${item.id}-body`,
      sectionKey: 'global.textImage',
      visible: true,
      sortOrder: 2,
      data: {
        eyebrow: 'Ablauf',
        headline: { plain: 'Auf den', accent: 'Punkt gebracht.' },
        body:
          summary ||
          'Treffpunkt, Dauer und Schwierigkeit besprechen wir in der Buchungsbestätigung. Bringt wetterfeste Schuhe und eine leichte Jacke mit.',
        image: image || '',
        cta: { label: 'Alle Touren', link: { type: 'page', href: '/touren' } }
      }
    },
    {
      id: `tour-${item.id}-cta`,
      sectionKey: 'global.contactCta',
      visible: true,
      sortOrder: 3,
      data: {
        eyebrow: 'Buchen',
        headline: { plain: 'Diese Tour', accent: 'anfragen?' },
        subline: 'Wir melden uns mit freien Terminen und Preis.',
        cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
      }
    }
  ];

  return {
    id: `collection-tour-${item.id}`,
    key: 'tour-detail',
    kind: 'collectionDetail',
    title: item.title,
    slug: `/touren/${item.slug}`,
    seo: { title: `${item.title} · Touren` },
    sections
  };
}

function buildHotelOfferDetailPage(item: CollectionSeedItem): PageInstance {
  const summary = typeof item.data.summary === 'string' ? item.data.summary : '';
  const image = typeof item.data.image === 'string' ? item.data.image : '';

  const sections: SectionInstance[] = [
    {
      id: `offer-${item.id}-head`,
      sectionKey: 'global.pageHeader',
      visible: true,
      sortOrder: 1,
      data: {
        eyebrow: 'Angebot',
        headline: { plain: item.title, accent: '' },
        subline: summary,
        image
      }
    },
    {
      id: `offer-${item.id}-cta`,
      sectionKey: 'global.contactCta',
      visible: true,
      sortOrder: 2,
      data: {
        eyebrow: 'Paket',
        headline: { plain: 'Jetzt', accent: 'anfragen.' },
        subline: 'Wir melden uns mit Verfügbarkeit und Preis.',
        cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
      }
    }
  ];

  return {
    id: `collection-offer-${item.id}`,
    key: 'hotel-offer-detail',
    kind: 'collectionDetail',
    title: item.title,
    slug: `/angebote/${item.slug}`,
    seo: { title: `${item.title} · Angebot` },
    sections
  };
}

function buildMenuItemDetailPage(item: CollectionSeedItem): PageInstance {
  const summary = typeof item.data.summary === 'string' ? item.data.summary : '';
  const image = typeof item.data.image === 'string' ? item.data.image : '';
  const price = typeof item.data.price === 'string' ? item.data.price : '';

  const sections: SectionInstance[] = [
    {
      id: `dish-${item.id}-head`,
      sectionKey: 'global.pageHeader',
      visible: true,
      sortOrder: 1,
      data: {
        eyebrow: 'Speisekarte',
        headline: { plain: item.title, accent: '' },
        subline: summary,
        image
      }
    },
    {
      id: `dish-${item.id}-meta`,
      sectionKey: 'global.textImage',
      visible: true,
      sortOrder: 2,
      data: {
        eyebrow: 'Preis',
        headline: { plain: price || 'Auf Anfrage', accent: '' },
        body: summary || 'Hausgemacht, saisonal und mit Liebe zum Detail.',
        image: '',
        cta: { label: 'Zur Speisekarte', link: { type: 'page', href: '/speisekarte' } }
      }
    },
    {
      id: `dish-${item.id}-cta`,
      sectionKey: 'global.contactCta',
      visible: true,
      sortOrder: 3,
      data: {
        eyebrow: 'Reservierung',
        headline: { plain: 'Dieses Gericht', accent: 'am Tisch?' },
        subline: 'Schreiben Sie uns oder reservieren Sie telefonisch — wir freuen uns auf Sie.',
        cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
      }
    }
  ];

  return {
    id: `collection-menu-${item.id}`,
    key: 'menu-item-detail',
    kind: 'collectionDetail',
    title: item.title,
    slug: `/speisekarte/${item.slug}`,
    seo: { title: `${item.title} · Speisekarte` },
    sections
  };
}

function buildDiningExperienceDetailPage(item: CollectionSeedItem): PageInstance {
  const summary = typeof item.data.summary === 'string' ? item.data.summary : '';
  const image = typeof item.data.image === 'string' ? item.data.image : '';

  const sections: SectionInstance[] = [
    {
      id: `exp-${item.id}-head`,
      sectionKey: 'global.pageHeader',
      visible: true,
      sortOrder: 1,
      data: {
        eyebrow: 'Erlebnisse',
        headline: { plain: item.title, accent: '' },
        subline: summary,
        image
      }
    },
    {
      id: `exp-${item.id}-cta`,
      sectionKey: 'global.contactCta',
      visible: true,
      sortOrder: 2,
      data: {
        eyebrow: 'Mitmachen',
        headline: { plain: 'Platz', accent: 'sichern.' },
        subline: 'Wir melden uns mit Terminen und Kapazitäten.',
        cta: { label: 'Kontakt', link: { type: 'page', href: '/kontakt' } }
      }
    }
  ];

  return {
    id: `collection-exp-${item.id}`,
    key: 'dining-experience-detail',
    kind: 'collectionDetail',
    title: item.title,
    slug: `/erlebnisse/${item.slug}`,
    seo: { title: `${item.title} · Erlebnisse` },
    sections
  };
}
