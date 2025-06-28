'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Brand {
  id: number
  name: string
  logo: string
}

export default function AdminBrands() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [newBrand, setNewBrand] = useState({ name: '', logo: '' })
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    // Simular carregamento de marcas
    setTimeout(() => {
      setBrands([
        { id: 1, name: 'Samsung', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
        { id: 2, name: 'LG', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/LG_logo.svg' },
        { id: 3, name: 'Sony', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Sony_logo.svg' },
        { id: 4, name: 'Philips', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Philips_logo_new.svg' },
        { id: 5, name: 'Panasonic', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Panasonic_logo.svg' },
        { id: 6, name: 'Sharp', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Sharp_logo.svg' }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const handleAddBrand = () => {
    if (newBrand.name && newBrand.logo) {
      const brand = {
        id: Date.now(),
        name: newBrand.name,
        logo: newBrand.logo
      }
      setBrands([...brands, brand])
      setNewBrand({ name: '', logo: '' })
      setShowAddForm(false)
    }
  }

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta marca?')) {
      setBrands(brands.filter(brand => brand.id !== id))
    }
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
              <h1 className="text-2xl font-bold text-gray-900">Gerenciar Marcas</h1>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Adicionar Marca
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Add Brand Form */}
        {showAddForm && (
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Adicionar Nova Marca</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome da Marca</label>
                <input
                  type="text"
                  value={newBrand.name}
                  onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
                  className="mt-1 block w-full border text-gray-500 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Ex: Apple"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">URL do Logo</label>
                <input
                  type="url"
                  value={newBrand.logo}
                  onChange={(e) => setNewBrand({ ...newBrand, logo: e.target.value })}
                  className="mt-1 block w-full border text-gray-500 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="https://exemplo.com/logo.svg"
                />
              </div>
            </div>
            <div className="mt-4 flex space-x-3">
              <button
                onClick={handleAddBrand}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Adicionar
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando marcas...</p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Marcas no Marquee ({brands.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {brands.map((brand) => (
                  <div key={brand.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-center h-16 mb-3">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <h4 className="text-sm font-medium text-gray-900 text-center mb-2">
                      {brand.name}
                    </h4>
                    <button
                      onClick={() => handleDelete(brand.id)}
                      className="w-full text-red-600 hover:text-red-900 text-sm font-medium"
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!loading && brands.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma marca encontrada</h3>
            <p className="mt-1 text-sm text-gray-500">Comece adicionando sua primeira marca.</p>
            <div className="mt-6">
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Adicionar Marca
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
} 