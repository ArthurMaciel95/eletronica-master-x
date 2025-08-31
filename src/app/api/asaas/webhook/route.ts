import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const event = await req.json();
        // Aqui você pode tratar o evento recebido do Asaas
        // Exemplo: salvar status do pagamento, atualizar pedido, etc.
        console.log('Webhook Asaas recebido:', event);
        // Sempre responda 200 para o Asaas saber que recebeu
        return NextResponse.json({ received: true });
    } catch (err) {
        return NextResponse.json({ error: 'Erro ao processar webhook.' }, { status: 500 });
    }
}
