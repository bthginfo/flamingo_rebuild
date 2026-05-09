import Link from 'next/link';
import { isDatabaseConfigured } from '@/db/client';
import { getTenantCmsProfile } from '@/db/auth-repository';
import { loadEditorSiteSeed } from '@/lib/admin-editor-seed';
import { requireAdminSession } from '@/lib/admin-server';
import { getIndustry } from '@/template-engine/registry';
import { AddCustomPageForm } from '@/ui/admin/AddCustomPageForm';

export default async function AdminPagesPage() {
  const { tenantSlug } = await requireAdminSession('/admin/pages');

  if (!isDatabaseConfigured()) {
    return (
      <div className="admin-surface section">
        <div className="shell">
          <p className="eyebrow">CMS</p>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 52 }}>Seiten</h1>
          <p style={{ color: 'var(--muted)' }}>
            Datenbank ist nicht konfiguriert — Admin-Seiten mit Tenant-Kontext brauchen <code>FLAMINGO_REBUILD_DB=1</code> und{' '}
            <code>POSTGRES_URL</code>. Öffentliche Template-Vorschau:{' '}
            <Link href="/templates">/templates</Link>.
          </p>
        </div>
      </div>
    );
  }

  const profile = await getTenantCmsProfile(tenantSlug);
  if (!profile) {
    return (
      <div className="admin-surface section">
        <div className="shell">
          <p className="eyebrow">CMS</p>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 52 }}>Seiten</h1>
          <p style={{ color: 'var(--muted)' }}>Tenant nicht gefunden. Bitte erneut einloggen.</p>
        </div>
      </div>
    );
  }

  const industry = getIndustry(profile.industryKey);
  const initialSeed = await loadEditorSiteSeed(tenantSlug, profile);
  const home = initialSeed.pages.find((page) => page.key === 'home');

  return (
    <div className="admin-surface section">
      <div className="shell">
        <p className="eyebrow">CMS</p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 52 }}>Seiten</h1>
        <p style={{ color: 'var(--muted)', maxWidth: 720, lineHeight: 1.55 }}>
          In den Seiten-Editoren: Entwurf speichern, speichern &amp; veröffentlichen oder Entwurf verwerfen — wie bei
          Navigation und SEO. Die öffentliche Site zeigt erst nach Veröffentlichen die neuen Inhalte.
        </p>
        <p style={{ color: 'var(--muted)' }}>
          Blueprint aus der Template-Registry für <strong>{industry.label}</strong> ({profile.styleKey}) — Tenant{' '}
          <strong>{tenantSlug}</strong>.
        </p>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {initialSeed.pages.map((page) => (
            <Link className="card" href={`/admin/pages/${encodeURIComponent(page.key)}`} key={page.id}>
              <p className="eyebrow">{page.kind === 'custom' ? 'Eigene Seite' : 'Kernseite'}</p>
              <h2>{page.title}</h2>
              <p style={{ color: 'var(--muted)' }}>{page.slug}</p>
              <p style={{ color: 'var(--muted)' }}>{page.sections.length} Abschnitte</p>
              <p className="eyebrow" style={{ marginTop: 12 }}>
                Bearbeiten
              </p>
            </Link>
          ))}
        </div>
        <AddCustomPageForm />
        {home ? (
          <section style={{ marginTop: 54 }}>
            <p className="eyebrow">
              {industry.label} · Startseite · {profile.styleKey}
            </p>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 42 }}>Section-Instanzen (aktueller Stand)</h2>
            <Link className="button" href="/admin/pages/home" style={{ marginBottom: 20 }}>
              Startseite bearbeiten
            </Link>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
              {[...home.sections].sort((a, b) => a.sortOrder - b.sortOrder).map((section) => (
                <article className="card" key={section.id}>
                  <p className="eyebrow">Position {section.sortOrder}</p>
                  <h3>{section.sectionKey}</h3>
                  <p style={{ color: 'var(--muted)' }}>
                    {Object.keys(section.data).length} Datenfelder · {section.visible ? 'sichtbar' : 'ausgeblendet'}
                  </p>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
