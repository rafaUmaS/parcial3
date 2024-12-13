'use client';

import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const defaultZoom = 13;
const defaultPosition = { lat: 36.721261, lng: -4.4212655 }; // Posición inicial (por ejemplo, Málaga)

// Definimos un tipo para los marcadores
interface MarkerType {
  lat: number;
  lng: number;
  nombre: string;
}

export default function MapaConFormulario(): JSX.Element {
  const [pais, setPais] = useState<string>(''); // Estado para el país
  const [ciudad, setCiudad] = useState<string>(''); // Estado para la ciudad
  const [markers, setMarkers] = useState<MarkerType[]>([]); // Estado para los marcadores
  const [posix, setPosix] = useState<{ lat: number; lng: number }>(defaultPosition); // Estado para la posición actual del mapa

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    try {
      // Llama a la API de OpenStreetMap para obtener las coordenadas
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          ciudad
        )},${encodeURIComponent(pais)}`
      );
      const data: { lat: string; lon: string }[] = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];

        // Añade el nuevo marcador al estado
        setMarkers((prevMarkers) => [
          ...prevMarkers,
          { lat: parseFloat(lat), lng: parseFloat(lon), nombre: `${ciudad}, ${pais}` },
        ]);

        // Actualiza la posición del mapa para centrar en el nuevo marcador
        setPosix({ lat: parseFloat(lat), lng: parseFloat(lon) });

        // Resetea los campos del formulario
        setPais('');
        setCiudad('');
        const postResponse = await fetch('/api/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lat: parseFloat(lat),
            lng: parseFloat(lon),
            email: 'rafasaezarana@uma.es', // Correo fijo para este ejemplo
          }),
        });

        const result = await postResponse.json();

        if (!postResponse.ok) {
          throw new Error(result.error || 'Error desconocido');
        }

        console.log(result.message);
      } else {
        alert('No se encontraron coordenadas para esa ubicación.');
      }
    } catch (error) {
      console.error('Error al buscar coordenadas:', error);
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Formulario */}
      <form onSubmit={handleFormSubmit} style={{ marginBottom: '1rem' }}>
        <label>
          País:
          <input
            type="text"
            value={pais}
            onChange={(e) => setPais(e.target.value)} // Actualiza el estado del país
            placeholder="Introduce el país"
            style={{ marginLeft: '0.5rem', marginBottom: '0.5rem' }}
          />
        </label>
        <br />
        <label>
          Ciudad:
          <input
            type="text"
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)} // Actualiza el estado de la ciudad
            placeholder="Introduce la ciudad"
            style={{ marginLeft: '0.5rem' }}
          />
        </label>
        <br />
        <button type="submit" style={{ marginTop: '1rem' }}>
          Añadir marcador
        </button>
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
}
