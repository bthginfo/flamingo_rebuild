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
import type {
  SiteGlobalIntegrations,
  SiteSeed,
  TenantCookieUiMode,
  TenantCustomScript,
  TenantMailSmtpSettings
} from '@/template-engine/seeds/model';

function newScriptId(): string {
  return `sc_${Math.random().toString(36).slice(2, 10)}`;
}

export function TenantIntegrationsEditor() {
  const [contentState, setContentState] = useState<AdminContentState>({ mode: 'demo' });
  const [seed, setSeed] = useState<SiteSeed | null>(null);
  const [integrations, setIntegrations] = useState<SiteGlobalIntegrations>({ cookieUi: 'off' });
  const [status, setStatus] = useState<
    'loading' | 'ready' | 'demo' | 'saving' | 'saved' | 'publishing' | 'discarding' | 'error'
  >('loading');
  const [message, setMessage] = useState('');
  const [mailTest, setMailTest] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
  const [mailTestMsg, setMailTestMsg] = useState('');

  const load = useCallback(async () => {
    setStatus('loading');
    setMessage('');
    const cs = await resolveAdminContentState();
    setContentState(cs);
    if (cs.mode !== 'api' || !cs.tenantSlug) {
      setStatus('demo');
      setSeed(null);
      setIntegrations({ cookieUi: 'off' });
      return;
    }
    try {
      const doc = await loadAdminDocument(cs.tenantSlug, true);
      setSeed(doc);
      setIntegrations(
        doc.global.integrations ?? {
          cookieUi: 'off',
          privacyHref: '/datenschutz',
          imprintHref: '/impressum'
        }
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

  function buildNextSeed(): SiteSeed | null {
    if (!seed) return null;
    return {
      ...seed,
      global: {
        ...seed.global,
        integrations: { ...integrations }
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

  async function sendTestMail() {
    if (contentState.mode !== 'api' || !contentState.tenantSlug) return;
    setMailTest('sending');
    setMailTestMsg('');
    try {
      const r = await fetch(`/api/admin/test-mail?slug=${encodeURIComponent(contentState.tenantSlug)}`, {
        method: 'POST'
      });
      const j = (await r.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (r.ok && j.ok) {
        setMailTest('ok');
        setMailTestMsg('Test-Mail wurde versendet.');
      } else {
        setMailTest('err');
        setMailTestMsg(j.error ?? 'Versand fehlgeschlagen.');
      }
    } catch {
      setMailTest('err');
      setMailTestMsg('Netzwerkfehler.');
    }
  }

  function patchMail(patch: Partial<TenantMailSmtpSettings>) {
    setIntegrations((prev) => ({
      ...prev,
      mail: { ...prev.mail, ...patch }
    }));
    if (status === 'ready' || status === 'saved') setStatus('ready');
  }

  function setScripts(next: TenantCustomScript[]) {
    setIntegrations((prev) => ({ ...prev, customScripts: next }));
    if (status === 'ready' || status === 'saved') setStatus('ready');
  }

  function updateScript(i: number, patch: Partial<TenantCustomScript>) {
    const list = [...(integrations.customScripts ?? [])];
    list[i] = { ...list[i], ...patch };
    setScripts(list);
  }

  function removeScript(i: number) {
    const list = [...(integrations.customScripts ?? [])];
    list.splice(i, 1);
    setScripts(list);
  }

  function addScript() {
    const list = [...(integrations.customScripts ?? [])];
    list.push({
      id: newScriptId(),
      name: 'Neues Skript',
      category: 'analytics',
      code: '',
      enabled: true,
      placement: 'head'
    });
    setScripts(list);
  }

  if (status === 'demo') {
    return (
      <div className="card" style={{ padding: 24 }}>
        <p style={{ color: 'var(--muted)' }}>
          Integrationen (SMTP, Skripte, Cookie-Banner) sind nur mit Admin-Session und Datenbank aktiv. Bitte einloggen.
        </p>
      </div>
    );
  }

  const mail = integrations.mail ?? {};

  return (
    <div className="cms-stack" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div className="card" style={{ padding: 24 }}>
        <h2 style={{ marginTop: 0 }}>E-Mail (SMTP)</h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.55 }}>
          Wie im klassischen Admin: eigenes Postfach für Formular-Versand. Passwort wird nicht im Browser angezeigt;
          leeres Feld beim Speichern behält den gespeicherten Wert.
        </p>
        <label className="cms-field" style={{ marginTop: 16 }}>
          <span>
            <input
              type="checkbox"
              checked={mail.enabled === true}
              onChange={(e) => patchMail({ enabled: e.target.checked })}
            />{' '}
            Eigenes SMTP aktiv
          </span>
        </label>
        {mail.enabled ? (
          <div style={{ display: 'grid', gap: 14, marginTop: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              <label className="cms-field">
                <span>Host</span>
                <input value={mail.host ?? ''} onChange={(e) => patchMail({ host: e.target.value })} placeholder="smtp.example.com" />
              </label>
              <label className="cms-field">
                <span>Port</span>
                <input
                  type="number"
                  value={mail.port ?? 587}
                  onChange={(e) => patchMail({ port: Number(e.target.value || 587) })}
                />
              </label>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              <label className="cms-field">
                <span>Benutzer</span>
                <input value={mail.user ?? ''} onChange={(e) => patchMail({ user: e.target.value })} autoComplete="off" />
              </label>
              <label className="cms-field">
                <span>Passwort {mail.passPresent ? '(gesetzt — leer lassen zum Beibehalten)' : ''}</span>
                <input
                  type="password"
                  value={mail.pass ?? ''}
                  onChange={(e) => patchMail({ pass: e.target.value })}
                  autoComplete="new-password"
                />
              </label>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              <label className="cms-field">
                <span>Von (From)</span>
                <input type="email" value={mail.from ?? ''} onChange={(e) => patchMail({ from: e.target.value })} />
              </label>
              <label className="cms-field">
                <span>An (To)</span>
                <input type="email" value={mail.to ?? ''} onChange={(e) => patchMail({ to: e.target.value })} />
              </label>
            </div>
            <label className="cms-field">
              <span>
                <input
                  type="checkbox"
                  checked={mail.autoReply !== false}
                  onChange={(e) => patchMail({ autoReply: e.target.checked })}
                />{' '}
                Auto-Reply an Absender (optional)
              </span>
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <button type="button" className="button" disabled={mailTest === 'sending'} onClick={() => void sendTestMail()}>
                {mailTest === 'sending' ? 'Sende…' : 'Test-Mail senden'}
              </button>
              {mailTestMsg ? (
                <span style={{ color: mailTest === 'ok' ? 'green' : 'var(--accent)', fontSize: 14 }}>{mailTestMsg}</span>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>

      <div className="card" style={{ padding: 24 }}>
        <h2 style={{ marginTop: 0 }}>Skripte &amp; Tracking</h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.55 }}>
          Skripte werden erst nach Cookie-Zustimmung geladen (außer Kategorie „Notwendig“). URL oder Inline-JS — externe
          URLs nur <code>https://</code>.
        </p>
        {(integrations.customScripts ?? []).length === 0 ? (
          <p style={{ color: 'var(--muted)' }}>Noch keine Skripte.</p>
        ) : null}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {(integrations.customScripts ?? []).map((s, i) => (
            <div key={s.id} className="card" style={{ padding: 16, borderColor: 'var(--line)' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
                <input
                  style={{ flex: '1 1 180px' }}
                  value={s.name}
                  onChange={(e) => updateScript(i, { name: e.target.value })}
                />
                <select value={s.category} onChange={(e) => updateScript(i, { category: e.target.value as TenantCustomScript['category'] })}>
                  <option value="necessary">Notwendig</option>
                  <option value="functional">Funktional</option>
                  <option value="analytics">Analyse</option>
                  <option value="marketing">Marketing</option>
                </select>
                <select value={s.placement} onChange={(e) => updateScript(i, { placement: e.target.value as TenantCustomScript['placement'] })}>
                  <option value="head">head</option>
                  <option value="body">body</option>
                </select>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <input type="checkbox" checked={s.enabled} onChange={(e) => updateScript(i, { enabled: e.target.checked })} /> Aktiv
                </label>
                <button type="button" className="button" style={{ background: 'transparent', color: 'var(--accent)' }} onClick={() => removeScript(i)}>
                  Entfernen
                </button>
              </div>
              <label className="cms-field" style={{ marginTop: 10 }}>
                <span>Code oder URL</span>
                <textarea rows={4} value={s.code} onChange={(e) => updateScript(i, { code: e.target.value })} style={{ fontFamily: 'monospace', fontSize: 12 }} />
              </label>
            </div>
          ))}
        </div>
        <button type="button" className="button" style={{ marginTop: 16 }} onClick={addScript}>
          + Skript
        </button>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <h2 style={{ marginTop: 0 }}>Cookie-Banner (öffentliche Site)</h2>
        <label className="cms-field">
          <span>Modus</span>
          <select
            value={integrations.cookieUi ?? 'off'}
            onChange={(e) => {
              setIntegrations((p) => ({ ...p, cookieUi: e.target.value as TenantCookieUiMode }));
              if (status === 'ready' || status === 'saved') setStatus('ready');
            }}
          >
            <option value="off">Aus</option>
            <option value="full">Voll (DSGVO-Kategorien)</option>
          </select>
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginTop: 12 }}>
          <label className="cms-field">
            <span>Link Datenschutz (Pfad)</span>
            <input value={integrations.privacyHref ?? '/datenschutz'} onChange={(e) => setIntegrations((p) => ({ ...p, privacyHref: e.target.value }))} />
          </label>
          <label className="cms-field">
            <span>Link Impressum (Pfad)</span>
            <input value={integrations.imprintHref ?? '/impressum'} onChange={(e) => setIntegrations((p) => ({ ...p, imprintHref: e.target.value }))} />
          </label>
        </div>
      </div>

      {message ? <p style={{ color: 'var(--accent)' }}>{message}</p> : null}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        <button type="button" className="button" disabled={status === 'saving' || status === 'publishing'} onClick={() => void handleSave()}>
          {status === 'saving' ? 'Speichert…' : 'Entwurf speichern'}
        </button>
        <button type="button" className="button" disabled={status === 'saving' || status === 'publishing'} onClick={() => void handlePublish()}>
          {status === 'publishing' ? 'Veröffentlicht…' : 'Speichern & veröffentlichen'}
        </button>
        <button type="button" className="button" style={{ background: 'transparent', border: '1px solid var(--line)' }} onClick={() => void handleDiscard()}>
          Entwurf verwerfen
        </button>
      </div>
    </div>
  );
}
