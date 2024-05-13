'use client';

import React, { useRef, useState } from 'react';
import Header from '../_components/Header';
import EscButton from '../_components/EscButton';
import Button from '../_components/Button';
import ImageUpload from '../_components/ImageUpload';
import TagGenerator from '../_components/TagGenerator';
import StepManager from '../_components/StepManager';

const CreateManual = () => {
  const [title, setTitle] = useState('');
  const titleInputRef = useRef(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      titleInputRef.current?.blur();
    }
  };

  return (
    <div className="w-full h-full bg-base flex flex-col items-center overflow-hidden">
      <Header />
      <div className="w-4/5 rounded-t bg-main text-2xl font-bold mt-12">
        <div className="flex">
          <div className="mr-4 py-6">
            <ImageUpload />
          </div>
          <div className="flex-grow flex flex-col my-2">
            <div className="flex w-full justify-between">
              <div className="mt-6">
                <TagGenerator />
              </div>
              <div className="mt-3">
                <EscButton />
              </div>
            </div>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              onKeyDown={handleKeyPress}
              placeholder="タイトルを入力(最大30文字)"
              maxLength={30}
              className="my-6 mr-4 p-2 max-w-xl text-lg bg-white rounded focus:outline-none"
              ref={titleInputRef}
            />
          </div>
        </div>
      </div>
      <div className="w-4/5 mb-12">
        <StepManager />
      </div>
      <div className="flex justify-evenly w-full mb-12">
        <Button text="下書き保存" type="submit" fontSize="text-xl" />
        <Button text="作成" fontSize="text-xl" />
      </div>
    </div>
  );
};

export default CreateManual;
