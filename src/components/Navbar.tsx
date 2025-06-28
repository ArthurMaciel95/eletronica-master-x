'use client'

import { useState, useEffect } from 'react'

interface Settings {
  siteName: string;
  contactPhone: string;
  whatsappNumber: string;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [settings, setSettings] = useState<Settings | null>(null)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings')
      if (response.ok) {
        const data = await response.json()
        setSettings(data)
      }
    } catch (err) {
      console.error('Erro ao carregar configurações:', err)
    }
  }

  // Fallback settings
  const fallbackSettings: Settings = {
    siteName: 'Antonio Store',
    contactPhone: '(11) 99999-9999',
    whatsappNumber: '5511999999999'
  }

  const displaySettings = settings || fallbackSettings

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">{displaySettings.siteName}</span>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Início
            </a>
            <a href="#produtos" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Produtos
            </a>
            <a href="#servicos" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Serviços
            </a>
            <a href="#sobre" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Sobre
            </a>
            <a href="#contato" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Contato
            </a>
            <a 
              href={`https://wa.me/${displaySettings.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              WhatsApp
            </a>
            <a
              href="/admin/login"
              className="ml-4 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Admin
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Abrir menu principal</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <a href="#" className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium">
              Início
            </a>
            <a href="#produtos" className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium">
              Produtos
            </a>
            <a href="#servicos" className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium">
              Serviços
            </a>
            <a href="#sobre" className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium">
              Sobre
            </a>
            <a href="#contato" className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium">
              Contato
            </a>
            <a 
              href={`https://wa.me/${displaySettings.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white block px-3 py-2 rounded-md text-base font-medium flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              WhatsApp
            </a>
            <a
              href="/admin/login"
              className="mt-2 bg-primary-600 hover:bg-primary-700 text-white block px-3 py-2 rounded-md text-base font-medium text-center"
            >
              Admin
            </a>
          </div>
        </div>
      )}
    </nav>
  )
} 