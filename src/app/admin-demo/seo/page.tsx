import { notFound } from 'next/navigation';
import { TenantSeoEditor } from '@/admin/TenantSeoEditor';
import { INDUSTRY_KEYS, STYLE_KEYS, type IndustryKey, type StyleKey } from '@/template-engine/model';
import { getDemoSeed } from '@/template-engine/seeds';

function parseIndustry(v: string | undefined): IndustryKey {
  if (v && INDUSTRY_KEYS.includes(v as IndustryKey)) return v as IndustryKey;
  return 'restaurant';
}

function parseStyle(v: string | undefined): StyleKey {
  if (v && STYLE_KEYS.includes(v as StyleKey)) return v as StyleKey;
  return 'classic';
}

export default async function AdminDemoSeoPage({
  searchParams
}: {
  searchParams: Promise<{ industry?: string; style?: string }>;
}) {
  const sp = await searchParams;
  const industry = parseIndustry(sp.industry);
  const style = parseStyle(sp.style);
  const initialSeed = getDemoSeed(industry, style);
  if (!initialSeed) {
    notFound();
  }

  return (
    <div className="admin-surface">
      <p className="eyebrow">SEO & Sichtbarkeit · Demo</p>
      <h1 style={{ marginTop: 8, fontFamily: "Georgia, 'Times New Roman', serif" }}>Meta & URLs</h1>
      <p style={{ color: 'var(--muted)', maxWidth: 640 }}>
        Gleicher Demo-Speicher wie im Seiten-Editor (<strong>localStorage</strong>) — keine Datenbank, kein Tenant.
      </p>
      <TenantSeoEditor demoCanonicalSeed={initialSeed} />
    </div>
  );
}
