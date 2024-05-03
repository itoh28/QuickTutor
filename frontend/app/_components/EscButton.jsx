'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const EscButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div onClick={handleBack} className="flex flex-col items-center m-4">
      <button className="rounded-full border-solid border-black border-2 px-2">
        <span className="text-3xl">×</span>
      </button>
      <p>esc</p>
    </div>
  );
};

export default EscButton;
