import React, { useEffect, useState } from 'react';

interface BodyTemperatureProps {
  initialTemperature?: number | string;
}

const BodyTemperature: React.FC<BodyTemperatureProps> = ({ initialTemperature = '--' }) => {
  const [temperature, setTemperature] = useState<number | string>(initialTemperature);

  useEffect(() => {
    // Conexión WebSocket
    const ws = new WebSocket('ws://localhost:3000');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.temperature) {
        setTemperature(data.temperature);
      }
    };

    return () => ws.close();
  }, []);

  return (
    <div className="bg-gray-900 p-4 rounded-lg text-white w-full text-center">
      <h2 className="text-sm font-bold">TEMPERATURA CORPORAL</h2>
      <p className="text-xl mt-2">{temperature} °C</p>
    </div>
  );
};

export default BodyTemperature;
