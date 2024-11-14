import { useState } from 'react';
import { FaHome, FaChartBar, FaUser } from 'react-icons/fa';
import ProgressStats from '../../components/progressStats/ProgressStats';
import GraficaCalorias from '../../components/graficaCalorias/GraficaCalorias';
import GraficaDistancia from '../../components/graficaDistancia/GraficaDistancia';
import GraficaTiempo from '../../components/graficaTiempo/GraficaTiempo';
import { Link } from 'react-router-dom';

export default function Estadistics() {

  const [activeButton, setActiveButton] = useState('');

  const [mesSeleccionado, setMesSeleccionado] = useState<string>('OCTUBRE 2024');

  const meses = [
    'ENERO 2024', 'FEBRERO 2024', 'MARZO 2024', 'ABRIL 2024', 'MAYO 2024',
    'JUNIO 2024', 'JULIO 2024', 'AGOSTO 2024', 'SEPTIEMBRE 2024', 
    'OCTUBRE 2024', 'NOVIEMBRE 2024', 'DICIEMBRE 2024'
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <header className="bg-gradient-to-br from-[#131922] via-[#1E3545] to-[#1A2A37] p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-white text-lg font-bold">ATLETH BAND</h1>
            <p className="text-gray-400 text-sm">PERFIL</p>
          </div>
          <div className="w-10 h-10 bg-white rounded-full"></div>
        </div>
      </header>

      <main className="flex-grow bg-black mb-16">
     <ProgressStats></ProgressStats>
     <div className="flex items-center justify-start p-8">
          <label className="text-white mr-4 text-lg font-bold">MES</label>
          <select
            className="bg-black text-white p-2 border border-white rounded-md"
            value={mesSeleccionado}
            onChange={(e) => setMesSeleccionado(e.target.value)}
          >
            {meses.map((mes, index) => (
              <option key={index} value={mes}>
                {mes}
              </option>
            ))}
          </select>
        </div>

        <div className="p-12  space-y-6">
          <GraficaDistancia mes={mesSeleccionado} />
          <GraficaTiempo mes={mesSeleccionado} />
          <GraficaCalorias mes={mesSeleccionado} />
        </div>
      </main>

      <footer className="bg-gradient-to-br from-[#131922] via-[#1E3545] to-[#1A2A37] p-4 fixed bottom-0 w-full">
  <div className="flex justify-between md:justify-around items-center space-x-2 md:space-x-4">

    <button
      className="w-1/3 flex flex-col items-center px-6 py-3 rounded-md transition duration-200 text-sm font-semibold bg-white text-black"
    >
      <Link to={"/estadistics"}>
        <FaChartBar className="h-6 w-6 mb-1 md:hidden" /> 
        <span className="text-xs">ESTADÍSTICAS</span>
      </Link>
    </button>

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
