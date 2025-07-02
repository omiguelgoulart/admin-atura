import { NextRequest, NextResponse } from 'next/server';

/**
 * Middleware para proteger rotas específicas do acesso não autorizado.
 * Verifica se o cookie 'admin' está presente antes de permitir o acesso
 * a determinadas rotas protegidas.
 */
export function middleware(request: NextRequest) {
  const admin = request.cookies.get('admin');
  const pathname = request.nextUrl.pathname;

  // Lista de rotas que exigem autenticação
  const protectedRoutes = ['/', '/avaliacao', '/produtos'];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Redireciona se tentar acessar uma rota protegida sem o cookie do admin
  if (isProtectedRoute && !admin) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

/**
 * Corrigido: agora o matcher cobre exatamente as rotas protegidas
 */
export const config = {
  matcher: ['/', '/avaliacao/:path*', '/produtos/:path*'],
};
