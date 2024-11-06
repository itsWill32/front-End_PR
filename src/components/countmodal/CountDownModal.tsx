import React, { useEffect, useState } from 'react';

interface CountdownModalProps {
  countdown: number;
  onClose: () => void;
  onFinish: () => void;
}

const CountdownModal: React.FC<CountdownModalProps> = ({ countdown, onClose, onFinish }) => {
  const [currentCountdown, setCurrentCountdown] = useState(countdown);

  useEffect(() => {
    if (currentCountdown <= 0) {
      onFinish(); // Llama a onFinish solo cuando el contador llega a 0
      return;
    }

    const countdownTimer = setTimeout(() => {
      setCurrentCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    return () => clearTimeout(countdownTimer);
  }, [currentCountdown, onFinish]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gradient-to-br from-[#131922] via-[#1E3545] to-[#1A2A37] p-6 rounded-lg text-center text-white">
        <h2 className="text-4xl font-bold mb-4">Comenzando en</h2>
        <p className="text-6xl font-bold">{currentCountdown}</p>
        <button
          onClick={onClose}
          className="mt-4 px-6 py-2 rounded-md font-semibold bg-white text-black hover:bg-gray-300 transition duration-200"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default CountdownModal;
