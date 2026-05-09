'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  discardAdminDraft,
  loadAdminDocument,
  publishAdminDraft,
  resolveAdminContentState,
  saveAdminDraft,
  type AdminContentState
} from '@/cms/admin-content-api';
import type { SiteSeed } from '@/template-engine/seeds/model';

type SeoRow = { pageId: string; pageKey: string; pageTitle: string; slug: string; metaTitle: string; metaDescription: string };

function asSeoString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

export function TenantSeoEditor() {
  const [contentState, setContentState] = useState<AdminContentState>({ mode: 'demo' });
  const [seed, setSeed] = useState<SiteSeed | null>(null);
  const [rows, setRows] = useState<SeoRow[]>([]);
  const [status, setStatus] = useState<
    'loading' | 'ready' | 'demo' | 'saving' | 'saved' | 'publishing' | 'discarding' | 'error'
  >('loading');
  const [message, setMessage] = useState('');

  const load = useCallback(async () => {
    setStatus('loading');
    setMessage('');
    const cs = await resolveAdminContentState();
    setContentState(cs);
    if (cs.mode !== 'api' || !cs.tenantSlug) {
      setStatus('demo');
      setSeed(null);
      setRows([]);
      return;
    }
    try {
      const doc = await loadAdminDocument(cs.tenantSlug, true);
      setSeed(doc);
      setRows(
        doc.pages.map((page) => ({
          pageId: page.id,
          pageKey: page.key,
          pageTitle: page.title,
          slug: page.slug,
          metaTitle: asSeoString(page.seo.title),
          metaDescription: asSeoString(page.seo.description)
        }))
      );
      setStatus('ready');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Laden fehlgeschlagen.');
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function updateRow(pageId: string, patch: Partial<Pick<SeoRow, 'metaTitle' | 'metaDescription' | 'slug'>>) {
    setRows((current) => current.map((row) => (row.pageId === pageId ? { ...row, ...patch } : row)));
    if (status === 'ready' || status === 'saved') setStatus('ready');
  }

  function buildNextSeed(): SiteSeed | null {
    if (!seed) return null;
    const byId = new Map(rows.map((r) => [r.pageId, r]));
    return {
      ...seed,
      pages: seed.pages.map((page) => {
        const row = byId.get(page.id);
        if (!row) return page;
        return {
          ...page,
          slug: row.slug.trim().startsWith('/') ? row.slug.trim() : `/${row.slug.trim()}`,
          seo: {
            ...page.seo,
            title: row.metaTitle.trim(),
            description: row.metaDescription.trim()
          }
        };
      })
    };
  }

  async function handleSave() {
    if (!seed || contentState.mode !== 'api' || !contentState.tenantSlug) return;
    setStatus('saving');
    setMessage('');
    try {
      const next = buildNextSeed();
      if (!next) {
        setStatus('ready');
        return;
      }
      await saveAdminDraft(contentState.tenantSlug, next);
      setSeed(next);
      setStatus('saved');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Speichern fehlgeschlagen.');
    }
  }

  async function handlePublish() {
    if (!seed || contentState.mode !== 'api' || !contentState.tenantSlug) return;
    setStatus('publishing');
    setMessage('');
    try {
      const next = buildNextSeed();
      if (!next) {
        setStatus('ready');
        return;
      }
      await saveAdminDraft(contentState.tenantSlug, next);
      await publishAdminDraft(contentState.tenantSlug);
      await load();
      setStatus('saved');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Veröffentlichen fehlgeschlagen.');
    }
  }

  async function handleDiscard() {
    if (contentState.mode !== 'api' || !contentState.tenantSlug) return;
    setStatus('discarding');
    setMessage('');
    try {
      await discardAdminDraft(contentState.tenantSlug);
      await load();
      setStatus('ready');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Verwerfen fehlgeschlagen.');
    }
  }

  if (status === 'demo') {
    return (
      <div className="card" style={{ marginTop: 24 }}>
        <h2>Demo-Modus</h2>
        <p style={{ color: 'var(--muted)' }}>
          SEO-Felder live speichern geht mit Admin-Login und Datenbank. Im Demo-Modus liegen Meta-Daten im Seed bzw. in
          den Seiten-Metadaten der lokalen Vorschau.
        </p>
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <p className="eyebrow" style={{ marginTop: 24 }}>
        Lade Seiten…
      </p>
    );
  }

  if (status === 'error' && !seed) {
    return (
      <div className="card" style={{ marginTop: 24 }}>
        <p className="cms-error-text">{message || 'Konnte SEO-Daten nicht laden.'}</p>
        <button className="button secondary" type="button" onClick={() => void load()}>
          Erneut versuchen
        </button>
      </div>
    );
  }

  return (
    <div className="card" style={{ marginTop: 24 }}>
      <p className="eyebrow">Pro Seite</p>
      <p style={{ color: 'var(--muted)', marginBottom: 20 }}>
        <code>title</code> und <code>description</code> im <code>seo</code>-Objekt. Speichern legt den Entwurf ab;
        „Veröffentlichen“ schreibt live (nach erneutem Laden der öffentlichen Site sichtbar).
      </p>
      {message && status === 'error' ? <p className="cms-error-text">{message}</p> : null}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {rows.map((row) => (
          <article key={row.pageId} style={{ borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: 20 }}>
            <p className="eyebrow">
              {row.pageKey} · {row.pageTitle}
            </p>
            <label className="cms-field" style={{ marginTop: 12 }}>
              <span>URL-Pfad (Slug)</span>
              <input
                value={row.slug}
                onChange={(e) => updateRow(row.pageId, { slug: e.target.value })}
                placeholder="/kontakt"
              />
            </label>
            <label className="cms-field" style={{ marginTop: 12 }}>
              <span>Meta-Titel</span>
              <input value={row.metaTitle} onChange={(e) => updateRow(row.pageId, { metaTitle: e.target.value })} />
            </label>
            <label className="cms-field is-wide" style={{ marginTop: 12 }}>
              <span>Meta-Beschreibung</span>
              <textarea
                rows={3}
                value={row.metaDescription}
                onChange={(e) => updateRow(row.pageId, { metaDescription: e.target.value })}
              />
            </label>
          </article>
        ))}
      </div>
      <div style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <button
          className="button"
          type="button"
          onClick={() => void handleSave()}
          disabled={status === 'saving' || status === 'publishing' || status === 'discarding'}
        >
          {status === 'saving' ? 'Speichert…' : 'Entwurf speichern'}
        </button>
        <button
          className="button secondary"
          type="button"
          onClick={() => void handlePublish()}
          disabled={status === 'saving' || status === 'publishing' || status === 'discarding'}
        >
          {status === 'publishing' ? 'Veröffentlicht…' : 'Speichern & veröffentlichen'}
        </button>
        <button
          className="button secondary"
          type="button"
          onClick={() => void handleDiscard()}
          disabled={status === 'saving' || status === 'publishing' || status === 'discarding'}
        >
          {status === 'discarding' ? 'Verwerfen…' : 'Entwurf verwerfen'}
        </button>
        {status === 'saved' ? (
          <span className="eyebrow" style={{ marginLeft: 8 }}>
            Fertig.
          </span>
        ) : null}
      </div>
    </div>
  );
}
