import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { email, password } = body

        // Credenciais hardcoded para demonstração
        // Em produção, você deve usar um banco de dados e hash de senha
        const validCredentials = {
            email: 'admin@antonio.com',
            password: 'admin123'
        }

        if (email === validCredentials.email && password === validCredentials.password) {
            // Gerar token simples (em produção, use JWT)
            const token = 'valid-admin-token'

            const response = NextResponse.json({
                success: true,
                message: 'Login realizado com sucesso',
                token: token
            })

            // Definir cookie com o token
            response.cookies.set('adminToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7 // 7 dias
            })

            return response
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Email ou senha incorretos'
                },
                { status: 401 }
            )
        }
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: 'Erro interno do servidor'
            },
            { status: 500 }
        )
    }
} 