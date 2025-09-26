import { useState } from "react";
import cartItemIcon from "../../assets/svg/cartItem.svg";
import heartIcon from "../../assets/svg/heart.svg";
import type { IItem } from "../../models/IItem";

interface ItemProps {
  item: IItem;
}

const Item = ({ item }: ItemProps) => {
  const [liked, setLiked] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      {item.image ? (
        <img
          alt={item.name}
          src={item.image}
          className="w-[300px] h-[300px] rounded-md"
        />
      ) : (
        <div className="w-[300px] h-[300px] rounded-md bg-gray-200 flex items-center justify-center">
          No image
        </div>
      )}
      <h3 className="flex font-playfair text-xl font-normal text-black !mb-0">
        {item.name.toUpperCase()}
      </h3>
      <div className="flex justify-between">
        <p className="font-brygada text-lg ">{item.price}$</p>
        <div className="flex gap-2">
          <img
            src={cartItemIcon}
            alt="Cart icon"
            className="w-[23px] h-[23px]"
          />
          <img
            src={heartIcon}
            alt="Heart icon"
            className={`w-[23px] h-[23px] cursor-pointer ${
              liked ? "filter saturate-150 brightness-150 hue-rotate-330 fill-rose-900" : ""
            }`}
            onClick={() => setLiked(!liked)}
          />
        </div>
      </div>
    </div>
  );
};

export default Item;
