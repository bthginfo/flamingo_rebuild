'use server';

import { revalidatePath } from 'next/cache';
import { isDatabaseConfigured } from '@/db/client';
import {
  createProspect,
  deleteProspect,
  updateProspect,
  type ProspectStatus
} from '@/db/crm-repository';
import { assertInternalCrmSession } from '@/lib/internal-crm-server';
import { provisionTenantFromProspect } from '@/platform/crm/provision-tenant-from-prospect';
import { INDUSTRY_KEYS, STYLE_KEYS, type IndustryKey, type StyleKey } from '@/template-engine/model';

export type CrmFormState = {
  message?: string;
  error?: string;
};

function parseStatus(raw: string | null): ProspectStatus | undefined {
  const value = String(raw ?? '').trim();
  if (value === 'new' || value === 'contacted' || value === 'won' || value === 'lost' || value === 'provisioned') {
    return value;
  }
  return undefined;
}

function parseIndustryOverride(raw: string | null): IndustryKey | undefined {
  const v = String(raw ?? '').trim();
  return (INDUSTRY_KEYS as readonly string[]).includes(v) ? (v as IndustryKey) : undefined;
}

function parseStyleOverride(raw: string | null): StyleKey | undefined {
  const v = String(raw ?? '').trim();
  return (STYLE_KEYS as readonly string[]).includes(v) ? (v as StyleKey) : undefined;
}

export async function createProspectAction(_state: CrmFormState, formData: FormData): Promise<CrmFormState> {
  const auth = await assertInternalCrmSession();
  if (!auth.ok) return { error: auth.error };

  if (!isDatabaseConfigured()) {
    return { error: 'Datenbank nicht konfiguriert. Setze FLAMINGO_REBUILD_DB=1 und POSTGRES_URL, führe Migrationen aus.' };
  }

  const company = String(formData.get('company') ?? '').trim();
  if (!company) return { error: 'Betrieb ist Pflicht.' };

  await createProspect({
    company,
    contactName: String(formData.get('contactName') ?? ''),
    email: String(formData.get('email') ?? ''),
    phone: String(formData.get('phone') ?? ''),
    oldWebsite: String(formData.get('oldWebsite') ?? ''),
    notes: String(formData.get('notes') ?? ''),
    status: parseStatus(String(formData.get('status') ?? 'new')) ?? 'new',
    preferredIndustry: String(formData.get('preferredIndustry') ?? '').trim() || null,
    preferredStyle: String(formData.get('preferredStyle') ?? '').trim() || null
  });

  revalidatePath('/internal/crm/prospects');
  return { message: 'Prospect gespeichert.' };
}

export async function updateProspectStatusAction(_state: CrmFormState, formData: FormData): Promise<CrmFormState> {
  const auth = await assertInternalCrmSession();
  if (!auth.ok) return { error: auth.error };

  if (!isDatabaseConfigured()) {
    return { error: 'Datenbank nicht konfiguriert.' };
  }

  const id = String(formData.get('id') ?? '').trim();
  const status = parseStatus(String(formData.get('status') ?? ''));
  if (!id || !status) return { error: 'Ungültige Status-Aktualisierung.' };

  const updated = await updateProspect(id, { status });
  if (!updated) return { error: 'Prospect nicht gefunden.' };

  revalidatePath('/internal/crm/prospects');
  return { message: 'Status aktualisiert.' };
}

export async function deleteProspectAction(_state: CrmFormState, formData: FormData): Promise<CrmFormState> {
  const auth = await assertInternalCrmSession();
  if (!auth.ok) return { error: auth.error };

  if (!isDatabaseConfigured()) {
    return { error: 'Datenbank nicht konfiguriert.' };
  }

  const id = String(formData.get('id') ?? '').trim();
  if (!id) return { error: 'Fehlende Prospect-ID.' };

  const removed = await deleteProspect(id);
  if (!removed) return { error: 'Prospect nicht gefunden.' };

  revalidatePath('/internal/crm/prospects');
  return { message: 'Prospect gelöscht.' };
}

export async function provisionProspectAction(_state: CrmFormState, formData: FormData): Promise<CrmFormState> {
  const auth = await assertInternalCrmSession();
  if (!auth.ok) return { error: auth.error };

  if (!isDatabaseConfigured()) {
    return { error: 'Datenbank nicht konfiguriert.' };
  }

  const prospectId = String(formData.get('prospectId') ?? '').trim();
  const tenantSlug = String(formData.get('tenantSlug') ?? '').trim().toLowerCase();
  const tenantDisplayName = String(formData.get('tenantDisplayName') ?? '').trim();
  const adminPassword = String(formData.get('adminPassword') ?? '');
  const contentJson = String(formData.get('contentJson') ?? '');
  const industryOverride = parseIndustryOverride(String(formData.get('industryKey') ?? ''));
  const styleOverride = parseStyleOverride(String(formData.get('styleKey') ?? ''));

  if (!prospectId || !tenantSlug) {
    return { error: 'Prospect und Tenant-Slug sind Pflicht.' };
  }

  const result = await provisionTenantFromProspect({
    prospectId,
    tenantSlug,
    adminPassword: adminPassword.trim().length >= 8 ? adminPassword.trim() : undefined,
    tenantDisplayName: tenantDisplayName || undefined,
    industryKey: industryOverride,
    styleKey: styleOverride,
    contentJson: contentJson.trim() || undefined
  });
  if (!result.ok) {
    const detail = result.issues?.length ? ` ${result.issues.join(' · ')}` : '';
    return { error: `${result.error}${detail}` };
  }

  revalidatePath('/internal/crm/prospects');
  revalidatePath('/internal/crm/tenants');

  let message = `Tenant „${result.tenantSlug}“ erstellt. Admin-Login: /admin/login (Benutzername = Slug). Health: Seiten ${result.health.defaultPagesCreated ? 'OK' : 'leer'}, Collections ${result.health.collectionsSeeded ? 'OK' : 'leer'}.`;
  if (result.generatedPassword) {
    message += ` Automatisch generiertes Admin-Passwort (bitte sicher notieren): ${result.generatedPassword}`;
  }
  if (result.vercel) {
    message += ` Vercel: ${result.vercel.projectUrl} (Admin: ${result.vercel.loginUrl}). Deploy: ${result.vercel.deploymentUrl} (${result.vercel.deploymentState}).`;
  }
  if (result.vercelError) {
    message += ` Vercel-Provisioning fehlgeschlagen: ${result.vercelError}`;
  }

  return { message };
}
