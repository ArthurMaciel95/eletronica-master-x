"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React, { useEffect, useState } from "react";
function Etapas({ etapaAtual = 5 }) {
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

export default function PagamentoPage() {
  const [pixDisabled, setPixDisabled] = useState(false);
  const [pixCountdown, setPixCountdown] = useState(0);

  useEffect(() => {
    // Verifica se existe timestamp de geração Pix
    const lastPix = localStorage.getItem("pix_last_gen");
    if (lastPix) {
      const diff = 60 - Math.floor((Date.now() - Number(lastPix)) / 1000);
      if (diff > 0) {
        setPixDisabled(true);
        setPixCountdown(diff);
        const interval = setInterval(() => {
          setPixCountdown((prev) => {
            if (prev <= 1) {
              setPixDisabled(false);
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        return () => clearInterval(interval);
      }
    }
  }, []);

  const handlePixClick = async () => {
    setPixDisabled(true);
    // Chama a API de geração Pix
    try {
      // Exemplo de chamada (ajuste conforme sua API):
      const res = await fetch("/api/asaas/create-pix-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          /* dados necessários */
        }),
      });
      const result = await res.json();
      if (res.ok && result?.id) {
        // Sucesso: inicia o contador
        localStorage.setItem("pix_last_gen", String(Date.now()));
        setPixCountdown(60);
        const interval = setInterval(() => {
          setPixCountdown((prev) => {
            if (prev <= 1) {
              setPixDisabled(false);
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        setPixDisabled(false);
        // Exiba erro se necessário
        alert("Erro ao gerar Pix. Tente novamente.");
      }
    } catch (err) {
      setPixDisabled(false);
      alert("Erro ao gerar Pix. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 text-gray-800 bg-white rounded-lg shadow mt-8 mb-8">
        <Etapas etapaAtual={5} />
        <h1 className="text-2xl font-bold mb-6">Pagamento</h1>
        <div className="mb-6">
          <div className="flex gap-6 flex-col md:flex-row">
            {/* PIX */}
            <div className="flex-1 bg-green-50 border border-green-200 rounded p-4 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <img src="/img/pix-logo.png" alt="Pix" className="h-8 w-8" />
                <span className="text-lg font-semibold text-green-700">
                  Pagamento via Pix
                </span>
              </div>
              <p className="mb-2">
                Após clicar em <b>Gerar QR Code Pix</b>, você poderá pagar
                escaneando o código com seu app bancário.
              </p>
              <p className="text-sm text-gray-500">
                O pagamento é processado automaticamente e você será notificado
                aqui mesmo.
              </p>
              <button
                className={`w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 text-lg mt-4 ${
                  pixDisabled ? "opacity-60 cursor-not-allowed" : ""
                }`}
                onClick={handlePixClick}
                disabled={pixDisabled}
              >
                {pixDisabled
                  ? `Aguarde ${pixCountdown}s para gerar novamente`
                  : "Gerar QR Code Pix"}
              </button>
            </div>
            {/* Cartão de Crédito */}
            <div className="flex-1 bg-blue-50 border border-blue-200 rounded p-4 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/img/card-logo.png"
                  alt="Cartão"
                  className="h-8 w-8"
                />
                <span className="text-lg font-semibold text-blue-700">
                  Pagamento com Cartão de Crédito
                </span>
              </div>
              <form className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Número do Cartão
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    maxLength={19}
                    placeholder="0000 0000 0000 0000"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">
                      Validade
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded px-3 py-2"
                      maxLength={5}
                      placeholder="MM/AA"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded px-3 py-2"
                      maxLength={4}
                      placeholder="CVV"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nome no Cartão
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 text-lg mt-2"
                >
                  Pagar com Cartão
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
