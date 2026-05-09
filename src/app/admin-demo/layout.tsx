import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Suspense } from 'react';
import { AdminDemoShell } from './AdminDemoShell';

export const metadata: Metadata = {
  title: 'Admin-Demo',
  robots: { index: false, follow: false }
};

export default function AdminDemoLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div className="admin-app admin-demo-suspense-fallback">Admin-Demo lädt …</div>}>
      <AdminDemoShell>{children}</AdminDemoShell>
    </Suspense>
  );
}
