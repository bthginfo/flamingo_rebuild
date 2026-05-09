import { NextResponse } from 'next/server';
import { isInternalCrmSessionFresh, readInternalCrmSession } from '@/platform/auth/internal-crm-session';

export const runtime = 'nodejs';

export async function GET() {
  const session = await readInternalCrmSession();
  const ok = Boolean(session && isInternalCrmSessionFresh(session));
  return NextResponse.json({ ok });
}
