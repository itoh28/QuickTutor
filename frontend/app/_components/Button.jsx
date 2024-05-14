import React from "react";

const Button = ({ text, type, fontSize = "text-lg" }) => {
  return (
    <button
      className={`bg-main hover:opacity-85 text-white ${fontSize} font-semibold py-2 px-10 rounded focus:outline-none focus:shadow-outline`}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
