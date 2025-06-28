import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/src/lib/mongodb'
import Settings from '@/src/models/Settings'

export async function GET() {
    try {
        await dbConnect()
        let settings = await Settings.findOne()

        // Se não existir configuração, criar uma padrão
        if (!settings) {
            settings = await Settings.create({
                siteName: 'Antonio Store',
                siteDescription: 'Site de e-commerce moderno e seguro',
                contactEmail: 'contato@antonio.com',
                contactPhone: '(11) 99999-9999',
                contactAddress: 'São Paulo, SP',
                whatsappNumber: '5511999999999',
                companyDescription: 'Sua loja de confiança para produtos de tecnologia de alta qualidade. Oferecemos os melhores preços e garantia de satisfação.'
            })
        }

        return NextResponse.json(settings)
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao buscar configurações' },
            { status: 500 }
        )
    }
}

export async function PUT(request: NextRequest) {
    try {
        await dbConnect()
        const body = await request.json()

        let settings = await Settings.findOne()

        if (settings) {
            // Atualizar configuração existente
            settings = await Settings.findOneAndUpdate({}, body, {
                new: true,
                runValidators: true
            })
        } else {
            // Criar nova configuração
            settings = await Settings.create(body)
        }

        return NextResponse.json(settings)
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map((err: any) => err.message)
            return NextResponse.json(
                { error: 'Erro de validação', details: errors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: 'Erro ao salvar configurações' },
            { status: 500 }
        )
    }
} 