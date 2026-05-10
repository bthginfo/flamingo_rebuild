import { MediaUploadPanel } from '@/admin/MediaUploadPanel';

export default function AdminMediaPage() {
  return (
    <div className="admin-surface section">
      <div className="shell">
        <p className="eyebrow">Admin</p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 44 }}>Medienbibliothek</h1>
        <p style={{ color: 'var(--muted)', maxWidth: 680, lineHeight: 1.55 }}>
          Mit gueltigem Admin-Login kannst du Bilder direkt nach{' '}
          <a href="https://vercel.com/docs/storage/vercel-blob" rel="noreferrer" target="_blank">
            Vercel Blob
          </a>{' '}
          laden. Uploads sind auf 1&nbsp;MB pro Bild begrenzt. Alternativ traegst du weiterhin eine Bild-URL in den
          Seiten- und Collection-Editoren ein. Ungenutzte Blob-Bilder, die seit 14 Tagen in keiner Draft- oder
          Live-Version referenziert werden, kannst du unten bereinigen.
        </p>
        <MediaUploadPanel />
      </div>
    </div>
  );
}
