import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Verificar se está tentando acessar rotas administrativas
    if (pathname.startsWith('/admin')) {
        // Permitir acesso à página de login
        if (pathname === '/admin/login') {
            return NextResponse.next()
        }

        // Verificar token de autenticação
        const token = request.cookies.get('adminToken')?.value ||
            request.headers.get('authorization')?.replace('Bearer ', '')

        if (!token) {
            // Redirecionar para login se não tiver token
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }

        // Aqui você pode adicionar validação adicional do token
        // Por exemplo, verificar se o token é válido no servidor
        try {
            // Simular validação do token (em produção, você validaria com JWT)
            if (token === 'valid-admin-token') {
                return NextResponse.next()
            } else {
                return NextResponse.redirect(new URL('/admin/login', request.url))
            }
        } catch (error) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/admin/:path*'
    ]
} 