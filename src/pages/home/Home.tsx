import { useState, useEffect } from 'react';
import './Home.css';
import mqtt from 'mqtt';
import { FaHome, FaChartBar, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Metrics from '../../components/metrics/Metrics';
import BodyTemperature from '../../components/bodyTemperature/BodyTemperature';
import FrequencyCardiac from '../../components/frequencyCardiac/FrequencyCardiac';
import MapComponent from '../../components/mapComponent/MapComponent';
import CountdownModal from '../../components/countmodal/CountDownModal';
import ConfirmEndModal from '../../components/ConfirmEndModal/ConfirmEndModal';

export default function Home() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [temperature, setTemperature] = useState<string | number>("--");
  const [frequency, setFrequency] = useState<string | number>("--");
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [activeButton, setActiveButton] = useState('actividad');
  const [showConfirmEndModal, setShowConfirmEndModal] = useState(false);

  useEffect(() => {
    const client = mqtt.connect('wss://broker.emqx.io:8084/mqtt');
    const topic = 'testtopic/2';

    client.on('connect', () => {
      console.log("Conectado a MQTT");
      client.subscribe(topic, (err) => {
        if (err) {
          console.error("Error al suscribirse al tema:", err);
        } else {
          console.log(`Suscripción exitosa al tema ${topic}`);
        }
      });
    });

    client.on('message', (_, message) => {
      console.log("Mensaje recibido:", message.toString());
      const data = JSON.parse(message.toString());
      setTemperature(parseFloat(data["temperatura del corporal"]).toFixed(2));
      setFrequency(parseFloat(data["temperantura ambiente"]).toFixed(2));
    });

    return () => {
      client.end();
    };
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isRunning]);

  const handleButtonClick = () => {
    if (isRunning) {
      setShowConfirmEndModal(true);
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
    if (showCountdown) {
      const countdownTimer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      if (countdown === 0) {
        clearInterval(countdownTimer);
        handleCountdownFinish();
      }

      return () => {
        clearInterval(countdownTimer);
      };
    }
  }, [showCountdown, countdown]);

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <header className="bg-gradient-to-br from-[#131922] via-[#1E3545] to-[#1A2A37] p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-white text-lg font-bold">ATHLETIC BAND</h1>
            <p className="text-gray-400 text-sm">ACTIVIDAD</p>
          </div>
        </div>
      </header>

      <main className="flex-grow bg-black">
        <div className="mx-4">
          <Metrics time={time} />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-6 mx-4">
          <FrequencyCardiac frequency={frequency} />
          <BodyTemperature initialTemperature={temperature} />
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
        <div className="flex justify-between items-center space-x-4">
          <button
            onClick={() => setActiveButton('estadisticas')}
            className={`w-1/3 px-4 py-2 rounded-md ${
              activeButton === 'estadisticas' ? 'bg-white text-black' : 'text-white'
            }`}
          >
            <Link to="/estadistics">
              <FaChartBar />
              Estadísticas
            </Link>
          </button>
          <button
            onClick={() => setActiveButton('actividad')}
            className={`w-1/3 px-4 py-2 rounded-md ${
              activeButton === 'actividad' ? 'bg-white text-black' : 'text-white'
            }`}
          >
            <Link to="/home">
              <FaHome />
              Actividad
            </Link>
          </button>
          <button
            onClick={() => setActiveButton('perfil')}
            className={`w-1/3 px-4 py-2 rounded-md ${
              activeButton === 'perfil' ? 'bg-white text-black' : 'text-white'
            }`}
          >
            <Link to="/profile">
              <FaUser />
              Perfil
            </Link>
          </button>
        </div>
      </footer>

      {showCountdown && (
        <CountdownModal
          countdown={countdown}
          onClose={() => setShowCountdown(false)}
          onFinish={handleCountdownFinish}
        />
      )}
      {showConfirmEndModal && (
        <ConfirmEndModal
          onConfirm={handleConfirmEnd}
          onCancel={handleCancelEnd}
        />
      )}
    </div>
  );
}
