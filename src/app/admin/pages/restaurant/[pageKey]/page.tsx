import { permanentRedirect } from 'next/navigation';

export default async function LegacyRestaurantPageEditorRoute({ params }: { params: Promise<{ pageKey: string }> }) {
  const { pageKey } = await params;
  permanentRedirect(`/admin/pages/${pageKey}`);
}
