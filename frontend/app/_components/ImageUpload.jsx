'use client';

import React, { useState } from 'react';

const ImageUpload = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === 'image') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        onImageUpload(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  return (
    <div className="p-4 border-2 border-dashed border-gray-300 relative">
      {image ? (
        <img src={image} alt="Uploaded" className="w-full h-auto" />
      ) : (
        <button
          className="focus:outline-none w-full h-full"
          onClick={() => document.getElementById('fileInput').click()}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M7 12l5 5 5-5m0 0l-5-5-5 5m5 5V6"></path>
            </svg>
            <span className="text-sm text-gray-500">
              クリックして画像をアップロード
            </span>
          </div>
        </button>
      )}
      <input
        id="fileInput"
        type="file"
        className="hidden"
        onChange={handleImageChange}
      />
      {image && (
        <button
          className="absolute bottom-2 right-2 p-1 bg-yellow-400 rounded-full"
          onClick={() => console.log('Edit image')}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M15.232 5.232l3.536 3.536m-9.192 2.848l9.192-9.192a2.828 2.828 0 114 4L10.44 15.88a2 2 0 01-.894.448l-3.51.878a1 1 0 01-1.212-1.212l.878-3.51a2 2 0 01.448-.894z"></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default ImageUpload;
