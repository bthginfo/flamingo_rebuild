import Link from 'next/link';

export default function AdminNavigationPage() {
  return (
    <main className="section">
      <div className="shell">
        <p className="eyebrow">Admin</p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 44 }}>Navigation &amp; Footer</h1>
        <p style={{ color: 'var(--muted)', maxWidth: 640, lineHeight: 1.55 }}>
          Hier entsteht der Editor für Hauptmenü, Footer-Links und globale Hinweise. Bis die Anbindung an die
          Datenbank fertig ist, pflegst Du Navigationspunkte wie auf der Live-Site über den Seiteninhalt und die
          Startseiten-Sections.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
          <Link className="button" href="/admin/pages">
            Zu den Seiten
          </Link>
          <Link className="button secondary" href="/admin">
            Arbeitsbereich
          </Link>
        </div>
      </div>
    </main>
  );
}
