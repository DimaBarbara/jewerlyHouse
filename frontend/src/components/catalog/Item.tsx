import { useState } from "react";
import cartItemIcon from "../../assets/svg/cartItem.svg";
import heartIcon from "../../assets/svg/heart.svg";
import type { IItem } from "../../models/IItem";
import { Link, useParams } from "react-router-dom";
import { useAddItemMutation } from "../../redux/cart/CartApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../redux/auth/selectors";

interface ItemProps {
  item: IItem;
}

const Item = ({ item }: ItemProps) => {
  const [addItem] = useAddItemMutation();
  const [liked, setLiked] = useState(false);
  const { category } = useParams<{ category: string }>();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const handleAddToCart = async () => {
    try {
      const userId = 12;
      const quantityToAdd = 1;

      if (typeof item.id !== "number") {
        toast.error("Error: incorrect item ID");
        return;
      }
      if (isAuthenticated) {
        await addItem({ userId, itemId: item.id, quantityToAdd }).unwrap();
        toast.success(`Item "${item.name}" added to cart successfully`);
      }

      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      const existingItem = cart.find(
        (i: { id: number | undefined }) => i.id === item.id,
      );
      if (existingItem) {
        existingItem.quantity += quantityToAdd;
      } else {
        cart.push({ id: item.id, item: { ...item }, quantity: quantityToAdd });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success(`Item "${item.name}" added to cart`);
    } catch (e) {
      console.error(e);
      toast.error("Error adding item to cart");
    }
  };

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
      <Link to={`/catalog/${category}/${item.id}`}>
        <h3 className="flex font-playfair text-xl font-normal text-black !mb-0">
          {item.name.toUpperCase()}
        </h3>
      </Link>
      <div className="flex justify-between">
        <p className="font-brygada text-lg ">{item.price}$</p>
        <div className="flex gap-2">
          <img
            src={cartItemIcon}
            alt="Cart icon"
            className="w-[23px] h-[23px]"
            onClick={handleAddToCart}
          />
          <img
            src={heartIcon}
            alt="Heart icon"
            className={`w-[23px] h-[23px] cursor-pointer ${
              liked
                ? "filter saturate-150 brightness-150 hue-rotate-330 fill-rose-900"
                : ""
            }`}
            onClick={() => setLiked(!liked)}
          />
        </div>
      </div>
    </div>
  );
};

export default Item;
