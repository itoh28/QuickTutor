'use client';

import React, { useState, useRef } from 'react';

const MediaUpload = ({ setMedia }) => {
  const [mediaPreview, setMediaPreview] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const fileInputRef = useRef(null);

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const filetype = file.type;
      const validImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];
      const validVideoTypes = ['video/mp4', 'video/mov'];

      if (
        validImageTypes.includes(filetype) ||
        validVideoTypes.includes(filetype)
      ) {
        setMediaPreview(URL.createObjectURL(file));
        setMediaType(validImageTypes.includes(filetype) ? 'image' : 'video');
        setMedia(file);
      } else {
        alert(
          '対応していないファイル形式です。画像または動画をアップロードしてください。',
        );
      }
    }
  };

  const handleVideoClick = () => {
    if (mediaType === 'video' && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="relative w-[350px] h-[197px] bg-gray-200 flex justify-center items-center my-2 mx-6">
      <label className="cursor-pointer w-full h-full flex justify-center items-center">
        {!mediaPreview && (
          <span className="text-black text-2xl">ファイルを選択</span>
        )}
        {mediaPreview && mediaType === 'image' && (
          <img
            src={mediaPreview}
            alt="Uploaded"
            className="absolute top-0 left-0 w-full h-full object-contain"
          />
        )}
        {mediaPreview && mediaType === 'video' && (
          <video
            src={mediaPreview}
            controls
            onClick={handleVideoClick}
            className="absolute top-0 left-0 w-full h-full object-contain"
          ></video>
        )}
        <input
          type="file"
          onChange={handleMediaChange}
          ref={fileInputRef}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default MediaUpload;
