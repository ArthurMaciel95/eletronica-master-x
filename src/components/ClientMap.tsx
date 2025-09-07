import React from "react";
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
      <Marker position={[refLat, refLon]} />
      <Marker position={[clienteCoords.lat, clienteCoords.lon]} />
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
