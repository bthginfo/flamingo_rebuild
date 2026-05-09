import { TenantSeoEditor } from '@/admin/TenantSeoEditor';

export default function AdminSeoPage() {
  return (
    <div className="admin-surface section">
      <div className="shell">
        <p className="eyebrow">Admin</p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 44 }}>SEO</h1>
        <p style={{ color: 'var(--muted)', maxWidth: 640, lineHeight: 1.55 }}>
          Meta-Titel und -Beschreibung pro Kernseite. Unten: Entwurf speichern, speichern &amp; veröffentlichen oder
          Entwurf verwerfen — gleiches Muster wie in den Seiten-Editoren.
        </p>
        <TenantSeoEditor />
      </div>
    </div>
  );
}
