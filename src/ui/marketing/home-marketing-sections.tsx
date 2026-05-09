import Link from 'next/link';
import Image from 'next/image';
import {
  homeAddOnPackages,
  homeAdminBullets,
  homeAblaufTeaser,
  homeStats,
  imageAssets
} from '@/ui/marketing/data';
import { CORE_TEMPLATE_META, EXTRA_TEMPLATE_META, previewHref } from '@/ui/marketing/template-showcase-data';
import { RevealOnScroll } from '@/ui/marketing/RevealOnScroll';

export function HomeAdminShowcaseSection() {
  return (
    <RevealOnScroll as="section" className="section surface fm-home-admin">
      <div className="shell split-grid" data-stagger-grid>
        <div>
          <p className="eyebrow">Admin-Bereich</p>
          <h2 className="section-title">
            Inhalte pflegen
            <br />
            <em>in einer Minute.</em>
          </h2>
          <p className="hero-copy" style={{ marginTop: 16 }}>
            Du loggst Dich ein, änderst Texte, Bilder, Speisekarte oder Öffnungszeiten – und drückst Speichern. Keine
            Plugins, keine Cloud-Dashboards mit 200 Menüs. Nur das, was Du brauchst.
          </p>
          <ul className="fm-home-admin__list">
            {homeAdminBullets.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className="fm-mono-muted" style={{ marginTop: 20 }}>
            trattoria-innsbruck.at/admin
          </p>
        </div>
        <div className="fm-home-admin__mock card">
          <div className="fm-home-admin__mock-row">
            <label>Gericht</label>
            <input readOnly value="Tagliatelle al Tartufo" />
          </div>
          <div className="fm-home-admin__mock-row">
            <label>Beschreibung</label>
            <textarea
              readOnly
              rows={3}
              defaultValue="Hausgemachte Tagliatelle, schwarzer Sommertrüffel aus Umbrien, gehobelter Parmigiano…"
            />
          </div>
          <div className="fm-home-admin__mock-row fm-home-admin__mock-row--split">
            <div>
              <label>Preis</label>
              <input readOnly value="24,90 €" />
            </div>
            <div>
              <label>Bild</label>
              <span className="fm-home-admin__upload">Bild hochladen ↑</span>
            </div>
          </div>
          <div className="fm-home-admin__mock-actions">
            <span className="button secondary" style={{ pointerEvents: 'none' }}>
              Abbrechen
            </span>
            <span className="button" style={{ pointerEvents: 'none' }}>
              Speichern
            </span>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
}

export function HomeAblaufTeaserSection() {
  return (
    <RevealOnScroll as="section" className="section fm-home-ablauf">
      <div className="shell">
        <p className="eyebrow">Ablauf</p>
        <h2 className="section-title">
          Online in wenigen
          <br />
          <em>Tagen.</em>
        </h2>
        <p className="hero-copy" style={{ maxWidth: 720, marginBottom: 36 }}>
          Vom ersten Anruf bis zur Live-Schaltung – ein klarer Ablauf ohne Überraschungen. Wie schnell es geht, hängt
          vor allem davon ab, wie zügig Inhalte (Texte, Fotos) von Deiner Seite kommen. Du weißt jederzeit, wo wir gerade
          stehen.
        </p>
        <div className="fm-home-ablauf__grid" data-stagger-grid>
          {homeAblaufTeaser.map((s) => (
            <article className="card fm-home-ablauf__card" key={s.step}>
              <p className="fm-mono-label">
                {s.step} · {s.tag}
              </p>
              <h3>{s.title}</h3>
              <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </RevealOnScroll>
  );
}

export function HomeAddOnTeaserSection() {
  return (
    <RevealOnScroll as="section" className="section surface">
      <div className="shell">
        <p className="eyebrow">Add-on · optional</p>
        <h2 className="section-title">
          Auf Wunsch:
          <br />
          <em>Bilder &amp; kurzer Film.</em>
        </h2>
        <p className="hero-copy" style={{ maxWidth: 720, marginBottom: 32 }}>
          Buchbar als Add-on. Wir kommen ins Lokal, in die Praxis, in den Salon, ins Studio oder auf die Baustelle und
          produzieren Inhalte, die zu Deiner Marke passen – nur wenn Du es wünschst.
        </p>
        <div className="feature-grid" data-stagger-grid>
          {homeAddOnPackages.map((pkg) => (
            <article className="card feature-card" key={pkg.title}>
              <h3>{pkg.title}</h3>
              <ul className="fm-checklist">
                {pkg.bullets.map((b) => (
                  <li key={b}>✓ {b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </RevealOnScroll>
  );
}

export function HomeStatsSection() {
  return (
    <RevealOnScroll as="section" className="section fm-home-stats">
      <div className="shell">
        <h2 className="section-title">In Zahlen.</h2>
        <p className="hero-copy" style={{ maxWidth: 800, marginBottom: 40 }}>
          Acht Branchen, jeweils drei Stilrichtungen, ein Admin, mit dem Du Inhalte selbst pflegst – ohne Agentur-Ticket.
          Jede Seite ist individuell anpassbar, von der Marke bis zum Modul.
        </p>
        <div className="fm-home-stats__grid" data-stagger-grid>
          {homeStats.map((row) => (
            <div className="fm-home-stats__cell" key={row.label}>
              <p className="fm-home-stats__value">{row.value}</p>
              <p className="fm-home-stats__label">{row.label}</p>
            </div>
          ))}
        </div>
      </div>
    </RevealOnScroll>
  );
}

export function HomeDeviceStripAlignedSection() {
  return (
    <RevealOnScroll as="section" className="section fm-device-strip">
      <div className="shell">
        <p className="eyebrow">In Aktion</p>
        <h2 className="section-title">
          Echte Templates.
          <br />
          <em>Echter Admin.</em>
        </h2>
        <p className="hero-copy" style={{ maxWidth: 720 }}>
          Einblicke in Templates und Admin-Bereich – live, auf Laptop, Tablet und Phone. Auf jedem Gerät, in jeder
          Größe.
        </p>
        <div className="fm-device-grid" data-stagger-grid>
          <Link href={previewHref('restaurant', 'classic')} className="fm-device-card">
            <Image
              src={CORE_TEMPLATE_META.restaurant.image}
              alt=""
              width={960}
              height={600}
              className="fm-device-card__img"
              sizes="(max-width: 900px) 100vw, 33vw"
            />
            <div>
              <h3>Restaurant · Klassisch</h3>
              <p>Restaurant-Template auf dem Desktop</p>
            </div>
          </Link>
          <Link href="/admin-demo/home" className="fm-device-card">
            <Image
              src={imageAssets.contentKit}
              alt=""
              width={960}
              height={600}
              className="fm-device-card__img"
              sizes="(max-width: 900px) 100vw, 33vw"
            />
            <div>
              <h3>Admin-Bereich</h3>
              <p>Inhalte pflegen, ohne Code</p>
            </div>
          </Link>
          <Link href={previewHref('salon', 'bold')} className="fm-device-card">
            <Image
              src={EXTRA_TEMPLATE_META.salon.image}
              alt=""
              width={960}
              height={600}
              className="fm-device-card__img"
              sizes="(max-width: 900px) 100vw, 33vw"
            />
            <div>
              <h3>Salon · Bold</h3>
              <p>Mobile zuerst gedacht</p>
            </div>
          </Link>
        </div>
      </div>
    </RevealOnScroll>
  );
}
