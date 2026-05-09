import Link from 'next/link';
import Image from 'next/image';
import { agency, marqueeItems } from './data';
import { CookieNotice } from '@/ui/marketing/CookieNotice';

const navItems = [
  { href: '/templates', label: 'Templates' },
  { href: '/prozess', label: 'Ablauf' },
  { href: '/preise', label: 'Preise' },
  { href: '/preise#foerderung', label: 'Förderung' },
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
        <div className="shell marketing-footer__top">
          <div className="marketing-footer__brand">
            <Image
              src={agency.logoFull}
              alt={agency.name}
              width={190}
              height={48}
              className="footer-logo"
              unoptimized
            />
            <p>{agency.tagline}</p>
            <div className="marketing-footer__contact">
              <a href={`mailto:${agency.email}`}>{agency.email}</a>
              <a href={`tel:${agency.phone.replace(/\s/g, '')}`}>{agency.phone}</a>
              <a href={`tel:${agency.phoneAt.replace(/\s/g, '')}`}>{agency.phoneAt}</a>
              <span>Innsbruck · München · Ingolstadt</span>
            </div>
          </div>
          <div>
            <p className="footer-title">Studio</p>
            <Link href="/templates">Templates</Link>
            <Link href="/prozess">Ablauf</Link>
            <Link href="/preise">Preise</Link>
            <Link href="/preise#foerderung">Förderrechner</Link>
            <Link href="/ueber-uns">Über uns</Link>
            <Link href="/kontakt">Kontakt</Link>
          </div>
          <div>
            <p className="footer-title">Live ansehen</p>
            <Link href="/preview/restaurant/classic">Restaurant</Link>
            <Link href="/preview/salon/classic">Salon</Link>
            <Link href="/preview/tradesman/classic">Handwerk</Link>
          </div>
          <div>
            <p className="footer-title">Rechtliches</p>
            <Link href="/impressum">Impressum</Link>
            <Link href="/datenschutz">Datenschutz</Link>
          </div>
        </div>
        <div className="marketing-footer__marquee" aria-hidden>
          <div className="marketing-footer__marquee-track">
            <span>FLAMINGOMEDIA · FLAMINGOMEDIA · FLAMINGOMEDIA · FLAMINGOMEDIA · </span>
            <span>FLAMINGOMEDIA · FLAMINGOMEDIA · FLAMINGOMEDIA · FLAMINGOMEDIA · </span>
          </div>
        </div>
        <div className="shell marketing-footer__bottom">
          <span>© {new Date().getFullYear()} {agency.name}. Alle Rechte vorbehalten.</span>
          <span className="marketing-footer__mono">Made with care · Innsbruck</span>
        </div>
      </footer>
      <CookieNotice />
    </div>
  );
}
