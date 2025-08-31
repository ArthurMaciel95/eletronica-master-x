
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Customer from '@/models/Customer';
import bcrypt from 'bcryptjs';

const ASAAS_API_KEY = '$aact_hmlg_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OmE5NjM3YTE2LTZlNzEtNDUwMy04NzI2LWM2ZWI1YTdjODkyZTo6JGFhY2hfNTM1OTUyNjAtNzVhNi00MWVhLThlYmUtYjk4MGQ0Y2M1NDZi';
// Sandbox: https://api-sandbox.asaas.com/v3
// Produção: https://api.asaas.com/v3
const ASAAS_API_URL = 'https://api-sandbox.asaas.com/v3/customers';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Todos os campos possíveis do Asaas
        const {
            name,
            cpfCnpj,
            email,
            phone,
            address,
            addressNumber,
            complement,
            province,
            postalCode,
            password,
        } = body;

        if (!name || !cpfCnpj) {
            return NextResponse.json({ error: 'Nome e CPF/CNPJ são obrigatórios.' }, { status: 400 });
        }
        if (!password) {
            return NextResponse.json({ error: 'Senha é obrigatória.' }, { status: 400 });
        }
        // Cria cliente no Asaas
        const response = await fetch(ASAAS_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'eletronica-master-x',
                'access_token': ASAAS_API_KEY || '',
            },
            body: JSON.stringify({
                name,
                cpfCnpj,
                email,
                phone,

                address,
                addressNumber,
                complement,
                province,
                postalCode,
            }),
        });

        const data = await response.json();
        if (!response.ok) {
            return NextResponse.json({ error: data }, { status: 400 });
        }


        // Salva os dados principais no MongoDB, garantindo o campo asaasId e passwordHash
        await dbConnect();
        let passwordHash = undefined;
        if (password) {
            passwordHash = await bcrypt.hash(password, 10);
        }
        await Customer.create({
            name: data.name,
            email: data.email,
            cpfCnpj: data.cpfCnpj,
            phone: data.phone || '',
            address: {
                address: data.address,
                addressNumber: data.addressNumber,
                complement: data.complement,
                province: data.province,
                postalCode: data.postalCode,
                city: data.cityName,
                state: data.state,
                country: data.country,
            },
            asaasId: data.id,
            passwordHash,
        });

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}
