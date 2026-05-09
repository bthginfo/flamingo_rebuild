'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { Suspense } from 'react';

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<LoginShell />}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tenant, setTenant] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setPending(true);

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ tenant, password })
    });

    setPending(false);
    if (!response.ok) {
      const payload = await response.json().catch(() => ({ error: 'Login fehlgeschlagen.' })) as { error?: string };
      setError(payload.error ?? 'Login fehlgeschlagen.');
      return;
    }

    router.replace(searchParams.get('next') ?? '/admin');
    router.refresh();
  }

  return <LoginShell onSubmit={submit} tenant={tenant} setTenant={setTenant} password={password} setPassword={setPassword} error={error} pending={pending} />;
}

function LoginShell({
  onSubmit,
  tenant = '',
  setTenant,
  password = '',
  setPassword,
  error = '',
  pending = false
}: {
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  tenant?: string;
  setTenant?: (value: string) => void;
  password?: string;
  setPassword?: (value: string) => void;
  error?: string;
  pending?: boolean;
}) {
  return (
    <main className="admin-login-page">
      <section className="admin-login-panel">
        <p className="eyebrow">Flamingo Admin</p>
        <h1>Einloggen</h1>
        <form className="admin-login-form" onSubmit={onSubmit}>
          <label className="cms-field">
            <span>Tenant</span>
            <input autoComplete="username" autoFocus value={tenant} onChange={(event) => setTenant?.(event.target.value)} />
          </label>
          <label className="cms-field">
            <span>Passwort</span>
            <input autoComplete="current-password" type="password" value={password} onChange={(event) => setPassword?.(event.target.value)} />
          </label>
          {error ? <p className="admin-login-error">{error}</p> : null}
          <button className="button" disabled={pending} type="submit">
            {pending ? 'Prüfe...' : 'Einloggen'}
          </button>
        </form>
      </section>
    </main>
  );
}
