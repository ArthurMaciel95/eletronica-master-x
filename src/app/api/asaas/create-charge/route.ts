import { NextRequest, NextResponse } from 'next/server';

// Defina sua API KEY do Asaas no .env.local como ASAAS_API_KEY
const ASAAS_API_KEY = '$aact_hmlg_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OmE5NjM3YTE2LTZlNzEtNDUwMy04NzI2LWM2ZWI1YTdjODkyZTo6JGFhY2hfNTM1OTUyNjAtNzVhNi00MWVhLThlYmUtYjk4MGQ0Y2M1NDZi';

// Sandbox: https://api-sandbox.asaas.com/v3
// Produção: https://api.asaas.com/v3
const ASAAS_API_URL = 'https://api-sandbox.asaas.com/v3/payments';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        // Espera: { customer, value, description }
        const { customer, value, description } = body;

        if (!customer || !value) {
            return NextResponse.json({ error: 'Dados obrigatórios ausentes.' }, { status: 400 });
        }
        console.log(ASAAS_API_KEY)
        const response = await fetch(ASAAS_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'eletronica-master-x',
                'access_token': ASAAS_API_KEY || '',
            },
            body: JSON.stringify({
                customer,
                billingType: 'PIX',
                value,
                description: description || 'Pagamento via Pix',
                dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
            }),
        });

        const data = await response.json();
        if (!response.ok) {
            return NextResponse.json({ error: data }, { status: 400 });
        }
        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ error: 'Erro ao criar cobrança.' }, { status: 500 });
    }
}
