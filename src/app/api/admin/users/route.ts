import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Admin from '@/models/Admin'

export async function GET() {
    try {
        await dbConnect()
        const admins = await Admin.find({}).select('-password').sort({ createdAt: -1 })
        return NextResponse.json(admins)
    } catch (error: any) {
        console.error('Erro ao buscar admins:', error)
        return NextResponse.json(
            { error: 'Erro ao buscar usuários admin' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect()
        const body = await request.json()

        const { name, email, password, role } = body

        if (!name || !email || !password) {
            return NextResponse.json(
                { error: 'Nome, email e senha são obrigatórios' },
                { status: 400 }
            )
        }

        // Verificar se email já existe
        const existingAdmin = await Admin.findOne({ email: email.toLowerCase() })
        if (existingAdmin) {
            return NextResponse.json(
                { error: 'Email já está em uso' },
                { status: 400 }
            )
        }

        const admin = await Admin.create({
            name,
            email: email.toLowerCase(),
            password,
            role: role || 'admin'
        })

        return NextResponse.json(admin, { status: 201 })
    } catch (error: any) {
        console.error('Erro ao criar admin:', error)
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map((err: any) => err.message)
            return NextResponse.json(
                { error: 'Erro de validação', details: errors },
                { status: 400 }
            )
        }
        return NextResponse.json(
            { error: 'Erro ao criar usuário admin' },
            { status: 500 }
        )
    }
} 