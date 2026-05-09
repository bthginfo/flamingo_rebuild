import type { Metadata } from 'next';
import Link from 'next/link';
import { agency } from '@/ui/marketing/data';
import { RevealOnScroll } from '@/ui/marketing/RevealOnScroll';

export const metadata: Metadata = {
  title: 'Datenschutz',
  description: 'Informationen zur Verarbeitung personenbezogener Daten auf flamingomedia.online und der Plattform.'
};

export default function DatenschutzPage() {
  return (
    <main>
      <section className="section surface" style={{ paddingTop: 120 }}>
        <div className="shell" style={{ maxWidth: 720 }}>
          <p className="eyebrow">Rechtliches</p>
          <h1 className="section-title">Datenschutz</h1>
          <div className="card" style={{ padding: 28, marginTop: 24, lineHeight: 1.65 }}>
            <p>
              Verantwortliche Stelle: <strong>{agency.fullName}</strong>, erreichbar unter{' '}
              <a href={`mailto:${agency.email}`} style={{ textDecoration: 'underline' }}>
                {agency.email}
              </a>
              .
            </p>
            <h2 style={{ fontSize: '1.15rem', marginTop: 28 }}>Kontaktformular</h2>
            <p style={{ marginTop: 8 }}>
              Wenn Du das Kontaktformular nutzt, verarbeiten wir die von Dir angegebenen Daten ausschließlich zur
              Bearbeitung der Anfrage. Ohne separaten Newsletter-Opt-in erfolgt keine werbliche Nutzung.
            </p>
            <h2 style={{ fontSize: '1.15rem', marginTop: 24 }}>Hosting &amp; Logs</h2>
            <p style={{ marginTop: 8 }}>
              Beim Aufruf dieser Website werden technisch notwendige Server-Logdaten (z.&nbsp;B. IP-Adresse in gekürzter
              Form, Zeitstempel, User-Agent) durch unseren Hosting-Anbieter verarbeitet, soweit das zum Betrieb und zur
              Sicherheit erforderlich ist.
            </p>
            <h2 style={{ fontSize: '1.15rem', marginTop: 24 }}>Cookies</h2>
            <p style={{ marginTop: 8 }}>
              Für Admin- und Vorschau-Funktionen können technisch notwendige Cookies gesetzt werden (z.&nbsp;B.
              Sitzungsinformationen). Es werden keine Tracking-Cookies zu Werbezwecken ohne Einwilligung gesetzt.
            </p>
            <h2 style={{ fontSize: '1.15rem', marginTop: 24 }}>Deine Rechte</h2>
            <p style={{ marginTop: 8 }}>
              Du hast nach Maßgabe der DSGVO Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
              Datenübertragbarkeit und Widerspruch. Bitte wende Dich hierfür an die oben genannte E-Mail-Adresse.
            </p>
            <p style={{ marginTop: 24 }}>
              <Link href="/impressum">Impressum</Link>
              {' · '}
              <Link href="/kontakt">Kontakt</Link>
            </p>
          </div>
        </div>
      </section>
      <RevealOnScroll as="section" className="section">
        <div className="shell" style={{ maxWidth: 720 }}>
          <p className="hero-copy" style={{ marginTop: 0 }}>
            Diese Kurzfassung ersetzt keine vollständige juristische Datenschutzerklärung. Für Mandantenprojekte können
            zusätzliche Auftragsverarbeitungsvereinbarungen und branchenspezifische Hinweise gelten.
          </p>
        </div>
      </RevealOnScroll>
    </main>
  );
}
