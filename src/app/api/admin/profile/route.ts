import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import Admin from '@/models/Admin'
import jwt from 'jsonwebtoken'

// Função para verificar o token JWT
const verifyToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret')
        return decoded
    } catch (error) {
        return null
    }
}

// GET - Buscar perfil do admin
export async function GET(request: NextRequest) {
    try {
        await connectToDatabase()

        // Verificar token de autorização
        const authHeader = request.headers.get('authorization')
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ message: 'Token de autorização não fornecido' }, { status: 401 })
        }

        const token = authHeader.substring(7)
        const decoded = verifyToken(token)

        if (!decoded || typeof decoded === 'string') {
            return NextResponse.json({ message: 'Token inválido' }, { status: 401 })
        }

        // Buscar admin pelo ID do token
        const admin = await Admin.findById(decoded.adminId).select('-password')

        if (!admin) {
            return NextResponse.json({ message: 'Admin não encontrado' }, { status: 404 })
        }

        if (!admin.active) {
            return NextResponse.json({ message: 'Conta desativada' }, { status: 403 })
        }

        return NextResponse.json(admin)
    } catch (error) {
        console.error('Erro ao buscar perfil:', error)
        return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 })
    }
}

// PUT - Atualizar perfil do admin
export async function PUT(request: NextRequest) {
    try {
        await connectToDatabase()

        // Verificar token de autorização
        const authHeader = request.headers.get('authorization')
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ message: 'Token de autorização não fornecido' }, { status: 401 })
        }

        const token = authHeader.substring(7)
        const decoded = verifyToken(token)

        if (!decoded || typeof decoded === 'string') {
            return NextResponse.json({ message: 'Token inválido' }, { status: 401 })
        }

        const body = await request.json()
        const { name, email } = body

        // Validações
        if (!name || !email) {
            return NextResponse.json({ message: 'Nome e email são obrigatórios' }, { status: 400 })
        }

        if (name.trim().length < 2) {
            return NextResponse.json({ message: 'Nome deve ter pelo menos 2 caracteres' }, { status: 400 })
        }

        if (name.trim().length > 100) {
            return NextResponse.json({ message: 'Nome não pode ter mais que 100 caracteres' }, { status: 400 })
        }

        // Validar formato do email
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json({ message: 'Email inválido' }, { status: 400 })
        }

        // Verificar se o email já existe (exceto para o admin atual)
        const existingAdmin = await Admin.findOne({
            email: email.toLowerCase(),
            _id: { $ne: decoded.adminId }
        })

        if (existingAdmin) {
            return NextResponse.json({ message: 'Este email já está em uso' }, { status: 400 })
        }

        // Buscar e atualizar admin
        const admin = await Admin.findById(decoded.adminId)

        if (!admin) {
            return NextResponse.json({ message: 'Admin não encontrado' }, { status: 404 })
        }

        if (!admin.active) {
            return NextResponse.json({ message: 'Conta desativada' }, { status: 403 })
        }

        // Atualizar campos
        admin.name = name.trim()
        admin.email = email.toLowerCase().trim()

        await admin.save()

        // Retornar dados sem senha
        const adminResponse = admin.toObject()
        delete adminResponse.password

        return NextResponse.json({
            message: 'Perfil atualizado com sucesso',
            admin: adminResponse
        })
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error)
        return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 })
    }
} 