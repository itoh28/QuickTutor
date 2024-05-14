"use client";

import { useRouter } from "next/navigation";
import React from "react";

const EscButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex justify-end mx-4">
      <div onClick={handleBack} className="flex flex-col items-center">
        <button className="rounded-full bg-white px-2">
          <span className="text-main text-3xl">×</span>
        </button>
        <button>
          <p className="text-xs text-white">esc</p>
        </button>
      </div>
    </div>
  );
};

export default EscButton;
