import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

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

        // Validar token JWT
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret')

            // Verificar se o token tem as propriedades necessárias
            if (decoded && typeof decoded === 'object' && 'adminId' in decoded) {
                return NextResponse.next()
            } else {
                return NextResponse.redirect(new URL('/admin/login', request.url))
            }
        } catch (error) {
            // Token inválido ou expirado
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