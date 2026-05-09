import { NextRequest, NextResponse } from 'next/server';

const ADMIN_SESSION_COOKIE = 'flamingo_rebuild_admin';
const INTERNAL_CRM_COOKIE = 'flamingo_internal_crm';

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
    !pathname.startsWith('/internal') &&
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/_next')
  ) {
    const url = request.nextUrl.clone();
    const rest = pathname === '/' ? '' : pathname;
    url.pathname = `/site/${tenantSlug}${rest}`;
    return NextResponse.rewrite(url);
  }

  if (pathname.startsWith('/internal/crm') && !pathname.startsWith('/internal/crm/login')) {
    if (!request.cookies.get(INTERNAL_CRM_COOKIE)?.value) {
      const url = request.nextUrl.clone();
      url.pathname = '/internal/crm/login';
      url.searchParams.set('next', pathname);
      return NextResponse.redirect(url);
    }
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-flamingo-internal-path', pathname);
    return NextResponse.next({
      request: { headers: requestHeaders }
    });
  }

  if (
    !pathname.startsWith('/admin') ||
    pathname === '/admin/login' ||
    pathname.startsWith('/admin-demo')
  ) {
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
