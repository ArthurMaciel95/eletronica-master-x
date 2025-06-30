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
                return Array.isArray(arr) && arr.length > 0 && arr.every(v => /^https?:\/\/.+/.test(v))
            },
            message: 'Todas as imagens devem ser URLs válidas'
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

async function cleanPlaceholderImages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado ao MongoDB');

    // Buscar produtos que têm URLs de placeholder
    const productsWithPlaceholders = await Product.find({
      $or: [
        { images: { $elemMatch: { $regex: /via\.placeholder\.com/ } } },
        { images: { $elemMatch: { $regex: /placeholder/ } } }
      ]
    });

    console.log(`Encontrados ${productsWithPlaceholders.length} produtos com URLs de placeholder`);

    for (const product of productsWithPlaceholders) {
      // Filtrar URLs de placeholder
      const cleanImages = product.images.filter(img => {
        if (!img || typeof img !== 'string') return false;
        if (img.includes('via.placeholder.com')) return false;
        if (img.includes('placeholder')) return false;
        return true;
      });

      if (cleanImages.length === 0) {
        // Se não sobrou nenhuma imagem válida, adicionar uma imagem padrão real
        cleanImages.push('https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop');
        console.log(`Produto ${product.name} não tinha imagens válidas, adicionada imagem padrão`);
      }

      await Product.findByIdAndUpdate(product._id, {
        $set: { images: cleanImages }
      });

      console.log(`Limpo produto: ${product.name} - ${product.images.length} -> ${cleanImages.length} imagens`);
    }

    console.log('Limpeza de URLs de placeholder concluída!');
  } catch (error) {
    console.error('Erro na limpeza:', error);
  } finally {
    await mongoose.disconnect();
  }
}

cleanPlaceholderImages(); 