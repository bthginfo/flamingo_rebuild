import type { Metadata } from 'next';
import './globals.css';
import { getSiteUrl } from '@/lib/site-url';

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: 'FlamingoPlatform',
    template: '%s · FlamingoPlatform'
  },
  description: 'Interne Plattform für FlamingoMedia: Templates, Vorschau und Admin.',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'FlamingoMedia'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
