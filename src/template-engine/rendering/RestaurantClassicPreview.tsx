'use client';

import type { CSSProperties, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import type { FieldDefinition, SectionInstance, StyleKey } from '../model';
import { getSection } from '../registry';
import { resolveCtaLinkHref } from '../link-resolution';
import type { SiteSeed } from '../seeds/model';
import { ViewportReveal } from '@/ui/motion/ViewportReveal';
import {
  rcEase,
  rcHeroContainer,
  rcHeroItem,
  rcStaggerContainer,
  rcStaggerItem
} from '@/ui/motion/rc-motion-variants';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function asSplit(value: unknown): { plain: string; accent: string } {
  if (!isRecord(value)) return { plain: '', accent: '' };
  return { plain: asString(value.plain), accent: asString(value.accent) };
}

function SplitHeading({ plain, accent }: { plain: string; accent: string }) {
  if (!accent) return <>{plain}</>;
  return (
    <>
      {plain} <em>{accent}</em>
    </>
  );
}

function RcCta({
  value,
  secondary,
  previewBasePath,
  seed
}: {
  value: unknown;
  secondary?: boolean;
  previewBasePath: string;
  seed: SiteSeed;
}) {
  if (!isRecord(value)) return null;
  const label = asString(value.label);
  if (!label) return null;
  const link = isRecord(value.link) ? value.link : {};
  const href = resolveCtaLinkHref(link, seed, previewBasePath);
  const className = `tenant-button ${secondary ? 'secondary' : ''}`.trim();
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

function renderFieldValue(
  field: FieldDefinition,
  value: unknown,
  seed: SiteSeed,
  previewBasePath: string,
  depth: number
): ReactNode {
  if (depth > 8) return null;

  switch (field.type) {
    case 'text':
    case 'url':
    case 'email':
    case 'phone':
    case 'date':
    case 'time':
      return asString(value) ? <p className="tenant-body">{asString(value)}</p> : null;
    case 'number':
      return value !== undefined && value !== null && value !== '' ? <p className="tenant-body">{String(value)}</p> : null;
    case 'textarea':
    case 'richText':
    case 'openingHours':
    case 'socialLinks':
      return asString(value) ? (
        <div className="tenant-body tenant-body-text" style={{ whiteSpace: 'pre-wrap' }}>
          {asString(value)}
        </div>
      ) : null;
    case 'boolean':
      return null;
    case 'select':
    case 'multiSelect':
      return Array.isArray(value) ? (
        <p className="tenant-body">{(value as unknown[]).map(String).join(', ')}</p>
      ) : asString(value) ? (
        <p className="tenant-body">{asString(value)}</p>
      ) : null;
    case 'splitHeading': {
      const h = asSplit(value);
      return h.plain || h.accent ? (
        <h3 className="tenant-section-title rc-title rc-title--md">
          <SplitHeading plain={h.plain} accent={h.accent} />
        </h3>
      ) : null;
    }
    case 'image': {
      const url = asString(value);
      return url ? (
        <figure className="rc-media">
          <div className="rc-media__frame">
            <Image src={url} alt="" fill className="rc-media__img" sizes="(max-width:900px) 100vw, 720px" unoptimized />
          </div>
        </figure>
      ) : null;
    }
    case 'gallery': {
      const rows = Array.isArray(value) ? value : [];
      const imgs = rows.map((entry) => {
        if (typeof entry === 'string') return { url: entry, alt: '' };
        if (isRecord(entry)) {
          return { url: asString(entry.url) || asString(entry.src) || asString(entry.image), alt: asString(entry.alt) };
        }
        return { url: '', alt: '' };
      });
      return <RcGalleryMotion imgs={imgs} />;
    }
    case 'cta':
      return <RcCta value={value} previewBasePath={previewBasePath} seed={seed} />;
    case 'link': {
      if (!isRecord(value)) return null;
      const href = resolveCtaLinkHref(value, seed, previewBasePath);
      if (!href || href === '#') return null;
      const lab = asString(value.label) || href;
      return href.startsWith('/') && !href.startsWith('//') ? (
        <Link className="tenant-button secondary" href={href}>
          {lab}
        </Link>
      ) : (
        <a className="tenant-button secondary" href={href}>
          {lab}
        </a>
      );
    }
    case 'address': {
      if (!isRecord(value)) return null;
      const lines = [asString(value.street), asString(value.postalCode), asString(value.city), asString(value.countryCode)].filter(
        Boolean
      );
      return lines.length ? (
        <address className="tenant-body rc-address">{lines.join(', ')}</address>
      ) : null;
    }
    case 'group': {
      const g = isRecord(value) ? value : {};
      return (
        <div className="tenant-rc-group rc-field-group">
          {(field.fields ?? []).map((child) => (
            <div key={child.key} className="rc-field-group__row">
              <strong className="rc-field-group__label">{child.label}</strong>
              {renderFieldValue(child, g[child.key], seed, previewBasePath, depth + 1)}
            </div>
          ))}
        </div>
      );
    }
    case 'repeater': {
      const items = Array.isArray(value) ? value.filter(isRecord) : [];
      if (items.length === 0) return null;
      return <RcRepeaterMotion field={field} items={items} seed={seed} previewBasePath={previewBasePath} depth={depth} />;
    }
    case 'collectionReference':
    case 'collectionReferenceList':
    case 'seo':
      return null;
    default:
      return null;
  }
}

function RcGalleryMotion({ imgs }: { imgs: { url: string; alt: string }[] }) {
  const reduce = useReducedMotion();
  const list = imgs.filter((i) => i.url);
  const className = 'tenant-gallery-grid rc-gallery';
  if (list.length === 0) return null;
  if (reduce) {
    return (
      <div className={className}>
        {list.map((item, i) => (
          <figure className="tenant-gallery-cell rc-gallery__cell" key={`${item.url}-${i}`}>
            <div className="tenant-gallery-cell__frame rc-gallery__frame">
              <Image src={item.url} alt={item.alt || ''} width={800} height={600} className="tenant-gallery-img" unoptimized />
            </div>
          </figure>
        ))}
      </div>
    );
  }
  return (
    <motion.div
      className={className}
      variants={rcStaggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.08 }}
    >
      {list.map((item, i) => (
        <motion.figure
          key={`${item.url}-${i}`}
          className="tenant-gallery-cell rc-gallery__cell"
          variants={rcStaggerItem}
          layout={false}
        >
          <div className="tenant-gallery-cell__frame rc-gallery__frame">
            <Image src={item.url} alt={item.alt || ''} width={800} height={600} className="tenant-gallery-img" unoptimized />
          </div>
        </motion.figure>
      ))}
    </motion.div>
  );
}

function RcRepeaterMotion({
  field,
  items,
  seed,
  previewBasePath,
  depth
}: {
  field: FieldDefinition;
  items: Record<string, unknown>[];
  seed: SiteSeed;
  previewBasePath: string;
  depth: number;
}) {
  const reduce = useReducedMotion();
  const className = `tenant-rc-repeater rc-repeater rc-repeater--${field.key}`;
  if (reduce) {
    return (
      <div className={className}>
        {items.map((row, idx) => (
          <article key={idx} className="tenant-card rc-card">
            {(field.itemFields ?? []).map((itemField) => (
              <div key={itemField.key} className="rc-card__field">
                {renderFieldValue(itemField, row[itemField.key], seed, previewBasePath, depth + 1)}
              </div>
            ))}
          </article>
        ))}
      </div>
    );
  }
  return (
    <motion.div
      className={className}
      variants={rcStaggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      {items.map((row, idx) => (
        <motion.article key={idx} className="tenant-card rc-card" variants={rcStaggerItem} layout={false}>
          {(field.itemFields ?? []).map((itemField) => (
            <div key={itemField.key} className="rc-card__field">
              {renderFieldValue(itemField, row[itemField.key], seed, previewBasePath, depth + 1)}
            </div>
          ))}
        </motion.article>
      ))}
    </motion.div>
  );
}

function RcFaqBlock({ section, domSectionId }: { section: SectionInstance; domSectionId: string }) {
  const headline = asSplit(section.data.headline);
  const items = Array.isArray(section.data.items) ? section.data.items : [];
  return (
    <ViewportReveal as="section" id={domSectionId} className="tenant-section tenant-soft tenant-faq-wrap rc-faq">
      <div className="shell rc-faq__inner">
        {asString(section.data.eyebrow) ? <p className="eyebrow">{asString(section.data.eyebrow)}</p> : null}
        <h2 className="tenant-section-title rc-title rc-title--lg">
          <SplitHeading plain={headline.plain} accent={headline.accent} />
        </h2>
        <div className="tenant-faq-accordion rc-faq__list">
          {items.map((raw, index) => {
            const item = isRecord(raw) ? raw : {};
            const q = asString(item.question);
            const a = asString(item.answer);
            return (
              <details key={index} className="tenant-faq-accordion__item">
                <summary className="tenant-faq-accordion__summary">{q}</summary>
                <div className="tenant-faq-accordion__panel tenant-body-text rc-prose">{a}</div>
              </details>
            );
          })}
        </div>
      </div>
    </ViewportReveal>
  );
}

function RcHero({
  section,
  styleKey,
  seed,
  previewBasePath,
  domSectionId
}: {
  section: SectionInstance;
  styleKey: StyleKey;
  seed: SiteSeed;
  previewBasePath: string;
  domSectionId: string;
}) {
  const headline = asSplit(section.data.headline);
  const bg = asString(section.data.backgroundImage);
  const overlay = typeof section.data.overlayStrength === 'number' ? section.data.overlayStrength : 35;
  const hasMedia = Boolean(bg);
  const scrimPct = Math.min(85, Math.max(0, overlay));
  const reduce = useReducedMotion();

  return (
    <section
      className={`tenant-hero tenant-hero--${styleKey} tenant-rc-hero${hasMedia ? ' tenant-rc-hero--has-media' : ''}`}
      id={domSectionId}
      style={hasMedia ? ({ ['--rc-hero-scrim' as string]: `${scrimPct}%` } as CSSProperties) : undefined}
    >
      {hasMedia ? (
        reduce ? (
          <div className="tenant-rc-hero__media tenant-hero-image--motion" aria-hidden>
            <Image src={bg} alt="" fill className="tenant-hero-image-img rc-hero__img" sizes="100vw" priority unoptimized />
            <div className="tenant-rc-hero__scrim" />
          </div>
        ) : (
          <motion.div
            className="tenant-rc-hero__media tenant-hero-image--motion"
            aria-hidden
            initial={{ scale: 1.07, opacity: 0.92 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: rcEase }}
          >
            <Image src={bg} alt="" fill className="tenant-hero-image-img rc-hero__img" sizes="100vw" priority unoptimized />
            <div className="tenant-rc-hero__scrim" />
          </motion.div>
        )
      ) : null}
      {reduce ? (
        <div className="shell tenant-hero-grid rc-hero__shell">
          <div className="rc-hero__copy">
            {asString(section.data.eyebrow) ? <p className="eyebrow">{asString(section.data.eyebrow)}</p> : null}
            <h1 className="rc-hero__title">
              <SplitHeading plain={headline.plain} accent={headline.accent} />
            </h1>
            {asString(section.data.subheadline) ? <p className="tenant-lead rc-hero__lead">{asString(section.data.subheadline)}</p> : null}
            {asString(section.data.bookingWidgetEmbed) ? (
              <div className="tenant-body rc-hero__embed-hint">
                {asString(section.data.bookingWidgetEmbed).slice(0, 120)}…
              </div>
            ) : null}
            <div className="tenant-actions rc-hero__actions">
              <RcCta value={section.data.primaryCta} previewBasePath={previewBasePath} seed={seed} />
              <RcCta value={section.data.secondaryCta} secondary previewBasePath={previewBasePath} seed={seed} />
            </div>
            {asString(section.data.scrollHintLabel) ? (
              <p className="eyebrow rc-hero__scroll-hint">{asString(section.data.scrollHintLabel)}</p>
            ) : null}
            {asString(section.data.badge) ? (
              <p className="rc-hero__badge-wrap">
                <span className="tenant-chip rc-hero__badge">{asString(section.data.badge)}</span>
              </p>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="shell tenant-hero-grid rc-hero__shell">
          <motion.div className="rc-hero__copy" variants={rcHeroContainer} initial="hidden" animate="visible">
            {asString(section.data.eyebrow) ? (
              <motion.p className="eyebrow" variants={rcHeroItem}>
                {asString(section.data.eyebrow)}
              </motion.p>
            ) : null}
            <motion.h1 className="rc-hero__title" variants={rcHeroItem}>
              <SplitHeading plain={headline.plain} accent={headline.accent} />
            </motion.h1>
            {asString(section.data.subheadline) ? (
              <motion.p className="tenant-lead rc-hero__lead" variants={rcHeroItem}>
                {asString(section.data.subheadline)}
              </motion.p>
            ) : null}
            {asString(section.data.bookingWidgetEmbed) ? (
              <motion.div className="tenant-body rc-hero__embed-hint" variants={rcHeroItem}>
                {asString(section.data.bookingWidgetEmbed).slice(0, 120)}…
              </motion.div>
            ) : null}
            <motion.div className="tenant-actions rc-hero__actions" variants={rcHeroItem}>
              <RcCta value={section.data.primaryCta} previewBasePath={previewBasePath} seed={seed} />
              <RcCta value={section.data.secondaryCta} secondary previewBasePath={previewBasePath} seed={seed} />
            </motion.div>
            {asString(section.data.scrollHintLabel) ? (
              <motion.p className="eyebrow rc-hero__scroll-hint" variants={rcHeroItem}>
                {asString(section.data.scrollHintLabel)}
              </motion.p>
            ) : null}
            {asString(section.data.badge) ? (
              <motion.p className="rc-hero__badge-wrap" variants={rcHeroItem}>
                <span className="tenant-chip rc-hero__badge">{asString(section.data.badge)}</span>
              </motion.p>
            ) : null}
          </motion.div>
        </div>
      )}
    </section>
  );
}

function RcAnnouncement({
  section,
  domSectionId,
  seed,
  previewBasePath
}: {
  section: SectionInstance;
  domSectionId: string;
  seed: SiteSeed;
  previewBasePath: string;
}) {
  if (section.data.enabled === false) return null;
  const tone = asString(section.data.tone) || 'info';
  const link = section.data.link;
  const href = isRecord(link) ? resolveCtaLinkHref(link, seed, previewBasePath) : '';
  return (
    <ViewportReveal
      as="section"
      id={domSectionId}
      className={`tenant-section tenant-rc-announcement rc-strip rc-strip--${tone}`}
    >
      <div className="shell rc-strip__inner">
        <p className="tenant-body rc-strip__message">{asString(section.data.message)}</p>
        {href && href !== '#' ? (
          href.startsWith('/') && !href.startsWith('//') ? (
            <Link className="tenant-button compact secondary" href={href}>
              Mehr
            </Link>
          ) : (
            <a className="tenant-button compact secondary" href={href}>
              Mehr
            </a>
          )
        ) : null}
      </div>
    </ViewportReveal>
  );
}

function RcReservationBand({
  section,
  seed,
  previewBasePath,
  domSectionId
}: {
  section: SectionInstance;
  seed: SiteSeed;
  previewBasePath: string;
  domSectionId: string;
}) {
  const headline = asSplit(section.data.headline);
  return (
    <ViewportReveal as="section" id={domSectionId} className="tenant-section tenant-rc-reservation rc-band">
      <div className="shell rc-band__inner">
        {asString(section.data.eyebrow) ? <p className="eyebrow">{asString(section.data.eyebrow)}</p> : null}
        <h2 className="tenant-section-title rc-title rc-title--lg">
          <SplitHeading plain={headline.plain} accent={headline.accent} />
        </h2>
        {asString(section.data.intro) ? <p className="tenant-section-intro">{asString(section.data.intro)}</p> : null}
        {asString(section.data.microcopy) ? <p className="tenant-body rc-band__micro">{asString(section.data.microcopy)}</p> : null}
        <div className="tenant-actions rc-band__actions">
          <RcCta value={section.data.primaryCta} previewBasePath={previewBasePath} seed={seed} />
          <RcCta value={section.data.secondaryCta} secondary previewBasePath={previewBasePath} seed={seed} />
        </div>
        {Array.isArray(section.data.channels) ? (
          <ul className="rc-band__channels">
            {(section.data.channels as unknown[]).filter(isRecord).map((ch, i) => (
              <li key={i} className="rc-band__channel">
                <span className="rc-band__channel-text">
                  <strong>{asString(ch.label)}</strong>
                  {asString(ch.sublabel) ? <span className="rc-band__channel-sub">{asString(ch.sublabel)}</span> : null}
                </span>
                <RcCta value={{ label: 'Öffnen', link: ch.link }} previewBasePath={previewBasePath} seed={seed} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </ViewportReveal>
  );
}

function RcTestimonials({
  section,
  domSectionId
}: {
  section: SectionInstance;
  domSectionId: string;
}) {
  const headline = asSplit(section.data.headline);
  const reviews = Array.isArray(section.data.reviews) ? section.data.reviews : [];
  const reduce = useReducedMotion();
  const list = reviews.filter(isRecord);
  const gridClass = 'tenant-card-grid rc-testimonials__grid';

  return (
    <ViewportReveal as="section" id={domSectionId} className="tenant-section rc-testimonials">
      <div className="shell rc-testimonials__inner">
        {asString(section.data.eyebrow) ? <p className="eyebrow">{asString(section.data.eyebrow)}</p> : null}
        <h2 className="tenant-section-title rc-title rc-title--lg">
          <SplitHeading plain={headline.plain} accent={headline.accent} />
        </h2>
        {reduce ? (
          <div className={gridClass}>
            {list.map((row, i) => (
              <figure key={i} className="tenant-quote rc-quote">
                <blockquote>{asString(row.quote)}</blockquote>
                <figcaption>
                  <strong>{asString(row.name)}</strong>
                  {asString(row.source) ? <span> · {asString(row.source)}</span> : null}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <motion.div
            className={gridClass}
            variants={rcStaggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
          >
            {list.map((row, i) => (
              <motion.figure key={i} className="tenant-quote rc-quote" variants={rcStaggerItem} layout={false}>
                <blockquote>{asString(row.quote)}</blockquote>
                <figcaption>
                  <strong>{asString(row.name)}</strong>
                  {asString(row.source) ? <span> · {asString(row.source)}</span> : null}
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        )}
      </div>
    </ViewportReveal>
  );
}

function RcGenericSection({
  section,
  seed,
  previewBasePath,
  domSectionId
}: {
  section: SectionInstance;
  seed: SiteSeed;
  previewBasePath: string;
  domSectionId: string;
}) {
  const def = getSection(section.sectionKey);
  const rcSlug = section.sectionKey.replace(/^restaurantClassic\./, '');
  return (
    <ViewportReveal
      as="section"
      id={domSectionId}
      className="tenant-section tenant-rc-generic rc-generic"
      data-rc-slug={rcSlug}
    >
      <div className="shell rc-generic__inner">
        {def.fields.map((field) => (
          <div key={field.key} className={`tenant-rc-field rc-generic__field rc-generic__field--${field.key}`}>
            {renderFieldValue(field, section.data[field.key], seed, previewBasePath, 0)}
          </div>
        ))}
      </div>
    </ViewportReveal>
  );
}

export function RestaurantClassicPreview({
  section,
  seed,
  styleKey,
  previewBasePath,
  domSectionId
}: {
  section: SectionInstance;
  seed: SiteSeed;
  styleKey: StyleKey;
  previewBasePath: string;
  domSectionId: string;
}) {
  const key = section.sectionKey;

  if (key === 'restaurantClassic.hero') {
    return <RcHero section={section} styleKey={styleKey} seed={seed} previewBasePath={previewBasePath} domSectionId={domSectionId} />;
  }
  if (key === 'restaurantClassic.announcementBar') {
    return <RcAnnouncement section={section} domSectionId={domSectionId} seed={seed} previewBasePath={previewBasePath} />;
  }
  if (key === 'restaurantClassic.faq' || key === 'restaurantClassic.bookingFaqMini' || key === 'restaurantClassic.eventsFaq') {
    return <RcFaqBlock section={section} domSectionId={domSectionId} />;
  }
  if (key === 'restaurantClassic.reservation') {
    return <RcReservationBand section={section} seed={seed} previewBasePath={previewBasePath} domSectionId={domSectionId} />;
  }
  if (key === 'restaurantClassic.testimonials') {
    return <RcTestimonials section={section} domSectionId={domSectionId} />;
  }

  return <RcGenericSection section={section} seed={seed} previewBasePath={previewBasePath} domSectionId={domSectionId} />;
}
