import './Metrics.css';

interface MetricsProps {
  time: number;
}

const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default function Metrics({ time }: MetricsProps) {
  return (
    <div className="bg-gradient-to-br from-[#131922] via-[#1E3545] to-[#1A2A37] p-4 rounded-lg text-white mx-4 mt-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">{formatTime(time)}</h2> {/* Muestra el tiempo formateado */}
        <p className="text-gray-400 text-sm">DURACIÓN</p>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <h2 className="text-lg font-bold">35.00</h2>
          <p className="text-gray-400 text-xs">DISTANCIA (KM)</p>
        </div>

        <div>
          <h2 className="text-lg font-bold">1700</h2>
          <p className="text-gray-400 text-xs">CALORÍAS (KCAL)</p>
        </div>

        <div>
          <h2 className="text-lg font-bold">85.6</h2>
          <p className="text-gray-400 text-xs">RITMO MEDIO</p>
        </div>
      </div>
    </div>
  );
}
