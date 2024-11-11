import React from "react";

interface MusicPopupProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const MusicPopup: React.FC<MusicPopupProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl mb-4 font-bold">Turn on Music</h2>
        <p className="mb-6 max-w-lg">
          Would you like to turn on background music to enhance your gaming
          experience?
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPopup;
