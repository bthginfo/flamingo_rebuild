import Link from 'next/link';
import { AdminLogoutButton } from '@/admin/AdminLogoutButton';

const adminAreas = [
  ['Seiten', '/admin/pages', 'Seiten erstellen, Abschnitte pflegen und Vorschau öffnen.'],
  ['Inhalte', '/admin/collections', 'Leistungen, Zimmer, Kurse, Team, FAQ und weitere Collections.'],
  ['Navigation & Footer', '/admin/navigation', 'Menüs, Footer und globale Hinweisleisten.'],
  ['Medien', '/admin/media', 'Bilder hochladen und verwalten.'],
  ['SEO & Sichtbarkeit', '/admin/seo', 'Seitentitel, Beschreibungen und Indexierung.'],
  ['CRM', '/admin/crm', 'Prospects anlegen und neue Tenants provisionieren.']
] as const;

export default function AdminHomePage() {
  return (
    <main className="section">
      <div className="shell">
        <p className="eyebrow">Admin</p>
        <div className="admin-title-row">
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 56 }}>Arbeitsbereich</h1>
          <AdminLogoutButton />
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
    </main>
  );
}
