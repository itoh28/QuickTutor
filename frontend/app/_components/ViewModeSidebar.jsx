'use client';

import React, { useState, useEffect } from 'react';
import { SwitchIcon } from './_icons/SwitchIcon';
import Link from 'next/link';
import { ListIcon } from './_icons/ListIcon';
import { TagIcon } from './_icons/TagIcon';
import { usePathname, useRouter } from 'next/navigation';

const ViewModeSidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    switch (true) {
      case pathname.startsWith('/view-manual-list'):
        setActiveIndex(0);
        break;
      case pathname.startsWith('/view-genre-list') ||
        pathname.startsWith('/genre/'):
        setActiveIndex(1);
        break;
      default:
        setActiveIndex(0);
        break;
    }
  }, [pathname]);

  const handleButtonClick = (index, path) => {
    setActiveIndex(index);
    setHoverIndex(null);
    router.push(path);
  };

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const getButtonClass = (index) => {
    if (index === activeIndex) {
      return 'bg-baseColor text-main font-bold';
    } else if (hoverIndex === index) {
      return 'bg-baseColor text-main font-bold';
    } else {
      return 'hover:bg-baseColor hover:text-main hover:font-bold';
    }
  };

  return (
    <div className="flex flex-col text-lg text-white h-full">
      <Link href="/edit-manual-list">
        <div className="w-full flex justify-center text-black bg-accent2 hover:bg-baseColor hover:text-main py-4">
          <button className="mr-2 font-semibold flex items-center">
            編集モードへ <SwitchIcon className="ml-2" />
          </button>
        </div>
      </Link>

      <div className="flex-1 flex flex-col justify-between bg-main">
        <div
          className={`w-full flex-grow flex items-center justify-center py-3 ${getButtonClass(
            0,
          )}`}
          onClick={() => handleButtonClick(0, '/view-manual-list')}
          onMouseEnter={() => handleMouseEnter(0)}
          onMouseLeave={handleMouseLeave}
        >
          <ListIcon />
          <span className="ml-1">マニュアル一覧</span>
        </div>

        <div
          className={`w-full flex-grow flex items-center justify-center py-3 ${getButtonClass(
            1,
          )}`}
          onClick={() => handleButtonClick(1, '/view-genre-list')}
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={handleMouseLeave}
        >
          <TagIcon />
          <span className="ml-1">ジャンル</span>
        </div>
      </div>
    </div>
  );
};

export default ViewModeSidebar;
