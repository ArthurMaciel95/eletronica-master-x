import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/src/lib/mongodb'
import Product from '@/src/models/Product'

export async function GET() {
    try {
        await dbConnect()
        const products = await Product.find({}).sort({ createdAt: -1 })
        return NextResponse.json(products)
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Erro ao buscar produtos' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect()
        const body = await request.json()

        const { name, description, image, category, inStock, featured } = body

        if (!name || !description || !image) {
            return NextResponse.json(
                { error: 'Nome, descrição e imagem são obrigatórios' },
                { status: 400 }
            )
        }

        const product = await Product.create({
            name,
            description,
            image,
            category: category || 'Outros',
            inStock: inStock !== undefined ? inStock : true,
            featured: featured || false
        })

        return NextResponse.json(product, { status: 201 })
    } catch (error: any) {
        console.error('Erro ao criar produto:', error)
        return NextResponse.json(
            { error: 'Erro ao criar produto' },
            { status: 500 }
        )
    }
} 