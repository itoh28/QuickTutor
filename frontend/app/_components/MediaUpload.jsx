'use client';

import React, { useState, useEffect, useRef } from 'react';

const MediaUpload = ({
  setMedia,
  initialMedia = null,
  allowOnlyImages = false,
}) => {
  const [mediaPreview, setMediaPreview] = useState(initialMedia?.url || null);
  const [mediaType, setMediaType] = useState(initialMedia?.type || null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (initialMedia) {
      setMediaPreview(initialMedia.url);
      setMediaType(initialMedia.type);
    }
  }, [initialMedia]);

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const filetype = file.type;
      const validImageTypes = ['image/jpeg', 'image/JPG', 'image/png'];
      const validVideoTypes = ['video/mp4', 'video/quicktime'];

      if (
        validImageTypes.includes(filetype) ||
        (!allowOnlyImages && validVideoTypes.includes(filetype))
      ) {
        setMediaPreview(URL.createObjectURL(file));
        setMediaType(validImageTypes.includes(filetype) ? 'image' : 'video');
        setMedia({
          url: URL.createObjectURL(file),
          type: validImageTypes.includes(filetype) ? 'image' : 'video',
          file,
        });
      } else {
        alert('サポートされていないファイル形式です。');
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
            className="w-full h-full object-contain"
          />
        )}
        {mediaPreview && mediaType === 'video' && (
          <video
            src={mediaPreview}
            controls
            onClick={handleVideoClick}
            className="w-full h-full object-contain"
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
