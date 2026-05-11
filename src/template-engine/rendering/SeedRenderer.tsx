'use client';

import { useState, type CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { PageInstance, SectionInstance, StyleKey } from '../model';
import { resolveCtaLinkHref } from '../link-resolution';
import { sectionAnchorId } from '../section-anchor';
import type { CollectionSeedItem, SiteSeed } from '../seeds/model';
import { TiltHoverCard } from '@/ui/marketing/TiltHoverCard';
import { resolveTenantTheme } from '../theme-presets';

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
  const theme = resolveTenantTheme(seed);
  const effectiveAccentHex = accentHex && accentHex.length > 0 ? accentHex : asString(seed.global.brand.accentHex) || theme?.accent || '';
  const accentStyle = {
    ...(theme
      ? {
          ['--tenant-bg']: theme.bg,
          ['--tenant-fg']: theme.text,
          ['--tenant-muted']: readableMuted(theme.bg),
          ['--tenant-line']: readableLine(theme.bg),
          ['--tenant-soft']: theme.surface,
          ['--tenant-primary']: theme.primary,
          ['--tenant-primary-fg']: theme.primaryFg,
          ['--tenant-button-fg']: theme.accentFg ?? theme.primaryFg
        }
      : {}),
    ...(effectiveAccentHex.length > 0 ? previewColorVars(effectiveAccentHex, styleKey) : {})
  } as CSSProperties;

  return (
    <div className="tenant-site-wrap" data-industry={seed.industryKey} data-style={styleKey} style={accentStyle}>
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
    case 'restaurant.deepDives':
    case 'hotel.deepDives':
    case 'tourism.deepDives':
    case 'salon.deepDives':
    case 'tradesman.deepDives':
    case 'consulting.deepDives':
    case 'medical.deepDives':
    case 'fitness.deepDives':
    case 'wedding.deepDives':
    case 'global.newsTeaser':
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
      return <RsvpSection section={section} domSectionId={domSectionId} />;
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
        <div className="tenant-page-hero__media-frame">
          <Image src={image} alt="" fill className="tenant-page-hero__media-img" sizes="100vw" priority unoptimized />
        </div>
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
            <div className="tenant-split__visual-frame">
              <Image src={image} alt="" fill className="tenant-split__visual-img" sizes="(max-width: 900px) 100vw, 45vw" unoptimized />
            </div>
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
              <div className="tenant-gallery-cell__frame">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="tenant-gallery-img"
                  sizes="(max-width: 900px) 50vw, 33vw"
                  loading="lazy"
                  unoptimized
                />
              </div>
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
  const address = asString(section.data.address) || asString(contact.address);
  const phone = asString(section.data.phone) || asString(contact.phone);
  const email = asString(section.data.email) || asString(contact.email);
  const openingHours = asString(section.data.openingHours) || asString(contact.openingHours);
  const mapsUrl = asString(section.data.mapsUrl) || asString(contact.mapsUrl);
  const mapQuery = encodeURIComponent(address || seed.global.brand.name);
  const primaryLabel = asString(section.data.primaryActionLabel);
  const secondaryLabel = asString(section.data.secondaryActionLabel);
  const locations = arrayRecords(section.data.locations).filter((location) =>
    [location.name, location.address, location.city, location.phone, location.email, location.mapsUrl].some((value) =>
      Boolean(asString(value))
    )
  );
  const arrival = arrayRecords(section.data.arrival);

  return (
    <section className="tenant-section tenant-soft tenant-contact-pro" id={domSectionId}>
      <div className="shell tenant-contact-pro__shell">
        <div className="tenant-contact-pro__intro">
          <span className="tenant-contact-pro__line" aria-hidden />
          <p className="eyebrow">{asString(section.data.eyebrow)}</p>
          <h2 className="tenant-section-title">
            <SplitHeading plain={headline.plain} accent={headline.accent} />
          </h2>
          {asString(section.data.subline) ? <p className="tenant-section-intro">{asString(section.data.subline)}</p> : null}
        </div>
        <div className="tenant-contact-pro__grid">
          <TiltHoverCard className="tenant-tilt--card">
            <article className="tenant-contact-card tenant-contact-card--primary">
              <p className="eyebrow">Direkt</p>
              <h3>{seed.global.brand.name}</h3>
              <dl>
                {address ? <><dt>Adresse</dt><dd>{address}</dd></> : null}
                {phone ? <><dt>Telefon</dt><dd><a href={`tel:${phone}`}>{phone}</a></dd></> : null}
                {email ? <><dt>E-Mail</dt><dd><a href={`mailto:${email}`}>{email}</a></dd></> : null}
                {openingHours ? <><dt>Zeiten</dt><dd>{openingHours}</dd></> : null}
              </dl>
              <div className="tenant-contact-card__actions">
                {phone && primaryLabel ? <a className="tenant-button" href={`tel:${phone}`}>{primaryLabel}</a> : null}
                {email && secondaryLabel ? <a className="tenant-button secondary" href={`mailto:${email}`}>{secondaryLabel}</a> : null}
              </div>
            </article>
          </TiltHoverCard>
          <ContactMapVisual
            href={mapsUrl || `https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
            label="Karte öffnen"
            detail={address || seed.global.brand.name}
          />
        </div>
        {locations.length > 0 ? (
          <div className="tenant-contact-locations" data-stagger-grid>
            {locations.map((location, index) => {
              const locationAddress = [asString(location.address), asString(location.city)].filter(Boolean).join(' · ');
              const locationMap =
                asString(location.mapsUrl) ||
                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationAddress || asString(location.name) || seed.global.brand.name)}`;
              return (
                <article className="tenant-contact-mini" key={index}>
                  <div className="tenant-contact-mini__body">
                    <strong>{asString(location.name) || `Standort ${index + 1}`}</strong>
                    {locationAddress ? <span>{locationAddress}</span> : null}
                    {asString(location.phone) ? <a href={`tel:${asString(location.phone)}`}>{asString(location.phone)}</a> : null}
                    {asString(location.email) ? <a href={`mailto:${asString(location.email)}`}>{asString(location.email)}</a> : null}
                  </div>
                  <ContactMapVisual href={locationMap} label="Route" detail={locationAddress || asString(location.name)} compact />
                </article>
              );
            })}
          </div>
        ) : null}
        {arrival.length > 0 ? (
          <div className="tenant-arrival-strip">
            {arrival.map((item, index) => (
              <span key={index}>
                <b>{asString(item.title) || asString(item.t)}</b>
                {asString(item.body) || asString(item.d)}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ContactMapVisual({
  href,
  label,
  detail,
  compact = false
}: {
  href: string;
  label: string;
  detail: string;
  compact?: boolean;
}) {
  const embedUrl = toGoogleMapsEmbedUrl(href);
  if (embedUrl) {
    return (
      <div className={compact ? 'tenant-contact-map tenant-contact-map--mini' : 'tenant-contact-map'}>
        <iframe src={embedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={detail || label} />
        <a className="tenant-contact-map__overlay" href={href} target="_blank" rel="noreferrer">
          <span>{label}</span>
          {detail ? <small>{detail}</small> : null}
        </a>
      </div>
    );
  }

  return (
    <div className={compact ? 'tenant-contact-map tenant-contact-map--mini' : 'tenant-contact-map'}>
      <a
        className="tenant-contact-map__inner"
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={`${label} in Google Maps öffnen`}
      >
        <span>{label}</span>
        {detail ? <small>{detail}</small> : null}
      </a>
    </div>
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
            <div className="tenant-hero-image-frame">
              <Image
                src={image}
                alt=""
                fill
                className="tenant-hero-image-img"
                sizes="(max-width: 900px) 100vw, 42vw"
                priority
                unoptimized
              />
            </div>
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
    'restaurant.deepDives': '/insights',
    'hotel.roomHighlights': '/zimmer',
    'hotel.offers': '/angebote',
    'hotel.deepDives': '/insights',
    'tourism.tourHighlights': '/touren',
    'tourism.deepDives': '/insights',
    'salon.treatmentHighlights': '/leistungen',
    'salon.lookbook': '/looks',
    'salon.deepDives': '/insights',
    'tradesman.serviceOverview': '/leistungen',
    'tradesman.references': '/referenzen',
    'tradesman.deepDives': '/insights',
    'consulting.offerOverview': '/leistungen',
    'consulting.caseStudies': '/cases',
    'consulting.deepDives': '/insights',
    'medical.treatmentOverview': '/leistungen',
    'medical.doctorTeam': '/team',
    'medical.deepDives': '/insights',
    'fitness.classOverview': '/kurse',
    'fitness.trainingPlan': '/kurse',
    'fitness.trainerTeam': '/trainer',
    'fitness.deepDives': '/insights',
    'wedding.schedule': '/ablauf',
    'wedding.accommodation': '/unterkunft',
    'wedding.deepDives': '/insights',
    'global.newsTeaser': '/news'
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
  const limit = Math.max(1, Number(section.data.limit) || itemIds.length || 4);
  const items = itemIds
    .map((id) => seed.collections.find((item) => item.id === id))
    .filter((item): item is CollectionSeedItem => Boolean(item))
    .slice(0, limit);
  const prefix = collectionDetailPrefix(section.sectionKey);
  const isDeepDive = section.sectionKey.endsWith('.deepDives');
  const isNews = section.sectionKey === 'global.newsTeaser';

  return (
    <section
      className={isDeepDive ? 'tenant-section tenant-deep-dive-section' : isNews ? 'tenant-section tenant-news-section' : 'tenant-section'}
      id={domSectionId}
    >
      <div className="shell">
        <p className="eyebrow">{asString(section.data.eyebrow)}</p>
        <h2 className="tenant-section-title">
          <SplitHeading plain={headline.plain} accent={headline.accent} />
        </h2>
        <p className="tenant-section-intro">{asString(section.data.intro)}</p>
        <div className="tenant-card-grid tenant-card-grid--motion" data-stagger-grid>
          {items.map((item) => {
            const meta = collectionMetaItems(item);
            const facts = collectionCardFacts(item);
            const inner = (
              <>
                {asString(item.data.image) ? (
                  <div className="tenant-card__media">
                    <Image
                      src={asString(item.data.image)}
                      alt=""
                      fill
                      className="tenant-card-img"
                      sizes="(max-width: 900px) 100vw, 32vw"
                      loading="lazy"
                      unoptimized
                    />
                  </div>
                ) : null}
                <div>
                  {meta.length > 0 ? (
                    <p className="tenant-card__meta" aria-label="Details">
                      {meta.map((entry) => (
                        <span key={entry}>{entry}</span>
                      ))}
                    </p>
                  ) : null}
                  <h3>{item.title}</h3>
                  <p>{asString(item.data.summary)}</p>
                  {facts.length > 0 ? (
                    <dl className="tenant-card__facts" aria-label="CMS-Fakten">
                      {facts.map((fact) => (
                        <div key={`${fact.label}-${fact.value}`}>
                          <dt>{fact.label}</dt>
                          <dd>{fact.value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}
                  <span className="tenant-card__more" aria-hidden>
                    Details ansehen
                  </span>
                </div>
              </>
            );

            if (prefix) {
              return (
                <TiltHoverCard key={item.id} className="tenant-tilt--card">
                  <Link className="tenant-card tenant-card--link" href={`${previewBasePath}${prefix}/${item.slug}`}>
                    {inner}
                  </Link>
                </TiltHoverCard>
              );
            }

            return (
              <TiltHoverCard key={item.id} className="tenant-tilt--card">
                <article className="tenant-card">
                  {inner}
                </article>
              </TiltHoverCard>
            );
          })}
        </div>
        {isNews ? (
          <div className="tenant-section-actions">
            <CtaButton value={section.data.cta} previewBasePath={previewBasePath} seed={seed} secondary />
          </div>
        ) : null}
      </div>
    </section>
  );
}

function collectionMetaItems(item: CollectionSeedItem): string[] {
  return [
    asString(item.data.kicker),
    asString(item.data.category),
    formatDate(asString(item.data.publishedAt)),
    asString(item.data.author),
    asString(item.data.metric),
    asString(item.data.detail),
    asString(item.data.readTime),
    asString(item.data.price),
    asString(item.data.priceFrom),
    asString(item.data.duration),
    asString(item.data.capacity),
    asString(item.data.occupancy),
    asString(item.data.difficulty),
    asString(item.data.time),
    asString(item.data.weekday),
    asString(item.data.level),
    asString(item.data.trainer)
  ].filter(Boolean).slice(0, 3);
}

function collectionCardFacts(item: CollectionSeedItem): Array<{ label: string; value: string }> {
  const data = item.data;
  const candidates: Array<[string, unknown]> = [
    ['Preis', data.price],
    ['Preis ab', data.priceFrom],
    ['Dauer', data.duration],
    ['Kapazität', data.capacity],
    ['Kategorie', data.category],
    ['Belegung', data.occupancy],
    ['Bett', data.bedType],
    ['Ausblick', data.view],
    ['Fläche', data.sizeSqm ? `${asString(data.sizeSqm)} m²` : ''],
    ['Level', data.level ?? data.difficulty],
    ['Termin', data.schedule ?? data.scheduleInfo],
    ['Treffpunkt', data.meetingPoint],
    ['Ort', data.location],
    ['Zeitraum', data.travelPeriod],
    ['Zielgruppe', data.targetAudience],
    ['Versicherung', data.coveredByInsurance],
    ['Inklusive', previewListValue(data.included)],
    ['Ausstattung', previewListValue(data.amenities)],
    ['Ziele', previewListValue(data.goals)],
    ['Tags', previewListValue(data.dietaryTags ?? data.styleTags)],
    ['Sprachen', previewListValue(data.languages)],
    ['Schwerpunkte', previewListValue(data.specialties)],
    ['Gebiet', previewListValue(data.serviceArea)],
    ['Zutaten', previewListValue(data.ingredients)],
    ['Allergene', asString(data.allergens)],
    ['Pairing', asString(data.pairingRecommendation)],
    ['Packliste', previewListValue(data.packingList)],
    ['Voraussetzungen', previewListValue(data.requirements)],
    ['Sprechzeiten', asString(data.consultationHours)],
    ['Zertifikate', asString(data.certifications)],
    ['Equipment', asString(data.equipmentNeeded)],
    ['Trainingsziel', asString(data.goals)],
    ['Deliverables', previewListValue(data.deliverables)],
    ['Kennzahlen', previewMetricsLine(data.metrics)]
  ];

  const seen = new Set<string>();
  return candidates
    .map(([label, value]) => ({ label, value: asString(value) }))
    .filter((fact) => {
      const key = `${fact.label}:${fact.value}`;
      if (!fact.value || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 4);
}

function previewListValue(value: unknown): string {
  if (!Array.isArray(value)) return '';
  return value
    .map((entry) => {
      if (typeof entry === 'string') return entry;
      if (entry && typeof entry === 'object' && 'value' in entry) {
        return asString((entry as { value?: unknown }).value);
      }
      return asString(entry);
    })
    .filter(Boolean)
    .slice(0, 2)
    .join(' · ');
}

function previewMetricsLine(value: unknown): string {
  if (!Array.isArray(value)) return '';
  return value
    .map((row) => {
      if (!row || typeof row !== 'object') return '';
      const lab = asString((row as { label?: unknown }).label);
      const val = asString((row as { value?: unknown }).value);
      if (lab && val) return `${lab}: ${val}`;
      return lab || val;
    })
    .filter(Boolean)
    .slice(0, 2)
    .join(' · ');
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
  domSectionId
}: {
  section: SectionInstance;
  domSectionId: string;
}) {
  const headline = asSplit(section.data.headline);
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="tenant-section tenant-rsvp-section" id={domSectionId}>
      <div className="shell tenant-rsvp-grid">
        <div>
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
        </div>
        <form
          className="tenant-rsvp-form"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <label>
            <span>{asString(section.data.nameLabel) || 'Name'}</span>
            <input required name="name" autoComplete="name" />
          </label>
          <label>
            <span>{asString(section.data.attendanceLabel) || 'Teilnahme'}</span>
            <select required name="attendance" defaultValue="yes">
              <option value="yes">Ja, ich bin dabei</option>
              <option value="no">Leider nein</option>
              <option value="maybe">Ich klaere es noch</option>
            </select>
          </label>
          <label>
            <span>{asString(section.data.guestCountLabel) || 'Anzahl Personen'}</span>
            <input min={1} name="guestCount" type="number" defaultValue={1} />
          </label>
          <label>
            <span>{asString(section.data.dietaryLabel) || 'Essen / Allergien'}</span>
            <input name="dietary" placeholder="z. B. vegetarisch, glutenfrei" />
          </label>
          <label className="tenant-rsvp-form__wide">
            <span>{asString(section.data.noteLabel) || 'Nachricht'}</span>
            <textarea name="note" rows={4} />
          </label>
          <button className="tenant-button" type="submit">
            {asString(section.data.submitLabel) || asString(isRecord(section.data.cta) ? section.data.cta.label : '') || 'Antwort senden'}
          </button>
          {submitted ? (
            <p className="tenant-rsvp-form__success" role="status">
              {asString(section.data.successMessage) || 'Danke, deine Antwort wurde erfasst.'}
            </p>
          ) : null}
        </form>
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
              <TiltHoverCard key={i} className="tenant-tilt--bento">
                <article className={`tenant-wow-bento__tile ${span}`}>
                  {img ? (
                    <div className="tenant-wow-bento__visual">
                      <Image src={img} alt="" fill className="tenant-bento-img" sizes="(max-width: 900px) 100vw, 33vw" loading="lazy" unoptimized />
                      <div className="tenant-wow-bento__shade" />
                    </div>
                  ) : null}
                  <div className="tenant-wow-bento__body">
                    {asString(row.kicker) ? <p className="tenant-wow-bento__kicker">{asString(row.kicker)}</p> : null}
                    <h3>{asString(row.title)}</h3>
                    {asString(row.body) ? <p>{asString(row.body)}</p> : null}
                  </div>
                </article>
              </TiltHoverCard>
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
                    <Image src={img} alt="" fill className="tenant-scroller-img" sizes="320px" loading="lazy" unoptimized />
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
            <TiltHoverCard key={i} className="tenant-tilt--card">
              <article className="tenant-pro-icon__card">
                <span className="tenant-pro-icon__glyph" aria-hidden>
                  {asString(row.icon)}
                </span>
                <h3>{asString(row.title)}</h3>
                {asString(row.body) ? <p>{asString(row.body)}</p> : null}
                <CtaButton value={row.cta} previewBasePath={previewBasePath} seed={seed} />
              </article>
            </TiltHoverCard>
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
      <div className="tenant-split__visual-frame">
        <Image
          src={image}
          alt=""
          fill
          className="tenant-split__visual-img"
          sizes="(max-width: 900px) 100vw, 45vw"
          unoptimized
        />
      </div>
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
              <TiltHoverCard key={i} className="tenant-tilt--card">
                <article className={`tenant-pro-pricing__card${hi ? ' tenant-pro-pricing__card--hi' : ''}`}>
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
              </TiltHoverCard>
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

function formatDate(value: string): string {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
}

function arrayRecords(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value) ? value.filter((item): item is Record<string, unknown> => isRecord(item)) : [];
}

function readableMuted(bg: string): string {
  return isDarkHex(bg) ? 'rgba(255,255,255,0.72)' : '#6b6b76';
}

function previewColorVars(accent: string, styleKey: StyleKey): Record<string, string> {
  const darkAccent = isDarkHex(accent);
  if (styleKey === 'bold') {
    return {
      ['--tenant-accent']: accent,
      ['--tenant-primary']: accent,
      ['--tenant-bg']: `color-mix(in oklab, ${accent}, #050507 88%)`,
      ['--tenant-fg']: '#ffffff',
      ['--tenant-muted']: 'rgba(255,255,255,0.72)',
      ['--tenant-line']: 'rgba(255,255,255,0.18)',
      ['--tenant-soft']: `color-mix(in oklab, ${accent}, #050507 76%)`,
      ['--tenant-button-fg']: darkAccent ? '#ffffff' : '#14111a'
    };
  }
  if (styleKey === 'modern') {
    return {
      ['--tenant-accent']: accent,
      ['--tenant-primary']: accent,
      ['--tenant-bg']: `color-mix(in oklab, ${accent}, #f8fafc 93%)`,
      ['--tenant-fg']: '#101418',
      ['--tenant-muted']: '#5f6872',
      ['--tenant-line']: `color-mix(in oklab, ${accent}, #d7dde4 72%)`,
      ['--tenant-soft']: `color-mix(in oklab, ${accent}, #ffffff 90%)`,
      ['--tenant-button-fg']: darkAccent ? '#ffffff' : '#101418'
    };
  }
  return {
    ['--tenant-accent']: accent,
    ['--tenant-primary']: accent,
    ['--tenant-bg']: `color-mix(in oklab, ${accent}, #fff8f0 94%)`,
    ['--tenant-fg']: '#221510',
    ['--tenant-muted']: '#75665c',
    ['--tenant-line']: `color-mix(in oklab, ${accent}, #eadfd6 68%)`,
    ['--tenant-soft']: `color-mix(in oklab, ${accent}, #fffaf4 88%)`,
    ['--tenant-button-fg']: darkAccent ? '#ffffff' : '#221510'
  };
}

function readableLine(bg: string): string {
  return isDarkHex(bg) ? 'rgba(255,255,255,0.18)' : 'rgba(11,11,16,0.11)';
}

function isDarkHex(hex: string): boolean {
  const m = hex.replace('#', '');
  const v = m.length === 3 ? m.split('').map((c) => c + c).join('') : m;
  const r = parseInt(v.slice(0, 2), 16);
  const g = parseInt(v.slice(2, 4), 16);
  const b = parseInt(v.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}

function asSplit(value: unknown): { plain: string; accent: string } {
  if (!isRecord(value)) return { plain: '', accent: '' };
  return {
    plain: asString(value.plain),
    accent: asString(value.accent)
  };
}

function toGoogleMapsEmbedUrl(url: string): string {
  if (!url) return '';

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    const isGoogleMaps =
      host === 'maps.app.goo.gl' ||
      host.includes('google.') ||
      host === 'maps.google.com' ||
      host === 'www.google.com';

    if (!isGoogleMaps) return '';
    if (/\/maps\/embed/i.test(parsed.pathname)) return url;

    const query =
      parsed.searchParams.get('q') ??
      parsed.searchParams.get('query') ??
      parsed.searchParams.get('destination') ??
      parsed.searchParams.get('daddr');

    if (query) {
      return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
    }

    const placeMatch = parsed.pathname.match(/\/maps\/place\/([^/]+)/i);
    if (placeMatch?.[1]) {
      const place = decodeURIComponent(placeMatch[1]).replace(/\+/g, ' ');
      return `https://www.google.com/maps?q=${encodeURIComponent(place)}&output=embed`;
    }
  } catch {
    return '';
  }

  return '';
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
