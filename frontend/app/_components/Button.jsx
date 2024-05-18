import React from 'react';

const Button = ({ text, type, fontSize = 'text-lg', onClick }) => {
  return (
    <button
      className={`bg-main hover:opacity-85 text-white ${fontSize} font-semibold py-2 px-10 rounded focus:outline-none focus:shadow-outline`}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
