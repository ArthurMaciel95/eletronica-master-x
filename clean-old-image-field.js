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
    images: {
        type: [String],
        required: [true, 'Pelo menos uma imagem é obrigatória'],
        validate: {
            validator: function (arr) {
                return Array.isArray(arr) && arr.length > 0
            },
            message: 'Pelo menos uma imagem é obrigatória'
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

async function cleanOldImageField() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado ao MongoDB');

    // Remover o campo 'image' antigo de todos os produtos
    const result = await Product.updateMany(
      { image: { $exists: true } },
      { $unset: { image: 1 } }
    );

    console.log(`Campo 'image' removido de ${result.modifiedCount} produtos`);

    // Verificar se há produtos sem campo 'images'
    const productsWithoutImages = await Product.find({ 
      $or: [
        { images: { $exists: false } },
        { images: { $size: 0 } }
      ]
    });

    if (productsWithoutImages.length > 0) {
      console.log(`Encontrados ${productsWithoutImages.length} produtos sem imagens`);
      for (const product of productsWithoutImages) {
        await Product.findByIdAndUpdate(product._id, {
          $set: { images: ['https://via.placeholder.com/400x300?text=Sem+Imagem'] }
        });
        console.log(`Adicionada imagem padrão para: ${product.name}`);
      }
    }

    console.log('Limpeza concluída!');
  } catch (error) {
    console.error('Erro na limpeza:', error);
  } finally {
    await mongoose.disconnect();
  }
}

cleanOldImageField(); 