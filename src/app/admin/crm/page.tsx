import Link from 'next/link';
import { isDatabaseConfigured } from '@/db/client';
import { listProspects } from '@/db/crm-repository';
import { industries } from '@/template-engine/industries';
import { styles } from '@/template-engine/styles';
import { CreateProspectForm, ProspectsBoard, type SerializableProspect } from './crm-forms';

export default async function CrmPage() {
  const dbReady = isDatabaseConfigured();
  const prospects = dbReady ? await listProspects() : [];
  const serializable: SerializableProspect[] = prospects.map((entry) => ({
    ...entry,
    createdAt: entry.createdAt.toISOString(),
    updatedAt: entry.updatedAt.toISOString()
  }));

  const industryOptions = industries.map((industry) => ({ key: industry.key, label: industry.label }));
  const styleOptions = styles.map((style) => ({ key: style.key, label: style.label }));

  return (
    <main className="section">
      <div className="shell">
        <p className="eyebrow">CRM</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'baseline' }}>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 48, margin: '8px 0 0' }}>Prospects & Provisioning</h1>
          <Link className="button secondary" href="/templates">
            Showcase öffnen
          </Link>
        </div>

        {!dbReady ? (
          <div className="card" style={{ marginTop: 24 }}>
            <h2>Datenbank aus</h2>
            <p style={{ color: 'var(--muted)' }}>
              CRM und Provisioning brauchen eine eigene Rebuild-Datenbank. Setze in <code>.env.local</code>{' '}
              <code>FLAMINGO_REBUILD_DB=1</code> und <code>POSTGRES_URL</code>, führe <code>npm run db:migrate</code> aus,
              starte den Dev-Server neu.
            </p>
          </div>
        ) : (
          <>
            <div className="card" style={{ marginTop: 24 }}>
              <h2>Neuen Prospect anlegen</h2>
              <p style={{ color: 'var(--muted)' }}>
                Branche und Stil steuern den Demo-Seed. Alle <strong>neun Branchen</strong> der Template-Registry sind mit
                vollständigen Demo-Inhalten provisionierbar (Restaurant bis Wedding, je drei Stile).
              </p>
              <CreateProspectForm industries={industryOptions} styles={styleOptions} />
            </div>

            <div className="card" style={{ marginTop: 24 }}>
              <h2>Pipeline</h2>
              <p style={{ color: 'var(--muted)' }}>
                Status pflegen, Tenant erzeugen (bcrypt-Hash, veröffentlichte Version + neuer Draft-Klon für die Bearbeitung).
              </p>
              <ProspectsBoard prospects={serializable} />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
