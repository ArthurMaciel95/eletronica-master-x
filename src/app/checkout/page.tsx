"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

function Etapas({ etapaAtual = 2 }) {
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

export default function CheckoutPage() {
  const [hasToken, setHasToken] = React.useState<null | boolean>(null);
  const router =
    typeof window !== "undefined"
      ? require("next/navigation").useRouter()
      : null;

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("@token_xmaster");
      if (token) {
        // Redireciona para próxima etapa do checkout
        window.location.href = "/frete";
      } else {
        setHasToken(false);
      }
    }
  }, []);

  if (hasToken === null) {
    // Evita flicker
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 text-gray-800 bg-white rounded-lg shadow mt-8 mb-8">
        <Etapas etapaAtual={2} />
        <h1 className="text-2xl font-bold mb-6">Identificação do Cliente</h1>
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-6 text-yellow-800">
          Para continuar, faça o cadastro ou, caso já tenha, realize o login.
        </div>
        <div className="flex gap-4">
          <a
            href="/cadastro?redirect=checkout"
            className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors duration-200"
          >
            Fazer cadastro
          </a>
          <a
            href="/login?redirect=checkout"
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg text-center transition-colors duration-200"
          >
            Já tenho cadastro
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
