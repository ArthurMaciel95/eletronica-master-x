'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface ProductForm {
  name: string
  description: string
  price: number
  images: string[]
  category: string
  inStock: boolean
  featured: boolean
}

export default function NewProduct() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<ProductForm>({
    name: '',
    description: '',
    price: 0,
    images: [],
    category: 'Outros',
    inStock: true,
    featured: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/admin/products')
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Erro ao criar produto')
      }
    } catch (err) {
      setError('Erro ao criar produto')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof ProductForm, value: string | boolean | number | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/admin/products" className="text-gray-600 hover:text-gray-900 mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Adicionar Produto</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 gap-6">
              {/* Nome */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nome do Produto *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-500"
                  placeholder="Ex: Smartphone Galaxy S23"
                />
              </div>

              {/* Descrição */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Descrição *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-500"
                  placeholder="Descreva o produto..."
                />
              </div>

              {/* Preço */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Preço *
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">R$</span>
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.price === 0 ? '' : formData.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d,]/g, '').replace(',', '.');
                      const numValue = parseFloat(value) || 0;
                      handleInputChange('price', numValue);
                    }}
                    className="mt-1 block w-full border border-gray-300 rounded-md pl-10 px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-500"
                    placeholder="0,00"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Use vírgula como separador decimal (ex: 1.234,56)</p>
              </div>

              {/* Imagens */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  URLs das Imagens *
                </label>
                <div className="mt-1 flex gap-2">
                  <input
                    type="url"
                    id="imageUrl"
                    placeholder="https://exemplo.com/imagem.jpg"
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const input = e.target as HTMLInputElement;
                        if (input.value.trim()) {
                          handleInputChange('images', [...formData.images, input.value.trim()]);
                          input.value = '';
                        }
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById('imageUrl') as HTMLInputElement;
                      if (input.value.trim()) {
                        handleInputChange('images', [...formData.images, input.value.trim()]);
                        input.value = '';
                      }
                    }}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Adicionar
                  </button>
                </div>
                
                {/* Lista de imagens */}
                {formData.images.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-sm text-gray-600">Imagens adicionadas:</p>
                    {formData.images.map((image, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                        <img
                          src={image}
                          alt={`Preview ${index + 1}`}
                          className="w-12 h-12 object-cover rounded"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/48x48?text=Erro';
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-700 truncate">{image}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const newImages = formData.images.filter((_, i) => i !== index);
                            handleInputChange('images', newImages);
                          }}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Remover imagem"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <p className="mt-1 text-xs text-gray-500">
                  Digite a URL da imagem e pressione Enter ou clique em Adicionar
                </p>
              </div>

              {/* Categoria */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Categoria *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-500"
                >
                  <option value="Smartphones">Smartphones</option>
                  <option value="Notebooks">Notebooks</option>
                  <option value="Tablets">Tablets</option>
                  <option value="Acessórios">Acessórios</option>
                  <option value="Eletrônicos">Eletrônicos</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>

              {/* Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={formData.inStock}
                    onChange={(e) => handleInputChange('inStock', e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="inStock" className="ml-2 block text-sm text-gray-900">
                    Produto disponível
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => handleInputChange('featured', e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                    Produto em destaque
                  </label>
                </div>
              </div>
            </div>

            {/* Botões */}
            <div className="flex justify-end space-x-3 mt-6">
              <Link
                href="/admin/products"
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Criando...' : 'Criar Produto'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
} 