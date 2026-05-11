'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
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
import { STYLE_KEYS, type FieldDefinition, type StyleKey } from '@/template-engine/model';
import { getIndustry } from '@/template-engine/registry';
import {
  appendCollectionItemToReferencingSections,
  defaultNewCollectionItemData,
  removeCollectionItemFromAllSectionLists
} from '@/cms/collection-editor/collection-wiring';
import { ImageFieldEditor, LinkTargetEditor } from '@/cms/page-editor/field-editors';


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
  const pathname = usePathname() ?? '';
  const useFloatingDock = pathname.startsWith('/admin/collections');
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

  const collectionDefinition = useMemo(
    () => getIndustry(seed.industryKey).collections.find((c) => c.key === collectionKey),
    [collectionKey, seed.industryKey]
  );
  const collectionLabel = headingTitle ?? collectionDefinition?.label ?? collectionKey;
  const editableFields = useMemo(() => {
    const fields = collectionDefinition?.fields ?? [];
    return fields.filter((field) => field.key !== 'title' && field.key !== 'slug' && field.type !== 'seo');
  }, [collectionDefinition]);

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
            data: defaultNewCollectionItemData(collectionKey),
            seo: { title: '', description: '' }
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

  function updateItemData(itemId: string, key: string, value: unknown) {
    updateItem(itemId, (current) => ({ ...current, data: { ...current.data, [key]: value } }));
  }

  function updateItemSeo(itemId: string, key: 'title' | 'description', value: string) {
    updateItem(itemId, (current) => ({ ...current, seo: { ...(current.seo ?? {}), [key]: value } }));
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
        {useFloatingDock ? null : (
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
        )}
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
              <TextField
                label="SEO Titel"
                value={text(item.seo?.title)}
                onChange={(value) => updateItemSeo(item.id, 'title', value)}
              />
              <TextArea
                label="SEO Beschreibung"
                value={text(item.seo?.description)}
                onChange={(value) => updateItemSeo(item.id, 'description', value)}
              />
              {editableFields.map((field) => (
                <CollectionFieldEditor
                  key={field.key}
                  field={field}
                  value={item.data[field.key]}
                  seed={seed}
                  tenantSlug={contentState.mode === 'api' ? contentState.tenantSlug ?? null : null}
                  onChange={(value) => updateItemData(item.id, field.key, value)}
                />
              ))}
            </div>
          </article>
        ))}
      </section>

      {useFloatingDock ? (
        <div className="cms-floating-dock" role="toolbar" aria-label="Speichern und veröffentlichen">
          <a className="button secondary" href={previewHref(contentState, seed)} target="_blank" rel="noreferrer">
            Live ansehen
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
            type="button"
            className="button cms-floating-draft"
            onClick={() => void handleSave()}
            disabled={toolbarBusy(status)}
          >
            {status === 'saving' ? 'Speichert…' : 'Entwurf speichern'}
          </button>
          <button
            type="button"
            className="button cms-floating-publish"
            onClick={() => void handlePublish()}
            disabled={toolbarBusy(status)}
          >
            {status === 'publishing' ? 'Veröffentlicht…' : 'Veröffentlichen'}
          </button>
        </div>
      ) : null}
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

