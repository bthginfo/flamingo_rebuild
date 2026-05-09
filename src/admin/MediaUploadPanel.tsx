'use client';

import { useCallback, useEffect, useState } from 'react';
import { upload } from '@vercel/blob/client';

type SessionOk = { ok: true; tenantSlug: string };
type SessionState = { ok: false; reason: 'unauthenticated' | 'error' } | SessionOk | null;

export function MediaUploadPanel() {
  const [session, setSession] = useState<SessionState>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [lastUrl, setLastUrl] = useState('');

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch('/api/admin/session', { cache: 'no-store' });
        const data = (await res.json()) as { authenticated?: boolean; tenantSlug?: string };
        if (cancelled) return;
        if (res.ok && data.authenticated === true && typeof data.tenantSlug === 'string' && data.tenantSlug.length > 0) {
          setSession({ ok: true, tenantSlug: data.tenantSlug });
        } else {
          setSession({ ok: false, reason: 'unauthenticated' });
        }
      } catch {
        if (!cancelled) setSession({ ok: false, reason: 'error' });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const onPickFile = useCallback(
    async (file: File | undefined, input: HTMLInputElement | null) => {
      if (!file || !session?.ok) return;
      setBusy(true);
      setMessage('');
      try {
        const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 120) || 'upload';
        const pathname = `${session.tenantSlug}/media/${Date.now()}-${safe}`;
        const result = await upload(pathname, file, {
          access: 'public',
          handleUploadUrl: '/api/admin/blob-upload'
        });
        setLastUrl(result.url);
        setMessage('Upload fertig. URL unten kopieren und in Hero-, Galerie- oder Kartenfeldern einfügen.');
      } catch (e) {
        const text = e instanceof Error ? e.message : String(e);
        setMessage(text.includes('503') || text.toLowerCase().includes('blob') ? text : `Upload fehlgeschlagen: ${text}`);
      } finally {
        setBusy(false);
        if (input) input.value = '';
      }
    },
    [session]
  );

  async function copyUrl() {
    if (!lastUrl) return;
    try {
      await navigator.clipboard.writeText(lastUrl);
      setMessage('URL in die Zwischenablage kopiert.');
    } catch {
      setMessage('Kopieren nicht möglich — URL manuell markieren.');
    }
  }

  if (session === null) {
    return (
      <p style={{ color: 'var(--muted)', marginTop: 24 }} role="status">
        Session wird geprüft …
      </p>
    );
  }

  if (!session.ok) {
    return (
      <section style={{ marginTop: 28, padding: 20, border: '1px solid rgba(0,0,0,0.08)', borderRadius: 8, maxWidth: 640 }}>
        <p className="eyebrow">Upload</p>
        <p style={{ color: 'var(--muted)', lineHeight: 1.55 }}>
          {session.reason === 'unauthenticated'
            ? 'Upload ist nur mit gültigem Tenant-Admin-Login möglich. Ohne Session kannst du weiterhin Bild-URLs manuell in den Editoren eintragen.'
            : 'Session konnte nicht geladen werden. Bitte Seite neu laden.'}
        </p>
      </section>
    );
  }

  return (
    <section style={{ marginTop: 28, padding: 20, border: '1px solid rgba(0,0,0,0.08)', borderRadius: 8, maxWidth: 720 }}>
      <p className="eyebrow">Upload (Vercel Blob)</p>
      <p style={{ color: 'var(--muted)', lineHeight: 1.55, marginBottom: 16 }}>
        JPEG, PNG, WebP, GIF oder SVG, maximal 1,5&nbsp;MB. Dateien liegen unter <code>{session.tenantSlug}/media/…</code> in deinem Blob-Store.
      </p>
      <label className="cms-field" style={{ display: 'block', marginBottom: 12 }}>
        <span>Bild wählen</span>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
          disabled={busy}
          onChange={(event) => void onPickFile(event.target.files?.[0], event.target)}
        />
      </label>
      {busy ? (
        <p role="status" style={{ marginTop: 8 }}>
          Lädt hoch …
        </p>
      ) : null}
      {message ? (
        <p role="status" style={{ marginTop: 12, color: 'var(--muted)' }}>
          {message}
        </p>
      ) : null}
      {lastUrl ? (
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label className="cms-field">
            <span>Öffentliche URL</span>
            <input readOnly value={lastUrl} style={{ fontFamily: 'ui-monospace, monospace', fontSize: 13 }} />
          </label>
          <button className="button secondary" type="button" onClick={() => void copyUrl()}>
            URL kopieren
          </button>
        </div>
      ) : null}
    </section>
  );
}
