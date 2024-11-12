import React from 'react';

interface ChestMeasurementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (chestSize: string) => void;
}

const ChestMeasurementModal: React.FC<ChestMeasurementModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [chestSize, setChestSize] = React.useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(chestSize);
    setChestSize('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Ingresa tus medidas</h2>
        <label className="block text-gray-600 mb-2">Medida del pecho (en cm):</label>
        <input 
          type="number" 
          value={chestSize} 
          onChange={(e) => setChestSize(e.target.value)} 
          className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#00D084]"
        />
        <div className="flex justify-end space-x-2">
          <button 
            onClick={onClose} 
            className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button 
            onClick={handleConfirm} 
            className="bg-[#00D084] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#00a065] transition"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChestMeasurementModal;
