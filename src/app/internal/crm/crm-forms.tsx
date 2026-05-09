'use client';

import { useActionState, useRef, useState } from 'react';
import {
  createProspectAction,
  deleteProspectAction,
  provisionProspectAction,
  updateProspectStatusAction,
  type CrmFormState
} from './crm-actions';
import { slugifyTenantSlug } from '@/lib/tenant-slug';

export type IndustryOption = { key: string; label: string };
export type StyleOption = { key: string; label: string };

export type ProspectStatusUi = 'new' | 'contacted' | 'won' | 'lost' | 'provisioned';

export type SerializableProspect = {
  id: string;
  company: string;
  contactName: string;
  email: string;
  phone: string;
  oldWebsite: string;
  notes: string;
  status: ProspectStatusUi;
  preferredIndustry: string | null;
  preferredStyle: string | null;
  provisionedTenantId: string | null;
  createdAt: string;
  updatedAt: string;
};

const emptyState: CrmFormState = {};

const statusLabels: Record<string, string> = {
  new: 'Neu',
  contacted: 'Kontaktiert',
  won: 'Gewonnen',
  lost: 'Verloren',
  provisioned: 'Provisioniert'
};

export function CreateProspectForm(props: { industries: readonly IndustryOption[]; styles: readonly StyleOption[] }) {
  const [state, action, pending] = useActionState(createProspectAction, emptyState);

  return (
    <form action={action} className="crm-form">
      {state.error ? <p className="crm-banner crm-banner--error">{state.error}</p> : null}
      {state.message ? <p className="crm-banner crm-banner--ok">{state.message}</p> : null}
      <div className="crm-grid">
        <label>
          Betrieb *
          <input name="company" required placeholder="z. B. Trattoria Innsbruck" disabled={pending} />
        </label>
        <label>
          Kontakt
          <input name="contactName" placeholder="Name" disabled={pending} />
        </label>
        <label>
          E-Mail
          <input name="email" type="email" placeholder="name@betrieb.at" disabled={pending} />
        </label>
        <label>
          Telefon
          <input name="phone" placeholder="+43 …" disabled={pending} />
        </label>
        <label>
          Alte Website
          <input name="oldWebsite" placeholder="https://…" disabled={pending} />
        </label>
        <label>
          Branche (Demo-Seed)
          <select name="preferredIndustry" defaultValue="restaurant" disabled={pending}>
            {props.industries.map((industry) => (
              <option key={industry.key} value={industry.key}>
                {industry.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Stil
          <select name="preferredStyle" defaultValue="classic" disabled={pending}>
            {props.styles.map((style) => (
              <option key={style.key} value={style.key}>
                {style.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Status
          <select name="status" defaultValue="new" disabled={pending}>
            {Object.entries(statusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="crm-notes">
        Notizen
        <textarea name="notes" rows={3} placeholder="Kontext, nächster Schritt …" disabled={pending} />
      </label>
      <button className="button" type="submit" disabled={pending}>
        {pending ? 'Speichern …' : 'Prospect anlegen'}
      </button>
    </form>
  );
}

export function ProspectsBoard(props: {
  prospects: readonly SerializableProspect[];
  industries: readonly IndustryOption[];
  styles: readonly StyleOption[];
}) {
  return (
    <div className="crm-board">
      {props.prospects.length === 0 ? (
        <p style={{ color: 'var(--muted)' }}>Noch keine Prospects. Lege oben den ersten Datensatz an.</p>
      ) : (
        <div className="crm-table-wrap">
          <table className="crm-table">
            <thead>
              <tr>
                <th>Betrieb</th>
                <th>Branche / Stil</th>
                <th>Status</th>
                <th>Aktualisiert</th>
                <th>Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {props.prospects.map((prospect) => (
                <ProspectRow
                  key={prospect.id}
                  prospect={prospect}
                  industries={props.industries}
                  styles={props.styles}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ProspectRow(props: {
  prospect: SerializableProspect;
  industries: readonly IndustryOption[];
  styles: readonly StyleOption[];
}) {
  const { prospect, industries, styles } = props;
  return (
    <tr>
      <td>
        <strong>{prospect.company}</strong>
        <div style={{ color: 'var(--muted)', fontSize: 13 }}>
          {[prospect.contactName, prospect.email].filter(Boolean).join(' · ')}
        </div>
      </td>
      <td>
        {prospect.preferredIndustry ?? '—'} · {prospect.preferredStyle ?? '—'}
      </td>
      <td>
        <StatusForm prospectId={prospect.id} status={prospect.status} disabled={Boolean(prospect.provisionedTenantId)} />
      </td>
      <td>{new Date(prospect.updatedAt).toLocaleString('de-AT')}</td>
      <td>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {!prospect.provisionedTenantId ? (
            <ProvisionTenantDialog
              prospectId={prospect.id}
              defaultSlug={slugifyTenantSlug(prospect.company)}
              companyName={prospect.company}
              industries={industries}
              styles={styles}
              defaultIndustry={prospect.preferredIndustry ?? 'restaurant'}
              defaultStyle={prospect.preferredStyle ?? 'classic'}
            />
          ) : (
            <span style={{ color: 'var(--muted)', fontSize: 13 }}>Tenant provisioniert</span>
          )}
          <DeleteProspectForm prospectId={prospect.id} company={prospect.company} disabled={Boolean(prospect.provisionedTenantId)} />
        </div>
      </td>
    </tr>
  );
}

function StatusForm(props: { prospectId: string; status: string; disabled: boolean }) {
  const [state, action, pending] = useActionState(updateProspectStatusAction, emptyState);

  return (
    <form action={action} className="crm-inline-form">
      <input type="hidden" name="id" value={props.prospectId} />
      <select name="status" defaultValue={props.status} disabled={props.disabled || pending}>
        {Object.entries(statusLabels).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <button className="button secondary" type="submit" disabled={props.disabled || pending}>
        {pending ? '…' : 'OK'}
      </button>
      {state.error ? <span className="crm-inline-error">{state.error}</span> : null}
      {state.message ? <span className="crm-inline-ok">{state.message}</span> : null}
    </form>
  );
}

function ProvisionTenantDialog(props: {
  prospectId: string;
  defaultSlug: string;
  companyName: string;
  industries: readonly IndustryOption[];
  styles: readonly StyleOption[];
  defaultIndustry: string;
  defaultStyle: string;
}) {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(provisionProspectAction, emptyState);
  const jsonRef = useRef<HTMLTextAreaElement>(null);

  return (
    <>
      <button type="button" className="button secondary" onClick={() => setOpen(true)}>
        Tenant anlegen …
      </button>
      {open ? (
        <div
          className="internal-crm-modal-backdrop"
          role="presentation"
          onClick={() => {
            if (!pending) setOpen(false);
          }}
        >
          <div
            className="internal-crm-modal card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="internal-crm-provision-title"
            onClick={(e) => e.stopPropagation()}
            style={{ margin: 0 }}
          >
            <h2 id="internal-crm-provision-title" style={{ fontFamily: 'Georgia, serif', marginTop: 0 }}>
              Tenant für {props.companyName} anlegen
            </h2>
            <form action={action} className="crm-form" style={{ marginTop: 12 }}>
              <input type="hidden" name="prospectId" value={props.prospectId} />
              <label>
                Slug
                <input
                  name="tenantSlug"
                  required
                  minLength={2}
                  maxLength={50}
                  defaultValue={props.defaultSlug}
                  disabled={pending}
                  autoComplete="off"
                />
              </label>
              <label>
                Name (Anzeige / DB)
                <input name="tenantDisplayName" defaultValue={props.companyName} disabled={pending} />
              </label>
              <label>
                Passwort (min. 8 Zeichen, leer = automatisch)
                <input
                  name="adminPassword"
                  type="password"
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="Leer = wird automatisch generiert"
                  disabled={pending}
                />
              </label>
              <label>
                Content-JSON (optional, KI-Export)
                <span style={{ display: 'block', fontSize: 13, color: 'var(--muted)', fontWeight: 400, marginBottom: 6 }}>
                  Vorlage: <code>docs/rebuild-content-template.json</code> · Prompt: <code>docs/rebuild-ki-prompt.md</code> — wird mit dem
                  Demo-Seed zusammengeführt (sicher: Name, Brand, Kontakt, Navigation).
                </span>
                <input
                  type="file"
                  accept="application/json,.json"
                  disabled={pending}
                  style={{ marginBottom: 8 }}
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (!file || !jsonRef.current) return;
                    jsonRef.current.value = await file.text();
                  }}
                />
                <textarea ref={jsonRef} name="contentJson" rows={5} placeholder="{ … }" disabled={pending} />
              </label>
              <div className="crm-grid">
                <label>
                  Template (Branche)
                  <select name="industryKey" defaultValue={props.defaultIndustry} disabled={pending}>
                    {props.industries.map((industry) => (
                      <option key={industry.key} value={industry.key}>
                        {industry.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Stil
                  <select name="styleKey" defaultValue={props.defaultStyle} disabled={pending}>
                    {props.styles.map((style) => (
                      <option key={style.key} value={style.key}>
                        {style.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              {state.error ? <p className="crm-banner crm-banner--error">{state.error}</p> : null}
              {state.message ? <p className="crm-banner crm-banner--ok">{state.message}</p> : null}
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 16 }}>
                <button type="button" className="button secondary" disabled={pending} onClick={() => setOpen(false)}>
                  Schließen
                </button>
                <button className="button" type="submit" disabled={pending}>
                  {pending ? 'Provisioniere …' : 'Tenant anlegen'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

function DeleteProspectForm(props: { prospectId: string; company: string; disabled: boolean }) {
  const [state, action, pending] = useActionState(deleteProspectAction, emptyState);

  return (
    <form
      action={action}
      className="crm-inline-form"
      onSubmit={(event) => {
        if (!window.confirm(`Prospect „${props.company}“ wirklich löschen?`)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={props.prospectId} />
      <button className="button secondary" type="submit" disabled={props.disabled || pending}>
        Löschen
      </button>
      {state.error ? <span className="crm-inline-error">{state.error}</span> : null}
    </form>
  );
}
