import React from 'react';
import { SwitchIcon } from './_icons/SwitchIcon';
import Link from 'next/link';
import { ListIcon } from './_icons/ListIcon';
import { TagIcon } from './_icons/TagIcon';
import { TextBookIcon } from './_icons/TextBookIcon';

const ViewModeSidebar = () => {
  return (
    <div className="flex flex-col text-lg text-white h-full">
      <Link href="/edit-manuals">
        <div className="w-full flex justify-center text-black bg-accent2 hover:bg-baseColor hover:text-main py-4">
          <button className="mr-2 font-semibold">編集モードへ</button>
          <SwitchIcon />
        </div>
      </Link>
      <div className="flex-1 flex flex-col bg-main">
        <div className="w-full flex-grow flex justify-center items-center hover:bg-baseColor hover:text-main  hover:font-bold py-3">
          <ListIcon />
          <button className="ml-1">マニュアル一覧</button>
        </div>
        <div className="w-full flex-grow flex justify-center items-center hover:bg-baseColor hover:text-main  hover:font-bold py-3">
          <TagIcon />
          <button className="ml-1">ジャンル</button>
        </div>
        <div className="w-full flex-grow flex justify-center items-center hover:bg-baseColor hover:text-main  hover:font-bold py-3">
          <TextBookIcon />
          <button className="ml-1">教育プログラム</button>
        </div>
      </div>
    </div>
  );
};

export default ViewModeSidebar;
