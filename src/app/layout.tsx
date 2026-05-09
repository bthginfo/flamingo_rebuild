import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'FlamingoPlatform',
    template: '%s · FlamingoPlatform'
  },
  description: 'Interne Plattform für FlamingoMedia: Templates, Vorschau und Admin.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
