import { useGetItemByIdQuery } from "../../redux/items/ItemApi";
import { SyncLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import type { IItem } from "../../models/IItem";
import SwiperImages from "../common/SwiperImages";
import DoubleButton from "../common/DoubleButton";
import Input from "../common/Input";

interface RouteParams extends Record<string, string | undefined> {
  id: string;
}

function ItemInfo() {
  const { id } = useParams<RouteParams>();
  const validId = id ?? "";
  const {
    data: item = {} as IItem,
    error,
    isLoading,
  } = useGetItemByIdQuery(validId);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <SyncLoader color="#36d7b7" />
      </div>
    );
  }

  if (error) return <p className="text-red-500 font-medium">Loading error</p>;

  return (
    <div className="flex gap-24 w-[1400px] relative !pb-10">
      <div className="">
        {item.images && item.images.length > 1 ? (
          <SwiperImages images={item.images} />
        ) : item.image ? (
          <img
            alt={item.name}
            src={item.image}
            className={`w-[500px] h-[500px] object-cover rounded-md`}
          />
        ) : (
          <div className="w-[500px] h-[500px] rounded-md bg-gray-200 flex items-center justify-center">
            No image
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 items-start">
          <h3 className="font-playfair font-normal text-4xl text-black !mb-0">
            {item.name.toUpperCase()}
          </h3>
          <p className="font-brygada font-semibold text-2xl text-black">
            {item.price}$
          </p>
        </div>
        <div className="flex flex-col items-start">
          <div className=" flex flex-col gap-3 !mb-8">
            <p className="font-brygada font-medium text-xl text-black">
              *Quantity
            </p>
            <Input />
          </div>
          <DoubleButton />
        </div>
        <div className="flex flex-col gap-2 items-start !mt-32">
          <p className="font-brygada font-medium text-xl text-black">
            Material{" "}
            <span className="font-brygada font-normal text-xl text-black underline">
              {item.material}
            </span>
          </p>
          <p className="font-brygada font-medium text-xl text-black">
            Collection{" "}
            <span className="font-brygada font-normal text-xl text-black underline">
              {item.collection ? item.collection.name : "Not found"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ItemInfo;
