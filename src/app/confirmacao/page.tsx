"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function Etapas({ etapaAtual = 4 }) {
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

import React, { useEffect, useState } from "react";

export default function ConfirmacaoPage() {
  const [cart, setCart] = useState<any[]>([]);
  const frete = 10;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(items);
    setTotal(
      items.reduce((sum: number, item: any) => sum + (item.price || 0), 0)
    );
  }, []);

  const totalComFrete = total + frete;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 text-gray-800 bg-white rounded-lg shadow mt-8 mb-8">
        <Etapas etapaAtual={4} />
        <h1 className="text-2xl font-bold mb-6">Confirmação de Compra</h1>
        <div className="mb-6">
          Revise seus dados e produtos antes de finalizar a compra.
        </div>
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
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Subtotal</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Frete</span>
              <span>R$ {frete.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-lg font-bold border-t pt-2 mb-6">
              <span>Total</span>
              <span>R$ {totalComFrete.toFixed(2)}</span>
            </div>
          </>
        )}
        <button
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-4 rounded-lg mt-4 transition-colors duration-200"
          onClick={() => (window.location.href = "/pagamento")}
        >
          Avançar para Pagamento
        </button>
      </main>
      <Footer />
    </div>
  );
}
