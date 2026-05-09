'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { buildBlankCustomPage } from '@/lib/custom-page-factory';
import { loadAdminDocument, resolveAdminContentState, saveAdminDraft } from '@/cms/admin-content-api';
import type { SiteSeed } from '@/template-engine/seeds/model';

export function AddCustomPageForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [status, setStatus] = useState<'idle' | 'saving' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');
    const cs = await resolveAdminContentState();
    if (cs.mode !== 'api' || !cs.tenantSlug) {
      setStatus('error');
      setMessage('Nur mit aktiver Admin-Session und Datenbank möglich.');
      return;
    }
    const t = title.trim();
    const s = slug.trim();
    if (!t || !s) {
      setMessage('Titel und URL-Pfad sind Pflicht.');
      return;
    }
    setStatus('saving');
    try {
      const doc = await loadAdminDocument(cs.tenantSlug, true);
      const page = buildBlankCustomPage({ title: t, slug: s });
      const keys = new Set(doc.pages.map((p) => p.key));
      if (keys.has(page.key)) {
        setStatus('error');
        setMessage('Diese URL erzeugt einen Seiten-Schlüssel, der schon existiert. Bitte anderen Pfad wählen.');
        return;
      }
      const next: SiteSeed = {
        ...doc,
        pages: [...doc.pages, page]
      };
      await saveAdminDraft(cs.tenantSlug, next);
      setStatus('done');
      router.push(`/admin/pages/${encodeURIComponent(page.key)}`);
      router.refresh();
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Anlegen fehlgeschlagen.');
    }
  }

  return (
    <form className="card fm-add-page" onSubmit={(e) => void handleSubmit(e)} style={{ padding: 24 }}>
      <p className="eyebrow">Neue Seite</p>
      <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 28, margin: '8px 0 12px' }}>Leere Seite anlegen</h2>
      <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.55, marginBottom: 16 }}>
        Erzeugt eine neue URL mit Kopfbild- und Text-Baustein (Entwurf). Menüpunkt unter{' '}
        <strong>Navigation &amp; Footer</strong> selbst ergänzen; danach wie gewohnt veröffentlichen.
      </p>
      <label className="fm-add-page__field">
        <span>Titel</span>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="z. B. Jobs" required />
      </label>
      <label className="fm-add-page__field">
        <span>URL-Pfad</span>
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="z. B. jobs oder /jobs"
          required
        />
      </label>
      <button type="submit" className="button" disabled={status === 'saving'}>
        {status === 'saving' ? 'Speichern …' : 'Seite anlegen & öffnen'}
      </button>
      {message ? (
        <p className={status === 'error' ? 'fm-add-page__err' : ''} style={{ marginTop: 12 }}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
