import { useState } from 'react';
import './Profile.css';
import { FaHome, FaChartBar, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ProfileInfo from '../../components/profileInfo/ProfileInfo';
import RecentActivities from '../../components/recentActivities/RecentActivities';

export default function Profile() {

  const [activeButton, setActiveButton] = useState('');

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

      <main className="flex-grow bg-black">
        <ProfileInfo></ProfileInfo>
       <div className="flex justify-between mt-4 mx-6 max-w-full">
  <button className="w-1/2 mx-2 py-3 bg-[#1E3545] text-white font-semibold rounded-md transition duration-200 hover:bg-white hover:text-black">
    Datos Personales
  </button>
  <button className="w-1/2 mx-2 py-3 bg-[#1E3545] text-white font-semibold rounded-md transition duration-200 hover:bg-white hover:text-black">
    Cerrar Sesión
  </button>
</div>

<div className="mx-4 mt-8 mb-10"> 
  <RecentActivities />
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
      className="w-1/3 flex flex-col items-center px-6 py-3 rounded-md transition duration-200 text-sm font-semibold bg-white text-black"
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
