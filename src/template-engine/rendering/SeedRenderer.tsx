'use client';

import type { CSSProperties } from 'react';
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
    <main className={`tenant-preview tenant-preview--${styleKey}`} style={accentStyle}>
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
        <img src={image} alt="" />
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
            <img src={image} alt="" />
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
              <img src={item.src} alt={item.alt} loading="lazy" />
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
      {styleKey === 'bold' && image ? <img className="tenant-hero-bg" src={image} alt="" /> : null}
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
          <div className="tenant-hero-image">
            <img src={image} alt="" />
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
        <div className="tenant-card-grid">
          {items.map((item) => {
            const inner = (
              <>
                {asString(item.data.image) ? <img src={asString(item.data.image)} alt="" /> : null}
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
    <section className="tenant-section tenant-soft" id={domSectionId}>
      <div className="shell">
        <p className="eyebrow">{asString(section.data.eyebrow)}</p>
        <h2 className="tenant-section-title">
          <SplitHeading plain={headline.plain} accent={headline.accent} />
        </h2>
        <div className="tenant-card-grid" style={{ gridTemplateColumns: '1fr' }}>
          {items.map((raw, index) => {
            const item = isRecord(raw) ? raw : {};
            return (
              <article className="tenant-card" key={index} style={{ textAlign: 'left' }}>
                <h3 style={{ marginTop: 0 }}>{asString(item.question)}</h3>
                <div className="tenant-body-text">{asString(item.answer)}</div>
              </article>
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
                    <img src={logo} alt="" loading="lazy" />
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
                    <img src={img} alt="" loading="lazy" />
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
