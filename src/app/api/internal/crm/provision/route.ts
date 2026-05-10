import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { isDatabaseConfigured } from '@/db/client';
import { assertInternalCrmSession } from '@/lib/internal-crm-server';
import { provisionTenantFromProspect } from '@/platform/crm/provision-tenant-from-prospect';
import { INDUSTRY_KEYS, STYLE_KEYS, type IndustryKey, type StyleKey } from '@/template-engine/model';

function parseIndustryOverride(raw: string | null): IndustryKey | undefined {
  const v = String(raw ?? '').trim();
  return (INDUSTRY_KEYS as readonly string[]).includes(v) ? (v as IndustryKey) : undefined;
}

function parseStyleOverride(raw: string | null): StyleKey | undefined {
  const v = String(raw ?? '').trim();
  return (STYLE_KEYS as readonly string[]).includes(v) ? (v as StyleKey) : undefined;
}

export async function POST(request: Request) {
  const auth = await assertInternalCrmSession();
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: 'Datenbank nicht konfiguriert.' }, { status: 503 });
  }

  const formData = await request.formData();
  const prospectId = String(formData.get('prospectId') ?? '').trim();
  const tenantSlug = String(formData.get('tenantSlug') ?? '').trim().toLowerCase();
  const tenantDisplayName = String(formData.get('tenantDisplayName') ?? '').trim();
  const adminPassword = String(formData.get('adminPassword') ?? '');
  const contentJson = String(formData.get('contentJson') ?? '');
  const industryOverride = parseIndustryOverride(String(formData.get('industryKey') ?? ''));
  const styleOverride = parseStyleOverride(String(formData.get('styleKey') ?? ''));

  if (!prospectId || !tenantSlug) {
    return NextResponse.json({ error: 'Prospect und Tenant-Slug sind Pflicht.' }, { status: 400 });
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
    return NextResponse.json({ error: `${result.error}${detail}` }, { status: 400 });
  }

  revalidatePath('/internal/crm/prospects');
  revalidatePath('/internal/crm/tenants');

  let message = `Tenant "${result.tenantSlug}" erstellt. Admin-Login: /admin/login (Benutzername = Slug). Health: Seiten ${result.health.defaultPagesCreated ? 'OK' : 'leer'}, Collections ${result.health.collectionsSeeded ? 'OK' : 'leer'}.`;
  if (result.generatedPassword) {
    message += ` Automatisch generiertes Admin-Passwort (bitte sicher notieren): ${result.generatedPassword}`;
  }
  if (result.vercel) {
    message += ` Vercel: ${result.vercel.projectUrl} (Admin: ${result.vercel.loginUrl}). Deploy: ${result.vercel.deploymentUrl} (${result.vercel.deploymentState}).`;
  }
  if (result.vercelError) {
    message += ` Vercel-Provisioning fehlgeschlagen: ${result.vercelError}`;
  }

  return NextResponse.json({ message });
}
