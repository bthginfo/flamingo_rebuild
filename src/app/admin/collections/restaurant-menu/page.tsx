import { permanentRedirect } from 'next/navigation';

export default function LegacyRestaurantMenuEditorPage() {
  permanentRedirect('/admin/collections/menuItem');
}
