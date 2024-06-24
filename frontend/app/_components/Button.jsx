import React from 'react';

const Button = ({
  text,
  type,
  color = 'bg-main',
  fontSize = 'text-lg',
  rounded = 'rounded',
  py = 'py-2',
  px = 'px-10',
  onClick,
}) => {
  return (
    <button
      className={`${color} hover:opacity-85 text-white ${fontSize} font-semibold ${py} ${px} ${rounded} focus:outline-none focus:shadow-outline`}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