function CollectionFieldEditor({
  field,
  value,
  seed,
  tenantSlug,
  onChange
}: {
  field: FieldDefinition;
  value: unknown;
  seed: SiteSeed;
  tenantSlug: string | null;
  onChange: (value: unknown) => void;
}) {
  if (
    field.type === 'textarea' ||
    field.type === 'richText' ||
    field.type === 'address' ||
    field.type === 'openingHours' ||
    field.type === 'socialLinks'
  ) {
    return <TextArea label={field.label} value={text(value)} onChange={onChange} />;
  }

  if (
    field.type === 'text' ||
    field.type === 'url' ||
    field.type === 'phone' ||
    field.type === 'email' ||
    field.type === 'date' ||
    field.type === 'time'
  ) {
    return <TextField label={field.label} value={text(value)} onChange={onChange} />;
  }

  if (field.type === 'image') {
    return <ImageFieldEditor label={field.label} value={value} tenantSlug={tenantSlug} onChange={onChange} />;
  }

  if (field.type === 'gallery') {
    return <CollectionGalleryFieldEditor label={field.label} value={value} tenantSlug={tenantSlug} onChange={onChange} />;
  }

  if (field.type === 'link') {
    return <LinkTargetEditor label={field.label} linkValue={value} seed={seed} onLinkChange={onChange} />;
  }

  if (field.type === 'cta') {
    const current = isRecord(value) ? value : {};
    return (
      <div className="cms-field-split-heading cms-field-split-heading--stack">
        <TextField
          label={`${field.label} Text`}
          value={text(current.label)}
          onChange={(label) => onChange({ ...current, label })}
        />
        <LinkTargetEditor
          label={`${field.label} Ziel`}
          linkValue={isRecord(current.link) ? current.link : {}}
          seed={seed}
          onLinkChange={(link) => onChange({ ...current, link })}
        />
      </div>
    );
  }

  if (field.type === 'boolean') {
    return (
      <label className="cms-toggle cms-field">
        <span>{field.label}</span>
        <input checked={value === true} onChange={(event) => onChange(event.target.checked)} type="checkbox" />
      </label>
    );
  }

  if (field.type === 'number') {
    return (
      <TextField
        label={field.label}
        value={typeof value === 'number' && Number.isFinite(value) ? String(value) : text(value)}
        onChange={(next) => {
          const parsed = Number(next);
          onChange(Number.isFinite(parsed) ? parsed : 0);
        }}
      />
    );
  }

  if (field.type === 'select') {
    return (
      <label className="cms-field">
        <span>{field.label}</span>
        <select value={text(value)} onChange={(event) => onChange(event.target.value)}>
          <option value="">Bitte wÃ¤hlen</option>
          {(field.options ?? []).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.type === 'multiSelect') {
    const selected = new Set(Array.isArray(value) ? value.map(String) : []);
    return (
      <div className="cms-field is-wide">
        <span>{field.label}</span>
        <div className="cms-reference-list">
          {(field.options ?? []).map((option) => (
            <label className="cms-reference-list__item" key={option}>
              <input
                type="checkbox"
                checked={selected.has(option)}
                onChange={(event) => {
                  const current = Array.isArray(value) ? value.map(String) : [];
                  onChange(
                    event.target.checked
                      ? [...current, option].filter((v, i, arr) => arr.indexOf(v) === i)
                      : current.filter((item) => item !== option)
                  );
                }}
              />
              <span>
                <strong>{option}</strong>
              </span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === 'group') {
    const current = isRecord(value) ? value : {};
    return (
      <div className="cms-list is-wide">
        <span>{field.label}</span>
        <div className="cms-field-grid">
          {(field.fields ?? []).map((child) => (
            <CollectionFieldEditor
              key={child.key}
              field={child}
              value={current[child.key]}
              seed={seed}
              tenantSlug={tenantSlug}
              onChange={(next) => onChange({ ...current, [child.key]: next })}
            />
          ))}
        </div>
      </div>
    );
  }

  if (field.type === 'repeater') {
    const items = arrayRecords(value);
    return (
      <div className="cms-list is-wide">
        <span>{field.label}</span>
        {items.map((item, index) => (
          <div className="cms-repeat-item" key={index}>
            <div className="cms-repeat-toolbar">
              <button
                type="button"
                className="button secondary"
                onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}
              >
                Eintrag entfernen
              </button>
            </div>
            {(field.itemFields ?? []).map((itemField) => (
              <CollectionFieldEditor
                key={`${index}-${itemField.key}`}
                field={itemField}
                value={item[itemField.key]}
                seed={seed}
                tenantSlug={tenantSlug}
                onChange={(next) => {
                  const cloned = items.map((entry) => ({ ...entry }));
                  cloned[index] = { ...cloned[index], [itemField.key]: next };
                  onChange(cloned);
                }}
              />
            ))}
          </div>
        ))}
        <button
          type="button"
          className="button secondary"
          onClick={() => onChange([...items, createDefaultData(field.itemFields ?? [])])}
        >
          Eintrag hinzufuegen
        </button>
      </div>
    );
  }

  return <TextField label={field.label} value={text(value)} onChange={onChange} />;
}

function CollectionGalleryFieldEditor({
  label,
  value,
  tenantSlug,
  onChange
}: {
  label: string;
  value: unknown;
  tenantSlug: string | null;
  onChange: (value: unknown) => void;
}) {
  const items = galleryItems(value);
  function update(index: number, patch: Partial<{ url: string; alt: string }>) {
    onChange(items.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)));
  }
  return (
    <div className="cms-list is-wide">
      <span>{label}</span>
      {items.map((item, index) => (
        <div className="cms-repeat-item" key={index}>
          <div className="cms-repeat-toolbar">
            <button type="button" className="button secondary" onClick={() => onChange(items.filter((_, i) => i !== index))}>
              Bild entfernen
            </button>
          </div>
          <ImageFieldEditor
            label={`Bild ${index + 1}`}
            value={item.url}
            tenantSlug={tenantSlug}
            onChange={(next) => update(index, { url: String(next) })}
          />
          <TextField label={`Bild ${index + 1} Alt-Text`} value={item.alt} onChange={(next) => update(index, { alt: next })} />
        </div>
      ))}
      <button type="button" className="button secondary" onClick={() => onChange([...items, { url: '', alt: '' }])}>
        Bild hinzufuegen
      </button>
    </div>
  );
}

function createDefaultData(fields: readonly FieldDefinition[]): Record<string, unknown> {
  return Object.fromEntries(fields.map((field) => [field.key, defaultValueForField(field)]));
}

function defaultValueForField(field: FieldDefinition): unknown {
  if (field.type === 'boolean') return false;
  if (field.type === 'repeater' || field.type === 'gallery' || field.type === 'collectionReferenceList') return [];
  if (field.type === 'splitHeading') return { plain: '', accent: '' };
  if (field.type === 'cta') return { label: '', link: { type: 'page', pageKey: 'home', href: '/' } };
  if (field.type === 'group') return createDefaultData(field.fields ?? []);
  if (field.type === 'number') return 0;
  return '';
}

function arrayRecords(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value) ? value.filter(isRecord) : [];
}

function galleryItems(value: unknown): { url: string; alt: string }[] {
  if (!Array.isArray(value)) return [];
  return value.map((entry) => {
    if (typeof entry === 'string') return { url: entry, alt: '' };
    if (isRecord(entry)) {
      return {
        url: text(entry.url) || text(entry.src) || text(entry.image),
        alt: text(entry.alt) || text(entry.caption)
      };
    }
    return { url: '', alt: '' };
  });
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
