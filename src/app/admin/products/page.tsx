'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Product {
  _id: string
  name: string
  description: string
  image: string
  category: string
  inStock: boolean
  featured: boolean
  createdAt: string
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      } else {
        setError('Erro ao carregar produtos')
      }
    } catch (err) {
      setError('Erro ao carregar produtos')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) {
      return
    }

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setProducts(products.filter(product => product._id !== id))
      } else {
        alert('Erro ao excluir produto')
      }
    } catch (err) {
      alert('Erro ao excluir produto')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/admin/dashboard" className="text-gray-600 hover:text-gray-900 mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Gerenciar Produtos</h1>
            </div>
            <Link
              href="/admin/products/new"
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Adicionar Produto
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando produtos...</p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {products.map((product) => (
                <li key={product._id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center mt-1 space-x-2">
                          <span className="text-xs text-primary-600 font-medium">
                            {product.category}
                          </span>
                          {product.featured && (
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                              Destaque
                            </span>
                          )}
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              product.inStock
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {product.inStock ? 'Disponível' : 'Indisponível'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/admin/products/${product._id}/edit`}
                        className="text-primary-600 hover:text-primary-900 text-sm font-medium"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-600 hover:text-red-900 text-sm font-medium"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            {products.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Nenhum produto encontrado</p>
                <Link
                  href="/admin/products/new"
                  className="mt-4 inline-block bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md"
                >
                  Adicionar primeiro produto
                </Link>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
} 