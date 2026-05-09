import { MediaUploadPanel } from '@/admin/MediaUploadPanel';

export default function AdminMediaPage() {
  return (
    <div className="admin-surface section">
      <div className="shell">
        <p className="eyebrow">Admin</p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 44 }}>Medienbibliothek</h1>
        <p style={{ color: 'var(--muted)', maxWidth: 640, lineHeight: 1.55 }}>
          Mit gültigem Admin-Login kannst du Bilder direkt nach{' '}
          <a href="https://vercel.com/docs/storage/vercel-blob" rel="noreferrer" target="_blank">
            Vercel Blob
          </a>{' '}
          laden (siehe Upload unten). Alternativ trägst du weiterhin eine Bild-URL in den Seiten- und Collection-Editoren
          ein. Nach &quot;Speichern &amp; veröffentlichen&quot; erscheinen die Medien auf der Live-Site. Eine
          durchsuchbare Bibliothek im Admin ist später vorgesehen.
        </p>
        <MediaUploadPanel />
      </div>
    </div>
  );
}
