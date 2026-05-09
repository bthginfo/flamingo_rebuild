'use client';

import { FormEvent, Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function InternalCrmLoginPage() {
  return (
    <div className="shell" style={{ maxWidth: 440, paddingBlock: 48 }}>
      <Suspense fallback={<p style={{ color: 'var(--muted)' }}>Laden …</p>}>
        <InternalCrmLoginForm />
      </Suspense>
    </div>
  );
}

function InternalCrmLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setPending(true);
    const response = await fetch('/api/internal/crm/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ password })
    });
    setPending(false);
    if (!response.ok) {
      const payload = (await response.json().catch(() => ({ error: 'Login fehlgeschlagen.' }))) as { error?: string };
      setError(payload.error ?? 'Login fehlgeschlagen.');
      return;
    }
    const next = searchParams.get('next') ?? '/internal/crm/prospects';
    router.replace(next);
    router.refresh();
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-panel">
        <p className="eyebrow">Interner Zugang</p>
        <h1 style={{ fontFamily: 'Georgia, serif' }}>Flamingo CRM</h1>
        <p style={{ color: 'var(--muted)', fontSize: 14 }}>
          Getrennt vom Kunden-Admin. Passwort aus Umgebungsvariable{' '}
          <code style={{ fontSize: 12 }}>FLAMINGO_INTERNAL_CRM_PASSWORD_HASH</code> (bcrypt).
        </p>
        <form className="admin-login-form" onSubmit={submit}>
          <label className="cms-field">
            <span>Passwort</span>
            <input
              autoComplete="current-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoFocus
            />
          </label>
          {error ? <p className="admin-login-error">{error}</p> : null}
          <button className="button" disabled={pending} type="submit">
            {pending ? 'Anmelden …' : 'Anmelden'}
          </button>
        </form>
      </section>
    </main>
  );
}
