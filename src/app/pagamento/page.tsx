"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 text-gray-800 bg-white rounded-lg shadow mt-8 mb-8">
        <Etapas etapaAtual={5} />
        <h1 className="text-2xl font-bold mb-6">Pagamento</h1>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <img src="/img/pix-logo.png" alt="Pix" className="h-8 w-8" />
            <span className="text-lg font-semibold text-green-700">
              Pagamento via Pix
            </span>
          </div>
          <div className="bg-green-50 border border-green-200 rounded p-4 mb-4">
            <p className="mb-2">
              Após clicar em <b>Gerar QR Code Pix</b>, você poderá pagar
              escaneando o código com seu app bancário.
            </p>
            <p className="text-sm text-gray-500">
              O pagamento é processado automaticamente e você será notificado
              aqui mesmo.
            </p>
          </div>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 text-lg">
            Gerar QR Code Pix
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
