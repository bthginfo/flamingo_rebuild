import { TenantNavigationEditor } from '@/admin/TenantNavigationEditor';

export default function AdminNavigationPage() {
  return (
    <div className="admin-surface section">
      <div className="shell">
        <p className="eyebrow">Admin</p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 44 }}>Navigation</h1>
        <p style={{ color: 'var(--muted)', maxWidth: 640, lineHeight: 1.55 }}>
          Hauptmenü (Label + Pfad) im Site-Dokument: Entwurf speichern, optional Entwurf verwerfen oder direkt
          speichern &amp; veröffentlichen. Öffentliche Site / Vorschau danach neu laden.
        </p>
        <TenantNavigationEditor />
      </div>
    </div>
  );
}
