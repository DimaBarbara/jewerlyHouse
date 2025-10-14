import type React from "react";
import trashIcon from "../../assets/svg/trash.svg";
import { toast } from "react-toastify";
import type { IFavoriteItem } from "../../models/IFavoriteItem";
import { useRemoveItemFromFavoritesMutation } from "../../redux/favorites/FavoriteApit";

interface FavoriteProp {
  item: IFavoriteItem;
}

const FavoritesItem: React.FC<FavoriteProp> = ({ item }) => {
  const itemId = item.item?.id;
  const itemName = item.item?.name;

  const [deleteItem] = useRemoveItemFromFavoritesMutation();

  const handleDeleteItem = async () => {
    if (typeof itemId !== "number") {
      toast.error("Error: Item ID is missing.");
      return;
    }

    try {
      await deleteItem(itemId).unwrap();
      toast.success(`Item "${itemName || "Item"}" removed from favorites`);
    } catch (e) {
      console.error(e);
      toast.error("Error removing item from favorites.");
    }
  };

  if (!item.item) {
    return <div className="text-red-500">Error loading item data.</div>;
  }

  return (
    <div className="flex !justify-between w-full border-b pb-4 mb-4">
      <div className="flex">
        <div className="flex flex-col gap-2 !mr-6">
          {item.item.image ? (
            <img
              alt={item.item.name}
              src={item.item.image}
              className="w-[150px] h-[150px] rounded-md object-cover"
            />
          ) : (
            <div className="w-[150px] h-[150px] rounded-md bg-gray-200 flex items-center justify-center">
              No image
            </div>
          )}
        </div>
        <div className="flex flex-col justify-start items-start">
          <h3 className="font-playfair font-normal text-2xl text-black !mb-3">
            {item.item.name.toUpperCase()}
          </h3>
          <p className="font-brygada font-normal text-base text-black !mb-1.5">
            Price: <span className="!pl-6">{item.item.price}$</span>
          </p>
          <p className="font-brygada font-normal text-base text-black">
            Material: <span className="!pl-6">{item.item.material}</span>
          </p>
        </div>
      </div>
      <div className="cursor-pointer transition-opacity duration-200 hover:opacity-75">
        <img
          src={trashIcon}
          alt="Remove from favorites"
          onClick={handleDeleteItem}
          className="w-[24px] h-[24px]"
        />
      </div>
    </div>
  );
};

export default FavoritesItem;
