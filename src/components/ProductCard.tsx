"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { formatCurrency } from '@/lib/utils';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category?: string;
  inStock?: boolean;
  featured?: boolean;
  image?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [whatsappNumber, setWhatsappNumber] = useState("5511999999999");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/settings");
      if (response.ok) {
        const data = await response.json();
        setWhatsappNumber(data.whatsappNumber);
      }
    } catch (err) {
      console.error("Erro ao carregar configurações:", err);
    }
  };

  const images = product.images || (product.image ? [product.image] : []);

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Product Image Carousel */}
      <div className="relative h-48 overflow-hidden">
        {images.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={images.length > 1}
            pagination={images.length > 1 ? { clickable: true } : false}
            loop={images.length > 1}
            className="h-full"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`${product.name} - Imagem ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Sem Imagem</span>
          </div>
        )}
        
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          {product.featured && (
            <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Destaque
            </span>
          )}
          <span className="bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Novo
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {product.description}
        </p>

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-primary-600">
            {formatCurrency(product.price)}
          </span>
        </div>

        {/* Category and Status */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-primary-600 font-medium">
            {product.category}
          </span>
          <span
            className={`text-sm px-2 py-1 rounded-full ${
              product.inStock
                ? "text-green-700 bg-green-100"
                : "text-red-700 bg-red-100"
            }`}
          >
            {product.inStock ? "Disponível" : "Indisponível"}
          </span>
        </div>

        {/* Contact Button */}
        <button
          onClick={() => {
            const message = `Olá! Gostaria de saber mais sobre o produto: ${product.name}`;
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              message
            )}`;
            window.open(whatsappUrl, "_blank");
          }}
          disabled={!product.inStock}
          className={`w-full font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center ${
            product.inStock
              ? "bg-green-700 hover:bg-green-800 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
          {product.inStock ? "Entrar em contato" : "Produto Indisponível"}
        </button>
      </div>
    </div>
  );
}
