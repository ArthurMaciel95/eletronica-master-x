"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  image?: string;
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
      console.log(response, 'teste')
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        
      } else {
        setError("Erro ao carregar produtos");
        // Fallback para produtos de exemplo
        setProducts([
         ]);
      }
    } catch (err) {
      setError("Erro ao carregar produtos");
      // Fallback para produtos de exemplo
      setProducts([
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
          </>
        )}
      </div>
    </section>
  );
}
