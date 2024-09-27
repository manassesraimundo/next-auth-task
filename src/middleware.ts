import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  
  // Verifique se o token está presente na requisição
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  
  const { pathname } = req.nextUrl;

  // Se o usuário não está autenticado e tenta acessar uma rota protegida
  if (!token && pathname !== '/login') {
    // Redireciona para a página de login
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Se o usuário está autenticado e tenta acessar a página de login, redireciona para a home
  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/home', req.url));
  }

  // Permite que a requisição continue para outras rotas
  return NextResponse.next();
}

// Configura em quais caminhos o middleware deve ser executado
export const config = {
  matcher: ['/home', '/complited', '/important', '/login']
};
