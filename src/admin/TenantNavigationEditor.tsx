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

type NavItem = { label: string; href: string };

export function TenantNavigationEditor() {
  const [contentState, setContentState] = useState<AdminContentState>({ mode: 'demo' });
  const [seed, setSeed] = useState<SiteSeed | null>(null);
  const [items, setItems] = useState<NavItem[]>([]);
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
      setItems([]);
      return;
    }
    try {
      const doc = await loadAdminDocument(cs.tenantSlug, true);
      setSeed(doc);
      setItems(doc.global.navigation.map((entry) => ({ label: entry.label, href: entry.href })));
      setStatus('ready');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Laden fehlgeschlagen.');
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function buildNextSeed(): SiteSeed | null {
    if (!seed) return null;
    return {
      ...seed,
      global: {
        ...seed.global,
        navigation: items.map((entry) => ({ label: entry.label.trim(), href: entry.href.trim() }))
      }
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

  function updateItem(index: number, patch: Partial<NavItem>) {
    setItems((current) => current.map((row, i) => (i === index ? { ...row, ...patch } : row)));
    if (status === 'ready' || status === 'saved') setStatus('ready');
  }

  function addRow() {
    setItems((current) => [...current, { label: 'Neuer Link', href: '/' }]);
    if (status === 'ready' || status === 'saved') setStatus('ready');
  }

  function removeRow(index: number) {
    setItems((current) => current.filter((_, i) => i !== index));
    if (status === 'ready' || status === 'saved') setStatus('ready');
  }

  function moveRow(index: number, direction: -1 | 1) {
    setItems((current) => {
      const next = [...current];
      const j = index + direction;
      if (j < 0 || j >= next.length) return current;
      const [row] = next.splice(index, 1);
      next.splice(j, 0, row);
      return next;
    });
    if (status === 'ready' || status === 'saved') setStatus('ready');
  }

  if (status === 'demo') {
    return (
      <div className="card" style={{ marginTop: 24 }}>
        <h2>Demo-Modus</h2>
        <p style={{ color: 'var(--muted)' }}>
          Navigation live bearbeiten geht mit Admin-Login und Datenbank (<code>FLAMINGO_REBUILD_DB=1</code>,{' '}
          <code>POSTGRES_URL</code>). Ohne Session bleibt die Vorschau über die Seiten-Editoren im Demo-Modus.
        </p>
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <p className="eyebrow" style={{ marginTop: 24 }}>
        Lade Navigation…
      </p>
    );
  }

  if (status === 'error' && !seed) {
    return (
      <div className="card" style={{ marginTop: 24 }}>
        <p className="cms-error-text">{message || 'Konnte Navigation nicht laden.'}</p>
        <button className="button secondary" type="button" onClick={() => void load()}>
          Erneut versuchen
        </button>
      </div>
    );
  }

  return (
    <div className="card" style={{ marginTop: 24 }}>
      <p className="eyebrow">Hauptmenü</p>
      <p style={{ color: 'var(--muted)', marginBottom: 20 }}>
        Einträge sind die gleichen Links wie in der Vorschau (<code>href</code> relativ zur Site, z. B.{' '}
        <code>/kontakt</code>).
      </p>
      {message && status === 'error' ? <p className="cms-error-text">{message}</p> : null}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {items.map((row, index) => (
          <div
            key={`${row.href}-${index}`}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr auto',
              gap: 12,
              alignItems: 'end',
              borderBottom: '1px solid rgba(0,0,0,0.08)',
              paddingBottom: 16
            }}
          >
            <label className="cms-field">
              <span>Label</span>
              <input value={row.label} onChange={(e) => updateItem(index, { label: e.target.value })} />
            </label>
            <label className="cms-field">
              <span>Pfad</span>
              <input value={row.href} onChange={(e) => updateItem(index, { href: e.target.value })} />
            </label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button className="button secondary" type="button" onClick={() => moveRow(index, -1)} disabled={index === 0}>
                ↑
              </button>
              <button className="button secondary" type="button" onClick={() => moveRow(index, 1)} disabled={index === items.length - 1}>
                ↓
              </button>
              <button className="button secondary" type="button" onClick={() => removeRow(index)}>
                Entfernen
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 20 }}>
        <button className="button secondary" type="button" onClick={addRow}>
          Eintrag hinzufügen
        </button>
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
        {status === 'saved' ? <span className="eyebrow">Fertig.</span> : null}
      </div>
    </div>
  );
}
