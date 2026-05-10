import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { agency } from '@/ui/marketing/data';
import { RevealOnScroll } from '@/ui/marketing/RevealOnScroll';
import { TiltHoverCard } from '@/ui/marketing/TiltHoverCard';
import {
  BranchMarqueeSection,
  CtaFooterSection,
  LandingHeroShowcase,
  ManifestoSection,
  TestimonialsSection
} from '@/ui/marketing/showcase-shared';
import {
  SHOWCASE_INDUSTRY_ORDER,
  SHOWCASE_TEMPLATE_META,
  STYLE_PREVIEW,
  STYLE_STRIP,
  previewHref
} from '@/ui/marketing/template-showcase-data';
import { sections } from '@/template-engine/sections';
import { industries } from '@/template-engine/industries';

export const metadata: Metadata = {
  title: 'Templates & Stile',
  description:
    'Neun Branchen-Templates mit Classic, Modern und Bold — live im Browser. Restaurant, Hotel, Tourismus, Salon, Handwerk, Beratung, Praxis, Studio, Wedding.'
};

export default function TemplatesPage() {
  return (
    <main>
      <LandingHeroShowcase
        pulse={agency.tagline}
        titleLine1="Templates, die"
        titleEmphasis="zur Marke passen."
        lead="Mehrseitige Auftritte mit klarer Navigation, viel Luft und Stilwechsel im Browser — damit Du siehst, wie sich Classic, Modern und Bold anfühlen, bevor wir live gehen. Alle Inhalte pflegst Du später selbst im CMS."
        monoAside="/ Live im Browser ansehen"
        primaryCta={{ href: '#galerie', label: 'Branchen durchstöbern →' }}
        secondaryCta={{ href: '/preise', label: 'Preise & Pakete' }}
        scrollTargetId="#mehr"
      />

      <BranchMarqueeSection />

      <section className="section surface fm-tpl-body" id="galerie">
        <div className="shell fm-tpl-stack">
          {SHOWCASE_INDUSTRY_ORDER.map((k, i) => {
            const m = SHOWCASE_TEMPLATE_META[k];
            const blockStyle = { '--tpl-accent': m.accent } as CSSProperties;
            return (
              <RevealOnScroll key={k} className="fm-tpl-block fm-tpl-block--accented" style={blockStyle}>
                <div className="fm-tpl-block__head">
                  <div>
                    <p className="fm-tpl-kicker" style={{ color: m.accent }}>
                      / Branche · {String(i + 1).padStart(2, '0')}
                    </p>
                    <h2 className="section-title" style={{ marginTop: 12 }}>
                      {m.label}
                    </h2>
                    <p className="hero-copy" style={{ marginTop: 8 }}>
                      {m.tagline}
                    </p>
                    <p className="fm-tpl-lede">{m.description}</p>
                    <ul className="fm-tpl-highlights" aria-label="Modul-Highlights">
                      {m.bullets.map((b) => (
                        <li key={b}>
                          <span className="fm-tpl-highlights__dot" aria-hidden>
                            ✦
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="fm-mono-label fm-tpl-meta">3 Stile · Live ansehen</p>
                </div>
                <div className="fm-style-grid" data-stagger-grid>
                  {STYLE_STRIP.map((s) => (
                    <TiltHoverCard key={s.id}>
                      <Link
                        href={previewHref(k, s.id)}
                        className="fm-style-card"
                        aria-label={`${m.label} im Stil ${s.label} live ansehen`}
                      >
                        <div className="fm-style-card__visual">
                          <Image
                            src={STYLE_PREVIEW[k][s.id]}
                            alt=""
                            fill
                            className="fm-style-card__shot"
                            sizes="(max-width: 900px) 100vw, 28vw"
                          />
                          <span className="fm-style-card__badge">{s.label}</span>
                        </div>
                        <div className="fm-style-card__footer">
                          <div>
                            <p className="fm-style-card__title">
                              {m.label} · {s.label}
                            </p>
                            <p className="fm-style-card__tag">{s.tag}</p>
                          </div>
                          <span className="fm-style-card__arrow" aria-hidden>
                            →
                          </span>
                        </div>
                      </Link>
                    </TiltHoverCard>
                  ))}
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </section>

      <section className="section fm-section-library" id="sections">
        <div className="shell">
          <div className="fm-section-library__head">
            <div>
              <p className="eyebrow">CMS Section Library</p>
              <h2 className="section-title">Alle verfügbaren Bausteine.</h2>
            </div>
            <p className="hero-copy">
              Diese Sections sind in der Registry definiert, im Admin auswählbar und werden vom Template-Renderer aus
              CMS-Feldern befüllt.
            </p>
          </div>
          <div className="fm-section-library__grid">
            {sections.map((section) => (
              <article className="fm-section-chip" key={section.key}>
                <span>{section.key}</span>
                <strong>{section.label}</strong>
                <small>
                  {section.industries === 'all'
                    ? 'Alle Branchen'
                    : section.industries.map((key) => industries.find((industry) => industry.key === key)?.label ?? key).join(', ')}
                </small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ManifestoSection />
      <TestimonialsSection />
      <CtaFooterSection />
    </main>
  );
}
