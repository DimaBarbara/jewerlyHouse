import { SyncLoader } from "react-spinners";
import { useGetFavoritesQuery } from "../../redux/favorites/FavoriteApit";
import FavoritesItem from "../account/FavoritesItem";
import type { IFavoriteItem } from "../../models/IFavoriteItem";

const FavoritesList = () => {
  const { data: favorites, isLoading, error } = useGetFavoritesQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <SyncLoader color="#36d7b7" />
      </div>
    );
  }

  if (error) {
    let errorMessage = "An unknown error occurred.";
    if ("status" in error) {
      errorMessage = `Error ${error.status}: Failed to load favorites items.`;
    } else if ("message" in error) {
      errorMessage = `Connection problem: ${error.message}`;
    }
    return <div className="text-red-500 text-center py-4">{errorMessage}</div>;
  }
  if (!favorites) {
    return (
      <div className="text-gray-500 text-center py-4">No data available.</div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center gap-10 !mx-auto w-[850px] h-[500px] bg-gray-300 !pt-10 !px-16 overflow-hidden !mb-5 !mt-5">
        <h4 className="text-2xl font-semibold text-gray-700">
          You dont have favourite items.
        </h4>
        <p className="text-gray-500 mt-2">Time to add some!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-10 !mx-auto w-[850px] h-[500px] bg-gray-300 !pt-10 !px-16 overflow-hidden !mb-5 !mt-5">
      {favorites.map((item: IFavoriteItem, index) => (
        <FavoritesItem key={index} item={item} />
      ))}
    </div>
  );
};

export default FavoritesList;
