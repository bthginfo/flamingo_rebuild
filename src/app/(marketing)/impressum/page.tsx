import type { Metadata } from 'next';
import Link from 'next/link';
import { agency } from '@/ui/marketing/data';
import { RevealOnScroll } from '@/ui/marketing/RevealOnScroll';

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Angaben gemäß TMG und Kontakt — FlamingoMedia.'
};

export default function ImpressumPage() {
  return (
    <main>
      <section className="section surface" style={{ paddingTop: 120 }}>
        <div className="shell" style={{ maxWidth: 720 }}>
          <p className="eyebrow">Rechtliches</p>
          <h1 className="section-title">Impressum</h1>
          <div className="card" style={{ padding: 28, marginTop: 24, lineHeight: 1.65 }}>
            <p>
              <strong>{agency.fullName}</strong>
            </p>
            <p style={{ marginTop: 16 }}>
              DACH-weit remote · Schwerpunkte Innsbruck, München, Ingolstadt
              <br />
              E-Mail:{' '}
              <a href={`mailto:${agency.email}`} style={{ textDecoration: 'underline' }}>
                {agency.email}
              </a>
              <br />
              Tel. DE: <a href={`tel:${agency.phone.replace(/\s/g, '')}`}>{agency.phone}</a>
              <br />
              Tel. AT: <a href={`tel:${agency.phoneAt.replace(/\s/g, '')}`}>{agency.phoneAt}</a>
            </p>
            <p style={{ marginTop: 24, color: 'var(--muted)', fontSize: '0.95rem' }}>
              Dieses Impressum gilt für die Marketing- und Plattform-Oberfläche unter dieser Domain. Für mandantenfähige
              Demoseiten gelten die Angaben des jeweiligen Inhabers im Footer der Seite.
            </p>
            <p style={{ marginTop: 20 }}>
              <Link href="/datenschutz">Datenschutzerklärung</Link>
              {' · '}
              <Link href="/kontakt">Kontakt</Link>
            </p>
          </div>
        </div>
      </section>
      <RevealOnScroll as="section" className="section">
        <div className="shell" style={{ maxWidth: 720 }}>
          <h2 className="section-title" style={{ fontSize: '1.5rem' }}>
            Haftung für Inhalte und Links
          </h2>
          <p className="hero-copy" style={{ marginTop: 12 }}>
            Als Diensteanbieter sind wir nach dem Telemediengesetz (TMG) für eigene Inhalte auf diesen Seiten nach den
            allgemeinen Gesetzen verantwortlich. Für die Inhalte externer Links übernehmen wir keine Haftung; zum
            Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar.
          </p>
        </div>
      </RevealOnScroll>
    </main>
  );
}
