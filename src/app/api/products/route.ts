import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Product from '@/models/Product'

export async function GET() {
    try {
        await dbConnect()
        const products = await Product.find({}).sort({ createdAt: -1 })

        // Converter produtos que ainda têm o campo 'image' antigo
        const convertedProducts = products.map(product => {
            const productData = product.toObject()

            // Se o produto ainda tem o campo 'image' antigo, converter para 'images'
            if (productData.image && (!productData.images || !Array.isArray(productData.images))) {
                productData.images = [productData.image]
            }

            return productData
        })

        return NextResponse.json(convertedProducts)
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

        const product = await Product.create({
            name,
            description,
            price,
            images: validImages,
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