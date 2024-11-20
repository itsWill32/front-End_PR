import React, { useEffect, useState } from 'react';
import { connectWebSocket } from '../../websocket';

const BodyTemperature: React.FC = () => {
  const [temperature, setTemperature] = useState<number | string>("--");

  useEffect(() => {
    const ws = connectWebSocket();

    const handleMessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      if (message.type === 'temperatura') {
        setTemperature(parseFloat(message.data).toFixed(2));
      }
    };

    ws.addEventListener('message', handleMessage);

    return () => {
      ws.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div className="bg-gray-900 p-4 rounded-lg text-white w-full text-center">
      <h2 className="text-sm font-bold">TEMPERATURA CORPORAL</h2>
      <p className="text-xl mt-2">{temperature} °C</p>
    </div>
  );
};

export default BodyTemperature;
