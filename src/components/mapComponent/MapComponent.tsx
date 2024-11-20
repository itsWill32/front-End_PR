import React, { useState, useEffect } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface MapComponentProps {
  location: Coordinates;
}

const MapComponent: React.FC<MapComponentProps> = ({ location }) => {
  const [viewport, setViewport] = useState({
    latitude: location.latitude || 19.432608, // Coordenadas iniciales (CDMX)
    longitude: location.longitude || -99.133209,
    zoom: 14,
  });

  useEffect(() => {
    if (location.latitude !== 0 && location.longitude !== 0) {
      setViewport((prev) => ({
        ...prev,
        latitude: location.latitude,
        longitude: location.longitude,
      }));
    }
  }, [location]);

  return (
    <div className="w-full h-64 bg-gray-800 rounded-lg overflow-hidden">
      <Map
        {...viewport}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken="pk.eyJ1IjoieWFlbGFndWlsYXIiLCJhIjoiY20zcWlqdDc3MHBveDJrcHRzOTZvZWQxciJ9.OT3875xRohzeipqcj29X6A"
        onMove={(evt) => setViewport(evt.viewState)}
      >
        <NavigationControl position="top-left" />
        {location.latitude !== 0 && location.longitude !== 0 ? (
          <Marker latitude={location.latitude} longitude={location.longitude}>
            <div className="bg-blue-500 h-4 w-4 rounded-full border-2 border-white"></div>
          </Marker>
        ) : (
          <p className="text-white">Obteniendo ubicación...</p>
        )}
      </Map>
    </div>
  );
};

export default MapComponent;
