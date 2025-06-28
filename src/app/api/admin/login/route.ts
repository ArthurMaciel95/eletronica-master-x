import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/src/lib/mongodb'
import Admin from '@/src/models/Admin'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
    try {
        await dbConnect()
        const body = await request.json()
        const { email, password } = body

        if (!email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Email e senha são obrigatórios'
                },
                { status: 400 }
            )
        }

        // Buscar admin no banco de dados
        const admin = await Admin.findOne({ email: email.toLowerCase(), active: true })

        if (!admin) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Email ou senha incorretos'
                },
                { status: 401 }
            )
        }

        // Verificar senha
        const isPasswordValid = await admin.comparePassword(password)

        if (!isPasswordValid) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Email ou senha incorretos'
                },
                { status: 401 }
            )
        }

        // Atualizar último login
        admin.lastLogin = new Date()
        await admin.save()

        // Gerar JWT token
        const token = jwt.sign(
            {
                adminId: admin._id,
                email: admin.email,
                role: admin.role
            },
            process.env.JWT_SECRET || 'fallback-secret',
            { expiresIn: '7d' }
        )

        const response = NextResponse.json({
            success: true,
            message: 'Login realizado com sucesso',
            user: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            },
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

    } catch (error: any) {
        console.error('Erro no login:', error)
        return NextResponse.json(
            {
                success: false,
                message: 'Erro interno do servidor'
            },
            { status: 500 }
        )
    }
} 