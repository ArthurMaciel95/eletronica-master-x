"use client";

import { useState, useEffect } from 'react';

interface Settings {
  siteName: string;
  siteDescription: string;
  companyDescription: string;
  whatsappNumber: string;
}

export default function Hero() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (err) {
      console.error('Erro ao carregar configurações:', err);
    }
  };

  // Fallback settings


  const displaySettings = settings 

  return (
    <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Bem-vindo à {displaySettings?.siteName || 'Carregando...'}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
            {displaySettings?.siteDescription || 'Carregando...'}
          </p>
          <p className="text-lg mb-10 text-primary-200 max-w-2xl mx-auto">
            {displaySettings?.companyDescription || 'Carregando...'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#produtos"
              className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-200"
            >
              Ver Catálogo
            </a>
            <a
              href={`https://wa.me/${displaySettings?.whatsappNumber || ''}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Fale Conosco
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 