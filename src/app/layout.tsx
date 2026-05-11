import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';
import './themes/restaurant-classic-pro.css';
import { getSiteUrl } from '@/lib/site-url';

const fontRcDisplay = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-rc-display',
  display: 'swap',
  weight: ['400', '500', '600', '700']
});

const fontRcSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-rc-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700']
});

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
    <html lang="de" className={`${fontRcDisplay.variable} ${fontRcSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
