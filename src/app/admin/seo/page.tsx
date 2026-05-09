import Link from 'next/link';
import { TenantSeoEditor } from '@/admin/TenantSeoEditor';

export default function AdminSeoPage() {
  return (
    <main className="section">
      <div className="shell">
        <p className="eyebrow">Admin</p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 44 }}>SEO</h1>
        <p style={{ color: 'var(--muted)', maxWidth: 640, lineHeight: 1.55 }}>
          Meta-Titel und -Beschreibung pro Kernseite. Änderungen gehen in den Content-Entwurf; Veröffentlichen wie gewohnt
          über die Seiten- oder Collection-Editoren (Button „Veröffentlichen“).
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 12 }}>
          <Link className="button secondary" href="/admin/pages">
            Seiten
          </Link>
          <Link className="button secondary" href="/admin">
            Arbeitsbereich
          </Link>
        </div>
        <TenantSeoEditor />
      </div>
    </main>
  );
}
