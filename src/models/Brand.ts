import mongoose from 'mongoose'

const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nome da marca é obrigatório'],
        trim: true,
        maxlength: [50, 'Nome não pode ter mais que 50 caracteres']
    },
    logo: {
        type: String,
        required: [true, 'URL do logo é obrigatória'],
        validate: {
            validator: function (v: string) {
                return /^https?:\/\/.+/.test(v)
            },
            message: 'URL do logo deve ser válida'
        }
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

export default mongoose.models.Brand || mongoose.model('Brand', BrandSchema) 