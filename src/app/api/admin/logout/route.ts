import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const response = NextResponse.json({
            success: true,
            message: 'Logout realizado com sucesso'
        })

        // Remover o cookie de autenticação
        response.cookies.set('adminToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0, // Expira imediatamente
            expires: new Date(0) // Força expiração
        })

        return response

    } catch (error: any) {
        console.error('Erro no logout:', error)
        return NextResponse.json(
            {
                success: false,
                message: 'Erro interno do servidor'
            },
            { status: 500 }
        )
    }
} 