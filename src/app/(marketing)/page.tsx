import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { agency, rotatingHeroWords } from '@/ui/marketing/data';
import {
  CORE_TEMPLATE_META,
  EXTRA_TEMPLATE_META,
  previewHref,
  type CoreTemplateKey,
  type ExtraTemplateKey
} from '@/ui/marketing/template-showcase-data';
import { RotatingWord } from '@/ui/marketing/RotatingWord';
import {
  HomeAddOnTeaserSection,
  HomeAdminShowcaseSection,
  HomeAblaufTeaserSection,
  HomeDeviceStripAlignedSection,
  HomeStatsSection
} from '@/ui/marketing/home-marketing-sections';
import {
  BranchMarqueeSection,
  CtaFooterSection,
  LandingHeroShowcase,
  ManifestoSection,
  TestimonialsSection
} from '@/ui/marketing/showcase-shared';
import { RevealOnScroll } from '@/ui/marketing/RevealOnScroll';

export const metadata: Metadata = {
  title: 'Websites mit Pop für lokale Marken',
  description:
    'FlamingoMedia gestaltet und betreut Websites für Betriebe in der DACH-Region — mit Templates, eigenem Foto- und Videoteam und Hosting.'
};

export default function MarketingHomePage() {
  return (
    <main>
      <LandingHeroShowcase
        id="top"
        pulse={agency.tagline}
        titleLine1="Websites für"
        titleEmphasis={<RotatingWord words={rotatingHeroWords} />}
        lead="Wir gestalten und betreuen Websites für inhabergeführte Betriebe in der DACH-Region. Editorial-Design, das mit dem Tempo Deiner Marke gehen kann. Inhalte, die Du selbst pflegst. Foto und Video von unserem eigenen Team."
        monoAside="/ Website live in wenigen Tagen"
        primaryCta={{ href: '/templates', label: 'Templates ansehen →' }}
        secondaryCta={{ href: '/preise', label: 'Preise & Pakete' }}
        scrollTargetId="#mehr"
      />

      <BranchMarqueeSection />

      <RevealOnScroll as="section" className="fm-services">
        <div className="fm-services__pattern" aria-hidden />
        <div className="shell fm-services__inner">
          <div className="fm-services__intro">
            <div>
              <p className="eyebrow fm-services__eyebrow">Was wir machen</p>
              <h2 className="fm-services__title">
                Studio
                <br />
                <em className="fm-italic-pop">für lokale Marken.</em>
              </h2>
            </div>
            <p className="fm-services__lede">
              Vier Leistungen. Ein Team. Wir bauen, fotografieren, hosten und kümmern uns – damit Du Dich um Deinen
              Betrieb kümmern kannst.
            </p>
          </div>
          <div className="fm-bento" data-stagger-grid>
            <article className="fm-bento__card fm-bento__card--wide">
              <div className="fm-bento__row">
                <span className="fm-mono-muted">01</span>
                <span className="fm-pill fm-pill--accent">In 7 Tagen live</span>
              </div>
              <h3>Branchen-Templates</h3>
              <p>
                Mehrseitige, animierte Templates für Restaurant, Salon, Handwerk, Praxen, Beratung, Studios und viele
                mehr. Live-Vorschau im Browser, Farbschema in Sekunden.
              </p>
              <div className="fm-chip-row">
                {['Restaurant', 'Salon', 'Hotel', 'Tourismus', 'Handwerk', 'Praxis', 'Beratung', 'Studio'].map((b) => (
                  <span key={b} className="fm-chip">
                    {b}
                  </span>
                ))}
              </div>
            </article>
            <article className="fm-bento__card fm-bento__card--accent">
              <span className="fm-mono-light">02</span>
              <h3>Custom Design</h3>
              <p>Wenn Template nicht reicht: individuell entworfen, eigene Funktionen, eigene Bibliothek. Wie ein Maßanzug.</p>
              <p className="fm-mono-light fm-bento__meta">Ab 4 Wochen</p>
            </article>
            <article className="fm-bento__card fm-bento__card--dark">
              <div className="fm-bento__row">
                <span className="fm-mono-light">03</span>
                <span className="fm-pill fm-pill--outline">On-Location</span>
              </div>
              <h3>Foto &amp; Video</h3>
              <p>
                Eigenes Team kommt zu Dir ins Lokal, in die Praxis, in den Salon oder auf die Baustelle. Bilder, die
                nach Dir aussehen – nicht nach Stockfotos.
              </p>
            </article>
            <article className="fm-bento__card fm-bento__card--light">
              <div className="fm-bento__row">
                <span className="fm-mono-muted">04</span>
                <span className="fm-pill fm-pill--muted">Per Empfehlung</span>
              </div>
              <h3>Hosting &amp; Pflege</h3>
              <p>Unkompliziertes Hosting und kleine Anpassungen zum Pauschalpreis. 29 €/Monat – wir sind ansprechbar, wenn Du uns brauchst.</p>
              <p className="fm-price-tag">
                29<span>€/Monat</span>
              </p>
            </article>
          </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll as="section" className="section surface fm-templates-preview">
        <div className="shell">
          <div className="fm-templates-preview__head">
            <div>
              <p className="eyebrow">Templates</p>
              <h2 className="section-title">
                Neun Branchen.
                <br />
                <em>Drei Stile pro Template.</em>
              </h2>
            </div>
            <p className="hero-copy" style={{ margin: 0 }}>
              Von Restaurant bis Wedding: jede Branche mit Classic, Modern und Bold — live im Browser. Details und
              Modul-Übersicht auf der Templates-Seite.
            </p>
          </div>
          <div className="fm-portrait-grid" data-stagger-grid>
            {(Object.keys(CORE_TEMPLATE_META) as CoreTemplateKey[]).map((k) => {
              const m = CORE_TEMPLATE_META[k];
              return (
                <Link key={k} href={previewHref(k, 'classic')} className="fm-portrait-card">
                  <Image src={m.image} alt="" fill className="fm-portrait-card__img" sizes="(max-width: 900px) 100vw, 33vw" />
                  <div className="fm-portrait-card__shade" />
                  <div className="fm-portrait-card__body">
                    <span className="fm-portrait-card__slash">/ {k}</span>
                    <span className="fm-portrait-card__dot" style={{ background: m.accent }} />
                    <p className="fm-portrait-card__tag">{m.tagline}</p>
                    <h3>{m.label}</h3>
                    <p className="fm-portrait-card__desc">{m.description}</p>
                    <span className="fm-portrait-card__cta">
                      Live-Vorschau ansehen <span aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
              );
            })}
            {(Object.keys(EXTRA_TEMPLATE_META) as ExtraTemplateKey[]).map((k) => {
              const m = EXTRA_TEMPLATE_META[k];
              return (
                <Link key={k} href={previewHref(k, 'classic')} className="fm-portrait-card">
                  <Image src={m.image} alt="" fill className="fm-portrait-card__img" sizes="(max-width: 900px) 100vw, 33vw" />
                  <div className="fm-portrait-card__shade" />
                  <div className="fm-portrait-card__body">
                    <span className="fm-portrait-card__slash">/ {k}</span>
                    <span className="fm-portrait-card__badge">Showcase</span>
                    <p className="fm-portrait-card__tag">{m.tagline}</p>
                    <h3>{m.label}</h3>
                    <p className="fm-portrait-card__desc">{m.description}</p>
                    <span className="fm-portrait-card__cta">
                      Showcase ansehen <span aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="fm-templates-preview__footer">
            <Link href="/templates" className="button secondary">
              Alle Details zu den Templates →
            </Link>
          </div>
        </div>
      </RevealOnScroll>

      <HomeDeviceStripAlignedSection />

      <ManifestoSection />
      <HomeAdminShowcaseSection />
      <HomeAblaufTeaserSection />
      <HomeAddOnTeaserSection />
      <HomeStatsSection />
      <TestimonialsSection />
      <CtaFooterSection />
    </main>
  );
}
