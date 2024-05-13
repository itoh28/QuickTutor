"use client";

import React, { useState } from "react";

const TagGenerator = () => {
  const [tags, setTags] = useState([]);

  const addTag = (e) => {
    if (
      e.key === "Enter" &&
      e.target.value.trim() !== "" &&
      e.target.value.trim().length < 16 &&
      tags.length < 5
    ) {
      setTags([...tags, e.target.value.trim()]);
      e.target.value = "";
      e.preventDefault();
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <input
        type="text"
        onKeyDown={addTag}
        placeholder="ジャンルを入力(5個まで設定可)"
        maxLength={15}
        className="w-56 p-2 text-black text-sm rounded focus:outline-none"
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="bg-gray-100 text-sm font-bold rounded-full flex items-center px-3"
          >
            {tag}
            <button
              onClick={() => removeTag(index)}
              className="ml-2 text-lg text-red-600 hover:text-red-800 focus:outline-none"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagGenerator;
