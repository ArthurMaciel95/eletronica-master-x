import mongoose from 'mongoose'

const SettingsSchema = new mongoose.Schema({
    siteName: {
        type: String,
        required: [true, 'Nome do site é obrigatório'],
        default: 'Antonio Store'
    },
    siteDescription: {
        type: String,
        required: [true, 'Descrição do site é obrigatória'],
        default: 'Site de e-commerce moderno e seguro'
    },
    contactEmail: {
        type: String,
        required: [true, 'Email de contato é obrigatório'],
        validate: {
            validator: function (v: string) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
            },
            message: 'Email deve ser válido'
        }
    },
    contactPhone: {
        type: String,
        required: [true, 'Telefone de contato é obrigatório']
    },
    contactAddress: {
        type: String,
        required: [true, 'Endereço é obrigatório']
    },
    whatsappNumber: {
        type: String,
        required: [true, 'Número do WhatsApp é obrigatório'],
        validate: {
            validator: function (v: string) {
                return /^\d+$/.test(v)
            },
            message: 'Número do WhatsApp deve conter apenas dígitos'
        }
    },
    companyDescription: {
        type: String,
        required: [true, 'Descrição da empresa é obrigatória']
    },
    socialMedia: {
        facebook: String,
        instagram: String,
        twitter: String
    }
}, {
    timestamps: true
})

// Garantir que só existe uma configuração
SettingsSchema.index({}, { unique: true })

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema) 