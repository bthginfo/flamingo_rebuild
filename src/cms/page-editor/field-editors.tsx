'use client';

import { upload } from '@vercel/blob/client';
import { useCallback, useEffect, useId, useState } from 'react';
import { getSection } from '@/template-engine/registry';
import {
  normalizeLinkTarget,
  serializeLinkTarget,
  type NormalizedLinkTarget
} from '@/template-engine/link-resolution';
import type { SiteSeed } from '@/template-engine/seeds/model';

type SessionOk = { ok: true; tenantSlug: string };
type SessionState = { ok: false; reason: 'unauthenticated' | 'error' } | SessionOk | null;

function isTenantBlobMediaUrl(url: string, tenantSlug: string): boolean {
  try {
    const u = new URL(url);
    const host = u.hostname.toLowerCase();
    const isVercelBlob =
      host.endsWith('.public.blob.vercel-storage.com') || host === 'public.blob.vercel-storage.com';
    if (!isVercelBlob) return false;
    const pathname = u.pathname.startsWith('/') ? u.pathname.slice(1) : u.pathname;
    return pathname.startsWith(`${tenantSlug}/media/`) && !pathname.includes('..');
  } catch {
    return false;
  }
}

export function ImageFieldEditor({
  label,
  value,
  onChange,
  tenantSlug
}: {
  label: string;
  value: unknown;
  onChange: (next: string) => void;
  tenantSlug: string | null;
}) {
  const [session, setSession] = useState<SessionState>(null);
  const [busy, setBusy] = useState(false);
  const [hint, setHint] = useState('');

  useEffect(() => {
    if (!tenantSlug) {
      setSession({ ok: false, reason: 'unauthenticated' });
      return;
    }
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch('/api/admin/session', { cache: 'no-store' });
        const data = (await res.json()) as { authenticated?: boolean; tenantSlug?: string };
        if (cancelled) return;
        if (
          res.ok &&
          data.authenticated === true &&
          typeof data.tenantSlug === 'string' &&
          data.tenantSlug.length > 0 &&
          data.tenantSlug === tenantSlug
        ) {
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
  }, [tenantSlug]);

  const url = typeof value === 'string' ? value : '';

  const onPickFile = useCallback(
    async (file: File | undefined, input: HTMLInputElement | null) => {
      if (!file || !session?.ok) return;
      setBusy(true);
      setHint('');
      try {
        const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 120) || 'upload';
        const pathname = `${session.tenantSlug}/media/${Date.now()}-${safe}`;
        const result = await upload(pathname, file, {
          access: 'public',
          handleUploadUrl: '/api/admin/blob-upload'
        });
        onChange(result.url);
        setHint('Bild wurde hochgeladen.');
      } catch (e) {
        const text = e instanceof Error ? e.message : String(e);
        setHint(text.includes('503') || text.toLowerCase().includes('blob') ? text : `Upload fehlgeschlagen: ${text}`);
      } finally {
        setBusy(false);
        if (input) input.value = '';
      }
    },
    [session, onChange]
  );

  async function handleClear() {
    if (!url) return;
    if (session?.ok && isTenantBlobMediaUrl(url, session.tenantSlug)) {
      setBusy(true);
      setHint('');
      try {
        const res = await fetch('/api/admin/blob-delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url })
        });
        if (!res.ok) {
          const data = (await res.json().catch(() => ({}))) as { error?: string };
          setHint(data.error ?? 'Blob konnte nicht gelöscht werden.');
          setBusy(false);
          return;
        }
      } catch {
        setHint('Netzwerkfehler beim Löschen.');
        setBusy(false);
        return;
      }
      setBusy(false);
    }
    onChange('');
    setHint('Bild entfernt.');
  }

  const uploadReady = tenantSlug && session?.ok;

  return (
    <div className="cms-field is-wide">
      <label className="cms-field">
        <span>{label}</span>
        <input value={url} onChange={(event) => onChange(event.target.value)} placeholder="https://…" />
      </label>
      {session === null ? (
        <p className="cms-field-hint" role="status">
          Session wird geprüft …
        </p>
      ) : null}
      {tenantSlug && session && !session.ok ? (
        <p className="cms-field-hint" role="status">
          {session.reason === 'unauthenticated'
            ? 'Blob-Upload ist nur mit Admin-Login möglich. Du kannst weiterhin eine Bild-URL eintragen.'
            : 'Session konnte nicht geladen werden.'}
        </p>
      ) : null}
      {uploadReady ? (
        <div className="cms-image-upload-row">
          <label className="cms-field">
            <span>Datei hochladen (max. 1,5&nbsp;MB, JPEG/PNG/WebP/GIF/SVG)</span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
              disabled={busy}
              onChange={(event) => void onPickFile(event.target.files?.[0], event.target)}
            />
          </label>
          {url ? (
            <button type="button" className="button secondary" disabled={busy} onClick={() => void handleClear()}>
              Bild entfernen
            </button>
          ) : null}
        </div>
      ) : null}
      {busy ? (
        <p className="cms-field-hint" role="status">
          Bitte warten …
        </p>
      ) : null}
      {hint ? (
        <p className="cms-field-hint" role="status">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type InternalLinkOption =
  | { kind: 'page'; pageKey: string; label: string }
  | { kind: 'section'; pageKey: string; sectionId: string; label: string };

function buildInternalLinkOptions(seed: SiteSeed): InternalLinkOption[] {
  const out: InternalLinkOption[] = [];
  for (const page of seed.pages) {
    out.push({
      kind: 'page',
      pageKey: page.key,
      label: `${page.title} — ganze Seite`
    });
    for (const sec of page.sections) {
      const def = getSection(sec.sectionKey);
      out.push({
        kind: 'section',
        pageKey: page.key,
        sectionId: sec.id,
        label: `${page.title} — ${def.label}`
      });
    }
  }
  return out;
}

function internalSelectValue(target: NormalizedLinkTarget): string {
  if (target.mode === 'page') return `page:${target.pageKey}`;
  if (target.mode === 'section') return `section:${target.sectionPageKey}:${target.sectionId}`;
  return '';
}

function parseInternalSelectValue(raw: string): Pick<NormalizedLinkTarget, 'mode' | 'pageKey' | 'sectionPageKey' | 'sectionId'> {
  if (raw.startsWith('section:')) {
    const rest = raw.slice('section:'.length);
    const idx = rest.indexOf(':');
    if (idx === -1) {
      return { mode: 'section', pageKey: 'home', sectionPageKey: 'home', sectionId: rest };
    }
    const pageKey = rest.slice(0, idx);
    const sectionId = rest.slice(idx + 1);
    return { mode: 'section', pageKey, sectionPageKey: pageKey, sectionId };
  }
  if (raw.startsWith('page:')) {
    const pageKey = raw.slice('page:'.length);
    return { mode: 'page', pageKey, sectionPageKey: pageKey, sectionId: '' };
  }
  return { mode: 'page', pageKey: raw, sectionPageKey: raw, sectionId: '' };
}

export function LinkTargetEditor({
  label,
  linkValue,
  seed,
  onLinkChange
}: {
  label: string;
  linkValue: unknown;
  seed: SiteSeed;
  onLinkChange: (link: Record<string, unknown>) => void;
}) {
  const modeGroupId = useId();
  const normalized = normalizeLinkTarget(linkValue, seed);
  const [mode, setMode] = useState<'url' | 'internal'>(normalized.mode === 'url' ? 'url' : 'internal');
  const [urlText, setUrlText] = useState(normalized.mode === 'url' ? normalized.url : '');
  const [internalValue, setInternalValue] = useState(
    normalized.mode === 'url' ? '' : internalSelectValue(normalized)
  );

  useEffect(() => {
    const n = normalizeLinkTarget(linkValue, seed);
    setMode(n.mode === 'url' ? 'url' : 'internal');
    setUrlText(n.mode === 'url' ? n.url : '');
    setInternalValue(n.mode === 'url' ? '' : internalSelectValue(n));
  }, [linkValue, seed]);

  const internalOptions = buildInternalLinkOptions(seed);
  const firstInternalValue = internalOptions[0] ? internalSelectValueFromOption(internalOptions[0]) : '';

  function commitUrl(nextUrl: string) {
    setUrlText(nextUrl);
    const nextNorm: NormalizedLinkTarget = {
      mode: 'url',
      url: nextUrl,
      pageKey: seed.pages[0]?.key ?? 'home',
      sectionPageKey: seed.pages[0]?.key ?? 'home',
      sectionId: ''
    };
    onLinkChange(serializeLinkTarget(nextNorm, seed));
  }

  function commitInternal(raw: string) {
    setInternalValue(raw);
    const parsed = parseInternalSelectValue(raw);
    const first = seed.pages[0]?.key ?? 'home';
    if (parsed.mode === 'page') {
      onLinkChange(
        serializeLinkTarget(
          {
            mode: 'page',
            url: '',
            pageKey: parsed.pageKey || first,
            sectionPageKey: parsed.pageKey || first,
            sectionId: ''
          },
          seed
        )
      );
      return;
    }
    onLinkChange(
      serializeLinkTarget(
        {
          mode: 'section',
          url: '',
          pageKey: first,
          sectionPageKey: parsed.sectionPageKey || first,
          sectionId: parsed.sectionId
        },
        seed
      )
    );
  }

  return (
    <div className="cms-field is-wide">
      <span>{label}</span>
      <div className="cms-link-mode-row">
        <label className="cms-radio-inline">
          <input
            type="radio"
            name={modeGroupId}
            checked={mode === 'url'}
            onChange={() => {
              setMode('url');
              commitUrl(urlText);
            }}
          />
          Externe URL oder freier Pfad
        </label>
        <label className="cms-radio-inline">
          <input
            type="radio"
            name={modeGroupId}
            checked={mode === 'internal'}
            onChange={() => {
              setMode('internal');
              const next = internalValue || firstInternalValue;
              if (next) commitInternal(next);
            }}
          />
          Seite oder Abschnitt auf dieser Website
        </label>
      </div>
      {mode === 'url' ? (
        <label className="cms-field">
          <span>URL (https://…, mailto:, tel: oder z.&nbsp;B. /kontakt)</span>
          <input value={urlText} onChange={(event) => commitUrl(event.target.value)} />
        </label>
      ) : (
        <label className="cms-field">
          <span>Ziel wählen</span>
          <select
            value={internalValue || firstInternalValue}
            onChange={(event) => commitInternal(event.target.value)}
            disabled={internalOptions.length === 0}
          >
            {internalOptions.map((opt) => (
              <option value={internalSelectValueFromOption(opt)} key={internalSelectValueFromOption(opt)}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      )}
    </div>
  );
}

function internalSelectValueFromOption(opt: InternalLinkOption): string {
  if (opt.kind === 'page') return `page:${opt.pageKey}`;
  return `section:${opt.pageKey}:${opt.sectionId}`;
}
