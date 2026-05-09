import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="fm-not-found">
      <div className="fm-not-found__inner">
        <p className="eyebrow">404</p>
        <h1 className="headline" style={{ fontSize: 'clamp(2rem, 6vw, 3.25rem)', marginTop: 12 }}>
          Hier flattert <em>nichts</em>.
        </h1>
        <p className="hero-copy" style={{ marginTop: 20, maxWidth: 420 }}>
          Die Seite gibt es nicht (mehr) oder der Link war falsch. Zurück zur Startseite oder Kontakt — wir helfen gern
          weiter.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 28, justifyContent: 'center' }}>
          <Link href="/" className="button">
            Startseite
          </Link>
          <Link href="/kontakt" className="button" style={{ background: 'var(--accent)', color: '#fff' }}>
            Kontakt
          </Link>
        </div>
      </div>
    </main>
  );
}
