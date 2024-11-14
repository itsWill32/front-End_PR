import { useState, useEffect } from 'react';
import './Home.css';
import { FaHome, FaChartBar, FaUser } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import Metrics from '../../components/metrics/Metrics';
import BodyTemperature from '../../components/bodyTemperature/BodyTemperature';
import FrequencyCardiac from '../../components/frequencyCardiac/FrequencyCardiac';
import MapComponent from '../../components/mapComponent/MapComponent';
import CountdownModal from '../../components/countmodal/CountDownModal';
export default function Home() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [activeButton, setActiveButton] = useState<string>('actividad');

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning]);

  const handleButtonClick = () => {
    if (isRunning) {
      setIsRunning(false);
      setTime(0);
    } else {
      setShowCountdown(true); // Muestra el modal de cuenta regresiva
      setCountdown(10); // Reinicia la cuenta regresiva a 10
    }
  };

  const handleCountdownFinish = () => {
    setShowCountdown(false);
    setIsRunning(true); // Inicia el temporizador principal
  };

  useEffect(() => {
    let countdownTimer: NodeJS.Timeout;
    if (showCountdown && countdown > 0) {
      countdownTimer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      handleCountdownFinish();
    }

    return () => clearInterval(countdownTimer);
  }, [showCountdown, countdown]);

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <header className="bg-gradient-to-br from-[#131922] via-[#1E3545] to-[#1A2A37] p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-white text-lg font-bold">ATHLETE BAND</h1>
            <p className="text-gray-400 text-sm">ACTIVIDAD</p>
          </div>
          <div className="w-10 h-10 bg-white rounded-full"></div>
        </div>
      </header>

      <main className="flex-grow bg-black">
        <div className="mx-4">
          <Metrics time={time} />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-6 mx-4">
          <FrequencyCardiac frequency="--" />
          <BodyTemperature temperature="--" />
          <MapComponent />
        </div>

        <div className="flex justify-center mt-6 lg:mt-4 mx-4">
          <button
            onClick={handleButtonClick}
            className="px-6 py-3 bg-white text-black font-semibold rounded-md w-full max-w-xs md:w-auto text-center"
          >
            {isRunning ? "Terminar" : "Iniciar"}
          </button>
        </div>
      </main>

      <footer className="bg-gradient-to-br from-[#131922] via-[#1E3545] to-[#1A2A37] p-4">

        <div className="flex justify-between md:justify-around items-center space-x-2 md:space-x-4">
          
          <button
        
            className={`w-1/3 flex flex-col items-center px-6 py-3 rounded-md transition duration-200 text-sm font-semibold ${
              activeButton === 'estadisticas' ? 'text-black bg-white' : 'text-white hover:bg-white hover:text-black'
            }`}
            onClick={() => setActiveButton('estadisticas')}
          >
            <Link to="/estadistics" >
              <FaChartBar className="h-6 w-6 mb-1 md:hidden" /> 
              <span className="text-xs" >ESTADÍSTICAS</span>
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

      {/* Modal de cuenta regresiva */}
      {showCountdown && (
        <CountdownModal
          countdown={countdown}
          onClose={() => setShowCountdown(false)}
          onFinish={handleCountdownFinish}
        />
      )}
    </div>
  );
}
