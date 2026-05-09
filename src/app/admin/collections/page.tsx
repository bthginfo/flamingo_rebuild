import Link from 'next/link';
import { isDatabaseConfigured } from '@/db/client';
import { getTenantCmsProfile } from '@/db/auth-repository';
import { requireAdminSession } from '@/lib/admin-server';
import { getIndustry } from '@/template-engine/registry';

export default async function AdminCollectionsPage() {
  const { tenantSlug } = await requireAdminSession('/admin/collections');

  if (!isDatabaseConfigured()) {
    return (
      <main className="section">
        <div className="shell">
          <p className="eyebrow">CMS</p>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 52 }}>Inhalte</h1>
          <p style={{ color: 'var(--muted)' }}>
            Datenbank nicht konfiguriert. Siehe <Link href="/admin/pages">Seiten</Link> oder <Link href="/templates">Showcase</Link>.
          </p>
        </div>
      </main>
    );
  }

  const profile = await getTenantCmsProfile(tenantSlug);
  if (!profile) {
    return (
      <main className="section">
        <div className="shell">
          <p className="eyebrow">CMS</p>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 52 }}>Inhalte</h1>
          <p style={{ color: 'var(--muted)' }}>Tenant nicht gefunden.</p>
        </div>
      </main>
    );
  }

  const industry = getIndustry(profile.industryKey);

  return (
    <main className="section">
      <div className="shell">
        <p className="eyebrow">CMS</p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 52 }}>Inhalte</h1>
        <p style={{ color: 'var(--muted)', maxWidth: 720, lineHeight: 1.55, marginBottom: 8 }}>
          Collection-Einträge (z.&nbsp;B. Speisekarte): gleiches Speichern wie bei den Seiten — Entwurf speichern,
          speichern &amp; veröffentlichen oder Entwurf verwerfen.
        </p>
        <p style={{ color: 'var(--muted)', marginBottom: 24 }}>
          Collections für <strong>{industry.label}</strong> — Tenant <strong>{tenantSlug}</strong>.
        </p>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {industry.collections.map((collection) => (
            <article className="card" key={collection.key}>
              <p className="eyebrow">{collection.label}</p>
              <h2>{collection.key}</h2>
              <p style={{ color: 'var(--muted)' }}>{collection.slugPrefix}</p>
              <Link className="button secondary" href={`/admin/collections/${encodeURIComponent(collection.key)}`} style={{ marginTop: 16 }}>
                Bearbeiten
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
