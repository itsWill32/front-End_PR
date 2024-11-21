// src/pages/estadistics/Estadistics.tsx

import { useState } from 'react';
import { FaHome, FaChartBar, FaUser } from 'react-icons/fa';
import ProgressStats from '../../components/progressStats/ProgressStats';
import GraficaCalorias from '../../components/graficaCalorias/GraficaCalorias';
import GraficaDistancia from '../../components/graficaDistancia/GraficaDistancia';
import GraficaTiempo from '../../components/graficaTiempo/GraficaTiempo';
import TrendsChart from '../../components/TrendsChart';
import TrainingClassification from '../../components/TrainingClassification';
import GraficaRitmoCardiaco from '../../components/GraficaRitmoCardiaco';
import { Link } from 'react-router-dom';
import logoAthleteBand from "../../assets/ATHLETEBANDLogo.png";

export default function Estadistics() {
  const [activeButton, setActiveButton] = useState('');

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Encabezado */}
      <header className="bg-gradient-to-br from-[#131922] via-[#1E3545] to-[#1A2A37] p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-white text-lg font-bold">ATHLETE BAND</h1>
            <p className="text-gray-400 text-sm">ESTADÍSTICAS</p>
          </div>

          <div>
            <img
              src={logoAthleteBand}
              alt="Athlete Band Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-grow bg-black mb-16">
        <ProgressStats />

        {/* Gráficas */}
        <div className="p-12 space-y-6">
          <GraficaDistancia />
          <GraficaTiempo />
          <GraficaCalorias />
          <GraficaRitmoCardiaco /> {/* Añadir la nueva gráfica aquí */}
          <TrendsChart />
          <TrainingClassification />
        </div>
      </main>

      {/* Pie de Página */}
      <footer className="bg-gradient-to-br from-[#131922] via-[#1E3545] to-[#1A2A37] p-4 fixed bottom-0 w-full">
        <div className="flex justify-between md:justify-around items-center space-x-2 md:space-x-4">
          {/* Botón Estadísticas */}
          <button className="w-1/3 flex flex-col items-center px-6 py-3 rounded-md transition duration-200 text-sm font-semibold bg-white text-black">
            <Link to={"/estadistics"}>
              <FaChartBar className="h-6 w-6 mb-1 md:hidden" />
              <span className="text-xs">ESTADÍSTICAS</span>
            </Link>
          </button>

          {/* Botón Actividad */}
          <button
            onClick={() => setActiveButton('actividad')}
            className={`w-1/3 flex flex-col items-center px-6 py-3 rounded-md transition duration-200 text-sm font-semibold ${
              activeButton === 'actividad' ? 'text-black bg-white' : 'text-white hover:bg-white hover:text-black'
            }`}
          >
            <Link to={"/home"}>
              <FaHome className="h-6 w-6 mb-1 md:hidden" />
              <span className="text-xs">ACTIVIDAD</span>
            </Link>
          </button>

          {/* Botón Perfil */}
          <button
            onClick={() => setActiveButton('perfil')}
            className={`w-1/3 flex flex-col items-center px-6 py-3 rounded-md transition duration-200 text-sm font-semibold ${
              activeButton === 'perfil' ? 'text-black bg-white' : 'text-white hover:bg-white hover:text-black'
            }`}
          >
            <Link to={"/profile"}>
              <FaUser className="h-6 w-6 mb-1 md:hidden" />
              <span className="text-xs">PERFIL</span>
            </Link>
          </button>
        </div>
      </footer>
    </div>
  );
}
