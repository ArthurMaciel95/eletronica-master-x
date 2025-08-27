"use client";

import { useState, useEffect } from "react";
import BrandGrid from "./BrandGrid";

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
      const response = await fetch("/api/settings");
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (err) {
      console.error("Erro ao carregar configurações:", err);
    }
  };

  // Fallback settings

  const displaySettings = settings;

  return (
    <section
      style={{ backgroundImage: "url('/img/background-hero.png')" }}
      className=" bg-no-repeat bg-cover text-white py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="flex flex-col">
            <h2 className="text-3xl text-white font-bold ">
              Conserto, Compra, Venda e Manutenção <br />
              de eletrônicos
            </h2>
            <p className="my-5 text-lg max-w-[470px]">
              Mais de 40 anos de experiência em consertos de aparelhos e
              equipamentos eletroeletrônicos
            </p>
            <ul className="space-y-2 list-disc ml-5">
              <li>
                Conserto de tvs, aparelhos de som e eletroeletrônicos em geral
              </li>
              <li>Conserto em computadores e informática</li>
              <li>Conserto de instrumentos musicais</li>
              <li>Conserto de equipamentos e instrumentos musicais</li>
              <li>Conserto de placas automotivas</li>
              <li>Compra e venda de aparelhos eletroeletrônicos</li>
              <li>Contratos de manutenção corretiva e preventiva</li>
            </ul>
            <div className="mt-6 flex items-start justify-start">
              <span className="inline-flex items-center gap-2 bg-green-600 text-white font-semibold px-4 py-2 rounded shadow-lg text-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2l4 -4"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
                Orçamento grátis e conserto com garantia
              </span>
            </div>
          </div>
          <div>
            {/* Grid de Marcas */}

            <div className="bg-black/30 rounded-lg p-4">
              {/* Grid de Marcas */}
              <BrandGrid />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
