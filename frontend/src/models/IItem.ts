import type { ICartItem } from "./ICartItem";
import type { ICategory } from "./ICategory";
import type { ICollection } from "./ICollection";
import type { IFavoriteItem } from "./IFavoriteItem";
import type { IOrderItem } from "./IOrderItem";

export interface IItem {
  id?: number;
  name: string;
  price: number;
  image: string | null;
  images: string[];
  material: string;
  categoryId: number;
  category?: ICategory;
  collectionId: number;
  collection?: ICollection;
  isNew: boolean;
  favoritedBy?: IFavoriteItem[];
  cartItems?: ICartItem[];
  orderItems?: IOrderItem[];
  createdAt?: string;
  updatedAt?: string;
}
