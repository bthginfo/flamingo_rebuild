import Link from 'next/link';
import Image from 'next/image';
import { agency, marqueeItems } from './data';
import { CookieNotice } from '@/ui/marketing/CookieNotice';

const navItems = [
  { href: '/templates', label: 'Templates' },
  { href: '/prozess', label: 'Ablauf' },
  { href: '/preise', label: 'Preise' },
  { href: '/ueber-uns', label: 'Über uns' },
  { href: '/admin-demo/home', label: 'Admin-Demo' },
  { href: '/kontakt', label: 'Kontakt' },
  { href: '/admin', label: 'Admin' }
];

export function MarketingShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="marketing-root">
      <div className="top-marquee" aria-label="Flamingo Hinweise">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span key={`${item}-${index}`}>{item}<b>✦</b></span>
          ))}
        </div>
      </div>
      <header className="marketing-header">
        <div className="shell header-inner">
          <Link href="/" className="brand-link" aria-label={agency.fullName}>
            <Image src={agency.logo} alt={agency.name} width={200} height={56} className="brand-link__img" unoptimized />
          </Link>
          <nav className="main-nav" aria-label="Hauptnavigation">
            {navItems.map((item) => (
                <Link href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
          </nav>
          <Link href="/kontakt" className="nav-cta">
            Beratung →
          </Link>
        </div>
      </header>
      {children}
      <footer className="marketing-footer">
        <div className="shell footer-grid">
          <div>
            <Image
              src={agency.logoFull}
              alt={agency.name}
              width={190}
              height={48}
              className="footer-logo"
              unoptimized
            />
            <p>{agency.tagline}</p>
          </div>
          <div>
            <p className="footer-title">Rechtliches</p>
            <Link href="/impressum">Impressum</Link>
            <Link href="/datenschutz">Datenschutz</Link>
          </div>
          <div>
            <p className="footer-title">Studio</p>
            <Link href="/prozess">Ablauf</Link>
            <Link href="/preise">Preise</Link>
            <Link href="/ueber-uns">Über uns</Link>
            <Link href="/kontakt">Kontakt</Link>
          </div>
          <div>
            <p className="footer-title">Kontakt</p>
            <a href={`mailto:${agency.email}`}>{agency.email}</a>
            <a href={`tel:${agency.phone.replace(/\s/g, '')}`}>{agency.phone}</a>
            <a href={`tel:${agency.phoneAt.replace(/\s/g, '')}`}>{agency.phoneAt}</a>
            <span>Innsbruck · München · Ingolstadt</span>
          </div>
        </div>
      </footer>
      <CookieNotice />
    </div>
  );
}
