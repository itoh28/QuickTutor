import React from 'react';

export function EnlargeIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
      className="text-white bg-black bg-opacity-75 rounded-full p-2 hover:bg-opacity-100 w-8 h-8 flex items-center justify-center"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M14.5 9.5L21 3m0 0h-6m6 0v6M3 21l6.5-6.5M3 21v-6m0 6h6"
      ></path>
    </svg>
  );
}
