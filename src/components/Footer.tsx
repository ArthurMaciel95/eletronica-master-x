"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface Settings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  whatsappNumber: string;
  companyDescription: string;
}

export default function Footer() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  // Fallback settings
  const fallbackSettings: Settings = {
    siteName: "Antonio Store",
    siteDescription: "Catálogo de produtos e serviços de tecnologia",
    contactEmail: "contato@antonio.com",
    contactPhone: "(11) 99999-9999",
    contactAddress: "São Paulo, SP",
    whatsappNumber: "5511999999999",
    companyDescription:
      "Especialistas em tecnologia com anos de experiência no mercado. Oferecemos produtos de qualidade e serviços especializados.",
  };

  const displaySettings = settings || fallbackSettings;

  const formatWhatsAppNumber = (number: string) => {
    // Remove non-numeric characters and format
    const cleanNumber = number.replace(/\D/g, "");
    if (cleanNumber.length === 13) {
      return `(${cleanNumber.slice(2, 4)}) ${cleanNumber.slice(
        4,
        9
      )}-${cleanNumber.slice(9)}`;
    }
    return number;
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <img
                src="./img/eletronica-master.png"
                className="h-20 w-auto"
                alt="Logo Eletrônica Master"
              />
              {/* <span className="ml-2 text-xl font-bold">{displaySettings.siteName}</span> */}
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              {displaySettings.companyDescription}
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-green-400">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-semibold">Site Seguro</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href="#produtos"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Produtos
                </a>
              </li>
              <li>
                <a
                  href="#servicos"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Serviços
                </a>
              </li>
              <li>
                <a
                  href="#sobre"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sobre Nós
                </a>
              </li>
              <li>
                <a
                  href="#contato"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a
                  href={`mailto:${displaySettings.contactEmail}`}
                  className="text-sm hover:text-white transition-colors"
                >
                  {displaySettings.contactEmail}
                </a>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a
                  href={`tel:${displaySettings.contactPhone}`}
                  className="text-sm hover:text-white transition-colors"
                >
                  {displaySettings.contactPhone}
                </a>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">
                  {displaySettings.contactAddress}
                </span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a
                  href={`https://wa.me/${displaySettings.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-green-400 transition-colors"
                >
                  WhatsApp:{" "}
                  {formatWhatsAppNumber(displaySettings.whatsappNumber)}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 {displaySettings.siteName}. Todos os direitos reservados.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center">
              <a
                href="https://arcodesolucoes.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-white font-semibold text-sm hover:text-gray-300 transition-colors"
              >
                Desenvolvido por Arcode Soluções
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
