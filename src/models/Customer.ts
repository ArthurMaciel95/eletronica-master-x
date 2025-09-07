import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomer extends Document {
    name: string;
    email: string;
    cpfCnpj: string;
    phone?: string;
    address?: any;
    asaasId: string;
    passwordHash?: string;
}

const CustomerSchema = new Schema<ICustomer>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    cpfCnpj: { type: String, required: true },
    phone: { type: String },
    address: { type: Schema.Types.Mixed }, // city será salvo dentro de address
    asaasId: { type: String, required: true },
    passwordHash: { type: String },
}, { timestamps: true });

export default mongoose.models.Customer || mongoose.model<ICustomer>('Customer', CustomerSchema);
