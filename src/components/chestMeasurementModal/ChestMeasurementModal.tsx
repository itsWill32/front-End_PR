import React, { useState } from 'react';

interface ChestMeasurementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (chestSize: string) => void;
}

const ChestMeasurementModal: React.FC<ChestMeasurementModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [chestSize, setChestSize] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      const numericValue = Number(value);
      if (numericValue <= 200) {
        setChestSize(value);
      }
    }
  };

  const isValid = chestSize !== '' && Number(chestSize) > 0 && Number(chestSize) <= 200;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 md:w-1/3">
        <h2 className="text-xl font-bold mb-4">Confirma tus medidas</h2>
        <input
          type="text"
          value={chestSize}
          onChange={handleChange}
          placeholder="Ingresa la medida de tu pecho (cm)"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        />
        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(chestSize)}
            className={`py-2 px-4 rounded-lg transition ${
              isValid ? 'bg-[#00D084] text-white hover:bg-[#00a065]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!isValid}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChestMeasurementModal;
