import { NextRequest, NextResponse } from 'next/server';

// Use sua chave de API do Asaas em .env.local
const ASAAS_API_KEY = '$aact_hmlg_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OjY0ZWU3MWE5LWEyMzQtNDhmZi05MTIwLTA4N2Q3ZDg4Y2ZhNjo6JGFhY2hfNWQxYTc4NDMtYTQyNC00NThlLTg3MjktMzYzMDI1MTI1ZmMx';
const ASAAS_API_URL = 'https://api.asaas.com/v3/pix/addressKeys';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        // Espera: { type, cpfCnpj, accountId }
        const { type, cpfCnpj, accountId } = body;
        if (!type || !cpfCnpj || !accountId) {
            return NextResponse.json({ error: 'Dados obrigatórios ausentes.' }, { status: 400 });
        }
        const response = await fetch(ASAAS_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'access_token': ASAAS_API_KEY || '',
            },
            body: JSON.stringify({
                type: 'EVP'
            }),
        });
        const data = await response.json();
        if (!response.ok) {
            return NextResponse.json({ error: data }, { status: 400 });
        }
        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ error: 'Erro ao criar chave Pix.' }, { status: 500 });
    }
}
