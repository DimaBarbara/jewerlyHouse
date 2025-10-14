import type React from "react";
import type { ICartItem } from "../../models/ICartItem";
import SizeInput from "../common/SizeInput";
import trashIcon from "../../assets/svg/trash.svg";
import Input from "../common/Input";
import { useDeleteItemMutation } from "../../redux/cart/CartApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../redux/auth/selectors";

interface CartProp {
  item: ICartItem;
}

const CartItem: React.FC<CartProp> = ({ item }) => {
  const [deleteItem] = useDeleteItemMutation();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleDeleteItem = async () => {
    try {
      const userId = 12;

      if (isAuthenticated) {
        if (typeof item.item?.id !== "number") {
          toast.error("Error: incorrect item ID");
          return;
        }
        await deleteItem({ userId, itemId: item.item.id }).unwrap();
        toast.success(`Item "${item.item.name}" deleted successfully`);
      } else {
        const stored = JSON.parse(localStorage.getItem("cart") || "[]");
        const updatedCart = stored.filter(
          (i: { id: number | undefined }) => i.id !== item.item?.id,
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        toast.success(`Item "${item.item?.name}" removed from  cart`);
      }
    } catch (e) {
      console.error(e);
      toast.error("Error deleting item");
    }
  };

  return (
    <div className="flex !justify-between w-full ">
      <div className="flex">
        <div className="flex flex-col gap-2 !mr-6">
          {item.item?.image ? (
            <img
              alt={item.item?.name}
              src={item.item?.image}
              className="w-[150px] h-[150px] rounded-md"
            />
          ) : (
            <div className="w-[150px] h-[150px] rounded-md bg-gray-200 flex items-center justify-center">
              No image
            </div>
          )}
        </div>
        <div className="flex flex-col justify-start items-start">
          <h3 className="font-playfair font-normal text-2xl text-black !mb-3">
            {item.item?.name.toUpperCase()}
          </h3>
          <p className="font-brygada font-normal text-base text-black !mb-1.5">
            Price <span className="!pl-6">{item.item?.price}$</span>
          </p>
          <div className="flex flex-col items-start !mb-1.5">
            <div className=" flex gap-3 ">
              <p className="font-brygada font-normal text-base text-black">
                Quantity
              </p>
              <Input quantity={item.quantity} />
            </div>
          </div>
          <div className="flex">
            <p className="font-brygada font-normal text-base text-black">
              Size
            </p>
            <SizeInput />
          </div>
        </div>
      </div>
      <div>
        <img
          src={trashIcon}
          alt="test"
          onClick={handleDeleteItem}
          className="w-[24px] h-[24px] "
        />
      </div>
    </div>
  );
};

export default CartItem;
