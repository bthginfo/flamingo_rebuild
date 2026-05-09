import Link from 'next/link';

export default function AdminMediaPage() {
  return (
    <main className="section">
      <div className="shell">
        <p className="eyebrow">Admin</p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 44 }}>Medienbibliothek</h1>
        <p style={{ color: 'var(--muted)', maxWidth: 640, lineHeight: 1.55 }}>
          Bilder trägst du vorerst als URLs in den Seiten- und Collection-Editoren ein (Hero, Galerie, Karten). Nach
          &quot;Speichern &amp; veröffentlichen&quot; erscheinen sie auf der Live-Site. Uploads über{' '}
          <a href="https://vercel.com/docs/storage/vercel-blob" rel="noreferrer" target="_blank">
            Vercel Blob
          </a>{' '}
          und Auswahl aus der Bibliothek sind als nächster Schritt vorgesehen.
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
