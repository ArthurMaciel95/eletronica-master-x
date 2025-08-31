"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function Etapas({ etapaAtual = 3 }) {
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

export default function FretePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 text-gray-800 bg-white rounded-lg shadow mt-8 mb-8">
        <Etapas etapaAtual={3} />
        <h1 className="text-2xl font-bold mb-6">Frete</h1>
        <div className="mb-6">
          Frete fixo para Espírito Santo:{" "}
          <span className="font-bold">R$ 10,00</span>
        </div>
        <button
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-4 rounded-lg mt-4 transition-colors duration-200"
          onClick={() => (window.location.href = "/confirmacao")}
        >
          Avançar para Confirmação
        </button>
      </main>
      <Footer />
    </div>
  );
}
