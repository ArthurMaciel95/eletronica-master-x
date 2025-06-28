import { NextResponse } from 'next/server'
import dbConnect from '@/src/lib/mongodb'
import Product from '@/src/models/Product'
import Service from '@/src/models/Service'
import Settings from '@/src/models/Settings'

export async function GET() {
    try {
        // Testar conexão
        await dbConnect()

        // Verificar se existem produtos
        const productsCount = await Product.countDocuments()

        // Verificar se existem serviços
        const servicesCount = await Service.countDocuments()

        // Verificar se existem configurações
        const settingsCount = await Settings.countDocuments()

        // Criar configuração padrão se não existir
        if (settingsCount === 0) {
            await Settings.create({
                siteName: 'Antonio Store',
                siteDescription: 'Catálogo de produtos e serviços de tecnologia',
                contactEmail: 'contato@antonio.com',
                contactPhone: '(11) 99999-9999',
                contactAddress: 'São Paulo, SP',
                whatsappNumber: '5511999999999',
                companyDescription: 'Especialistas em tecnologia com anos de experiência no mercado. Oferecemos produtos de qualidade e serviços especializados.'
            })
        }

        // Criar produtos de exemplo se não existirem
        if (productsCount === 0) {
            await Product.create([
                {
                    name: "Smartphone Galaxy S23",
                    description: "O mais recente smartphone Samsung com câmera de 108MP e processador Snapdragon 8 Gen 2.",
                    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
                    category: "Smartphones",
                    inStock: true,
                    featured: true
                },
                {
                    name: "Notebook Dell Inspiron",
                    description: "Notebook potente com Intel i7, 16GB RAM e SSD de 512GB para trabalho e estudos.",
                    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
                    category: "Notebooks",
                    inStock: true,
                    featured: false
                },
                {
                    name: "Fones de Ouvido Sony WH-1000XM4",
                    description: "Fones de ouvido com cancelamento de ruído ativo e até 30 horas de bateria.",
                    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
                    category: "Acessórios",
                    inStock: true,
                    featured: false
                }
            ])
        }

        // Criar serviços de exemplo se não existirem
        if (servicesCount === 0) {
            await Service.create([
                {
                    title: "Conserto de TVs",
                    description: "Reparo especializado em TVs de todas as marcas, incluindo Smart TVs, 4K e OLED.",
                    features: [
                        "Diagnóstico gratuito",
                        "Garantia de 90 dias",
                        "Peças originais"
                    ],
                    icon: "tv",
                    active: true,
                    order: 1
                },
                {
                    title: "Manutenção de Smartphones",
                    description: "Conserto de smartphones e tablets com técnicos certificados e peças de qualidade.",
                    features: [
                        "Troca de tela",
                        "Substituição de bateria",
                        "Reparo de placa"
                    ],
                    icon: "smartphone",
                    active: true,
                    order: 2
                },
                {
                    title: "Reparo de Eletrônicos",
                    description: "Serviços de manutenção para diversos equipamentos eletrônicos domésticos.",
                    features: [
                        "Sistemas de som",
                        "Videogames",
                        "Eletrodomésticos"
                    ],
                    icon: "electronics",
                    active: true,
                    order: 3
                }
            ])
        }

        return NextResponse.json({
            success: true,
            message: 'Conexão com MongoDB estabelecida com sucesso!',
            data: {
                productsCount: await Product.countDocuments(),
                servicesCount: await Service.countDocuments(),
                settingsCount: await Settings.countDocuments(),
                connection: 'OK'
            }
        })

    } catch (error: any) {
        console.error('Erro na conexão com MongoDB:', error)

        return NextResponse.json({
            success: false,
            error: 'Erro na conexão com MongoDB',
            details: error.message,
            solution: 'Verifique se o arquivo .env.local está configurado com MONGODB_URI'
        }, { status: 500 })
    }
} 