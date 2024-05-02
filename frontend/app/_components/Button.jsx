import React from 'react';

const Button = ({ text }) => {
  return (
    <button
      className="bg-main hover:opacity-85 text-white text-lg font-semibold py-1 px-10 rounded focus:outline-none focus:shadow-outline"
      type="button"
    >
      {text}
    </button>
  );
};

export default Button;
