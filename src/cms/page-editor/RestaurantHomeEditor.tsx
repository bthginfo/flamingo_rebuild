'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { STYLE_KEYS, type FieldDefinition, type PageInstance, type SectionInstance, type StyleKey } from '@/template-engine/model';
import type { SiteSeed } from '@/template-engine/seeds/model';
import { cloneSeed, discardDraft, hasDraft, loadDemoContent, publishDraft, resetPublished, saveDraft } from '@/cms/demo-store';
import {
  discardAdminDraft,
  loadAdminDocument,
  publishAdminDraft,
  resolveAdminContentState,
  saveAdminDraft,
  type AdminContentState
} from '@/cms/admin-content-api';
import { SeedPageRenderer } from '@/template-engine/rendering/SeedRenderer';
import { getIndustry, getSection } from '@/template-engine/registry';

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

export function RestaurantHomeEditor({ initialSeed, pageKey }: { initialSeed: SiteSeed; pageKey: string }) {
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
      setDraftExists(hasDraft(initialSeed.styleKey));
      setStatus('clean');
    }

    void load();
    return () => {
      active = false;
    };
  }, [initialSeed]);

  const industryPages = useMemo(() => getIndustry(seed.industryKey).corePages, [seed.industryKey]);

  const page = useMemo(() => {
    const match = seed.pages.find((entry) => entry.key === pageKey);
    if (match) return match;
    return seed.pages.find((entry) => entry.key === 'home') ?? seed.pages[0];
  }, [seed, pageKey]);
  const sortedSections = useMemo(
    () => [...page.sections].sort((a, b) => a.sortOrder - b.sortOrder),
    [page.sections]
  );
  const addableSectionKeys = useMemo(() => {
    const industry = getIndustry(seed.industryKey);
    const pageDefinition = industry.corePages.find((entry) => entry.key === page.key);
    return pageDefinition?.allowedSections ?? [];
  }, [page.key, seed.industryKey]);

  function updateSection(sectionId: string, updater: (section: SectionInstance) => SectionInstance) {
    setSeed((current) => ({
      ...current,
      pages: current.pages.map((pageItem) => {
        if (pageItem.id !== page.id) return pageItem;
        return {
          ...pageItem,
          sections: pageItem.sections.map((section) => section.id === sectionId ? updater(section) : section)
        };
      })
    }));
    setStatus('dirty');
  }

  function replaceSections(sections: readonly SectionInstance[]) {
    setSeed((current) => ({
      ...current,
      pages: current.pages.map((pageItem) => {
        if (pageItem.id !== page.id) return pageItem;
        return {
          ...pageItem,
          sections: normalizeSortOrder(sections)
        };
      })
    }));
    setStatus('dirty');
  }

  function moveSection(sectionId: string, direction: -1 | 1) {
    const currentIndex = sortedSections.findIndex((section) => section.id === sectionId);
    const nextIndex = currentIndex + direction;
    if (currentIndex < 0 || nextIndex < 0 || nextIndex >= sortedSections.length) return;
    const next = [...sortedSections];
    const [item] = next.splice(currentIndex, 1);
    next.splice(nextIndex, 0, item);
    replaceSections(next);
  }

  function duplicateSection(sectionId: string) {
    const currentIndex = sortedSections.findIndex((section) => section.id === sectionId);
    if (currentIndex < 0) return;
    const source = sortedSections[currentIndex];
    const copy: SectionInstance = {
      ...structuredClone(source),
      id: `${source.id}-copy-${Date.now()}`,
      sortOrder: source.sortOrder + 1
    };
    const next = [...sortedSections];
    next.splice(currentIndex + 1, 0, copy);
    replaceSections(next);
  }

  function removeSection(sectionId: string) {
    replaceSections(sortedSections.filter((section) => section.id !== sectionId));
  }

  function addSection(sectionKey: string) {
    const definition = getSection(sectionKey);
    const next: SectionInstance = {
      id: `${sectionKey.replace(/\./g, '-')}-${Date.now()}`,
      sectionKey,
      visible: true,
      sortOrder: sortedSections.length + 1,
      data: createDefaultData(definition.fields)
    };
    replaceSections([...sortedSections, next]);
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

    discardDraft(seed.styleKey);
    setSeed(loadDemoContent(initialSeed, 'published'));
    setDraftExists(false);
    setStatus('clean');
  }

  function handleReset() {
    resetPublished(initialSeed.styleKey);
    setSeed(cloneSeed(initialSeed));
    setDraftExists(false);
    setStatus('clean');
  }

  return (
    <main className="cms-workspace">
      <div className="cms-toolbar">
        <div>
          <p className="eyebrow">
            {getIndustry(seed.industryKey).label} · {STYLE_LABELS[seed.styleKey] ?? seed.styleKey}
          </p>
          <h1>{page.title} bearbeiten</h1>
          <p>{statusLabel(status, draftExists, contentState)}</p>
          {message ? <p className={status === 'error' ? 'cms-error-text' : undefined}>{message}</p> : null}
          {contentState.mode === 'demo' ? (
            <nav className="cms-style-tabs" aria-label="Vorschau-Stil">
              {STYLE_KEYS.map((sk) => (
                <Link
                  key={sk}
                  href={`/admin/pages/${pageKey}?style=${sk}`}
                  className={sk === seed.styleKey ? 'is-active' : undefined}
                >
                  {STYLE_LABELS[sk]}
                </Link>
              ))}
            </nav>
          ) : null}
          <nav className="cms-page-tabs" aria-label="Seiten">
            {industryPages.map((def) => (
              <Link
                key={def.key}
                href={`/admin/pages/${def.key}${contentState.mode === 'demo' ? `?style=${seed.styleKey}` : ''}`}
                className={def.key === page.key ? 'is-active' : undefined}
              >
                {def.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="cms-actions">
          <a className="button secondary" href={previewHref(contentState, seed, page)} target="_blank" rel="noreferrer">
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

      <div className="cms-split">
        <section className="cms-editor-panel">
          <div className="cms-add-section">
            <label className="cms-field">
              <span>Abschnitt hinzufügen</span>
              <select defaultValue="" onChange={(event) => {
                if (!event.target.value) return;
                addSection(event.target.value);
                event.target.value = '';
              }}>
                <option value="" disabled>Abschnitt auswählen</option>
                {addableSectionKeys.map((sectionKey) => (
                  <option value={sectionKey} key={sectionKey}>{getSection(sectionKey).label}</option>
                ))}
              </select>
            </label>
          </div>
          {sortedSections.map((section) => (
            <SectionEditor
              key={section.id}
              section={section}
              onChange={(next) => updateSection(section.id, () => next)}
              onMoveUp={() => moveSection(section.id, -1)}
              onMoveDown={() => moveSection(section.id, 1)}
              onDuplicate={() => duplicateSection(section.id)}
              onRemove={() => removeSection(section.id)}
            />
          ))}
        </section>
        <aside className="cms-preview-panel">
          <div className="cms-preview-frame">
            <SeedPageRenderer
              seed={seed}
              page={page}
              styleKey={seed.styleKey}
              previewBasePath={`/preview/${seed.industryKey}/${seed.styleKey}`}
            />
          </div>
        </aside>
      </div>
    </main>
  );
}

function SectionEditor({
  section,
  onChange,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onRemove
}: {
  section: SectionInstance;
  onChange: (section: SectionInstance) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDuplicate: () => void;
  onRemove: () => void;
}) {
  const definition = getSection(section.sectionKey);

  function patchData(path: readonly string[], value: unknown) {
    const next = structuredClone(section);
    let cursor: Record<string, unknown> = next.data;
    for (const segment of path.slice(0, -1)) {
      const existing = cursor[segment];
      if (!isRecord(existing)) cursor[segment] = {};
      cursor = cursor[segment] as Record<string, unknown>;
    }
    cursor[path[path.length - 1]] = value;
    onChange(next);
  }

  function setVisible(visible: boolean) {
    onChange({ ...section, visible });
  }

  return (
    <article className={`cms-section-card ${section.visible ? '' : 'is-hidden'}`}>
      <header>
        <div>
          <p className="eyebrow">{section.sectionKey}</p>
          <h2>{definition.label}</h2>
          <p>Position {section.sortOrder}</p>
        </div>
        <label className="cms-toggle">
          <input checked={section.visible} onChange={(event) => setVisible(event.target.checked)} type="checkbox" />
          Sichtbar
        </label>
        <div className="cms-section-actions">
          <button onClick={onMoveUp} type="button">Hoch</button>
          <button onClick={onMoveDown} type="button">Runter</button>
          <button onClick={onDuplicate} type="button">Duplizieren</button>
          <button className="danger" onClick={onRemove} type="button">Entfernen</button>
        </div>
      </header>
      <div className="cms-field-grid">
        {definition.fields.map((field) => (
          <FieldEditor
            field={field}
            key={field.key}
            path={[field.key]}
            value={section.data[field.key]}
            onChange={patchData}
          />
        ))}
      </div>
    </article>
  );
}

function FieldEditor({
  field,
  value,
  path,
  onChange
}: {
  field: FieldDefinition;
  value: unknown;
  path: readonly string[];
  onChange: (path: readonly string[], value: unknown) => void;
}) {
  if (field.type === 'textarea' || field.type === 'richText') {
    return <TextArea label={field.label} value={text(value)} onChange={(next) => onChange(path, next)} />;
  }

  if (field.type === 'image' || field.type === 'text' || field.type === 'url' || field.type === 'phone' || field.type === 'email') {
    return <TextField label={field.label} value={text(value)} onChange={(next) => onChange(path, next)} />;
  }

  if (field.type === 'boolean') {
    return (
      <label className="cms-toggle cms-field">
        <span>{field.label}</span>
        <input checked={value === true} onChange={(event) => onChange(path, event.target.checked)} type="checkbox" />
      </label>
    );
  }

  if (field.type === 'splitHeading') {
    const current = split(value);
    return (
      <>
        <TextField label={`${field.label} - Teil 1`} value={current.plain} onChange={(next) => onChange([...path, 'plain'], next)} />
        <TextField label={`${field.label} - Teil 2`} value={current.accent} onChange={(next) => onChange([...path, 'accent'], next)} />
      </>
    );
  }

  if (field.type === 'cta') {
    const current = cta(value);
    return (
      <>
        <TextField label={`${field.label} Text`} value={current.label} onChange={(next) => onChange([...path, 'label'], next)} />
        <TextField label={`${field.label} Ziel`} value={current.href} onChange={(next) => onChange([...path, 'link', 'href'], next)} />
      </>
    );
  }

  if (field.type === 'collectionReferenceList') {
    return <ReadOnlyList label={field.label} values={arrayText(value)} />;
  }

  if (field.type === 'repeater') {
    const items = arrayRecords(value);
    return (
      <div className="cms-list is-wide">
        <span>{field.label}</span>
        {items.map((item, index) => (
          <div className="cms-repeat-item" key={index}>
            {(field.itemFields ?? []).map((itemField) => (
              <FieldEditor
                field={itemField}
                key={itemField.key}
                path={[...path]}
                value={item[itemField.key]}
                onChange={(_, next) => {
                  const cloned = items.map((entry) => ({ ...entry }));
                  cloned[index] = { ...cloned[index], [itemField.key]: next };
                  onChange(path, cloned);
                }}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return <ReadOnlyList label={`${field.label} (${field.type})`} values={[JSON.stringify(value ?? '')]} />;
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

function ReadOnlyList({ label, values }: { label: string; values: readonly string[] }) {
  return (
    <div className="cms-field is-wide">
      <span>{label}</span>
      <div className="cms-chip-row">
        {values.map((value) => <code key={value}>{value}</code>)}
      </div>
    </div>
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

function previewHref(contentState: AdminContentState, seed: SiteSeed, page: PageInstance): string {
  const tenant = contentState.tenantSlug ? `&tenant=${encodeURIComponent(contentState.tenantSlug)}` : '';
  const base = `/preview/${seed.industryKey}/${seed.styleKey}`;
  const slugPath = page.slug === '/' ? '' : page.slug.startsWith('/') ? page.slug : `/${page.slug}`;
  return `${base}${slugPath}?preview=1${tenant}`;
}

function normalizeSortOrder(sections: readonly SectionInstance[]): SectionInstance[] {
  return sections.map((section, index) => ({ ...section, sortOrder: index + 1 }));
}

function createDefaultData(fields: readonly FieldDefinition[]): Record<string, unknown> {
  return Object.fromEntries(fields.map((field) => [field.key, defaultValueForField(field)]));
}

function defaultValueForField(field: FieldDefinition): unknown {
  if (field.type === 'boolean') return false;
  if (field.type === 'repeater' || field.type === 'gallery' || field.type === 'collectionReferenceList') return [];
  if (field.type === 'splitHeading') return { plain: '', accent: '' };
  if (field.type === 'cta') return { label: '', link: { type: 'page', href: '/' } };
  if (field.type === 'group') return createDefaultData(field.fields ?? []);
  if (field.type === 'number') return 0;
  return '';
}

function text(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function split(value: unknown): { plain: string; accent: string } {
  if (!isRecord(value)) return { plain: '', accent: '' };
  return { plain: text(value.plain), accent: text(value.accent) };
}

function cta(value: unknown): { label: string; href: string } {
  if (!isRecord(value)) return { label: '', href: '' };
  const link = isRecord(value.link) ? value.link : {};
  return { label: text(value.label), href: text(link.href) };
}

function arrayText(value: unknown): string[] {
  return Array.isArray(value) ? value.map(String) : [];
}

function arrayRecords(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value) ? value.filter(isRecord) : [];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
