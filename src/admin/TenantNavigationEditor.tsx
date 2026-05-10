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
import { CUSTOM_THEME_PREFIX, THEME_PRESETS, normalizeTheme, type TenantCustomTheme } from '@/template-engine/theme-presets';

type NavItem = { label: string; href: string };
type BrandFields = { name: string; tagline: string; accentHex: string; themePresetId: string; customThemes: TenantCustomTheme[] };
type ContactFields = { address: string; phone: string; email: string; openingHours: string; mapsUrl: string };

export function TenantNavigationEditor() {
  const [contentState, setContentState] = useState<AdminContentState>({ mode: 'demo' });
  const [seed, setSeed] = useState<SiteSeed | null>(null);
  const [items, setItems] = useState<NavItem[]>([]);
  const [brand, setBrand] = useState<BrandFields>({ name: '', tagline: '', accentHex: '', themePresetId: '', customThemes: [] });
  const [contact, setContact] = useState<ContactFields>({ address: '', phone: '', email: '', openingHours: '', mapsUrl: '' });
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
      setBrand({
        name: asString(doc.global.brand.name),
        tagline: asString(doc.global.brand.tagline),
        accentHex: normalizeHex(asString(doc.global.brand.accentHex)),
        themePresetId: asString(doc.global.brand.themePresetId),
        customThemes: arrayThemes(doc.global.brand.customThemes)
      });
      setContact({
        address: asString(doc.global.contact.address),
        phone: asString(doc.global.contact.phone),
        email: asString(doc.global.contact.email),
        openingHours: asString(doc.global.contact.openingHours),
        mapsUrl: asString(doc.global.contact.mapsUrl)
      });
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
        brand: {
          name: brand.name.trim(),
          tagline: brand.tagline.trim(),
          accentHex: normalizeHex(brand.accentHex.trim()),
          themePresetId: brand.themePresetId.trim(),
          customThemes: brand.customThemes.map(normalizeTheme)
        },
        contact: {
          ...seed.global.contact,
          address: contact.address.trim(),
          phone: contact.phone.trim(),
          email: contact.email.trim(),
          openingHours: contact.openingHours.trim(),
          mapsUrl: contact.mapsUrl.trim()
        },
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

  function updateBrand(patch: Partial<BrandFields>) {
    setBrand((current) => ({ ...current, ...patch }));
    if (status === 'ready' || status === 'saved') setStatus('ready');
  }

  function updateContact(patch: Partial<ContactFields>) {
    setContact((current) => ({ ...current, ...patch }));
    if (status === 'ready' || status === 'saved') setStatus('ready');
  }

  function updateTheme(index: number, patch: Partial<TenantCustomTheme>) {
    updateBrand({
      customThemes: brand.customThemes.map((theme, i) => (i === index ? { ...theme, ...patch } : theme))
    });
  }

  function addCustomTheme() {
    const id = `theme-${Date.now().toString(36)}`;
    updateBrand({
      themePresetId: `${CUSTOM_THEME_PREFIX}${id}`,
      customThemes: [
        ...brand.customThemes,
        {
          id,
          label: 'Eigenes Schema',
          name: 'Eigenes Schema',
          primary: '#111827',
          primaryFg: '#ffffff',
          accent: normalizeHex(brand.accentHex) || '#ff3d68',
          accentFg: '#ffffff',
          surface: '#f8fafc',
          bg: '#ffffff',
          text: '#111827'
        }
      ]
    });
  }

  function removeCustomTheme(index: number) {
    const removed = brand.customThemes[index];
    const next = brand.customThemes.filter((_, i) => i !== index);
    updateBrand({
      customThemes: next,
      themePresetId: brand.themePresetId === `${CUSTOM_THEME_PREFIX}${removed?.id}` ? '' : brand.themePresetId
    });
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
      <p className="eyebrow">Brand & Kontakt</p>
      <p style={{ color: 'var(--muted)', marginBottom: 20 }}>
        Diese Werte steuern Logo-Text, Footer-Claim und globale Kontakt-Fallbacks in den Templates.
      </p>
      <div className="cms-field-grid" style={{ marginBottom: 26 }}>
        <label className="cms-field">
          <span>Brand-Name</span>
          <input value={brand.name} onChange={(e) => updateBrand({ name: e.target.value })} />
        </label>
        <label className="cms-field">
          <span>Tagline</span>
          <input value={brand.tagline} onChange={(e) => updateBrand({ tagline: e.target.value })} />
        </label>
        <label className="cms-field">
          <span>Akzentfarbe</span>
          <input
            type="color"
            value={normalizeHex(brand.accentHex) || '#ff3d68'}
            onChange={(e) => updateBrand({ accentHex: e.target.value })}
          />
        </label>
        <label className="cms-field">
          <span>Akzentfarbe HEX</span>
          <input
            value={brand.accentHex}
            placeholder="#ff3d68"
            onChange={(e) => updateBrand({ accentHex: e.target.value })}
          />
        </label>
        <label className="cms-field is-wide">
          <span>Aktives Farbschema</span>
          <select value={brand.themePresetId} onChange={(e) => updateBrand({ themePresetId: e.target.value })}>
            <option value="">Template-Standard / Akzentfarbe</option>
            {(seed ? THEME_PRESETS[seed.industryKey] : []).map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.label}
              </option>
            ))}
            {brand.customThemes.map((theme) => (
              <option key={theme.id} value={`${CUSTOM_THEME_PREFIX}${theme.id}`}>
                Eigen: {theme.label || theme.name || theme.id}
              </option>
            ))}
          </select>
        </label>
        <div className="cms-list is-wide">
          <span>Eigene Farbschemas</span>
          {brand.customThemes.map((theme, index) => (
            <div className="cms-repeat-item" key={theme.id}>
              <div className="cms-repeat-toolbar">
                <button type="button" className="button secondary" onClick={() => removeCustomTheme(index)}>
                  Schema entfernen
                </button>
              </div>
              <div className="cms-field-grid">
                <label className="cms-field">
                  <span>Name</span>
                  <input value={theme.label || theme.name || ''} onChange={(e) => updateTheme(index, { label: e.target.value, name: e.target.value })} />
                </label>
                <ColorPair label="Primär" value={theme.primary} onChange={(value) => updateTheme(index, { primary: value })} />
                <ColorPair label="Primär-Text" value={theme.primaryFg} onChange={(value) => updateTheme(index, { primaryFg: value })} />
                <ColorPair label="Akzent" value={theme.accent} onChange={(value) => updateTheme(index, { accent: value })} />
                <ColorPair label="Fläche" value={theme.surface} onChange={(value) => updateTheme(index, { surface: value })} />
                <ColorPair label="Hintergrund" value={theme.bg} onChange={(value) => updateTheme(index, { bg: value })} />
                <ColorPair label="Text" value={theme.text} onChange={(value) => updateTheme(index, { text: value })} />
              </div>
            </div>
          ))}
          <button type="button" className="button secondary" onClick={addCustomTheme}>
            Eigenes Farbschema hinzufügen
          </button>
        </div>
        <label className="cms-field is-wide">
          <span>Adresse</span>
          <textarea rows={2} value={contact.address} onChange={(e) => updateContact({ address: e.target.value })} />
        </label>
        <label className="cms-field">
          <span>Telefon</span>
          <input value={contact.phone} onChange={(e) => updateContact({ phone: e.target.value })} />
        </label>
        <label className="cms-field">
          <span>E-Mail</span>
          <input value={contact.email} onChange={(e) => updateContact({ email: e.target.value })} />
        </label>
        <label className="cms-field is-wide">
          <span>Öffnungszeiten</span>
          <textarea
            rows={3}
            value={contact.openingHours}
            onChange={(e) => updateContact({ openingHours: e.target.value })}
          />
        </label>
        <label className="cms-field is-wide">
          <span>Google-Maps-Link</span>
          <input value={contact.mapsUrl} onChange={(e) => updateContact({ mapsUrl: e.target.value })} />
        </label>
      </div>
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

