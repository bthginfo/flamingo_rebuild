import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Suspense } from 'react';
import { INDUSTRY_KEYS } from '@/template-engine/model';
import { getIndustry } from '@/template-engine/registry';
import { AdminDemoIndustryNav } from './AdminDemoIndustryNav';

export const metadata: Metadata = {
  title: 'Admin-Demo',
  robots: { index: false, follow: false }
};

export default function AdminDemoLayout({ children }: { children: ReactNode }) {
  return (
    <div className="admin-demo-root">
      <div className="admin-demo-topbar" role="banner">
        <div className="shell admin-demo-topbar__row">
          <p className="admin-demo-topbar__lede">
            <strong>Admin-Demo</strong>
            <span className="admin-demo-topbar__sep">·</span>
            Änderungen nur lokal im Browser (localStorage), kein Speichern auf dem Server.
            <span className="admin-demo-topbar__sep">·</span>
            <Link href="/">Zur Website</Link>
            <span className="admin-demo-topbar__sep">·</span>
            <Link href="/admin/login">Echter Admin-Login</Link>
          </p>
          <Suspense
            fallback={
              <nav className="admin-demo-topbar__industries" aria-label="Branche wechseln (Demo)">
                {INDUSTRY_KEYS.map((k) => (
                  <Link key={k} href={`/admin-demo/home?industry=${encodeURIComponent(k)}&style=classic`}>
                    {getIndustry(k).label}
                  </Link>
                ))}
              </nav>
            }
          >
            <AdminDemoIndustryNav />
          </Suspense>
        </div>
      </div>
      {children}
    </div>
  );
}
