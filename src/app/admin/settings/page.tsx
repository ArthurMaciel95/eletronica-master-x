'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Settings {
  siteName: string
  siteDescription: string
  contactEmail: string
  contactPhone: string
  contactAddress: string
  whatsappNumber: string
  companyDescription: string
}

export default function AdminSettings() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<Settings>({
    siteName: '',
    siteDescription: '',
    contactEmail: '',
    contactPhone: '',
    contactAddress: '',
    whatsappNumber: '',
    companyDescription: ''
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings')
      if (response.ok) {
        const data = await response.json()
        setFormData(data)
      }
    } catch (err) {
      console.error('Erro ao carregar configurações:', err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert('Configurações atualizadas com sucesso!')
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Erro ao atualizar configurações')
      }
    } catch (err) {
      setError('Erro ao atualizar configurações')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof Settings, value: string) => {
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
              <Link href="/admin/dashboard" className="text-gray-600 hover:text-gray-900 mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Configurações do Site</h1>
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
              {/* Informações do Site */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Informações do Site</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nome do Site *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.siteName}
                      onChange={(e) => handleInputChange('siteName', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-500"
                      placeholder="Ex: Antonio Store"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Descrição do Site *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.siteDescription}
                      onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-500"
                      placeholder="Ex: Catálogo de produtos e serviços de tecnologia"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Descrição da Empresa *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.companyDescription}
                      onChange={(e) => handleInputChange('companyDescription', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-500"
                      placeholder="Descreva sua empresa..."
                    />
                  </div>
                </div>
              </div>

              {/* Informações de Contato */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Informações de Contato</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email de Contato *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-500"
                      placeholder="contato@empresa.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Telefone *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactPhone}
                      onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-500"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      WhatsApp *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.whatsappNumber}
                      onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-500"
                      placeholder="5511999999999 (apenas números)"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Digite apenas números, incluindo código do país (55) e DDD
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Endereço *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactAddress}
                      onChange={(e) => handleInputChange('contactAddress', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-500"
                      placeholder="São Paulo, SP"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Botões */}
            <div className="flex justify-end space-x-3 mt-6">
              <Link
                href="/admin/dashboard"
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Salvando...' : 'Salvar Configurações'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
} 