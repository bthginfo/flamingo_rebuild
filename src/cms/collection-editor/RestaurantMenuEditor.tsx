'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { cloneSeed, discardDraft, hasDraft, loadDemoContent, publishDraft, resetPublished, saveDraft } from '@/cms/demo-store';
import {
  discardAdminDraft,
  loadAdminDocument,
  publishAdminDraft,
  resolveAdminContentState,
  saveAdminDraft,
  type AdminContentState
} from '@/cms/admin-content-api';
import type { CollectionSeedItem, SiteSeed } from '@/template-engine/seeds/model';
import { STYLE_KEYS, type StyleKey } from '@/template-engine/model';
import { getIndustry } from '@/template-engine/registry';
import {
  appendCollectionItemToReferencingSections,
  defaultNewCollectionItemData,
  removeCollectionItemFromAllSectionLists
} from '@/cms/collection-editor/collection-wiring';

const STYLE_LABELS: Record<StyleKey, string> = {
  classic: 'Klassisch',
  modern: 'Modern',
  bold: 'Bold'
};

type EditorStatus =
  | 'loading'
  | 'clean'
  | 'dirty'
  | 'saving'
  | 'publishing'
  | 'discarding'
  | 'saved'
  | 'published'
  | 'error';

export function RestaurantMenuEditor({
  initialSeed,
  collectionKey = 'menuItem',
  headingTitle
}: {
  initialSeed: SiteSeed;
  collectionKey?: string;
  headingTitle?: string;
}) {
  const [seed, setSeed] = useState<SiteSeed>(() => cloneSeed(initialSeed));
  const [status, setStatus] = useState<EditorStatus>('loading');
  const [draftExists, setDraftExists] = useState(false);
  const [contentState, setContentState] = useState<AdminContentState>({ mode: 'demo' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    let active = true;

    async function load() {
      setStatus('loading');
      const nextState = await resolveAdminContentState();
      if (!active) return;
      setContentState(nextState);

      if (nextState.mode === 'api' && nextState.tenantSlug) {
        try {
          const draft = await loadAdminDocument(nextState.tenantSlug, true);
          if (!active) return;
          setSeed(draft);
          setDraftExists(true);
          setStatus('clean');
          setMessage('');
          return;
        } catch (error) {
          if (!active) return;
          setMessage(error instanceof Error ? error.message : 'Content konnte nicht geladen werden.');
        }
      }

      setSeed(loadDemoContent(initialSeed, 'draft'));
      setDraftExists(hasDraft(initialSeed));
      setStatus('clean');
    }

    void load();
    return () => {
      active = false;
    };
  }, [initialSeed]);

  const collectionLabel = useMemo(() => {
    if (headingTitle) return headingTitle;
    const def = getIndustry(seed.industryKey).collections.find((c) => c.key === collectionKey);
    return def?.label ?? collectionKey;
  }, [collectionKey, headingTitle, seed.industryKey]);

  const dishes = useMemo(
    () => seed.collections.filter((item) => item.collectionKey === collectionKey),
    [collectionKey, seed.collections]
  );

  function updateItem(itemId: string, updater: (item: CollectionSeedItem) => CollectionSeedItem) {
    setSeed((current) => ({
      ...current,
      collections: current.collections.map((item) => item.id === itemId ? updater(item) : item)
    }));
    setStatus('dirty');
  }

  function addItem() {
    const id = `item-${Date.now()}`;
    setSeed((current) => {
      const withCollection: SiteSeed = {
        ...current,
        collections: [
          ...current.collections,
          {
            id,
            collectionKey,
            title: collectionKey === 'menuItem' ? 'Neues Gericht' : 'Neuer Eintrag',
            slug: id,
            data: defaultNewCollectionItemData(collectionKey)
          }
        ]
      };
      return appendCollectionItemToReferencingSections(withCollection, collectionKey, id);
    });
    setStatus('dirty');
  }

  function removeItem(itemId: string) {
    setSeed((current) => {
      const stripped: SiteSeed = {
        ...current,
        collections: current.collections.filter((item) => item.id !== itemId)
      };
      return removeCollectionItemFromAllSectionLists(stripped, itemId);
    });
    setStatus('dirty');
  }

  async function handleSave() {
    if (contentState.mode === 'api' && contentState.tenantSlug) {
      setStatus('saving');
      setMessage('');
      try {
        await saveAdminDraft(contentState.tenantSlug, seed);
        setDraftExists(true);
        setStatus('saved');
      } catch (error) {
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Entwurf konnte nicht gespeichert werden.');
      }
      return;
    }

    saveDraft(seed);
    setDraftExists(true);
    setStatus('saved');
  }

  async function handlePublish() {
    if (contentState.mode === 'api' && contentState.tenantSlug) {
      setStatus('publishing');
      setMessage('');
      try {
        await saveAdminDraft(contentState.tenantSlug, seed);
        await publishAdminDraft(contentState.tenantSlug);
        setDraftExists(false);
        setStatus('published');
      } catch (error) {
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Entwurf konnte nicht veröffentlicht werden.');
      }
      return;
    }

    publishDraft(seed);
    setDraftExists(false);
    setStatus('published');
  }

  async function handleDiscard() {
    if (contentState.mode === 'api' && contentState.tenantSlug) {
      setStatus('discarding');
      setMessage('');
      try {
        await discardAdminDraft(contentState.tenantSlug);
        setSeed(await loadAdminDocument(contentState.tenantSlug, false));
        setDraftExists(false);
        setStatus('clean');
      } catch (error) {
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Entwurf konnte nicht verworfen werden.');
      }
      return;
    }

    discardDraft(seed);
    setSeed(loadDemoContent(initialSeed, 'published'));
    setDraftExists(false);
    setStatus('clean');
  }

  function handleReset() {
    resetPublished(initialSeed);
    setSeed(cloneSeed(initialSeed));
    setDraftExists(false);
    setStatus('clean');
  }

  return (
    <main className="cms-workspace">
      <div className="cms-toolbar">
        <div>
          <p className="eyebrow">
            {getIndustry(seed.industryKey).label} · {collectionLabel} · {STYLE_LABELS[seed.styleKey] ?? seed.styleKey}
          </p>
          <h1>{collectionLabel} bearbeiten</h1>
          <p>{statusLabel(status, draftExists, contentState)}</p>
          {message ? <p className={status === 'error' ? 'cms-error-text' : undefined}>{message}</p> : null}
          {contentState.mode === 'demo' ? (
            <nav className="cms-style-tabs" aria-label="Vorschau-Stil">
              {STYLE_KEYS.map((sk) => (
                <Link
                  key={sk}
                  href={`/admin/collections/${encodeURIComponent(collectionKey)}?style=${sk}`}
                  className={sk === seed.styleKey ? 'is-active' : undefined}
                >
                  {STYLE_LABELS[sk]}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>
        <div className="cms-actions">
          <a className="button secondary" href={previewHref(contentState, seed)} target="_blank" rel="noreferrer">
            Vorschau
          </a>
          <button
            className="button secondary"
            onClick={() => void handleDiscard()}
            type="button"
            disabled={toolbarBusy(status)}
          >
            {status === 'discarding' ? 'Verwerfen…' : 'Entwurf verwerfen'}
          </button>
          <button className="button secondary" onClick={handleReset} type="button" disabled={toolbarBusy(status)}>
            Demo zurücksetzen
          </button>
          <button
            className="button secondary"
            onClick={() => void handleSave()}
            type="button"
            disabled={toolbarBusy(status)}
          >
            {status === 'saving' ? 'Speichert…' : 'Entwurf speichern'}
          </button>
          <button className="button" onClick={() => void handlePublish()} type="button" disabled={toolbarBusy(status)}>
            {status === 'publishing' ? 'Veröffentlicht…' : 'Speichern & veröffentlichen'}
          </button>
        </div>
      </div>

      <section className="cms-editor-panel cms-editor-panel--wide">
        <button className="button" onClick={addItem} type="button">
          Eintrag hinzufügen
        </button>
        {dishes.map((item) => (
          <article className="cms-section-card" key={item.id}>
            <header>
              <div>
                <p className="eyebrow">{item.collectionKey}</p>
                <h2>{item.title}</h2>
                <p>/{item.slug}</p>
              </div>
              <div className="cms-section-actions">
                <button className="danger" onClick={() => removeItem(item.id)} type="button">Entfernen</button>
              </div>
            </header>
            <div className="cms-field-grid">
              <TextField label="Titel" value={item.title} onChange={(value) => updateItem(item.id, (current) => ({ ...current, title: value }))} />
              <TextField label="Slug" value={item.slug} onChange={(value) => updateItem(item.id, (current) => ({ ...current, slug: value }))} />
              {collectionKey === 'menuItem' ? (
                <TextField
                  label="Preis"
                  value={text(item.data.price)}
                  onChange={(value) => updateItem(item.id, (current) => ({ ...current, data: { ...current.data, price: value } }))}
                />
              ) : null}
              <TextField label="Bild-URL" value={text(item.data.image)} onChange={(value) => updateItem(item.id, (current) => ({ ...current, data: { ...current.data, image: value } }))} />
              <TextArea label="Beschreibung" value={text(item.data.summary)} onChange={(value) => updateItem(item.id, (current) => ({ ...current, data: { ...current.data, summary: value } }))} />
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="cms-field">
      <span>{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="cms-field is-wide">
      <span>{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={4} />
    </label>
  );
}

function toolbarBusy(status: EditorStatus): boolean {
  return status === 'loading' || status === 'saving' || status === 'publishing' || status === 'discarding';
}

function statusLabel(status: EditorStatus, draftExists: boolean, contentState: AdminContentState): string {
  if (status === 'loading') return 'Inhalte werden geladen.';
  if (status === 'saving') return 'Entwurf wird gespeichert …';
  if (status === 'publishing') return 'Wird veröffentlicht …';
  if (status === 'discarding') return 'Entwurf wird verworfen …';
  if (status === 'error') return 'Aktion fehlgeschlagen.';
  if (status === 'dirty') return 'Ungespeicherte Änderungen.';
  if (status === 'saved') return 'Entwurf gespeichert. Noch nicht live.';
  if (status === 'published') return 'Änderungen veröffentlicht.';
  if (draftExists) return 'Es gibt einen gespeicherten Entwurf.';
  return contentState.mode === 'api' ? `Live-Version für ${contentState.tenantSlug} geladen.` : 'Demo-Modus: Live-Version lokal geladen.';
}

function previewHref(contentState: AdminContentState, seed: SiteSeed): string {
  const tenant = contentState.tenantSlug ? `&tenant=${encodeURIComponent(contentState.tenantSlug)}` : '';
  return `/preview/${seed.industryKey}/${seed.styleKey}?preview=1${tenant}`;
}

function text(value: unknown): string {
  return typeof value === 'string' ? value : '';
}
