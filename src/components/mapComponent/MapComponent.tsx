import React from 'react';
import Map, { Marker } from 'react-map-gl';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface MapComponentProps {
  location: Coordinates;
}

const MapComponent: React.FC<MapComponentProps> = ({ location }) => {
  return (
    <div id="map" className="w-full h-64 bg-gray-800 rounded-lg overflow-hidden">
      {location.latitude !== 0 && location.longitude !== 0 ? (
        <Map
          initialViewState={{
            latitude: location.latitude,
            longitude: location.longitude,
            zoom: 15,
          }}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken="TU_MAPBOX_ACCESS_TOKEN"
        >
          <Marker
            latitude={location.latitude}
            longitude={location.longitude}
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
