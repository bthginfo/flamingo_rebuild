'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Boxes,
  Code2,
  ExternalLink,
  Files,
  ImageIcon,
  LayoutDashboard,
  Link2,
  PanelLeft,
  Search
} from 'lucide-react';
import { AdminLogoutButton } from '@/admin/AdminLogoutButton';
import type { IndustryKey, StyleKey } from '@/template-engine/model';

const GLOBAL_NAV = [
  { href: '/admin', label: 'Übersicht', icon: LayoutDashboard },
  { href: '/admin/navigation', label: 'Navigation & Footer', icon: Link2 },
  { href: '/admin/seo', label: 'SEO & Sichtbarkeit', icon: Search },
  { href: '/admin/integrations', label: 'SMTP & Skripte', icon: Code2 },
  { href: '/admin/media', label: 'Medien', icon: ImageIcon },
  { href: '/admin/collections', label: 'Inhalte', icon: Boxes }
] as const;

function navLinkActive(pathname: string, href: string): boolean {
  const norm = pathname.replace(/\/$/, '') || '/';
  const h = href.replace(/\/$/, '') || '/';
  if (h === '/admin') {
    return norm === '/admin';
  }
  return norm === h || norm.startsWith(`${h}/`);
}

export type AdminCorePageNav = { key: string; label: string };

export function AdminAppChrome({
  children,
  tenantSlug,
  tenantName,
  industryKey,
  styleKey,
  corePages
}: {
  children: React.ReactNode;
  tenantSlug: string | null;
  tenantName: string | null;
  industryKey: IndustryKey | null;
  styleKey: StyleKey | null;
  corePages: readonly AdminCorePageNav[];
}) {
  const pathname = usePathname() ?? '';

  if (pathname === '/admin/login' || pathname.startsWith('/admin/login/')) {
    return <>{children}</>;
  }

  const previewTenant = tenantSlug ? `&tenant=${encodeURIComponent(tenantSlug)}` : '';
  const websiteHref =
    industryKey && styleKey
      ? `/preview/${industryKey}/${styleKey}?preview=1${previewTenant}`
      : '/templates';

  const displayTitle = tenantName?.trim() || tenantSlug || 'Admin';
  const badge = tenantSlug ? tenantSlug.toUpperCase() : '—';

  return (
    <div className="admin-app">
      <header className="admin-app__header">
        <div className="admin-app__header-left">
          <span className="admin-app__brand" aria-hidden>
            <PanelLeft size={20} strokeWidth={1.75} />
          </span>
          <div className="admin-app__titles">
            <span className="admin-app__product">Flamingo Admin</span>
            <span className="admin-app__tenant-name">{displayTitle}</span>
          </div>
          {tenantSlug ? <span className="admin-app__tenant-badge">{badge}</span> : null}
          {tenantSlug ? (
            <nav className="admin-app__quicknav" aria-label="Admin-Quicklinks">
              <Link className={navLinkActive(pathname, '/admin/pages') ? 'admin-app__header-link is-active' : 'admin-app__header-link'} href="/admin/pages">
                <Files size={15} strokeWidth={1.9} aria-hidden />
                <span>Seiten</span>
              </Link>
              <Link className={navLinkActive(pathname, '/admin/media') ? 'admin-app__header-link is-active' : 'admin-app__header-link'} href="/admin/media">
                <ImageIcon size={15} strokeWidth={1.9} aria-hidden />
                <span>Medien</span>
              </Link>
              <a className="admin-app__header-link" href={websiteHref} target="_blank" rel="noreferrer">
                <ExternalLink size={15} strokeWidth={1.9} aria-hidden />
                <span>Website ansehen</span>
              </a>
            </nav>
          ) : null}
        </div>
        <div className="admin-app__header-right">
          {tenantSlug ? (
            <>
              <AdminLogoutButton className="admin-app__logout" />
            </>
          ) : (
            <Link className="admin-app__header-link" href="/admin/login">
              Anmelden
            </Link>
          )}
        </div>
      </header>

      <div className="admin-app__body">
        <aside className="admin-app__sidebar" aria-label="Hauptnavigation">
          <div className="admin-app__sidebar-card">
            <p className="admin-app__sidebar-heading">Workspace · global</p>
            <nav className="admin-app__nav">
              {GLOBAL_NAV.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} className={navLinkActive(pathname, href) ? 'is-active' : undefined}>
                  <Icon size={18} strokeWidth={1.75} aria-hidden />
                  <span>{label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {corePages.length > 0 ? (
            <div className="admin-app__sidebar-card">
              <p className="admin-app__sidebar-heading">Website-Seiten</p>
              <nav className="admin-app__nav admin-app__nav--pages">
                {corePages.map((p) => {
                  const href = `/admin/pages/${encodeURIComponent(p.key)}`;
                  const active = pathname === href || pathname.startsWith(`${href}/`);
                  return (
                    <Link key={p.key} href={href} className={active ? 'is-active' : undefined}>
                      <span>{p.label}</span>
                    </Link>
                  );
                })}
              </nav>
              <Link href="/admin/pages" className="admin-app__sidebar-meta">
                Alle Seiten &amp; Übersicht
              </Link>
            </div>
          ) : null}
        </aside>

        <main className="admin-app__main">{children}</main>
      </div>
    </div>
  );
}
