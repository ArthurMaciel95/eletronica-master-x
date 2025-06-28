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

        // Validar formato do token dinâmico
        try {
            // Verificar se o token tem o formato correto: admin-token-{id}-{timestamp}
            if (token.startsWith('admin-token-') && token.includes('-')) {
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