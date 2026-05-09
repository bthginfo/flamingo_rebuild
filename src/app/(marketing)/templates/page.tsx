import type { Metadata } from 'next';
import Link from 'next/link';
import { agency } from '@/ui/marketing/data';
import {
  BranchMarqueeSection,
  CtaFooterSection,
  LandingHeroShowcase,
  ManifestoSection,
  TestimonialsSection
} from '@/ui/marketing/showcase-shared';
import {
  CORE_TEMPLATE_META,
  EXTRA_TEMPLATE_META,
  STYLE_PREVIEW,
  STYLE_STRIP,
  previewHref,
  type CoreTemplateKey,
  type ExtraTemplateKey
} from '@/ui/marketing/template-showcase-data';

export const metadata: Metadata = {
  title: 'Templates & Stile',
  description:
    'Branchen-Templates mit Classic, Modern und Bold — live im Browser ansehen. Restaurant, Hotel, Tourismus und mehr.'
};

export default function TemplatesPage() {
  return (
    <main>
      <LandingHeroShowcase
        pulse={agency.tagline}
        titleLine1="Templates, die"
        titleEmphasis="wie Du riechen."
        lead="Mehrseitige Auftritte mit klarer Navigation, viel Luft und Stilwechsel im Browser — damit Du siehst, wie sich Classic, Modern und Bold anfühlen, bevor wir live gehen."
        monoAside="/ Live im Browser ansehen"
        primaryCta={{ href: '#galerie', label: 'Branchen durchstöbern →' }}
        secondaryCta={{ href: '/preise', label: 'Preise & Pakete' }}
        scrollTargetId="#mehr"
      />

      <BranchMarqueeSection />

      <section className="section surface fm-tpl-body" id="galerie">
        <div className="shell fm-tpl-stack">
          {(Object.keys(CORE_TEMPLATE_META) as CoreTemplateKey[]).map((k, i) => {
            const m = CORE_TEMPLATE_META[k];
            return (
              <div key={k} className="fm-tpl-block">
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
                  </div>
                  <p className="fm-mono-label fm-tpl-meta">3 Stile · Live ansehen</p>
                </div>
                <div className="fm-style-grid">
                  {STYLE_STRIP.map((s) => (
                    <Link key={s.id} href={previewHref(k, s.id)} className="fm-style-card">
                      <div className="fm-style-card__visual">
                        <img src={STYLE_PREVIEW[k][s.id]} alt={`${m.label} · ${s.label}`} loading="lazy" />
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
                  ))}
                </div>
              </div>
            );
          })}

          <div className="fm-tpl-divider">
            <p className="eyebrow">Weitere Branchen</p>
            <h2 className="section-title">
              Auch dafür haben wir
              <br />
              <em>einen Plan.</em>
            </h2>
            <p className="hero-copy" style={{ maxWidth: 720 }}>
              Spezialisierte Konzepte im gleichen Handschrift-Stil: klar, warm, mit Liebe zum Detail. Wenn Deine Branche
              hier noch fehlt, sprich uns an — wir erweitern das Portfolio laufend.
            </p>
          </div>

          {(Object.keys(EXTRA_TEMPLATE_META) as ExtraTemplateKey[]).map((k, i) => {
            const m = EXTRA_TEMPLATE_META[k];
            return (
              <div key={k} className="fm-tpl-block">
                <div className="fm-tpl-block__head">
                  <div>
                    <p className="fm-tpl-kicker" style={{ color: m.accent }}>
                      / Branche · {String(i + 4).padStart(2, '0')}
                    </p>
                    <h2 className="section-title" style={{ marginTop: 12 }}>
                      {m.label}
                    </h2>
                    <p className="hero-copy" style={{ marginTop: 8 }}>
                      {m.tagline}
                    </p>
                  </div>
                  <span className="fm-tpl-showcase-pill">Live Showcase</span>
                </div>
                <div className="fm-extra-grid">
                  <div className="fm-extra-visual">
                    <img src={m.image} alt="" loading="lazy" />
                    <div className="fm-extra-visual__shade" />
                  </div>
                  <div className="fm-extra-side card">
                    <p className="fm-mono-label">Module</p>
                    <ul className="fm-extra-list">
                      {m.bullets.map((b) => (
                        <li key={b}>
                          <span style={{ color: m.accent }}>✦</span> {b}
                        </li>
                      ))}
                    </ul>
                    <Link href={previewHref(k, 'classic')} className="button secondary" style={{ marginTop: 'auto' }}>
                      Showcase ansehen →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <ManifestoSection />
      <TestimonialsSection />
      <CtaFooterSection />
    </main>
  );
}
