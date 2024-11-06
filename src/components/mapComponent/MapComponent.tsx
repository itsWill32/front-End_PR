import React, { useState, useEffect } from 'react';
import Map, { Marker } from 'react-map-gl';

interface Coordinates {
  latitude: number;
  longitude: number;
}

const MapComponent: React.FC = () => {
  const [location, setLocation] = useState<Coordinates | null>(null);

  useEffect(() => {
    // Obtener la ubicación actual del usuario y actualizarla en tiempo real
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error obteniendo la ubicación: ", error);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div id="map" className="w-full h-64 bg-gray-800 rounded-lg overflow-hidden">
      {location ? (
        <Map
          initialViewState={{
            latitude: location.latitude,
            longitude: location.longitude,
            zoom: 15,
          }}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken="TU_MAPBOX_ACCESS_TOKEN" // Reemplaza con tu token
        >
          <Marker
            latitude={location.latitude}
            longitude={location.longitude}
            offset={[0, -10]} // Centrar el marcador
          >
            <div className="bg-blue-500 h-4 w-4 rounded-full border-2 border-white"></div>
          </Marker>
        </Map>
      ) : (
        <p className="text-center text-white">Obteniendo ubicación...</p>
      )}
    </div>
  );
};

export default MapComponent;
