"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  inStock: boolean;
  featured: boolean;
}

interface Settings {
  whatsappNumber: string;
}

export default function ProductSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchSettings();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        setError("Erro ao carregar produtos");
        // Fallback para produtos de exemplo
        setProducts([
          {
            _id: "1",
            name: "Smartphone Galaxy S23",
            description:
              "O mais recente smartphone Samsung com câmera de 108MP e processador Snapdragon 8 Gen 2.",
            image:
              "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
            category: "Smartphones",
            inStock: true,
            featured: true,
          },
          {
            _id: "2",
            name: "Notebook Dell Inspiron",
            description:
              "Notebook potente com Intel i7, 16GB RAM e SSD de 512GB para trabalho e estudos.",
            image:
              "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
            category: "Notebooks",
            inStock: true,
            featured: false,
          },
          {
            _id: "3",
            name: "Fones de Ouvido Sony WH-1000XM4",
            description:
              "Fones de ouvido com cancelamento de ruído ativo e até 30 horas de bateria.",
            image:
              "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
            category: "Acessórios",
            inStock: true,
            featured: false,
          },
        ]);
      }
    } catch (err) {
      setError("Erro ao carregar produtos");
      // Fallback para produtos de exemplo
      setProducts([
        {
          _id: "1",
          name: "Smartphone Galaxy S23",
          description:
            "O mais recente smartphone Samsung com câmera de 108MP e processador Snapdragon 8 Gen 2.",
          image:
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
          category: "Smartphones",
          inStock: true,
          featured: true,
        },
        {
          _id: "2",
          name: "Notebook Dell Inspiron",
          description:
            "Notebook potente com Intel i7, 16GB RAM e SSD de 512GB para trabalho e estudos.",
          image:
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
          category: "Notebooks",
          inStock: true,
          featured: false,
        },
        {
          _id: "3",
          name: "Fones de Ouvido Sony WH-1000XM4",
          description:
            "Fones de ouvido com cancelamento de ruído ativo e até 30 horas de bateria.",
          image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
          category: "Acessórios",
          inStock: true,
          featured: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

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
  const fallbackSettings: Settings = {
    whatsappNumber: '5511999999999'
  };

  const displaySettings = settings || fallbackSettings;

  return (
    <section id="produtos" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nosso Catálogo
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conheça nossa seleção de produtos de tecnologia de alta qualidade
          </p>
        </div>

        {error && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-600 px-4 py-3 rounded-md mb-8 text-center">
            {error} - Exibindo produtos de exemplo
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando produtos...</p>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* CTA Section */}
            {/* <div className="text-center mt-16">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Não encontrou o que procurava?
                </h3>
                <p className="text-lg mb-6 opacity-90">
                  Entre em contato conosco e vamos encontrar a solução perfeita
                  para você!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="#contato"
                    className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors duration-200"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    Solicitar Orçamento
                  </a>
                  <a
                    href={`https://wa.me/${displaySettings.whatsappNumber}?text=Olá! Gostaria de saber mais sobre os produtos.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div> */}
          </>
        )}
      </div>
    </section>
  );
}
