'use client';

import React, { useState, useEffect } from 'react';
import { SwitchIcon } from './_icons/SwitchIcon';
import Link from 'next/link';
import { ListIcon } from './_icons/ListIcon';
import { TagIcon } from './_icons/TagIcon';
import { TrashCanIcon } from './_icons/TrashCanIcon';
import { DraftIcon } from './_icons/DraftIcon';
import { usePathname, useRouter } from 'next/navigation';

const EditModeSidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    switch (true) {
      case pathname.startsWith('/edit-manual-list'):
        setActiveIndex(0);
        break;
      case pathname.startsWith('/edit-genre-list') ||
        pathname.startsWith('/edit-genre/'):
        setActiveIndex(1);
        break;
      case pathname.startsWith('/draft-list'):
        setActiveIndex(3);
        break;
      case pathname.startsWith('/deleted-manual-list'):
        setActiveIndex(4);
        break;
      default:
        setActiveIndex(0);
        break;
    }
  }, [pathname]);

  const handleButtonClick = (index, path) => {
    setActiveIndex(index);
    router.push(path);
  };

  const getButtonClass = (index) => {
    if (index === activeIndex) {
      return 'bg-main text-white font-bold';
    }
  };

  return (
    <div className="flex flex-col text-lg text-white h-full w-48">
      <Link href="/view-manual-list">
        <div className="w-full flex justify-center text-black bg-amber-300 py-4">
          <button className="mr-2 font-semibold flex items-center">
            閲覧モードへ <SwitchIcon className="ml-2" />
          </button>
        </div>
      </Link>

      <div className="flex-1 flex flex-col justify-between text-main font-bold bg-baseColor">
        <div
          className={`w-full flex-grow flex items-center justify-center py-3 ${getButtonClass(
            0,
            false,
          )}`}
          onClick={() => handleButtonClick(0, '/edit-manual-list')}
        >
          <ListIcon />
          <span className="ml-1">マニュアル一覧</span>
        </div>

        <div
          className={`w-full flex-grow flex items-center justify-center py-3 ${getButtonClass(
            1,
            false,
          )}`}
          onClick={() => handleButtonClick(1, '/edit-genre-list')}
        >
          <TagIcon />
          <span className="ml-1">ジャンル</span>
        </div>

        <div
          className={`w-full flex-grow flex items-center justify-center py-3 ${getButtonClass(
            3,
            false,
          )}`}
          onClick={() => handleButtonClick(3, '/draft-list')}
        >
          <DraftIcon />
          <span className="ml-1">下書き一覧</span>
        </div>

        <div
          className={`w-full flex justify-center items-center bg-gray-400 text-white py-6 ${getButtonClass(
            4,
            true,
          )}`}
          onClick={() => handleButtonClick(4, '/deleted-manual-list')}
        >
          <TrashCanIcon />
          <span className="ml-1">ごみ箱</span>
        </div>
      </div>
    </div>
  );
};

export default EditModeSidebar;
