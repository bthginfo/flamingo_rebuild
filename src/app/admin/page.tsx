import Link from 'next/link';

const adminAreas = [
  ['Seiten', '/admin/pages', 'Abschnitte pflegen und Vorschau — Entwurf speichern oder live veröffentlichen.'],
  ['Inhalte', '/admin/collections', 'Collections mit demselben Entwurf- und Veröffentlichen-Muster wie die Seiten.'],
  ['Navigation & Footer', '/admin/navigation', 'Menüs, Footer und globale Hinweisleisten.'],
  ['Medien', '/admin/media', 'Blob-Upload (mit Login) oder Bild-URL; Live nach Veröffentlichen.'],
  ['SEO & Sichtbarkeit', '/admin/seo', 'Seitentitel, Beschreibungen und Indexierung.'],
  ['CRM', '/admin/crm', 'Prospects anlegen und neue Tenants provisionieren.']
] as const;

export default function AdminHomePage() {
  return (
    <div className="admin-page admin-page--dashboard section">
      <div className="shell">
        <p className="eyebrow">Willkommen</p>
        <div className="admin-title-row">
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 56 }}>Arbeitsbereich</h1>
        </div>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {adminAreas.map(([label, href, description]) => (
            <Link className="card" href={href} key={href}>
              <h2>{label}</h2>
              <p style={{ color: 'var(--muted)' }}>{description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
