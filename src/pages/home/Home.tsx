import { useState, useEffect } from 'react';
import './Home.css';
import mqtt from 'mqtt';
import { FaHome, FaChartBar, FaUser } from 'react-icons/fa';
import Metrics from '../../components/metrics/Metrics';
import BodyTemperature from '../../components/bodyTemperature/BodyTemperature';
import FrequencyCardiac from '../../components/frequencyCardiac/FrequencyCardiac';
import MapComponent from '../../components/mapComponent/MapComponent';
import CountdownModal from '../../components/countmodal/CountDownModal';
import logoAthleteBand from "../../assets/ATHLETEBANDLogo.png";
import ConfirmEndModal from '../../components/ConfirmEndModal/ConfirmEndModal';

export default function Home() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [temperature, setTemperature] = useState("--");
  const [frequency, setFrequency] = useState("--");
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [activeButton, setActiveButton] = useState('actividad');
  const [showConfirmEndModal, setShowConfirmEndModal] = useState(false);

  useEffect(() => {
    const client = mqtt.connect('wss://broker.emqx.io:8084/mqtt');
  
    client.on('connect', () => {
      console.log("Conectado a MQTT");
      client.subscribe('testtopic/2', (err) => {
        if (err) {
          console.error("Error al suscribirse al tema:", err);
        } else {
          console.log("Suscripción exitosa al tema testtopic/2");
        }
      });
    });
  
    client.on('message', (topic, message) => {
      console.log("Mensaje recibido:", message.toString());
      const data = JSON.parse(message.toString());
      setTemperature(parseFloat(data["temperatura del corporal"]).toFixed(2));
      setFrequency(parseFloat(data["temperantura ambiente"]).toFixed(2));
    });
  
    return () => {
      if (client) client.end();
    };
  }, []);
  
  useEffect(() => {
    let timer = null;
    if (isRunning) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => timer && clearInterval(timer);
  }, [isRunning]);

  const handleButtonClick = () => {
    if (isRunning) {
      setShowConfirmEndModal(true); // Mostramos el modal de confirmación
    } else {
      setShowCountdown(true);
      setCountdown(10);
    }
  };

  const handleCountdownFinish = () => {
    setShowCountdown(false);
    setIsRunning(true);
  };

  const handleConfirmEnd = () => {
    setIsRunning(false);
    setTime(0);
    setShowConfirmEndModal(false);
  };

  const handleCancelEnd = () => {
    setShowConfirmEndModal(false);
  };

  useEffect(() => {
    let countdownTimer;
    if (showCountdown && countdown > 0) {
      countdownTimer = setInterval(() => {
        setCountdown(prev => prev - 1);
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
      <h1 className="text-white text-lg font-bold">ATHLETIC BAND</h1>
      <p className="text-gray-400 text-sm">ACTIVIDAD</p>
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

      <main className="flex-grow bg-black">
        <div className="mx-4">
          <Metrics time={time} />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-6 mx-4">
          <FrequencyCardiac frequency={frequency} />
          <BodyTemperature temperature={temperature} />
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
            onClick={() => setActiveButton('estadisticas')}
            className={`w-1/3 flex flex-col items-center px-6 py-3 rounded-md transition duration-200 text-sm font-semibold ${
              activeButton === 'estadisticas' ? 'text-black bg-white' : 'text-white hover:bg-white hover:text-black'
            }`}
          >
            <FaChartBar className="h-6 w-6 mb-1 md:hidden" /> 
            <span className="text-xs">ESTADÍSTICAS</span>
          </button>

          <button
            onClick={() => setActiveButton('actividad')}
            className={`w-1/3 flex flex-col items-center px-6 py-3 rounded-md transition duration-200 text-sm font-semibold ${
              activeButton === 'actividad' ? 'text-black bg-white' : 'text-white hover:bg-white hover:text-black'
            }`}
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

      {/* Modal de cuenta regresiva */}
      {showCountdown && (
        <CountdownModal
          countdown={countdown}
          onClose={() => setShowCountdown(false)}
          onFinish={handleCountdownFinish}
        />
      )}

       {/* Modal de confirmación para terminar */}
       {showConfirmEndModal && (
        <ConfirmEndModal
          onConfirm={handleConfirmEnd}
          onCancel={handleCancelEnd}
        />
      )}

    </div>
  );
}
