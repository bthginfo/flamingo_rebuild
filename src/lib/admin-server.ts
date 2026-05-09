import { redirect } from 'next/navigation';
import { isSessionFresh, readAdminSession } from '@/platform/auth/admin-session';

export async function requireAdminSession(nextPath: string): Promise<{ tenantSlug: string }> {
  const session = await readAdminSession();
  if (!session || !isSessionFresh(session)) {
    redirect(`/admin/login?next=${encodeURIComponent(nextPath)}`);
  }
  return { tenantSlug: session.tenantSlug };
}
