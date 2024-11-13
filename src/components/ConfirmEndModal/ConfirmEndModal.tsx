import React from 'react';

interface ConfirmEndModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmEndModal: React.FC<ConfirmEndModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1A2A37] p-6 rounded-lg shadow-lg w-11/12 max-w-sm text-white text-center">
        <h2 className="text-lg font-bold mb-4 text-[#00D084]">¿Deseas terminar la actividad?</h2>
        <p className="text-sm text-gray-300 mb-6">Confirma si deseas finalizar la actividad actual.</p>
        <div className="flex justify-center space-x-3">
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#00D084] text-white px-4 py-2 rounded-md hover:bg-[#00a065] transition"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEndModal;
