import mongoose from 'mongoose'

const ServiceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Título do serviço é obrigatório'],
        trim: true,
        maxlength: [100, 'Título não pode ter mais que 100 caracteres']
    },
    description: {
        type: String,
        required: [true, 'Descrição do serviço é obrigatória'],
        maxlength: [500, 'Descrição não pode ter mais que 500 caracteres']
    },
    features: [{
        type: String,
        required: [true, 'Cada feature é obrigatória'],
        maxlength: [100, 'Feature não pode ter mais que 100 caracteres']
    }],
    icon: {
        type: String,
        required: [true, 'Ícone do serviço é obrigatório'],
        enum: ['tv', 'smartphone', 'electronics', 'computer', 'camera', 'headphones'],
        default: 'electronics'
    },
    active: {
        type: Boolean,
        default: true
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema) 