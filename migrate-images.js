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

async function migrateImages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado ao MongoDB');

    // Buscar produtos que ainda têm o campo 'image' (string)
    const productsWithOldImage = await Product.find({ image: { $exists: true } });
    console.log(`Encontrados ${productsWithOldImage.length} produtos com campo 'image' antigo`);

    for (const product of productsWithOldImage) {
      // Converter image (string) para images (array)
      const oldImage = product.image;
      if (oldImage && typeof oldImage === 'string') {
        await Product.findByIdAndUpdate(product._id, {
          $set: { images: [oldImage] },
          $unset: { image: 1 }
        });
        console.log(`Migrado produto: ${product.name} - image: "${oldImage}" -> images: ["${oldImage}"]`);
      }
    }

    // Verificar se há produtos sem campo 'images'
    const productsWithoutImages = await Product.find({ 
      $or: [
        { images: { $exists: false } },
        { images: { $size: 0 } }
      ]
    });

    if (productsWithoutImages.length > 0) {
      console.log(`Encontrados ${productsWithoutImages.length} produtos sem imagens, adicionando imagem padrão`);
      for (const product of productsWithoutImages) {
        await Product.findByIdAndUpdate(product._id, {
          $set: { images: ['https://via.placeholder.com/400x300?text=Sem+Imagem'] }
        });
        console.log(`Adicionada imagem padrão para: ${product.name}`);
      }
    }

    console.log('Migração de imagens concluída!');
  } catch (error) {
    console.error('Erro na migração:', error);
  } finally {
    await mongoose.disconnect();
  }
}

migrateImages(); 