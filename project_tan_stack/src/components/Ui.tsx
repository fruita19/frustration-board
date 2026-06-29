import React from 'react';
export function StandardButton({ onClick, children, disabled = false }: any) {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className="w-32 h-10 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center transition-all"
    >
      {children}
    </button>
  );
}
export function HistoryModal({ isOpen, onClose, children }: any) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl min-w-[300px]">
        <h2 className="text-xl font-bold mb-4">Historia</h2>
        {children}
        <div className="mt-4 flex justify-center">
          <StandardButton onClick={onClose}>Zamknij</StandardButton>
        </div>
      </div>
    </div>
  );
}