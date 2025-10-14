import { useGetFavoritesQuery } from "../redux/favorites/FavoriteApit";

export const useIsFavorite = (itemId: number): boolean => {
  const { data: favorites, isLoading } = useGetFavoritesQuery();

  if (isLoading || !favorites) {
    return false;
  }
  return favorites.some((favoriteItem) => favoriteItem.itemId === itemId);
};
