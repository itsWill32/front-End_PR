import React, { useEffect, useState } from 'react';
import { connectWebSocket } from '../../websocket';

const FrequencyCardiac: React.FC = () => {
  const [frequency, setFrequency] = useState<number | string>("--");

  useEffect(() => {
    const ws = connectWebSocket();

    const handleMessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      if (message.type === 'ritmoCardiaco') {
        setFrequency(parseFloat(message.data.lectura).toFixed(0));
      }
    };

    ws.addEventListener('message', handleMessage);

    return () => {
      ws.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div className="bg-gray-900 p-4 rounded-lg text-white w-full text-center">
      <h2 className="text-sm font-bold">FRECUENCIA CARDÍACA</h2>
      <p className="text-xl mt-2">{frequency} bpm</p>
    </div>
  );
};

export default FrequencyCardiac;
