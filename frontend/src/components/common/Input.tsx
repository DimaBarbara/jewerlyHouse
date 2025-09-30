import React, { useState, type ChangeEvent } from "react";

interface inputProps {
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
}
const Stepper = ({
  initialValue = 1, // Сделаем 1 по умолчанию, как на картинке
  min = 1,          // Установим минимум 1
  max = 100,
  step = 1,
}: inputProps) => {
  const [value, setValue] = useState<number>(initialValue);

  const handlePlus = () => {
    setValue((prevValue) => Math.min(prevValue + step, max));
  };

  const handleMinus = () => {
    setValue((prevValue) => Math.min(Math.max(prevValue - step, min)));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(e.target.value, 10);
    
    if (isNaN(newValue) || e.target.value === '') { 
      setValue(min);
      return;
    }

    newValue = Math.max(min, Math.min(max, newValue));
    setValue(newValue);
  };

  return (
    <div className="flex border border-black overflow-hidden items-stretch shadow-md">
      
  
      <button 
        className="text-black w-6 h-6 text-sm flex items-center justify-center 
                   hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed" 
        onClick={handleMinus} 
        disabled={value <= min}
      >
        −
      </button>
      <input
        type="number"
        className=" flex items-center justify-center w-8 text-center text-sm border-x border-gray-400 
                   focus:ring-0 focus:outline-none [appearance:textfield] m-0"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
      />
      
      <button 
        className="text-black w-6 h-6 text-sm flex items-center justify-center 
                   hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed" 
        onClick={handlePlus} 
        disabled={value >= max}
      >
        +
      </button>
    </div>
  );
};

export default Stepper;