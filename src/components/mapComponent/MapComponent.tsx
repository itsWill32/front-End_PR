// MapComponent.jsx
// import { useEffect } from 'react';

export default function MapComponent() {
//   useEffect(() => {
//     const initMap = () => {
//       new window.google.maps.Map(document.getElementById('map'), {
//         center: { lat: -34.397, lng: 150.644 },
//         zoom: 8,
//       });
//     };

//     if (!window.google) {
//       const script = document.createElement('script');
//       script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
//       script.async = true;
//       document.head.appendChild(script);
//       script.addEventListener('load', initMap);
//     } else {
//       initMap();
//     }
//   }, []);

  return <div id="map" className="w-full h-64 bg-gray-800"></div>;
}