function ColorPair({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const normalized = normalizeHex(value) || '#000000';
  return (
    <label className="cms-field">
      <span>{label}</span>
      <input type="color" value={normalized} onChange={(e) => onChange(e.target.value)} />
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="#000000" />
    </label>
  );
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function arrayThemes(value: unknown): TenantCustomTheme[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is Record<string, unknown> => typeof item === 'object' && item !== null && !Array.isArray(item))
    .map((item) => ({
      id: asString(item.id) || `theme-${Math.random().toString(36).slice(2)}`,
      label: asString(item.label) || asString(item.name) || 'Eigenes Schema',
      name: asString(item.name) || asString(item.label) || 'Eigenes Schema',
      primary: normalizeHex(asString(item.primary)) || '#111827',
      primaryFg: normalizeHex(asString(item.primaryFg)) || '#ffffff',
      accent: normalizeHex(asString(item.accent)) || '#ff3d68',
      accentFg: normalizeHex(asString(item.accentFg)) || '#ffffff',
      surface: normalizeHex(asString(item.surface)) || '#f8fafc',
      bg: normalizeHex(asString(item.bg)) || '#ffffff',
      text: normalizeHex(asString(item.text)) || '#111827'
    }));
}

function normalizeHex(value: string): string {
  const v = value.trim();
  if (!v) return '';
  const withHash = v.startsWith('#') ? v : `#${v}`;
  return /^#[0-9a-fA-F]{6}$/.test(withHash) ? withHash.toLowerCase() : '';
}
