import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'FlamingoMedia';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 72,
          background: 'linear-gradient(135deg, #fff8fa 0%, #eadde4 45%, #f24171 100%)',
          color: '#14111a',
          fontFamily: 'Georgia, serif'
        }}
      >
        <p style={{ margin: 0, fontSize: 28, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.75 }}>
          FlamingoMedia
        </p>
        <p style={{ margin: '24px 0 0', fontSize: 72, lineHeight: 1.05, fontWeight: 700 }}>
          Websites mit <em style={{ color: '#f24171', fontStyle: 'italic' }}>Pop</em> für lokale Marken.
        </p>
        <p style={{ margin: '28px 0 0', fontSize: 30, maxWidth: 900, opacity: 0.88 }}>
          Editorial-Design · Templates · Innsbruck · DACH
        </p>
      </div>
    ),
    { ...size }
  );
}
