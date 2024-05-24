'use client';

import React, { useState } from 'react';
import { SwitchIcon } from './_icons/SwitchIcon';
import Link from 'next/link';
import { ListIcon } from './_icons/ListIcon';
import { TagIcon } from './_icons/TagIcon';
import { TextBookIcon } from './_icons/TextBookIcon';
import { TrashCanIcon } from './_icons/TrashCanIcon';
import { DraftIcon } from './_icons/DraftIcon';

const EditModeSidebar = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  const handleButtonClick = (index) => {
    setActiveIndex(index);
    setHoverIndex(null);
  };

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const getButtonClass = (index, isTrash) => {
    if (hoverIndex === index) {
      return 'bg-baseColor text-main font-bold';
    } else if (activeIndex === index) {
      return 'bg-baseColor text-main font-bold';
    } else if (isTrash) {
      return 'bg-gray-400 hover:bg-baseColor hover:text-main hover:font-bold';
    } else {
      return 'hover:bg-baseColor hover:text-main hover:font-bold';
    }
  };

  return (
    <div className="flex flex-col text-lg text-white h-full">
      <Link href="/view-manuals">
        <div className="w-full flex justify-center text-black bg-accent2 hover:bg-baseColor hover:text-main py-4">
          <button className="mr-2 font-semibold">閲覧モードへ</button>
          <SwitchIcon />
        </div>
      </Link>

      <div className="flex-1 flex flex-col bg-main">
        <div
          className={`w-full flex-grow flex justify-center items-center py-3 ${getButtonClass(
            0,
            false,
          )}`}
          onClick={() => handleButtonClick(0)}
          onMouseEnter={() => handleMouseEnter(0)}
          onMouseLeave={handleMouseLeave}
        >
          <ListIcon />
          <button className="ml-1">マニュアル一覧</button>
        </div>
        <div
          className={`w-full flex-grow flex justify-center items-center py-3 ${getButtonClass(
            1,
            false,
          )}`}
          onClick={() => handleButtonClick(1)}
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={handleMouseLeave}
        >
          <TagIcon />
          <button className="ml-1">ジャンル</button>
        </div>
        <div
          className={`w-full flex-grow flex justify-center items-center py-3 ${getButtonClass(
            2,
            false,
          )}`}
          onClick={() => handleButtonClick(2)}
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={handleMouseLeave}
        >
          <TextBookIcon />
          <button className="ml-1">教育プログラム</button>
        </div>
        <div
          className={`w-full flex-grow flex justify-center items-center py-3 ${getButtonClass(
            3,
            false,
          )}`}
          onClick={() => handleButtonClick(3)}
          onMouseEnter={() => handleMouseEnter(3)}
          onMouseLeave={handleMouseLeave}
        >
          <DraftIcon />
          <button className="ml-1">下書き一覧</button>
        </div>
        <div
          className={`w-full flex justify-center items-center py-6 ${getButtonClass(
            4,
            true,
          )}`}
          onClick={() => handleButtonClick(4)}
          onMouseEnter={() => handleMouseEnter(4)}
          onMouseLeave={handleMouseLeave}
        >
          <TrashCanIcon />
          <button className="ml-1">ごみ箱</button>
        </div>
      </div>
    </div>
  );
};

export default EditModeSidebar;
