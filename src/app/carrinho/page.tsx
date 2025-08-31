"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function Etapas({ etapaAtual = 1 }) {
  const etapas = [
    { label: "Carrinho" },
    { label: "Cadastro do Cliente" },
    { label: "Frete" },
    { label: "Confirmação de Compra" },
    { label: "Pagamento" },
  ];
  return (
    <div className="flex justify-center gap-2 mb-8 flex-wrap">
      {etapas.map((etapa, idx) => (
        <div key={etapa.label} className="flex items-center gap-2">
          <div
            className={`rounded-full w-8 h-8 flex items-center justify-center font-bold border-2 transition-all duration-200 ${
              idx + 1 === etapaAtual
                ? "bg-blue-700 text-white border-blue-700 scale-110"
                : idx + 1 < etapaAtual
                ? "bg-green-600 text-white border-green-600"
                : "bg-gray-200 text-gray-500 border-gray-300"
            }`}
          >
            {idx + 1}
          </div>
          <span
            className={`text-xs sm:text-sm ${
              idx + 1 === etapaAtual
                ? "font-bold text-blue-700"
                : "text-gray-500"
            }`}
          >
            {etapa.label}
          </span>
          {idx < etapas.length - 1 && (
            <span className="w-6 h-1 bg-gray-300 rounded-full" />
          )}
        </div>
      ))}
    </div>
  );
}

export default function CarrinhoPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(items);
  }, []);

  const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);
  const frete = 10;
  const totalComFrete = total + frete;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 text-gray-800 bg-white rounded-lg shadow mt-8 mb-8">
        <Etapas etapaAtual={1} />
        <h1 className="text-3xl font-bold mb-6">Carrinho de Compras</h1>
        {cart.length === 0 ? (
          <p className="mb-4">Seu carrinho está vazio.</p>
        ) : (
          <>
            <ul className="mb-6 divide-y divide-gray-200">
              {cart.map((item, idx) => (
                <li key={idx} className="py-4 flex items-center gap-4">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 object-contain rounded bg-gray-100"
                    />
                  ) : (
                    <div className="h-16 w-16 flex items-center justify-center bg-gray-100 rounded text-gray-400">
                      ?
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="font-semibold">{item.name}</div>
                    {item.price && (
                      <div className="text-gray-500">
                        R$ {item.price.toFixed(2)}
                      </div>
                    )}
                  </div>
                  <button
                    className="ml-2 text-gray-400 hover:text-red-600 text-xl font-bold px-2 py-1 rounded transition-colors"
                    title="Remover do carrinho"
                    onClick={() => {
                      const newCart = cart.filter((_, i) => i !== idx);
                      setCart(newCart);
                      localStorage.setItem("cart", JSON.stringify(newCart));
                    }}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
            <div className="mb-4 flex flex-col gap-2">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>
            <button
              className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-4 rounded-lg mt-4 transition-colors duration-200"
              onClick={() => (window.location.href = "/checkout")}
            >
              Avançar para Cadastro
            </button>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
