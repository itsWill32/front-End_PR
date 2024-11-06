import React from 'react';

interface BodyTemperatureProps {
  temperature: number | string; // La temperatura puede ser un número o '--' como valor inicial
}

const BodyTemperature: React.FC<BodyTemperatureProps> = ({ temperature }) => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg text-white w-full text-center">
      <h2 className="text-sm font-bold">TEMPERATURA CORPORAL</h2>
      <p className="text-xl mt-2">{temperature}54 °C</p>
    </div>
  );
};

export default BodyTemperature;
