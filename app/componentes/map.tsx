"use client"
import React, { useState, FormEvent } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Tipo para una parada
interface Stop {
  lat: number;
  lng: number;
  nombre: string;
}

// Props opcionales para el mapa
interface MapProps {
  defaultZoom?: number;
  posix?: { lat: number; lng: number };
}

const Map: React.FC<MapProps> = ({
  defaultZoom = 15,
  posix = { lat: 36.7213, lng: -4.4216 },
}) => {
  // Estado para los marcadores
  const [markers, setMarkers] = useState<Stop[]>([]);

  // Manejar el formulario
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const linea = formData.get('linea') as string;
    const sentido = formData.get('sentido') as string;

    // Obtener las paradas (datos simulados)
    const paradas = getParadas(linea, sentido);
    setMarkers(paradas);
  };

  // Ejemplo de función para obtener paradas de una línea y sentido
  const getParadas = (linea: string, sentido: string): Stop[] => {
    // Datos simulados de paradas
    const datos: Record<string, Record<string, Stop[]>> = {
      linea1: {
        ida: [
          { lat: 36.7213, lng: -4.4216, nombre: 'Parada 1' },
          { lat: 36.7223, lng: -4.4226, nombre: 'Parada 2' },
          { lat: 36.7233, lng: -4.4236, nombre: 'Parada 3' },
        ],
        vuelta: [
          { lat: 36.7243, lng: -4.4246, nombre: 'Parada A' },
          { lat: 36.7253, lng: -4.4256, nombre: 'Parada B' },
          { lat: 36.7263, lng: -4.4266, nombre: 'Parada C' },
        ],
      },
      linea2: {
        ida: [
          { lat: 36.7313, lng: -4.4316, nombre: 'Parada X' },
          { lat: 36.7323, lng: -4.4326, nombre: 'Parada Y' },
          { lat: 36.7333, lng: -4.4336, nombre: 'Parada Z' },
        ],
        vuelta: [
          { lat: 36.7343, lng: -4.4346, nombre: 'Parada L' },
          { lat: 36.7353, lng: -4.4356, nombre: 'Parada M' },
          { lat: 36.7363, lng: -4.4366, nombre: 'Parada N' },
        ],
      },
    };

    return datos[linea]?.[sentido] || [];
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Formulario */}
      <form onSubmit={handleFormSubmit} style={{ marginBottom: '1rem' }}>
        <label>
          Línea:
          <select name="linea" required>
            <option value="linea1">Línea 1</option>
            <option value="linea2">Línea 2</option>
          </select>
        </label>
        <label>
          Sentido:
          <select name="sentido" required>
            <option value="ida">Ida</option>
            <option value="vuelta">Vuelta</option>
          </select>
        </label>
        <button type="submit">Mostrar paradas</button>
      </form>

      {/* Mapa */}
      <MapContainer
        center={posix}
        zoom={defaultZoom}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker, index) => (
          <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }}>
            <Popup>{marker.nombre}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
