import Link from 'next/link';
import { isDatabaseConfigured } from '@/db/client';
import { listProspects } from '@/db/crm-repository';
import { industries } from '@/template-engine/industries';
import { styles } from '@/template-engine/styles';
import { CreateProspectForm, ProspectsBoard, type SerializableProspect } from '@/app/internal/crm/crm-forms';

export const dynamic = 'force-dynamic';

function isMissingRelationError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  const msg = error.message.toLowerCase();
  const code = 'code' in error && typeof (error as { code?: string }).code === 'string' ? (error as { code: string }).code : '';
  return code === '42P01' || msg.includes('does not exist') || msg.includes('relation');
}

export default async function InternalCrmProspectsPage() {
  const dbReady = isDatabaseConfigured();
  let prospects: Awaited<ReturnType<typeof listProspects>> = [];
  let schemaMissing = false;

  if (dbReady) {
    try {
      prospects = await listProspects();
    } catch (error) {
      if (isMissingRelationError(error)) {
        schemaMissing = true;
      } else {
        throw error;
      }
    }
  }

  const serializable: SerializableProspect[] = prospects.map((entry) => ({
    ...entry,
    createdAt: entry.createdAt.toISOString(),
    updatedAt: entry.updatedAt.toISOString()
  }));

  const industryOptions = industries.map((industry) => ({ key: industry.key, label: industry.label }));
  const styleOptions = styles.map((style) => ({ key: style.key, label: style.label }));

  return (
    <div className="admin-surface section">
      <div className="shell">
        <p className="eyebrow">Prospects</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'baseline' }}>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 40, margin: '8px 0 0' }}>Pipeline &amp; Provisioning</h1>
          <Link className="button secondary" href="/templates">
            Showcase
          </Link>
        </div>
        <p style={{ color: 'var(--muted)', maxWidth: 720, marginTop: 12 }}>
          Diese URL ist nirgends verlinkt. Zugang nur mit{' '}
          <code>FLAMINGO_INTERNAL_CRM_PASSWORD_HASH</code> (bcrypt) — getrennt vom Kunden-Admin unter{' '}
          <code>/admin</code>.
        </p>

        {!dbReady ? (
          <div className="card" style={{ marginTop: 24 }}>
            <h2>Datenbank aus</h2>
            <p style={{ color: 'var(--muted)' }}>
              Setze in <code>.env.local</code> <code>FLAMINGO_REBUILD_DB=1</code> und <code>POSTGRES_URL</code>, führe{' '}
              <code>npm run db:migrate</code> aus.
            </p>
          </div>
        ) : schemaMissing ? (
          <div className="card" style={{ marginTop: 24 }}>
            <h2>Datenbank-Schema fehlt</h2>
            <p style={{ color: 'var(--muted)' }}>
              Tabellen wie <code>crm_prospects</code> fehlen. Einmalig <code>npm run db:migrate</code> ausführen.
            </p>
          </div>
        ) : (
          <>
            <div className="card" style={{ marginTop: 24 }}>
              <h2>Neuen Prospect anlegen</h2>
              <p style={{ color: 'var(--muted)' }}>
                Branche und Stil steuern den Demo-Seed. Beim Provisionieren kannst du sie im Dialog überschreiben.
              </p>
              <CreateProspectForm industries={industryOptions} styles={styleOptions} />
            </div>

            <div className="card" style={{ marginTop: 24 }}>
              <h2>Prospects ({serializable.length})</h2>
              <ProspectsBoard prospects={serializable} industries={industryOptions} styles={styleOptions} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
