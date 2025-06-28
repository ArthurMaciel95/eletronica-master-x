import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Service from '@/models/Service'

export async function GET() {
    try {
        await dbConnect()
        const services = await Service.find({ active: true }).sort({ order: 1, createdAt: -1 })
        return NextResponse.json(services)
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao buscar serviços' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect()
        const body = await request.json()

        const service = await Service.create(body)
        return NextResponse.json(service, { status: 201 })
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map((err: any) => err.message)
            return NextResponse.json(
                { error: 'Erro de validação', details: errors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: 'Erro ao criar serviço' },
            { status: 500 }
        )
    }
} 