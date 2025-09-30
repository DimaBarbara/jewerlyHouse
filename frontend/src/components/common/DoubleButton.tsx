import React from "react";

const DoubleButton = () => {
  return (
    <div className="shadow-md rounded-lg">
      <button className="w-[117px] h-[30px] text-base text-black bg-gray-300 rounded-l-lg">Add to cart</button>
      <button className="w-[117px] h-[30px] text-base text-white bg-black rounded-r-lg">BUY NOW</button>
    </div>
  );
};

export default DoubleButton;
