import Link from 'next/link';

export default function AdminMediaPage() {
  return (
    <main className="section">
      <div className="shell">
        <p className="eyebrow">Admin</p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 44 }}>Medienbibliothek</h1>
        <p style={{ color: 'var(--muted)', maxWidth: 640, lineHeight: 1.55 }}>
          Uploads über Vercel Blob und Zuordnung zu Hero-, Galerie- und Team-Feldern sind als Nächstes vorgesehen.
          Aktuell kannst Du Bilder als URLs in den Seiten- und Sammlungs-Editoren eintragen.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
          <Link className="button" href="/admin/pages">
            Seiten bearbeiten
          </Link>
          <Link className="button secondary" href="/admin/collections">
            Collections
          </Link>
        </div>
      </div>
    </main>
  );
}
