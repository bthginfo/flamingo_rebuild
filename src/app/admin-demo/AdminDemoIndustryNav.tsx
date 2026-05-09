'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { INDUSTRY_KEYS, STYLE_KEYS, type StyleKey } from '@/template-engine/model';
import { getIndustry } from '@/template-engine/registry';

function styleFromSearch(sp: ReturnType<typeof useSearchParams>): StyleKey {
  const raw = sp.get('style');
  if (raw && STYLE_KEYS.includes(raw as StyleKey)) return raw as StyleKey;
  return 'classic';
}

export function AdminDemoIndustryNav() {
  const sp = useSearchParams();
  const style = styleFromSearch(sp);

  return (
    <nav className="admin-demo-topbar__industries" aria-label="Branche wechseln (Demo)">
      {INDUSTRY_KEYS.map((k) => (
        <Link key={k} href={`/admin-demo/home?industry=${encodeURIComponent(k)}&style=${style}`}>
          {getIndustry(k).label}
        </Link>
      ))}
    </nav>
  );
}
