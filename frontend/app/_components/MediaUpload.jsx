'use client';

import React, { useState } from 'react';

const MediaUpload = ({ setMedia }) => {
  const [mediaPreview, setMediaPreview] = useState(null);

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaPreview(URL.createObjectURL(file));
      setMedia(file);
    }
  };

  return (
    <div className="relative w-[350px] h-[197px] bg-gray-200 flex justify-center items-center my-2 mx-6">
      <label className="cursor-pointer w-full h-full flex justify-center items-center">
        {!mediaPreview && (
          <span className="text-black text-2xl">ファイルを選択</span>
        )}
        {mediaPreview && (
          <img
            src={mediaPreview}
            alt="Uploaded"
            className="absolute top-0 left-0 w-full h-full object-contain"
          />
        )}
        <input type="file" onChange={handleMediaChange} className="hidden" />
      </label>
    </div>
  );
};

export default MediaUpload;
