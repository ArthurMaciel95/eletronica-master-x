import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/src/lib/mongodb'
import Brand from '@/src/models/Brand'

export async function GET() {
    try {
        await dbConnect()
        const brands = await Brand.find({ active: true }).sort({ order: 1, createdAt: -1 })
        return NextResponse.json(brands)
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao buscar marcas' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect()
        const body = await request.json()

        const brand = await Brand.create(body)
        return NextResponse.json(brand, { status: 201 })
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map((err: any) => err.message)
            return NextResponse.json(
                { error: 'Erro de validação', details: errors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: 'Erro ao criar marca' },
            { status: 500 }
        )
    }
} 