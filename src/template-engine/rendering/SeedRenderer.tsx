'use client';

import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { PageInstance, SectionInstance, StyleKey } from '../model';
import { resolveCtaLinkHref } from '../link-resolution';
import { sectionAnchorId } from '../section-anchor';
import type { CollectionSeedItem, SiteSeed } from '../seeds/model';

function SplitHeading({ plain, accent }: { plain: string; accent: string }) {
  if (!accent) return plain;
  return (
    <>
      {plain}{' '}
      <em>{accent}</em>
    </>
  );
}

export function SeedPageRenderer({
  seed,
  page,
  styleKey,
  previewBasePath,
  accentHex
}: {
  seed: SiteSeed;
  page: PageInstance;
  styleKey: StyleKey;
  previewBasePath: string;
  /** When set, overrides `globals.css` `--tenant-accent` for live preview / FAB. */
  accentHex?: string | null;
}) {
  const sortedSections = [...page.sections].filter((section) => section.visible).sort((a, b) => a.sortOrder - b.sortOrder);
  const accentStyle: CSSProperties | undefined =
    accentHex && accentHex.length > 0 ? ({ ['--tenant-accent']: accentHex } as CSSProperties) : undefined;

  return (
    <div className="tenant-site-wrap" data-industry={seed.industryKey} data-style={styleKey} style={accentStyle}>
      <main className={`tenant-preview tenant-preview--${styleKey}`}>
        <PreviewNav seed={seed} previewBasePath={previewBasePath} />
        {sortedSections.map((section) => (
          <SectionRenderer
            key={section.id}
            seed={seed}
            section={section}
            styleKey={styleKey}
            previewBasePath={previewBasePath}
            domSectionId={sectionAnchorId(section.id)}
          />
        ))}
      </main>
      <PreviewFooter seed={seed} previewBasePath={previewBasePath} />
    </div>
  );
}

