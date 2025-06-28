import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/src/lib/mongodb'
import Product from '@/src/models/Product'

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect()
        const product = await Product.findById(params.id)

        if (!product) {
            return NextResponse.json(
                { error: 'Produto não encontrado' },
                { status: 404 }
            )
        }

        return NextResponse.json(product)
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Erro ao buscar produto' },
            { status: 500 }
        )
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
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

        const product = await Product.findByIdAndUpdate(
            params.id,
            {
                name,
                description,
                image,
                category: category || 'Outros',
                inStock: inStock !== undefined ? inStock : true,
                featured: featured || false
            },
            { new: true, runValidators: true }
        )

        if (!product) {
            return NextResponse.json(
                { error: 'Produto não encontrado' },
                { status: 404 }
            )
        }

        return NextResponse.json(product)
    } catch (error: any) {
        console.error('Erro ao atualizar produto:', error)
        return NextResponse.json(
            { error: 'Erro ao atualizar produto' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect()
        const product = await Product.findByIdAndDelete(params.id)

        if (!product) {
            return NextResponse.json(
                { error: 'Produto não encontrado' },
                { status: 404 }
            )
        }

        return NextResponse.json({ message: 'Produto deletado com sucesso' })
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Erro ao deletar produto' },
            { status: 500 }
        )
    }
} 