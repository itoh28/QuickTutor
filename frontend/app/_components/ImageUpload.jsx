"use client";

import React, { useState } from "react";

const ImageUpload = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="relative w-[350px] h-[197px] bg-gray-200 flex justify-center items-center my-2 mx-6">
      <label className="cursor-pointer w-full h-full flex justify-center items-center">
        {!image && <span className="text-black text-2xl">ファイルを選択</span>}
        {image && (
          <img
            src={image}
            alt="Uploaded"
            className="absolute top-0 left-0 w-full h-full object-contain"
          />
        )}
        <input type="file" onChange={handleImageChange} className="hidden" />
      </label>
    </div>
  );
};

export default ImageUpload;
