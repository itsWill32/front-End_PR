import { useState } from 'react';
import './Home.css';
import { FaHome, FaChartBar, FaUser } from 'react-icons/fa';
import Metrics from '../../components/metrics/Metrics';
import BodyTemperature from '../../components/bodyTemperature/BodyTemperature';
import FrequencyCardiac from '../../components/frequencyCardiac/FrequencyCardiac';
import MapComponent from '../../components/mapComponent/MapComponent';

export default function Home() {

  const [activeButton, setActiveButton] = useState('');

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <header className="bg-gradient-to-br from-[#131922] via-[#1E3545] to-[#1A2A37] p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-white text-lg font-bold">ATLETH BAND</h1>
            <p className="text-gray-400 text-sm">ACTIVIDAD</p>
          </div>
          <div className="w-10 h-10 bg-white rounded-full"></div>
        </div>
      </header>

      <main className="flex-grow bg-black">
        <div className="mx-4">
          <Metrics />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-6 mx-4">
          <FrequencyCardiac />
          <BodyTemperature />
          <MapComponent />
        </div>

        <div className="flex justify-center mt-6 lg:mt-4 mx-4">
          <button className="px-6 py-3 bg-white text-black font-semibold rounded-md w-full max-w-xs md:w-auto text-center">
            INICIAR
          </button>
        </div>
      </main>

      <footer className="bg-gradient-to-br from-[#131922] via-[#1E3545] to-[#1A2A37] p-4">
        <div className="flex justify-between md:justify-around items-center space-x-2 md:space-x-4">
  
          <button
            onClick={() => setActiveButton('estadisticas')}
            className={`w-1/3 flex flex-col items-center px-6 py-3 rounded-md transition duration-200 text-sm font-semibold ${
              activeButton === 'estadisticas' ? 'text-black bg-white' : 'text-white hover:bg-white hover:text-black'
            }`}
          >
            <FaChartBar className="h-6 w-6 mb-1 md:hidden" /> 
            <span className="text-xs">ESTADÍSTICAS</span>
          </button>

          <button
            className="w-1/3 flex flex-col items-center px-6 py-3 rounded-md transition duration-200 text-sm font-semibold bg-white text-black"
          >
            <FaHome className="h-6 w-6 mb-1 md:hidden" /> 
            <span className="text-xs">ACTIVIDAD</span>
          </button>

          <button
            onClick={() => setActiveButton('perfil')}
            className={`w-1/3 flex flex-col items-center px-6 py-3 rounded-md transition duration-200 text-sm font-semibold ${
              activeButton === 'perfil' ? 'text-black bg-white' : 'text-white hover:bg-white hover:text-black'
            }`}
          >
            <FaUser className="h-6 w-6 mb-1 md:hidden" /> 
            <span className="text-xs">PERFIL</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
