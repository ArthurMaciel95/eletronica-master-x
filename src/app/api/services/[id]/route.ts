import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/src/lib/mongodb'
import Service from '@/src/models/Service'

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect()
        const service = await Service.findById(params.id)

        if (!service) {
            return NextResponse.json(
                { error: 'Serviço não encontrado' },
                { status: 404 }
            )
        }

        return NextResponse.json(service)
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao buscar serviço' },
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

        const service = await Service.findByIdAndUpdate(
            params.id,
            body,
            { new: true, runValidators: true }
        )

        if (!service) {
            return NextResponse.json(
                { error: 'Serviço não encontrado' },
                { status: 404 }
            )
        }

        return NextResponse.json(service)
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map((err: any) => err.message)
            return NextResponse.json(
                { error: 'Erro de validação', details: errors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: 'Erro ao atualizar serviço' },
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
        const service = await Service.findByIdAndDelete(params.id)

        if (!service) {
            return NextResponse.json(
                { error: 'Serviço não encontrado' },
                { status: 404 }
            )
        }

        return NextResponse.json({ message: 'Serviço excluído com sucesso' })
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao excluir serviço' },
            { status: 500 }
        )
    }
} 