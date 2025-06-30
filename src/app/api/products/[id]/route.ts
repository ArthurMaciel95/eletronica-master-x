import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Product from '@/models/Product'

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

        // Converter para o formato esperado pelo frontend
        const productData = product.toObject()

        // Se o produto ainda tem o campo 'image' antigo, converter para 'images'
        if (productData.image && (!productData.images || !Array.isArray(productData.images))) {
            productData.images = [productData.image]
        }

        return NextResponse.json(productData)
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

        const { name, description, price, images, category, inStock, featured } = body

        if (!name || !description || !images || !Array.isArray(images) || images.length === 0 || price === undefined) {
            return NextResponse.json(
                { error: 'Nome, descrição, imagens e preço são obrigatórios' },
                { status: 400 }
            )
        }

        // Validar apenas se é uma string não vazia
        const validImages = images.filter((img: string) => {
            return img && typeof img === 'string' && img.trim() !== '';
        });

        if (validImages.length === 0) {
            return NextResponse.json(
                { error: 'Pelo menos uma imagem é obrigatória' },
                { status: 400 }
            )
        }

        if (price < 0) {
            return NextResponse.json(
                { error: 'Preço não pode ser negativo' },
                { status: 400 }
            )
        }

        const product = await Product.findByIdAndUpdate(
            params.id,
            {
                name,
                description,
                price,
                images: validImages,
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