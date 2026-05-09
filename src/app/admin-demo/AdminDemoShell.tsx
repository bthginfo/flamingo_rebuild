'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  Boxes,
  Code2,
  ImageIcon,
  LayoutDashboard,
  Link2,
  PanelLeft,
  Search
} from 'lucide-react';
import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { INDUSTRY_KEYS, STYLE_KEYS, type IndustryKey, type StyleKey } from '@/template-engine/model';
import { getIndustry } from '@/template-engine/registry';

const STYLE_LABELS: Record<StyleKey, string> = {
  classic: 'Klassisch',
  modern: 'Modern',
  bold: 'Bold'
};

const GLOBAL_NAV = [
  { href: '/admin/navigation', label: 'Navigation & Footer', icon: Link2, demoHref: null as string | null },
  { href: '/admin/seo', label: 'SEO & Sichtbarkeit', icon: Search, demoHref: '/admin-demo/seo' },
  { href: '/admin/integrations', label: 'SMTP & Skripte', icon: Code2, demoHref: null },
  { href: '/admin/media', label: 'Medien', icon: ImageIcon, demoHref: null },
  { href: '/admin/collections', label: 'Inhalte', icon: Boxes, demoHref: null }
] as const;

function parseIndustry(v: string | null): IndustryKey {
  if (v && INDUSTRY_KEYS.includes(v as IndustryKey)) return v as IndustryKey;
  return 'restaurant';
}

function parseStyle(v: string | null): StyleKey {
  if (v && STYLE_KEYS.includes(v as StyleKey)) return v as StyleKey;
  return 'classic';
}

export function AdminDemoShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? '';
  const sp = useSearchParams();
  const industry = parseIndustry(sp.get('industry'));
  const style = parseStyle(sp.get('style'));
  const qs = useMemo(
    () => `industry=${encodeURIComponent(industry)}&style=${encodeURIComponent(style)}`,
    [industry, style]
  );

  const corePages = useMemo(() => getIndustry(industry).corePages.map((p) => ({ key: p.key, label: p.label })), [industry]);

  const demoBasePath = useMemo(() => {
    if (!pathname.startsWith('/admin-demo/')) return '/admin-demo/home';
    const seg = pathname.slice('/admin-demo/'.length).split('/')[0] ?? '';
    if (!seg || seg === 'home') return '/admin-demo/home';
    return `/admin-demo/${encodeURIComponent(seg)}`;
  }, [pathname]);

  const overviewHref = `/admin-demo/home?${qs}`;
  const previewHref = `/preview/${industry}/${style}`;

  return (
    <div className="admin-app">
      <header className="admin-app__header">
        <div className="admin-app__header-left">
          <span className="admin-app__brand" aria-hidden>
            <PanelLeft size={20} strokeWidth={1.75} />
          </span>
          <div className="admin-app__titles">
            <span className="admin-app__product">Flamingo Admin</span>
            <span className="admin-app__tenant-name">Demo · {getIndustry(industry).label}</span>
          </div>
          <span className="admin-app__tenant-badge">DEMO</span>
        </div>
        <div className="admin-app__header-right">
          <a className="admin-app__header-link" href={previewHref} target="_blank" rel="noreferrer">
            Live-Vorschau
          </a>
          <Link className="admin-app__header-link" href="/admin/login">
            Echter Admin
          </Link>
        </div>
      </header>

      <div className="admin-app__body">
        <aside className="admin-app__sidebar" aria-label="Hauptnavigation">
          <div className="admin-app__sidebar-card">
            <p className="admin-app__sidebar-heading">Workspace · global</p>
            <nav className="admin-app__nav">
              <Link
                href={overviewHref}
                className={pathname === '/admin-demo/home' || pathname === '/admin-demo' ? 'is-active' : undefined}
              >
                <LayoutDashboard size={18} strokeWidth={1.75} aria-hidden />
                <span>Übersicht (Demo)</span>
              </Link>
              {GLOBAL_NAV.map(({ href, label, icon: Icon, demoHref }) => (
                <Link
                  key={href}
                  href={demoHref ? `${demoHref}?${qs}` : `/admin/login?next=${encodeURIComponent(href)}`}
                  title={demoHref ? undefined : 'Nur im geschützten Admin verfügbar'}
                  className={demoHref && pathname === demoHref ? 'is-active' : undefined}
                >
                  <Icon size={18} strokeWidth={1.75} aria-hidden />
                  <span>{label}</span>
                </Link>
              ))}
            </nav>
            <p className="admin-demo-sidebar-note">
              Seiten-Editor &amp; SEO-Demo: Entwurf nur in <strong>localStorage</strong>. Andere globale Bereiche → echter
              Admin.
            </p>
          </div>

          <div className="admin-app__sidebar-card">
            <p className="admin-app__sidebar-heading">Demo · Branche &amp; Stil</p>
            <p className="admin-demo-sidebar-meta">Branche</p>
            <div className="admin-demo-sidebar-pills" aria-label="Branche wählen">
              {INDUSTRY_KEYS.map((k) => (
                <Link
                  key={k}
                  href={`${demoBasePath}?industry=${encodeURIComponent(k)}&style=${encodeURIComponent(style)}`}
                  className={k === industry ? 'is-active' : undefined}
                >
                  {getIndustry(k).label}
                </Link>
              ))}
            </div>
            <p className="admin-demo-sidebar-meta" style={{ marginTop: 12 }}>
              Stil
            </p>
            <div className="admin-demo-sidebar-pills" aria-label="Stil wählen">
              {STYLE_KEYS.map((s) => (
                <Link
                  key={s}
                  href={`${demoBasePath}?industry=${encodeURIComponent(industry)}&style=${encodeURIComponent(s)}`}
                  className={s === style ? 'is-active' : undefined}
                >
                  {STYLE_LABELS[s]}
                </Link>
              ))}
            </div>
            <Link className="admin-demo-sidebar-marketing" href="/">
              Marketing-Site
            </Link>
          </div>

          <div className="admin-app__sidebar-card">
            <p className="admin-app__sidebar-heading">Website-Seiten · Demo</p>
            <nav className="admin-app__nav admin-app__nav--pages">
              {corePages.map((p) => {
                const href = `/admin-demo/${encodeURIComponent(p.key)}?${qs}`;
                const active = pathname === `/admin-demo/${p.key}` || pathname.startsWith(`/admin-demo/${p.key}/`);
                return (
                  <Link key={p.key} href={href} className={active ? 'is-active' : undefined}>
                    <span>{p.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        <main className="admin-app__main admin-app__main--demo">{children}</main>
      </div>
    </div>
  );
}
