import Link from 'next/link';
import { TenantNavigationEditor } from '@/admin/TenantNavigationEditor';

export default function AdminNavigationPage() {
  return (
    <main className="section">
      <div className="shell">
        <p className="eyebrow">Admin</p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 44 }}>Navigation</h1>
        <p style={{ color: 'var(--muted)', maxWidth: 640, lineHeight: 1.55 }}>
          Hauptmenü-Einträge (Label + Pfad) kommen aus dem Site-Dokument und werden als Entwurf gespeichert. Nach dem
          Speichern in der Vorschau ggf. Seite neu laden.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 12 }}>
          <Link className="button secondary" href="/admin/pages">
            Zu den Seiten
          </Link>
          <Link className="button secondary" href="/admin">
            Arbeitsbereich
          </Link>
        </div>
        <TenantNavigationEditor />
      </div>
    </main>
  );
}
