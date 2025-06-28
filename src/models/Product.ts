import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nome do produto é obrigatório'],
        trim: true,
        maxlength: [100, 'Nome não pode ter mais que 100 caracteres']
    },
    description: {
        type: String,
        required: [true, 'Descrição do produto é obrigatória'],
        maxlength: [500, 'Descrição não pode ter mais que 500 caracteres']
    },
    image: {
        type: String,
        required: [true, 'URL da imagem é obrigatória'],
        validate: {
            validator: function (v: string) {
                return /^https?:\/\/.+/.test(v)
            },
            message: 'URL da imagem deve ser válida'
        }
    },
    category: {
        type: String,
        required: [true, 'Categoria é obrigatória'],
        enum: ['Smartphones', 'Notebooks', 'Tablets', 'Acessórios', 'Eletrônicos', 'Outros'],
        default: 'Outros'
    },
    inStock: {
        type: Boolean,
        default: true
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

export default mongoose.models.Product || mongoose.model('Product', ProductSchema) 