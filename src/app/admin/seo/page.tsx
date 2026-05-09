import Link from 'next/link';

export default function AdminSeoPage() {
  return (
    <main className="section">
      <div className="shell">
        <p className="eyebrow">Admin</p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 44 }}>SEO &amp; Sichtbarkeit</h1>
        <p style={{ color: 'var(--muted)', maxWidth: 640, lineHeight: 1.55 }}>
          Seitentitel, Meta-Beschreibungen und Indexierung pro Seite werden an die gleiche Dokumentstruktur angebunden
          wie im CMS. Bis dahin liegen SEO-Felder in den Seiten-Metadaten des Seeds bzw. der gespeicherten Version.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
          <Link className="button" href="/admin/pages">
            Seiten &amp; Inhalte
          </Link>
          <Link className="button secondary" href="/admin">
            Arbeitsbereich
          </Link>
        </div>
      </div>
    </main>
  );
}
