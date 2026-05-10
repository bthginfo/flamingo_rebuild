import Link from 'next/link';

const adminAreas = [
  ['Seiten', '/admin/pages', 'Abschnitte pflegen und Vorschau - Entwurf speichern oder live veroeffentlichen.'],
  ['Inhalte', '/admin/collections', 'Collections mit demselben Draft- und Publish-Muster wie die Seiten.'],
  ['Navigation & Footer', '/admin/navigation', 'Menues, Footer und globale Hinweisleisten.'],
  ['Integrationen', '/admin/integrations', 'SMTP, Tracking-Skripte mit Cookie-Freigabe und Cookie-Banner.'],
  ['Medien', '/admin/media', 'Blob-Upload mit Login oder Bild-URL; live nach Veroeffentlichen.'],
  ['SEO & Sichtbarkeit', '/admin/seo', 'Seitentitel, Beschreibungen, Slugs und Sichtbarkeit.']
] as const;

const workflow = ['Inhalt pflegen', 'Vorschau pruefen', 'Entwurf speichern', 'Live veroeffentlichen'] as const;

export default function AdminHomePage() {
  return (
    <div className="admin-page admin-page--dashboard section">
      <div className="shell">
        <div className="admin-dashboard-hero">
          <div>
            <p className="eyebrow">Willkommen</p>
            <h1>Arbeitsbereich</h1>
            <p>
              Bearbeite Website, Inhalte, SEO und Integrationen aus einem Draft-Workflow. Alles ist auf schnelle
              Kundenpflege und sichere Veroeffentlichung ausgelegt.
            </p>
          </div>
          <div className="admin-dashboard-flow" aria-label="Workflow">
            {workflow.map((item, index) => (
              <span key={item}>
                <strong>{index + 1}</strong>
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="admin-dashboard-grid">
          {adminAreas.map(([label, href, description]) => (
            <Link className="card admin-dashboard-card" href={href} key={href}>
              <span className="admin-dashboard-card__kicker">{href.replace('/admin/', '') || 'home'}</span>
              <h2>{label}</h2>
              <p>{description}</p>
              <strong>Oeffnen</strong>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
