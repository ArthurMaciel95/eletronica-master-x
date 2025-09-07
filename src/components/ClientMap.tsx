import React from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";

function FitRouteBounds({ coords }: { coords: Array<[number, number]> }) {
  const map = useMap();
  React.useEffect(() => {
    if (coords.length > 1) {
      map.fitBounds(coords);
    }
  }, [coords, map]);
  return null;
}

export default function ClientMap({
  clienteCoords,
  routeCoords,
}: {
  clienteCoords: { lat: number; lon: number };
  routeCoords: Array<[number, number]>;
}) {
  const refLat = -27.64662;
  const refLon = -48.670361;

  const svgIcon = L.divIcon({
    html: `
   <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20"><path fill="#e81c1c" fillRule="evenodd" d="M5.05 4.05a7 7 0 1 1 9.9 9.9L10 18.9l-4.95-4.95a7 7 0 0 1 0-9.9M10 11a2 2 0 1 0 0-4a2 2 0 0 0 0 4" clipRule="evenodd"></path></svg>
  `,
    className: "", // remove classes padrão
    iconSize: [32, 32],
    iconAnchor: [16, 32], // ponto do ícone que aponta para o marker
  });

  return (
    <MapContainer
      center={[
        (clienteCoords.lat + refLat) / 2,
        (clienteCoords.lon + refLon) / 2,
      ]}
      zoom={9}
      style={{ height: "300px", width: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[refLat, refLon]} icon={svgIcon} />
      <Marker
        position={[clienteCoords.lat, clienteCoords.lon]}
        icon={svgIcon}
      />
      {routeCoords.length > 0 ? (
        <>
          <Polyline positions={routeCoords} pathOptions={{ color: "red" }} />
          <FitRouteBounds coords={routeCoords} />
        </>
      ) : (
        <Polyline
          positions={[
            [refLat, refLon],
            [clienteCoords.lat, clienteCoords.lon],
          ]}
          pathOptions={{ color: "blue" }}
        />
      )}
    </MapContainer>
  );
}
