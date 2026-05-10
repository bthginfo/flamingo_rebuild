import type { PageInstance, SectionInstance } from '../model';
import type { SiteSeed } from '../seeds/model';

type JsonLdNode = Record<string, unknown>;

const BUSINESS_TYPE_BY_INDUSTRY: Record<SiteSeed['industryKey'], string> = {
  restaurant: 'Restaurant',
  hotel: 'Hotel',
  tourism: 'TravelAgency',
  salon: 'BeautySalon',
  tradesman: 'HomeAndConstructionBusiness',
  consulting: 'ProfessionalService',
  medical: 'MedicalBusiness',
  fitness: 'ExerciseGym',
  wedding: 'EventVenue'
};

export function buildTenantJsonLd({
  seed,
  page,
  canonicalUrl
}: {
  seed: SiteSeed;
  page: PageInstance;
  canonicalUrl: string;
}): JsonLdNode {
  const brandName = clean(seed.global.brand.name) || seed.tenantName;
  const contact = seed.global.contact;
  const businessId = `${canonicalOrigin(canonicalUrl)}/#business`;
  const websiteId = `${canonicalOrigin(canonicalUrl)}/#website`;
  const pageId = `${canonicalUrl}#webpage`;
  const graph: JsonLdNode[] = [
    compact({
      '@type': BUSINESS_TYPE_BY_INDUSTRY[seed.industryKey],
      '@id': businessId,
      name: brandName,
      description: clean(seed.global.brand.tagline),
      url: canonicalOrigin(canonicalUrl),
      telephone: clean(contact.phone),
      email: clean(contact.email),
      address: clean(contact.address)
        ? {
            '@type': 'PostalAddress',
            streetAddress: clean(contact.address)
          }
        : undefined,
      openingHours: clean(contact.openingHours)
    }),
    compact({
      '@type': 'WebSite',
      '@id': websiteId,
      url: canonicalOrigin(canonicalUrl),
      name: brandName,
      publisher: { '@id': businessId }
    }),
    compact({
      '@type': 'WebPage',
      '@id': pageId,
      url: canonicalUrl,
      name: clean(page.seo.title) || page.title,
      description: clean(page.seo.description) || clean(seed.global.brand.tagline),
      isPartOf: { '@id': websiteId },
      about: { '@id': businessId },
      breadcrumb: { '@id': `${canonicalUrl}#breadcrumb` }
    }),
    breadcrumbNode(seed, page, canonicalUrl)
  ];

  const faq = faqNode(page, canonicalUrl);
  if (faq) graph.push(faq);

  return {
    '@context': 'https://schema.org',
    '@graph': graph
  };
}

export function firstSeoImage(page: PageInstance): string {
  for (const section of page.sections) {
    const image = imageFromSection(section);
    if (image) return image;
  }
  return '';
}

function breadcrumbNode(seed: SiteSeed, page: PageInstance, canonicalUrl: string): JsonLdNode {
  const origin = canonicalOrigin(canonicalUrl);
  const homeName = seed.pages.find((item) => item.key === 'home')?.title || 'Startseite';
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: homeName,
      item: origin
    }
  ];

  if (page.slug !== '/') {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: page.title,
      item: canonicalUrl
    });
  }

  return {
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumb`,
    itemListElement: items
  };
}

function faqNode(page: PageInstance, canonicalUrl: string): JsonLdNode | null {
  const faqSection = page.sections.find((section) => section.visible && section.sectionKey === 'global.faq');
  const items = Array.isArray(faqSection?.data.items) ? faqSection.data.items : [];
  const questions = items
    .filter(isRecord)
    .map((item) => ({
      '@type': 'Question',
      name: clean(item.question),
      acceptedAnswer: {
        '@type': 'Answer',
        text: clean(item.answer)
      }
    }))
    .filter((item) => item.name && item.acceptedAnswer.text);

  if (questions.length === 0) return null;

  return {
    '@type': 'FAQPage',
    '@id': `${canonicalUrl}#faq`,
    mainEntity: questions
  };
}

function imageFromSection(section: SectionInstance): string {
  const direct = clean(section.data.image);
  if (direct) return direct;
  const items = Array.isArray(section.data.images) ? section.data.images : Array.isArray(section.data.items) ? section.data.items : [];
  for (const raw of items) {
    if (!isRecord(raw)) continue;
    const image = clean(raw.image) || clean(raw.src);
    if (image) return image;
  }
  return '';
}

function canonicalOrigin(url: string): string {
  try {
    return new URL(url).origin;
  } catch {
    return url;
  }
}

function compact<T extends JsonLdNode>(node: T): T {
  return Object.fromEntries(Object.entries(node).filter(([, value]) => value !== undefined && value !== '')) as T;
}

function clean(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
