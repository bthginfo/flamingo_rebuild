import Link from 'next/link';
import { requireInternalCrmSession } from '@/lib/internal-crm-server';
import { InternalCrmLogoutButton } from '@/app/internal/crm/InternalCrmLogoutButton';

export default async function InternalCrmAppLayout({ children }: { children: React.ReactNode }) {
  await requireInternalCrmSession();
  return (
    <>
      <header
        className="shell internal-crm-header"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          paddingBlock: 20,
          borderBottom: '1px solid var(--border, #e5e5e5)'
        }}
      >
        <div>
          <p className="eyebrow" style={{ margin: 0 }}>
            Interner Admin
          </p>
          <h1 style={{ fontFamily: 'Georgia, serif', margin: '4px 0 0', fontSize: 28 }}>Flamingo CRM</h1>
        </div>
        <nav style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/internal/crm/prospects" className="button secondary">
            Prospects
          </Link>
          <Link href="/internal/crm/tenants" className="button secondary">
            Tenants
          </Link>
          <InternalCrmLogoutButton />
        </nav>
      </header>
      {children}
    </>
  );
}
