'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function AdminLogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function logout() {
    setPending(true);
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin/login');
    router.refresh();
  }

  return (
    <button className="button secondary" disabled={pending} onClick={logout} type="button">
      {pending ? 'Abmelden...' : 'Abmelden'}
    </button>
  );
}