function PreviewFooter({ seed, previewBasePath }: { seed: SiteSeed; previewBasePath: string }) {
  const integ = seed.global.integrations;
  const imprintHref = integ?.imprintHref ?? '/impressum';
  const privacyHref = integ?.privacyHref ?? '/datenschutz';
  const year = new Date().getFullYear();
  return (
    <footer className="tenant-footer tenant-footer--premium">
      <div className="tenant-footer__glow" aria-hidden />
      <div className="shell tenant-footer__inner">
        <div className="tenant-footer__brand">
          <strong>{seed.global.brand.name}</strong>
          <p>{seed.global.brand.tagline}</p>
        </div>
        <nav className="tenant-footer__nav" aria-label="Fußzeile">
          {seed.global.navigation.map((item) => (
            <Link href={`${previewBasePath}${item.href}`} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="tenant-footer__legal">
          <Link href={`${previewBasePath}${imprintHref}`}>Impressum</Link>
          <span aria-hidden className="tenant-footer__dot">
            ·
          </span>
          <Link href={`${previewBasePath}${privacyHref}`}>Datenschutz</Link>
          <span className="tenant-footer__copy">© {year}</span>
        </div>
      </div>
    </footer>
  );
}

function PreviewNav({ seed, previewBasePath }: { seed: SiteSeed; previewBasePath: string }) {
  return (
    <header className="tenant-nav">
      <div className="shell tenant-nav-inner">
        <Link href={previewBasePath}>
          <strong>{seed.global.brand.name}</strong>
        </Link>
        <nav>
          {seed.global.navigation.map((item) => (
            <Link href={`${previewBasePath}${item.href}`} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

function SectionRenderer({
  seed,
  section,
  styleKey,
  previewBasePath,
  domSectionId
}: {
  seed: SiteSeed;
  section: SectionInstance;
  styleKey: StyleKey;
  previewBasePath: string;
  domSectionId: string;
}) {
  switch (section.sectionKey) {
    case 'global.hero':
      return (
        <HeroSection
          section={section}
          styleKey={styleKey}
          previewBasePath={previewBasePath}
          seed={seed}
          domSectionId={domSectionId}
        />
      );
    case 'global.pageHeader':
      return <PageHeaderSection section={section} styleKey={styleKey} domSectionId={domSectionId} />;
    case 'global.textImage':
      return (
        <TextImageSection section={section} previewBasePath={previewBasePath} seed={seed} domSectionId={domSectionId} />
      );
    case 'global.mapContact':
      return <MapContactSection section={section} seed={seed} domSectionId={domSectionId} />;
    case 'global.galleryGrid':
      return <GalleryGridSection section={section} domSectionId={domSectionId} />;
    case 'global.actionBar':
      return (
        <ActionBar section={section} previewBasePath={previewBasePath} seed={seed} domSectionId={domSectionId} />
      );
    case 'restaurant.menuHighlights':
    case 'restaurant.diningExperiences':
    case 'hotel.roomHighlights':
    case 'hotel.offers':
    case 'tourism.tourHighlights':
    case 'salon.treatmentHighlights':
    case 'salon.lookbook':
    case 'tradesman.serviceOverview':
    case 'tradesman.references':
    case 'consulting.offerOverview':
    case 'consulting.caseStudies':
    case 'medical.treatmentOverview':
    case 'medical.doctorTeam':
    case 'fitness.classOverview':
    case 'fitness.trainingPlan':
    case 'fitness.trainerTeam':
    case 'wedding.schedule':
    case 'wedding.accommodation':
      return (
        <CollectionGrid
          seed={seed}
          section={section}
          previewBasePath={previewBasePath}
          domSectionId={domSectionId}
        />
      );
    case 'global.testimonials':
      return <Testimonials section={section} domSectionId={domSectionId} />;
    case 'global.faq':
      return <FaqSection section={section} domSectionId={domSectionId} />;
    case 'wedding.rsvp':
      return (
        <RsvpSection section={section} previewBasePath={previewBasePath} seed={seed} domSectionId={domSectionId} />
      );
    case 'global.contactCta':
      return (
        <ContactCta section={section} previewBasePath={previewBasePath} seed={seed} domSectionId={domSectionId} />
      );
    case 'global.statsBand':
      return <StatsBandSection section={section} styleKey={styleKey} domSectionId={domSectionId} />;
    case 'global.trustLogos':
      return <TrustLogosSection section={section} styleKey={styleKey} domSectionId={domSectionId} />;
    case 'global.bentoHighlights':
      return <BentoHighlightsSection section={section} styleKey={styleKey} domSectionId={domSectionId} />;
    case 'global.scrollerHighlights':
      return (
        <ScrollerHighlightsSection
          section={section}
          styleKey={styleKey}
          previewBasePath={previewBasePath}
          seed={seed}
          domSectionId={domSectionId}
        />
      );
    case 'global.iconHighlights':
      return (
        <IconHighlightsSection
          section={section}
          styleKey={styleKey}
          previewBasePath={previewBasePath}
          seed={seed}
          domSectionId={domSectionId}
        />
      );
    case 'global.storyTimeline':
      return <StoryTimelineSection section={section} styleKey={styleKey} domSectionId={domSectionId} />;
    case 'global.mediaSpotlight':
      return (
        <MediaSpotlightSection
          section={section}
          styleKey={styleKey}
          previewBasePath={previewBasePath}
          seed={seed}
          domSectionId={domSectionId}
        />
      );
    case 'global.quoteMarquee':
      return <QuoteMarqueeSection section={section} styleKey={styleKey} domSectionId={domSectionId} />;
    case 'global.asymmetricSpot':
      return <AsymmetricSpotSection section={section} domSectionId={domSectionId} />;
    case 'global.pricingTiers':
      return <PricingTiersSection section={section} domSectionId={domSectionId} />;
    case 'global.ribbonCta':
      return <RibbonCtaSection section={section} previewBasePath={previewBasePath} seed={seed} domSectionId={domSectionId} />;
    case 'global.keyFactsGrid':
      return <KeyFactsGridSection section={section} styleKey={styleKey} domSectionId={domSectionId} />;
    case 'global.videoEmbed':
      return <VideoEmbedSection section={section} styleKey={styleKey} domSectionId={domSectionId} />;
    case 'global.pullQuote':
      return <PullQuoteBlockSection section={section} styleKey={styleKey} domSectionId={domSectionId} />;
    case 'global.stepsStrip':
      return <StepsStripSection section={section} styleKey={styleKey} domSectionId={domSectionId} />;
    case 'global.featureCompare':
      return <FeatureCompareSection section={section} styleKey={styleKey} domSectionId={domSectionId} />;
    default:
      return (
        <section className="tenant-section" id={domSectionId}>
          <div className="shell card">
            <p className="eyebrow">{section.sectionKey}</p>
            <p>Für diese Section ist noch kein Renderer implementiert.</p>
          </div>
        </section>
      );
  }
}

function PageHeaderSection({
  section,
  styleKey,
  domSectionId
}: {
  section: SectionInstance;
  styleKey: StyleKey;
  domSectionId: string;
}) {
  const headline = asSplit(section.data.headline);
  const image = asString(section.data.image);

  if (!image) {
    return (
      <section
        className={`tenant-page-hero tenant-page-hero--text tenant-page-hero--${styleKey}`}
        id={domSectionId}
      >
        <div className="shell tenant-page-hero__text-inner">
          <p className="eyebrow">{asString(section.data.eyebrow)}</p>
          <h1 className="tenant-page-hero__title">
            <SplitHeading plain={headline.plain} accent={headline.accent} />
          </h1>
          {asString(section.data.subline) ? <p className="tenant-page-hero__sub tenant-page-hero__sub--plain">{asString(section.data.subline)}</p> : null}
        </div>
      </section>
    );
  }

  return (
    <section className={`tenant-page-hero tenant-page-hero--${styleKey}`} id={domSectionId}>
      <div className="tenant-page-hero__media">
        <Image src={image} alt="" width={1600} height={720} className="tenant-page-hero__media-img" sizes="100vw" unoptimized />
        <div className="tenant-page-hero__shade" />
      </div>
      <div className="shell tenant-page-hero__content">
        <p className="eyebrow">{asString(section.data.eyebrow)}</p>
        <h1 className="tenant-page-hero__title">
          <SplitHeading plain={headline.plain} accent={headline.accent} />
        </h1>
        {asString(section.data.subline) ? <p className="tenant-page-hero__sub">{asString(section.data.subline)}</p> : null}
      </div>
    </section>
  );
}

function TextImageSection({
  section,
  previewBasePath,
  seed,
  domSectionId
}: {
  section: SectionInstance;
  previewBasePath: string;
  seed: SiteSeed;
  domSectionId: string;
}) {
  const headline = asSplit(section.data.headline);
  const image = asString(section.data.image);
  const body = asString(section.data.body);

  return (
    <section className="tenant-section" id={domSectionId}>
      <div className="shell tenant-split">
        <div>
          <p className="eyebrow">{asString(section.data.eyebrow)}</p>
          <h2 className="tenant-section-title">
            <SplitHeading plain={headline.plain} accent={headline.accent} />
          </h2>
          <div className="tenant-body-text">{body}</div>
          <CtaButton value={section.data.cta} previewBasePath={previewBasePath} seed={seed} />
        </div>
        {image ? (
          <div className="tenant-split__visual">
            <Image src={image} alt="" width={1400} height={1050} className="tenant-split__visual-img" sizes="(max-width: 900px) 100vw, 45vw" unoptimized />
          </div>
        ) : null}
      </div>
    </section>
  );
}

function GalleryGridSection({ section, domSectionId }: { section: SectionInstance; domSectionId: string }) {
  const headline = asSplit(section.data.headline);
  const images = parseGalleryImages(section.data.images);

  return (
    <section className="tenant-section" id={domSectionId}>
      <div className="shell">
        <p className="eyebrow">{asString(section.data.eyebrow)}</p>
        <h2 className="tenant-section-title">
          <SplitHeading plain={headline.plain} accent={headline.accent} />
        </h2>
        <div className="tenant-gallery-grid">
          {images.map((item, index) => (
            <figure className="tenant-gallery-cell" key={`${item.src}-${index}`}>
              <Image
                src={item.src}
                alt={item.alt}
                width={900}
                height={900}
                className="tenant-gallery-img"
                sizes="(max-width: 900px) 50vw, 33vw"
                loading="lazy"
                unoptimized
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function parseGalleryImages(value: unknown): { src: string; alt: string }[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => {
      if (typeof entry === 'string') return { src: entry, alt: '' };
      if (isRecord(entry)) {
        const src = asString(entry.url) || asString(entry.src) || asString(entry.image);
        const alt = asString(entry.alt) || asString(entry.caption);
        return { src, alt };
      }
      return { src: '', alt: '' };
    })
    .filter((item) => Boolean(item.src));
}

function MapContactSection({
  section,
  seed,
  domSectionId
}: {
  section: SectionInstance;
  seed: SiteSeed;
  domSectionId: string;
}) {
  const headline = asSplit(section.data.headline);
  const contact = seed.global.contact;
  const address = typeof contact.address === 'string' ? contact.address : '';
  const phone = typeof contact.phone === 'string' ? contact.phone : '';
  const email = typeof contact.email === 'string' ? contact.email : '';

  return (
    <section className="tenant-section tenant-soft" id={domSectionId}>
      <div className="shell">
        <p className="eyebrow">{asString(section.data.eyebrow)}</p>
        <h2 className="tenant-section-title">
          <SplitHeading plain={headline.plain} accent={headline.accent} />
        </h2>
        <div className="tenant-map-grid">
          <div className="tenant-map-card">
            <h3>Adresse</h3>
            <p>{address || 'Adresse folgt.'}</p>
            {phone ? <p>Tel. {phone}</p> : null}
            {email ? <p>{email}</p> : null}
          </div>
          <div className="tenant-map-placeholder" aria-hidden>
            Karte (Demo)
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroSection({
  section,
  styleKey,
  previewBasePath,
  seed,
  domSectionId
}: {
  section: SectionInstance;
  styleKey: StyleKey;
  previewBasePath: string;
  seed: SiteSeed;
  domSectionId: string;
}) {
  const headline = asSplit(section.data.headline);
  const image = asString(section.data.image);

  return (
    <section className={`tenant-hero tenant-hero--${styleKey}`} id={domSectionId}>
      {styleKey === 'bold' && image ? (
        <Image src={image} alt="" fill priority className="tenant-hero-bg" sizes="100vw" unoptimized />
      ) : null}
      <div className="shell tenant-hero-grid">
        <div>
          <p className="eyebrow">{asString(section.data.eyebrow)}</p>
          <h1>
            <SplitHeading plain={headline.plain} accent={headline.accent} />
          </h1>
          <p className="tenant-lead">{asString(section.data.subline)}</p>
          <p className="tenant-body">{asString(section.data.body)}</p>
          <div className="tenant-actions">
            <CtaButton value={section.data.primaryCta} previewBasePath={previewBasePath} seed={seed} />
            <CtaButton value={section.data.secondaryCta} previewBasePath={previewBasePath} seed={seed} secondary />
          </div>
        </div>
        {image && styleKey !== 'bold' ? (
          <div className="tenant-hero-image tenant-hero-image--motion">
            <Image
              src={image}
              alt=""
              width={1600}
              height={2000}
              className="tenant-hero-image-img"
              sizes="(max-width: 900px) 100vw, 42vw"
              unoptimized
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ActionBar({
  section,
  previewBasePath,
  seed,
  domSectionId
}: {
  section: SectionInstance;
  previewBasePath: string;
  seed: SiteSeed;
  domSectionId: string;
}) {
  return (
    <section className="tenant-actionbar" id={domSectionId}>
      <div className="shell tenant-actionbar-inner">
        <span>
          <b />
          {asString(section.data.statusOverride)}
        </span>
        <div>
          <CtaButton value={section.data.primaryCta} previewBasePath={previewBasePath} seed={seed} compact />
          <CtaButton value={section.data.secondaryCta} previewBasePath={previewBasePath} seed={seed} compact secondary />
        </div>
      </div>
    </section>
  );
}

function collectionDetailPrefix(sectionKey: string): string | null {
  const map: Record<string, string> = {
    'restaurant.menuHighlights': '/speisekarte',
    'restaurant.diningExperiences': '/erlebnisse',
    'hotel.roomHighlights': '/zimmer',
    'hotel.offers': '/angebote',
    'tourism.tourHighlights': '/touren',
    'salon.treatmentHighlights': '/leistungen',
    'salon.lookbook': '/looks',
    'tradesman.serviceOverview': '/leistungen',
    'tradesman.references': '/referenzen',
    'consulting.offerOverview': '/leistungen',
    'consulting.caseStudies': '/cases',
    'medical.treatmentOverview': '/leistungen',
    'medical.doctorTeam': '/team',
    'fitness.classOverview': '/kurse',
    'fitness.trainingPlan': '/kurse',
    'fitness.trainerTeam': '/trainer',
    'wedding.schedule': '/ablauf',
    'wedding.accommodation': '/unterkunft'
  };
  return map[sectionKey] ?? null;
}

function CollectionGrid({
  seed,
  section,
  previewBasePath,
  domSectionId
}: {
  seed: SiteSeed;
  section: SectionInstance;
  previewBasePath: string;
  domSectionId: string;
}) {
  const headline = asSplit(section.data.headline);
  const itemIds = Array.isArray(section.data.items) ? section.data.items.map(String) : [];
  const items = itemIds
    .map((id) => seed.collections.find((item) => item.id === id))
    .filter((item): item is CollectionSeedItem => Boolean(item));
  const prefix = collectionDetailPrefix(section.sectionKey);

  return (
    <section className="tenant-section" id={domSectionId}>
      <div className="shell">
        <p className="eyebrow">{asString(section.data.eyebrow)}</p>
        <h2 className="tenant-section-title">
          <SplitHeading plain={headline.plain} accent={headline.accent} />
        </h2>
        <p className="tenant-section-intro">{asString(section.data.intro)}</p>
        <div className="tenant-card-grid tenant-card-grid--motion" data-stagger-grid>
          {items.map((item) => {
            const inner = (
              <>
                {asString(item.data.image) ? (
                  <Image
                    src={asString(item.data.image)}
                    alt=""
                    width={960}
                    height={720}
                    className="tenant-card-img"
                    sizes="(max-width: 900px) 100vw, 32vw"
                    loading="lazy"
                    unoptimized
                  />
                ) : null}
                <div>
                  <h3>{item.title}</h3>
                  <p>{asString(item.data.summary)}</p>
                  {asString(item.data.price) ? <strong>{asString(item.data.price)}</strong> : null}
                </div>
              </>
            );

            if (prefix) {
              return (
                <Link className="tenant-card tenant-card--link" href={`${previewBasePath}${prefix}/${item.slug}`} key={item.id}>
                  {inner}
                </Link>
              );
            }

            return (
              <article className="tenant-card" key={item.id}>
                {inner}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FaqSection({ section, domSectionId }: { section: SectionInstance; domSectionId: string }) {
  const headline = asSplit(section.data.headline);
  const items = Array.isArray(section.data.items) ? section.data.items : [];

  return (
    <section className="tenant-section tenant-soft tenant-faq-wrap" id={domSectionId}>
      <div className="shell">
        <p className="eyebrow">{asString(section.data.eyebrow)}</p>
        <h2 className="tenant-section-title">
          <SplitHeading plain={headline.plain} accent={headline.accent} />
        </h2>
        <div className="tenant-faq-accordion">
          {items.map((raw, index) => {
            const item = isRecord(raw) ? raw : {};
            const q = asString(item.question);
            const a = asString(item.answer);
            return (
              <details key={index} className="tenant-faq-accordion__item">
                <summary className="tenant-faq-accordion__summary">{q}</summary>
                <div className="tenant-faq-accordion__panel tenant-body-text">{a}</div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function RsvpSection({
  section,
  previewBasePath,
  seed,
  domSectionId
}: {
  section: SectionInstance;
  previewBasePath: string;
  seed: SiteSeed;
  domSectionId: string;
}) {
  const headline = asSplit(section.data.headline);

  return (
    <section className="tenant-section" id={domSectionId}>
      <div className="shell">
        <p className="eyebrow">{asString(section.data.eyebrow)}</p>
        <h2 className="tenant-section-title">
          <SplitHeading plain={headline.plain} accent={headline.accent} />
        </h2>
        <p className="tenant-section-intro">{asString(section.data.intro)}</p>
        {asString(section.data.deadlineLabel) ? (
          <p className="eyebrow" style={{ marginTop: 16 }}>
            {asString(section.data.deadlineLabel)}
          </p>
        ) : null}
        <div style={{ marginTop: 20 }}>
          <CtaButton value={section.data.cta} previewBasePath={previewBasePath} seed={seed} />
        </div>
      </div>
    </section>
  );
}

function Testimonials({ section, domSectionId }: { section: SectionInstance; domSectionId: string }) {
  const headline = asSplit(section.data.headline);
  const items = Array.isArray(section.data.items) ? section.data.items : [];

  return (
    <section className="tenant-section tenant-soft" id={domSectionId}>
      <div className="shell">
        <p className="eyebrow">{asString(section.data.eyebrow)}</p>
        <h2 className="tenant-section-title">
          <SplitHeading plain={headline.plain} accent={headline.accent} />
        </h2>
        <div className="tenant-card-grid">
          {items.map((raw, index) => {
            const item = isRecord(raw) ? raw : {};
            return (
              <article className="tenant-quote" key={index}>
                <p>“{asString(item.quote)}”</p>
                <strong>{asString(item.name)}</strong>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContactCta({
  section,
  previewBasePath,
  seed,
  domSectionId
}: {
  section: SectionInstance;
  previewBasePath: string;
  seed: SiteSeed;
  domSectionId: string;
}) {
  const headline = asSplit(section.data.headline);
  return (
    <section className="tenant-section tenant-cta" id={domSectionId}>
      <div className="shell">
        <p className="eyebrow">{asString(section.data.eyebrow)}</p>
        <h2 className="tenant-section-title">
          <SplitHeading plain={headline.plain} accent={headline.accent} />
        </h2>
        <p className="tenant-section-intro">{asString(section.data.subline)}</p>
        <CtaButton value={section.data.cta} previewBasePath={previewBasePath} seed={seed} />
      </div>
    </section>
  );
}

function arrayItems(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value) ? value.filter(isRecord) : [];
}

function StatsBandSection({
  section,
  styleKey,
  domSectionId
}: {
  section: SectionInstance;
  styleKey: StyleKey;
  domSectionId: string;
}) {
  const items = arrayItems(section.data.items);
  const headline = asSplit(section.data.headline);
  return (
    <section className={`tenant-wow-stats tenant-wow-stats--${styleKey}`} id={domSectionId}>
      <div className="tenant-wow-stats__glow" aria-hidden />
      <div className="shell tenant-wow-stats__inner">
        <div className="tenant-wow-stats__intro">
          <p className="eyebrow">{asString(section.data.eyebrow)}</p>
          <h2 className="tenant-wow-stats__title">
            <SplitHeading plain={headline.plain} accent={headline.accent} />
          </h2>
        </div>
        <ul className="tenant-wow-stats__grid">
          {items.map((row, i) => (
            <li key={i} className="tenant-wow-stats__card">
              <span className="tenant-wow-stats__value">{asString(row.value)}</span>
              <span className="tenant-wow-stats__label">{asString(row.label)}</span>
              {asString(row.hint) ? <span className="tenant-wow-stats__hint">{asString(row.hint)}</span> : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function TrustLogosSection({
  section,
  styleKey,
  domSectionId
}: {
  section: SectionInstance;
  styleKey: StyleKey;
  domSectionId: string;
}) {
  const items = arrayItems(section.data.items);
  const headline = asSplit(section.data.headline);
  return (
    <section className={`tenant-wow-trust tenant-wow-trust--${styleKey}`} id={domSectionId}>
      <div className="shell">
        <div className="tenant-wow-trust__head">
          <p className="eyebrow">{asString(section.data.eyebrow)}</p>
          <h2 className="tenant-wow-trust__title">
            <SplitHeading plain={headline.plain} accent={headline.accent} />
          </h2>
        </div>
        <div className="tenant-wow-trust__row">
          {items.map((row, i) => {
            const logo = asString(row.logo);
            const name = asString(row.name);
            const href = asString(row.href);
            const inner = (
              <>
                {logo ? (
                  <span className="tenant-wow-trust__logo-wrap">
                    <Image src={logo} alt="" width={220} height={120} className="tenant-trust-img" loading="lazy" unoptimized />
                  </span>
                ) : (
                  <span className="tenant-wow-trust__mono">{name.slice(0, 2).toUpperCase()}</span>
                )}
                <span className="tenant-wow-trust__name">{name}</span>
              </>
            );
            return href ? (
              <a key={i} className="tenant-wow-trust__cell" href={href} target="_blank" rel="noreferrer">
                {inner}
              </a>
            ) : (
              <div key={i} className="tenant-wow-trust__cell">
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BentoHighlightsSection({
  section,
  styleKey,
  domSectionId
}: {
  section: SectionInstance;
  styleKey: StyleKey;
  domSectionId: string;
}) {
  const items = arrayItems(section.data.items);
  const headline = asSplit(section.data.headline);
  return (
    <section className={`tenant-wow-bento tenant-wow-bento--${styleKey}`} id={domSectionId}>
      <div className="shell">
        <div className="tenant-wow-bento__head">
          <p className="eyebrow">{asString(section.data.eyebrow)}</p>
          <h2 className="tenant-wow-bento__title">
            <SplitHeading plain={headline.plain} accent={headline.accent} />
          </h2>
        </div>
        <div className="tenant-wow-bento__grid">
          {items.map((row, i) => {
            const span = asString(row.layoutSpan) === '2' ? 'tenant-wow-bento__tile--wide' : '';
            const img = asString(row.image);
            return (
              <article key={i} className={`tenant-wow-bento__tile ${span}`}>
                {img ? (
                  <div className="tenant-wow-bento__visual">
                    <Image src={img} alt="" width={1200} height={800} className="tenant-bento-img" loading="lazy" unoptimized />
                    <div className="tenant-wow-bento__shade" />
                  </div>
                ) : null}
                <div className="tenant-wow-bento__body">
                  {asString(row.kicker) ? <p className="tenant-wow-bento__kicker">{asString(row.kicker)}</p> : null}
                  <h3>{asString(row.title)}</h3>
                  {asString(row.body) ? <p>{asString(row.body)}</p> : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ScrollerHighlightsSection({
  section,
  styleKey,
  previewBasePath,
  seed,
  domSectionId
}: {
  section: SectionInstance;
  styleKey: StyleKey;
  previewBasePath: string;
  seed: SiteSeed;
  domSectionId: string;
}) {
  const slides = arrayItems(section.data.slides);
  const headline = asSplit(section.data.headline);
  return (
    <section className={`tenant-section tenant-scroller-section tenant-scroller-section--${styleKey}`} id={domSectionId}>
      <div className="shell">
        <p className="eyebrow">{asString(section.data.eyebrow)}</p>
        <h2 className="tenant-section-title">
          <SplitHeading plain={headline.plain} accent={headline.accent} />
        </h2>
        {asString(section.data.intro) ? <p className="tenant-section-intro">{asString(section.data.intro)}</p> : null}
        <div className="tenant-scroller" role="region" aria-label={asString(headline.plain) || 'Highlights'} tabIndex={0}>
          {slides.map((row, i) => {
            const img =
              asString(row.image) ||
              (isRecord(row.image) ? asString((row.image as Record<string, unknown>).url) : '');
            return (
              <article className="tenant-scroller__card" key={i}>
                {img ? (
                  <div className="tenant-scroller__visual">
                    <Image src={img} alt="" width={900} height={600} className="tenant-scroller-img" loading="lazy" unoptimized />
                  </div>
                ) : null}
                <div className="tenant-scroller__body">
                  <h3>{asString(row.title)}</h3>
                  {asString(row.body) ? <p>{asString(row.body)}</p> : null}
                  <CtaButton value={row.cta} previewBasePath={previewBasePath} seed={seed} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function IconHighlightsSection({
  section,
  styleKey,
  previewBasePath,
  seed,
  domSectionId
}: {
  section: SectionInstance;
  styleKey: StyleKey;
  previewBasePath: string;
  seed: SiteSeed;
  domSectionId: string;
}) {
  const items = arrayItems(section.data.items);
  const headline = asSplit(section.data.headline);
  return (
    <section className={`tenant-pro-icon tenant-pro-icon--${styleKey}`} id={domSectionId}>
      <div className="shell">
        <header className="tenant-pro-icon__head">
          {asString(section.data.eyebrow) ? <p className="eyebrow">{asString(section.data.eyebrow)}</p> : null}
          <h2 className="tenant-section-title">
            <SplitHeading plain={headline.plain} accent={headline.accent} />
          </h2>
          {asString(section.data.intro) ? <p className="tenant-pro-icon__intro">{asString(section.data.intro)}</p> : null}
        </header>
        <div className="tenant-pro-icon__grid" data-stagger-cards>
          {items.map((row, i) => (
            <article key={i} className="tenant-pro-icon__card">
              <span className="tenant-pro-icon__glyph" aria-hidden>
                {asString(row.icon)}
              </span>
              <h3>{asString(row.title)}</h3>
              {asString(row.body) ? <p>{asString(row.body)}</p> : null}
              <CtaButton value={row.cta} previewBasePath={previewBasePath} seed={seed} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StoryTimelineSection({
  section,
  styleKey,
  domSectionId
}: {
  section: SectionInstance;
  styleKey: StyleKey;
  domSectionId: string;
}) {
  const steps = arrayItems(section.data.steps);
  const headline = asSplit(section.data.headline);
  return (
    <section className={`tenant-pro-timeline tenant-pro-timeline--${styleKey}`} id={domSectionId}>
      <div className="shell tenant-pro-timeline__layout">
        <header className="tenant-pro-timeline__head">
          {asString(section.data.eyebrow) ? <p className="eyebrow">{asString(section.data.eyebrow)}</p> : null}
          <h2 className="tenant-section-title">
            <SplitHeading plain={headline.plain} accent={headline.accent} />
          </h2>
        </header>
        <ol className="tenant-pro-timeline__list">
          {steps.map((row, i) => (
            <li key={i} className="tenant-pro-timeline__item">
              <span className="tenant-pro-timeline__node" aria-hidden />
              <div className="tenant-pro-timeline__body">
                {asString(row.label) ? <p className="tenant-pro-timeline__label">{asString(row.label)}</p> : null}
                <h3>{asString(row.title)}</h3>
                <p>{asString(row.body)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function MediaSpotlightSection({
  section,
  styleKey,
  previewBasePath,
  seed,
  domSectionId
}: {
  section: SectionInstance;
  styleKey: StyleKey;
  previewBasePath: string;
  seed: SiteSeed;
  domSectionId: string;
}) {
  const headline = asSplit(section.data.headline);
  const img = asString(section.data.image);
  const mood = asString(section.data.mood).toLowerCase().includes('stark') ? 'stark' : 'soft';
  return (
    <section
      className={`tenant-pro-media tenant-pro-media--${styleKey} tenant-pro-media--mood-${mood}`}
      id={domSectionId}
    >
      <div className="tenant-pro-media__visual">
        {img ? <Image src={img} alt="" fill className="tenant-pro-media-img" sizes="100vw" loading="lazy" unoptimized /> : null}
        <div className="tenant-pro-media__veil" aria-hidden />
      </div>
      <div className="shell tenant-pro-media__content">
        {asString(section.data.eyebrow) ? <p className="tenant-pro-media__eyebrow">{asString(section.data.eyebrow)}</p> : null}
        <h2 className="tenant-pro-media__title">
          <SplitHeading plain={headline.plain} accent={headline.accent} />
        </h2>
        {asString(section.data.subline) ? <p className="tenant-pro-media__sub">{asString(section.data.subline)}</p> : null}
        <div className="tenant-pro-media__ctas">
          <CtaButton value={section.data.primaryCta} previewBasePath={previewBasePath} seed={seed} />
          <CtaButton value={section.data.secondaryCta} secondary previewBasePath={previewBasePath} seed={seed} />
        </div>
      </div>
    </section>
  );
}

function QuoteMarqueeSection({
  section,
  styleKey,
  domSectionId
}: {
  section: SectionInstance;
  styleKey: StyleKey;
  domSectionId: string;
}) {
  const items = arrayItems(section.data.items);
  const headline = asSplit(section.data.headline);
  const loop = [...items, ...items];
  return (
    <section className={`tenant-pro-quote tenant-pro-quote--${styleKey}`} id={domSectionId}>
      <div className="shell tenant-pro-quote__head">
        {asString(section.data.eyebrow) ? <p className="eyebrow">{asString(section.data.eyebrow)}</p> : null}
        <h2 className="tenant-section-title">
          <SplitHeading plain={headline.plain} accent={headline.accent} />
        </h2>
      </div>
      <div className="tenant-pro-quote__viewport" role="region" aria-label="Zitate">
        <div className="tenant-pro-quote__track">
          {loop.map((row, i) => (
            <figure key={`${asString(row.quote)}-${i}`} className="tenant-pro-quote__card">
              <blockquote>{asString(row.quote)}</blockquote>
              <figcaption>
                <strong>{asString(row.name)}</strong>
                {asString(row.role) ? <span>{asString(row.role)}</span> : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function youtubeVideoId(raw: string): string | null {
  const s = raw.trim();
  if (!s) return null;
  try {
    const u = new URL(s.startsWith('http') ? s : `https://${s}`);
    if (u.hostname === 'youtu.be') {
      const id = u.pathname.replace(/^\//, '').split('/')[0];
      return id || null;
    }
    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v');
      if (v) return v;
      const p = u.pathname.split('/').filter(Boolean);
      const ei = p.indexOf('embed');
      if (ei >= 0 && p[ei + 1]) return p[ei + 1];
      const si = p.indexOf('shorts');
      if (si >= 0 && p[si + 1]) return p[si + 1];
    }
  } catch {
    return null;
  }
  return null;
}

function AsymmetricSpotSection({ section, domSectionId }: { section: SectionInstance; domSectionId: string }) {
  const headline = asSplit(section.data.headline);
  const image = asString(section.data.image);
  const body = asString(section.data.body);
  const side = asString(section.data.imageSide).toLowerCase() === 'right' ? 'right' : 'left';
  const textBlock = (
    <div>
      <p className="eyebrow">{asString(section.data.eyebrow)}</p>
      <h2 className="tenant-section-title">
        <SplitHeading plain={headline.plain} accent={headline.accent} />
      </h2>
      <div className="tenant-body-text">{body}</div>
    </div>
  );
  const visual = image ? (
    <div className="tenant-split__visual">
      <Image
        src={image}
        alt=""
        width={1400}
        height={1050}
        className="tenant-split__visual-img"
        sizes="(max-width: 900px) 100vw, 45vw"
        unoptimized
      />
    </div>
  ) : null;
  return (
    <section className="tenant-section" id={domSectionId}>
      <div className={`shell tenant-split tenant-split--asym-${side}`}>
        {side === 'left' ? (
          <>
            {textBlock}
            {visual}
          </>
        ) : (
          <>
            {visual}
            {textBlock}
          </>
        )}
      </div>
    </section>
  );
}

function PricingTiersSection({ section, domSectionId }: { section: SectionInstance; domSectionId: string }) {
  const headline = asSplit(section.data.headline);
  const tiers = arrayItems(section.data.tiers);
  return (
    <section className="tenant-section tenant-pro-pricing" id={domSectionId}>
      <div className="shell">
        <p className="eyebrow">{asString(section.data.eyebrow)}</p>
        <h2 className="tenant-section-title">
          <SplitHeading plain={headline.plain} accent={headline.accent} />
        </h2>
        {asString(section.data.intro) ? <p className="tenant-section-intro">{asString(section.data.intro)}</p> : null}
        <div className="tenant-pro-pricing__grid">
          {tiers.map((row, i) => {
            const bullets = asString(row.bullets)
              .split('\n')
              .map((l) => l.trim())
              .filter(Boolean);
            const hi = row.highlighted === true;
            const ctaLabel = asString(row.ctaLabel);
            const ctaHref = asString(row.ctaHref);
            const href = ctaHref.startsWith('http') ? ctaHref : ctaHref ? `https://${ctaHref}` : '';
            return (
              <article key={i} className={`tenant-pro-pricing__card${hi ? ' tenant-pro-pricing__card--hi' : ''}`}>
                <h3>{asString(row.name)}</h3>
                <p className="tenant-pro-pricing__price">{asString(row.priceLine)}</p>
                {asString(row.summary) ? <p className="tenant-pro-pricing__summary">{asString(row.summary)}</p> : null}
                {bullets.length > 0 ? (
                  <ul className="tenant-pro-pricing__bullets">
                    {bullets.map((b, bi) => (
                      <li key={`${i}-${bi}`}>{b}</li>
                    ))}
                  </ul>
                ) : null}
                {ctaLabel && href ? (
                  <a className="tenant-button" href={href}>
                    {ctaLabel}
                  </a>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function RibbonCtaSection({
  section,
  previewBasePath,
  seed,
  domSectionId
}: {
  section: SectionInstance;
  previewBasePath: string;
  seed: SiteSeed;
  domSectionId: string;
}) {
  return (
    <section className="tenant-pro-ribbon" id={domSectionId}>
      <div className="shell tenant-pro-ribbon__inner">
        <p className="tenant-pro-ribbon__msg">{asString(section.data.message)}</p>
        <CtaButton value={section.data.cta} previewBasePath={previewBasePath} seed={seed} />
      </div>
    </section>
  );
}

function KeyFactsGridSection({
  section,
  styleKey,
  domSectionId
}: {
  section: SectionInstance;
  styleKey: StyleKey;
  domSectionId: string;
}) {
  const headline = asSplit(section.data.headline);
  const items = arrayItems(section.data.items);
  return (
    <section className={`tenant-pro-keyfacts tenant-pro-keyfacts--${styleKey}`} id={domSectionId}>
      <div className="shell">
        <p className="eyebrow">{asString(section.data.eyebrow)}</p>
        <h2 className="tenant-section-title">
          <SplitHeading plain={headline.plain} accent={headline.accent} />
        </h2>
        <div className="tenant-pro-keyfacts__grid">
          {items.map((row, i) => (
            <article key={i} className="tenant-pro-keyfacts__card">
              {asString(row.icon) ? (
                <span className="tenant-pro-keyfacts__icon" aria-hidden>
                  {asString(row.icon)}
                </span>
              ) : null}
              <h3>{asString(row.title)}</h3>
              <p>{asString(row.detail)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoEmbedSection({
  section,
  styleKey,
  domSectionId
}: {
  section: SectionInstance;
  styleKey: StyleKey;
  domSectionId: string;
}) {
  const headline = asSplit(section.data.headline);
  const id = youtubeVideoId(asString(section.data.embedUrl));
  return (
    <section className={`tenant-section tenant-pro-vid tenant-pro-vid--${styleKey}`} id={domSectionId}>
      <div className="shell">
        <p className="eyebrow">{asString(section.data.eyebrow)}</p>
        <h2 className="tenant-section-title">
          <SplitHeading plain={headline.plain} accent={headline.accent} />
        </h2>
        {id ? (
          <div className="tenant-pro-vid__frame">
            <iframe
              title={headline.plain || 'Video'}
              src={`https://www.youtube-nocookie.com/embed/${id}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : (
          <p className="tenant-section-intro">Bitte eine gültige YouTube-URL hinterlegen.</p>
        )}
        {asString(section.data.caption) ? <p className="tenant-pro-vid__caption">{asString(section.data.caption)}</p> : null}
      </div>
    </section>
  );
}

function PullQuoteBlockSection({
  section,
  styleKey,
  domSectionId
}: {
  section: SectionInstance;
  styleKey: StyleKey;
  domSectionId: string;
}) {
  return (
    <section className={`tenant-pro-pull tenant-pro-pull--${styleKey}`} id={domSectionId}>
      <div className="shell tenant-pro-pull__inner">
        <blockquote className="tenant-pro-pull__quote">{asString(section.data.quote)}</blockquote>
        <footer className="tenant-pro-pull__meta">
          {asString(section.data.attribution) ? <strong>{asString(section.data.attribution)}</strong> : null}
          {asString(section.data.role) ? <span>{asString(section.data.role)}</span> : null}
        </footer>
      </div>
    </section>
  );
}

function StepsStripSection({
  section,
  styleKey,
  domSectionId
}: {
  section: SectionInstance;
  styleKey: StyleKey;
  domSectionId: string;
}) {
  const headline = asSplit(section.data.headline);
  const steps = arrayItems(section.data.steps);
  return (
    <section className={`tenant-pro-steps-strip tenant-pro-steps-strip--${styleKey}`} id={domSectionId}>
      <div className="shell">
        <p className="eyebrow">{asString(section.data.eyebrow)}</p>
        <h2 className="tenant-section-title">
          <SplitHeading plain={headline.plain} accent={headline.accent} />
        </h2>
        <ol className="tenant-pro-steps-strip__list">
          {steps.map((row, i) => (
            <li key={i} className="tenant-pro-steps-strip__item">
              {asString(row.label) ? <span className="tenant-pro-steps-strip__label">{asString(row.label)}</span> : null}
              <h3>{asString(row.title)}</h3>
              {asString(row.body) ? <p>{asString(row.body)}</p> : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FeatureCompareSection({
  section,
  styleKey,
  domSectionId
}: {
  section: SectionInstance;
  styleKey: StyleKey;
  domSectionId: string;
}) {
  const headline = asSplit(section.data.headline);
  const rows = arrayItems(section.data.rows);
  const colUs = asString(section.data.columnUs) || 'Du';
  const colThem = asString(section.data.columnThem) || 'Typisch';
  return (
    <section className={`tenant-section tenant-pro-compare tenant-pro-compare--${styleKey}`} id={domSectionId}>
      <div className="shell">
        <p className="eyebrow">{asString(section.data.eyebrow)}</p>
        <h2 className="tenant-section-title">
          <SplitHeading plain={headline.plain} accent={headline.accent} />
        </h2>
        <div className="tenant-pro-compare__wrap">
          <table className="tenant-pro-compare__table">
            <thead>
              <tr>
                <th>Merkmal</th>
                <th>{colUs}</th>
                <th>{colThem}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td>{asString(row.feature)}</td>
                  <td>{asString(row.us)}</td>
                  <td>{asString(row.them)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function CtaButton({
  value,
  secondary,
  compact,
  previewBasePath,
  seed
}: {
  value: unknown;
  secondary?: boolean;
  compact?: boolean;
  previewBasePath: string;
  seed: SiteSeed;
}) {
  if (!isRecord(value)) return null;
  const label = asString(value.label);
  if (!label) return null;
  const link = isRecord(value.link) ? value.link : {};
  const href = resolveCtaLinkHref(link, seed, previewBasePath);
  const className = `tenant-button ${secondary ? 'secondary' : ''} ${compact ? 'compact' : ''}`.trim();

  if (href.startsWith('/') && !href.startsWith('//')) {
    return (
      <Link href={href} className={className}>
        {label}
      </Link>
    );
  }

  return (
    <a className={className} href={href}>
      {label}
    </a>
  );
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function asSplit(value: unknown): { plain: string; accent: string } {
  if (!isRecord(value)) return { plain: '', accent: '' };
  return {
    plain: asString(value.plain),
    accent: asString(value.accent)
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
