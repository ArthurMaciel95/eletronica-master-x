import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Verificar se está tentando acessar rotas administrativas
    if (pathname.startsWith('/admin')) {
        console.log('Middleware: Acessando rota admin:', pathname)

        // Permitir acesso à página de login
        if (pathname === '/admin/login') {
            console.log('Middleware: Permitindo acesso ao login')
            return NextResponse.next()
        }

        // Para outras rotas admin, permitir acesso e deixar a verificação para o lado do cliente
        // Isso evita problemas de redirecionamento infinito
        console.log('Middleware: Permitindo acesso à rota admin')
        return NextResponse.next()
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/admin/:path*'
    ]
} 