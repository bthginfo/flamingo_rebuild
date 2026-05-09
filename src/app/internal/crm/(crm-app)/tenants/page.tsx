import Link from 'next/link';
import { isDatabaseConfigured } from '@/db/client';
import { listTenantsForInternalCrm } from '@/db/crm-repository';
import { getSiteOrigin } from '@/lib/site-url';

export const dynamic = 'force-dynamic';

export default async function InternalCrmTenantsPage() {
  const origin = getSiteOrigin();
  const dbReady = isDatabaseConfigured();
  let rows: Awaited<ReturnType<typeof listTenantsForInternalCrm>> = [];
  let errorMessage: string | null = null;

  if (dbReady) {
    try {
      rows = await listTenantsForInternalCrm();
    } catch (e) {
      errorMessage = e instanceof Error ? e.message : 'Unbekannter Fehler';
    }
  }

  return (
    <div className="admin-surface section">
      <div className="shell">
        <p className="eyebrow">Tenants</p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 40, margin: '8px 0 0' }}>Kunden-Sites ({rows.length})</h1>

        {!dbReady ? (
          <div className="card" style={{ marginTop: 24 }}>
            <p style={{ color: 'var(--muted)' }}>Datenbank nicht konfiguriert.</p>
          </div>
        ) : errorMessage ? (
          <div className="card" style={{ marginTop: 24 }}>
            <p className="crm-banner crm-banner--error">{errorMessage}</p>
          </div>
        ) : (
          <div className="crm-table-wrap card" style={{ marginTop: 24, padding: 0 }}>
            <table className="crm-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Slug</th>
                  <th>Template</th>
                  <th>Stil</th>
                  <th>Erstellt</th>
                  <th>Letzte Veröffentlichung</th>
                  <th>Links</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((t) => (
                  <tr key={t.id}>
                    <td>
                      <strong>{t.name}</strong>
                    </td>
                    <td>
                      <code>{t.slug}</code>
                    </td>
                    <td>{t.industryKey}</td>
                    <td>{t.styleKey}</td>
                    <td>{t.createdAt.toLocaleString('de-AT')}</td>
                    <td>{t.lastPublishedAt ? t.lastPublishedAt.toLocaleString('de-AT') : '—'}</td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <a href={`${origin}/site/${encodeURIComponent(t.slug)}`} target="_blank" rel="noreferrer">
                          Website
                        </a>
                        <Link
                          href={`/admin/login?tenant=${encodeURIComponent(t.slug)}&next=${encodeURIComponent('/admin')}`}
                        >
                          Admin-Login öffnen
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
