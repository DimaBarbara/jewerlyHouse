import type { ICartItem } from "./ICartItem";
import type { IFavoriteItem } from "./IFavoriteItem";
import type { IOrderItem } from "./IOrderItem";

export interface IItem {
  id: number;
  name: string;
  price: number;
  image?: string;
  images: string[];
  material: string;
  categoryId: number;
  collectionId: number;
  isNew: boolean;
  favoritedBy: IFavoriteItem[];
  cartItems: ICartItem[];
  orderItems: IOrderItem[];
  createdAt: string;
  updatedAt: string;
}
