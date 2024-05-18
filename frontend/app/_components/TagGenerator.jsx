'use client';

import React, { useState, useEffect } from 'react';

const TagGenerator = ({ setTags }) => {
  const [inputValue, setInputValue] = useState('');
  const [tags, setLocalTags] = useState([]);

  useEffect(() => {
    setTags(tags);
  }, [tags, setTags]);

  const addTag = (e) => {
    if (
      e.key === 'Enter' &&
      e.target.value.trim() !== '' &&
      e.target.value.trim().length < 16 &&
      tags.length < 5
    ) {
      const newTags = [...tags, inputValue.trim()];
      setLocalTags(newTags);
      setInputValue('');
      e.preventDefault();
    }
  };

  const removeTag = (indexToRemove) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    setLocalTags(newTags);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
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
