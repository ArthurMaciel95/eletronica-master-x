"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import axios from "axios";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { TileLayer, Marker, Polyline, useMap } from "react-leaflet";

const ClientMap = dynamic(
  () => import("@/components/ClientMap"), // um componente separado só para o mapa
  { ssr: false }
);
// Componente para ajustar o mapa ao bounds da rota
function FitRouteBounds({ coords }: { coords: Array<[number, number]> }) {
  const map = useMap();
  React.useEffect(() => {
    if (coords.length > 1) {
      map.fitBounds(coords);
    }
  }, [coords, map]);
  return null;
}

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
  const [elegivel, setElegivel] = React.useState<boolean | null>(null);
  const [distancia, setDistancia] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [erro, setErro] = React.useState("");
  const [clienteCoords, setClienteCoords] = React.useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [routeCoords, setRouteCoords] = React.useState<Array<[number, number]>>(
    []
  );

  // Referência: Palhoça/SC
  const refLat = -27.64662;
  const refLon = -48.670361;
  const raioKm = 50;

  // Navegação client-side sem window
  const router = useRouter();
  function changeRoute(path: string) {
    router.push(path);
  }

  // Função Haversine para calcular distância em km
  function haversine(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  useEffect(() => {
    async function verificarFrete() {
      setLoading(true);
      setErro("");
      try {
        if (typeof window === "undefined") return;

        const clienteStr = localStorage.getItem("cliente");

        if (!clienteStr) {
          setErro("Cliente não encontrado. Faça login novamente.");
          setLoading(false);
          return;
        }
        let cliente;
        try {
          cliente = JSON.parse(clienteStr);
        } catch {
          setErro("Dados do cliente inválidos. Faça login novamente.");
          setLoading(false);
          return;
        }
        const cep = cliente.address?.postalCode || cliente.address?.cep;
        console.log("CEP do cliente:", cep);
        if (!cep) {
          setErro("CEP do cliente não encontrado.");
          setLoading(false);
          return;
        }
        // Função para buscar dados do CEP na BrasilAPI
        const { data: address } = await axios.get(
          `https://brasilapi.com.br/api/cep/v1/${cep}`
        );
        const fullAddress = `${address.neighborhood}, ${address.city} - ${address.state}`;
        // Função para geocodificar endereço via Nominatim
        const { data: geoData } = await axios.get(
          "https://nominatim.openstreetmap.org/search",
          {
            params: {
              q: fullAddress,
              format: "json",
              limit: 1,
            },
          }
        );
        console.log("Endereço completo:", fullAddress, geoData);
        if (!geoData || geoData.length === 0) {
          setErro("Não foi possível obter coordenadas para o CEP.");
          setLoading(false);
          return;
        }
        const client_lat = parseFloat(geoData[0].lat);
        const client_lon = parseFloat(geoData[0].lon);
        setClienteCoords({ lat: client_lat, lon: client_lon });
        // Buscar rota real via OSRM API
        try {
          const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${client_lon},${client_lat};${refLon},${refLat}?overview=full&geometries=geojson`;
          const osrmRes = await axios.get(osrmUrl);
          const coords = osrmRes.data.routes?.[0]?.geometry?.coordinates;
          if (coords && coords.length > 0) {
            // OSRM retorna [lon, lat], precisamos converter para [lat, lon]
            setRouteCoords(
              coords.map(([lon, lat]: [number, number]) => [lat, lon])
            );
          }
        } catch (err) {
          // Se falhar, não mostra rota real
          console.log("Erro ao obter rota via OSRM:", err);
        }
        // Função Haversine para calcular distância em km
        const dist = haversine(refLat, refLon, client_lat, client_lon);
        setDistancia(dist);
        setElegivel(dist <= raioKm);
      } catch (err: any) {
        setErro("Erro ao verificar frete: " + (err?.message || ""));
      } finally {
        setLoading(false);
      }
    }
    verificarFrete();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 text-gray-800 bg-white rounded-lg shadow mt-8 mb-8">
        <Etapas etapaAtual={3} />
        <h1 className="text-2xl font-bold mb-6">Frete</h1>
        <div className="mb-6">
          Frete fixo Espírito Santo: <span className="font-bold">R$ 70,00</span>
        </div>
        {loading ? (
          <div className="text-gray-500">
            Verificando elegibilidade do frete...
          </div>
        ) : erro ? (
          <div className="text-red-600 mb-4">{erro}</div>
        ) : (
          <div className="mb-4">
            <div>
              Distância até o endereço:{" "}
              <span className="font-bold">{distancia?.toFixed(2)} km</span>
            </div>
            {clienteCoords && (
              <div className="my-6">
                {clienteCoords && (
                  <ClientMap
                    clienteCoords={clienteCoords}
                    routeCoords={routeCoords}
                  />
                )}
                <div className="flex justify-between text-xs mt-2">
                  <span>
                    <span className="font-bold">Destino:</span> Vitória/ES
                  </span>
                  <span>
                    <span className="font-bold">Cliente:</span>{" "}
                    {clienteCoords.lat.toFixed(5)},{" "}
                    {clienteCoords.lon.toFixed(5)}
                  </span>
                </div>
              </div>
            )}
            {elegivel ? (
              <div className="text-green-600 font-semibold">
                Frete disponível para seu endereço!
              </div>
            ) : (
              <div className="text-red-600 font-semibold">
                Seu endereço está fora da área de entrega (máx. {raioKm} km).
              </div>
            )}
          </div>
        )}
        <button
          className={`w-full font-semibold py-3 px-4 rounded-lg mt-4 transition-colors duration-200 ${
            elegivel
              ? "bg-blue-700 hover:bg-blue-800 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={() => elegivel && changeRoute("/confirmacao")}
          disabled={!elegivel}
        >
          Avançar para Confirmação
        </button>
      </main>
      <Footer />
    </div>
  );
}
