'use server';

import { revalidatePath } from 'next/cache';
import { isDatabaseConfigured } from '@/db/client';
import {
  createProspect,
  deleteProspect,
  updateProspect,
  type ProspectStatus
} from '@/db/crm-repository';
import { provisionTenantFromProspect } from '@/platform/crm/provision-tenant-from-prospect';

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

export async function createProspectAction(_state: CrmFormState, formData: FormData): Promise<CrmFormState> {
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

  revalidatePath('/admin/crm');
  return { message: 'Prospect gespeichert.' };
}

export async function updateProspectStatusAction(_state: CrmFormState, formData: FormData): Promise<CrmFormState> {
  if (!isDatabaseConfigured()) {
    return { error: 'Datenbank nicht konfiguriert.' };
  }

  const id = String(formData.get('id') ?? '').trim();
  const status = parseStatus(String(formData.get('status') ?? ''));
  if (!id || !status) return { error: 'Ungültige Status-Aktualisierung.' };

  const updated = await updateProspect(id, { status });
  if (!updated) return { error: 'Prospect nicht gefunden.' };

  revalidatePath('/admin/crm');
  return { message: 'Status aktualisiert.' };
}

export async function deleteProspectAction(_state: CrmFormState, formData: FormData): Promise<CrmFormState> {
  if (!isDatabaseConfigured()) {
    return { error: 'Datenbank nicht konfiguriert.' };
  }

  const id = String(formData.get('id') ?? '').trim();
  if (!id) return { error: 'Fehlende Prospect-ID.' };

  const removed = await deleteProspect(id);
  if (!removed) return { error: 'Prospect nicht gefunden.' };

  revalidatePath('/admin/crm');
  return { message: 'Prospect gelöscht.' };
}

export async function provisionProspectAction(_state: CrmFormState, formData: FormData): Promise<CrmFormState> {
  if (!isDatabaseConfigured()) {
    return { error: 'Datenbank nicht konfiguriert.' };
  }

  const prospectId = String(formData.get('prospectId') ?? '').trim();
  const tenantSlug = String(formData.get('tenantSlug') ?? '').trim().toLowerCase();
  const adminPassword = String(formData.get('adminPassword') ?? '');

  if (!prospectId || !tenantSlug || !adminPassword) {
    return { error: 'Prospect, Tenant-Slug und Admin-Passwort sind Pflicht.' };
  }

  const result = await provisionTenantFromProspect({ prospectId, tenantSlug, adminPassword });
  if (!result.ok) {
    const detail = result.issues?.length ? ` ${result.issues.join(' · ')}` : '';
    return { error: `${result.error}${detail}` };
  }

  revalidatePath('/admin/crm');
  return {
    message: `Tenant „${result.tenantSlug}“ erstellt. Admin-Login unter /admin/login · Health: Seiten ${result.health.defaultPagesCreated ? 'OK' : 'leer'}, Collections ${result.health.collectionsSeeded ? 'OK' : 'leer'}.`
  };
}
