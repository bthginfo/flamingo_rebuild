import { redirect } from 'next/navigation';

export default function AdminDemoIndexPage() {
  redirect('/admin-demo/home?industry=restaurant&style=classic');
}
