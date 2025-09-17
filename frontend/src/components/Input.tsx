import React from "react";

interface InputProps {
  placeholder: string;
  width: string;
  height: string;
}
const Input: React.FC<InputProps> = ({ placeholder, width, height }) => {
  return (
    <input
      className={`shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] bg-[linear-gradient(90deg,rgba(0,0,0,0.15)_0%,#000_39.9%)] text-white font-semibold  text-xl !pt-2 !pb-2 !pr-10 !pl-10 rounded-lg
                  ${width ? `w-[${width}]` : "w-auto"} 
                  ${height ? `h-[${height}]` : "h-auto"} `}
      placeholder={placeholder}
    />
  );
};

export default Input;
