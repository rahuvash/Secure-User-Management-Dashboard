import React from 'react';

interface ModalProps {
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <p className="text-gray-700 mb-4">{message}</p>
      <button
        onClick={onClose}
        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
      >
        Close
      </button>
    </div>
  </div>
);

export default Modal;
