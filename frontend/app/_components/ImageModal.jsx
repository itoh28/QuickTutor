import React from 'react';

const ImageModal = ({ imageSrc, onClose }) => {
  if (!imageSrc) return null;

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
      onClick={handleBackgroundClick}
    >
      <div className="relative max-w-7xl max-h-screen-full">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-4 text-white text-2xl bg-black bg-opacity-75 rounded-full p-2 hover:bg-opacity-100 w-10 h-10 flex items-center justify-center"
        >
          &times;
        </button>
        <img
          src={imageSrc}
          alt="拡大画像"
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
};

export default ImageModal;
