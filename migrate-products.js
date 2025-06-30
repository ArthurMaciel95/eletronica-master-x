require('dotenv').config();
const mongoose = require('mongoose');

// Schema do produto (copiado do modelo)
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
    price: {
        type: Number,
        required: [true, 'Preço do produto é obrigatório'],
        min: [0, 'Preço não pode ser negativo'],
        validate: {
            validator: function(v) {
                return v >= 0
            },
            message: 'Preço deve ser um valor positivo'
        }
    },
    image: {
        type: String,
        required: [true, 'URL da imagem é obrigatória'],
        validate: {
            validator: function (v) {
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
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

async function migrateProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado ao MongoDB');

    // Atualizar produtos que não têm o campo price
    const result = await Product.updateMany(
      { price: { $exists: false } },
      { $set: { price: 0 } }
    );

    console.log(`Migração concluída: ${result.modifiedCount} produtos atualizados`);
  } catch (error) {
    console.error('Erro na migração:', error);
  } finally {
    await mongoose.disconnect();
  }
}

migrateProducts(); 