import type { Metadata } from 'next';
import { MarketingShell } from '@/ui/marketing/MarketingShell';

export const metadata: Metadata = {
  title: {
    default: 'FlamingoMedia · Websites für lokale Marken',
    template: '%s · FlamingoMedia'
  },
  description:
    'Websites mit Pop für inhabergeführte Betriebe: Editorial-Design, Templates, Foto, Video, Hosting. Innsbruck · DACH.'
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <MarketingShell>{children}</MarketingShell>;
}
