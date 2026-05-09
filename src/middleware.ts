import { NextRequest, NextResponse } from 'next/server';

const ADMIN_SESSION_COOKIE = 'flamingo_rebuild_admin';

function tenantSlugFromHost(hostname: string): string | null {
  if (process.env.FLAMINGO_TENANT_HOST_ROUTING !== '1') {
    return null;
  }
  const suffix = (process.env.FLAMINGO_TENANT_HOST_SUFFIX ?? '.localhost').toLowerCase();
  const host = hostname.split(':')[0].toLowerCase();
  if (!host.endsWith(suffix)) {
    return null;
  }
  const slug = host.slice(0, -suffix.length);
  if (!slug || slug === 'www') {
    return null;
  }
  return slug;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get('host') ?? '';

  const tenantSlug = tenantSlugFromHost(host);
  if (
    tenantSlug &&
    !pathname.startsWith('/site/') &&
    !pathname.startsWith('/admin') &&
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/_next')
  ) {
    const url = request.nextUrl.clone();
    const rest = pathname === '/' ? '' : pathname;
    url.pathname = `/site/${tenantSlug}${rest}`;
    return NextResponse.rewrite(url);
  }

  if (!pathname.startsWith('/admin') || pathname === '/admin/login' || pathname.startsWith('/admin/crm')) {
    return NextResponse.next();
  }

  if (request.cookies.has(ADMIN_SESSION_COOKIE)) {
    return NextResponse.next();
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = '/admin/login';
  loginUrl.searchParams.set('next', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};
