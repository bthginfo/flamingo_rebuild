import { TenantIntegrationsEditor } from '@/admin/TenantIntegrationsEditor';

export default function AdminIntegrationsPage() {
  return (
    <div className="admin-surface section">
      <div className="shell">
        <p className="eyebrow">Admin</p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 44 }}>Integrationen</h1>
        <p style={{ color: 'var(--muted)', maxWidth: 720, lineHeight: 1.55 }}>
          Eigenes SMTP, Tracking-Skripte mit Cookie-Freigabe und Cookie-Banner für die öffentliche Tenant-Site — wie im
          klassischen Flamingo-Admin. Entwurf speichern und veröffentlichen, damit die Live-Site die Einstellungen nutzt.
        </p>
        <TenantIntegrationsEditor />
      </div>
    </div>
  );
}
