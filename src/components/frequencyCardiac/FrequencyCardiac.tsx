import React from 'react';

interface FrequencyCardiacProps {
  frequency: number | string; // La frecuencia puede ser un número o '--' como valor inicial
}

const FrequencyCardiac: React.FC<FrequencyCardiacProps> = ({ frequency }) => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg text-white w-full text-center">
      <h2 className="text-sm font-bold">FRECUENCIA CARDÍACA</h2>
      <p className="text-xl mt-2">{frequency}100 bpm</p>
    </div>
  );
};

export default FrequencyCardiac;

