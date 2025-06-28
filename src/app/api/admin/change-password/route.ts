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

// POST - Alterar senha do admin
export async function POST(request: NextRequest) {
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
        const { currentPassword, newPassword } = body

        // Validações
        if (!currentPassword || !newPassword) {
            return NextResponse.json({ message: 'Senha atual e nova senha são obrigatórias' }, { status: 400 })
        }

        if (newPassword.length < 6) {
            return NextResponse.json({ message: 'A nova senha deve ter pelo menos 6 caracteres' }, { status: 400 })
        }

        if (currentPassword === newPassword) {
            return NextResponse.json({ message: 'A nova senha deve ser diferente da senha atual' }, { status: 400 })
        }

        // Buscar admin
        const admin = await Admin.findById(decoded.adminId)

        if (!admin) {
            return NextResponse.json({ message: 'Admin não encontrado' }, { status: 404 })
        }

        if (!admin.active) {
            return NextResponse.json({ message: 'Conta desativada' }, { status: 403 })
        }

        // Verificar senha atual
        const isCurrentPasswordValid = await admin.comparePassword(currentPassword)
        if (!isCurrentPasswordValid) {
            return NextResponse.json({ message: 'Senha atual incorreta' }, { status: 400 })
        }

        // Atualizar senha
        admin.password = newPassword
        await admin.save()

        return NextResponse.json({ message: 'Senha alterada com sucesso' })
    } catch (error) {
        console.error('Erro ao alterar senha:', error)
        return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 })
    }
} 