import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Customer from '@/models/Customer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'xmaster_secret';

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();
        if (!email || !password) {
            return NextResponse.json({ error: 'E-mail e senha são obrigatórios.' }, { status: 400 });
        }
        await dbConnect();
        const user = await Customer.findOne({ email });
        if (!user || !user.passwordHash) {
            return NextResponse.json({ error: 'Usuário ou senha inválidos.' }, { status: 401 });
        }
        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) {
            return NextResponse.json({ error: 'Usuário ou senha inválidos.' }, { status: 401 });
        }
        // Gera token JWT
        const token = jwt.sign({ id: user.asaasId, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
        // Retorna dados do cliente + token
        return NextResponse.json({
            token,
            cliente: {
                id: user.asaasId,
                name: user.name,
                email: user.email,
                cpfCnpj: user.cpfCnpj,
                phone: user.phone,
                address: user.address,
            }
        });
    } catch (err) {
        return NextResponse.json({ error: 'Erro ao realizar login.' }, { status: 500 });
    }
}
