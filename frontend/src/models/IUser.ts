import type { ICart } from "./ICart";
import type { IFavoriteItem } from "./IFavoriteItem";
import type { IOrder } from "./IOrder";

export interface IUser {
  id?: number;
  email: string;
  name: string;
  surname: string;
  password: string;
  favoriteItems?: IFavoriteItem[]; 
  cart?: ICart; 
  orders?: IOrder[]; 
  role?: 'USER' | 'ADMIN' | string; 
  createdAt?: string; 
  updatedAt?: string;
}