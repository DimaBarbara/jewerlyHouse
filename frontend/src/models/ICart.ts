import type { ICartItem } from "./ICartItem";
import type { IUser } from "./IUser";

export interface ICart {
  id: string;
  userId: number;
  user?: IUser;
  cartItems: ICartItem[];
}
export interface AddItemArgs {
  userId: number;
  itemId: number;
  quantityToAdd: number;
}

export interface AddItemBody {
  itemId: number;
  quantityToAdd: number;
}
export interface DeleteItemArgs {
  userId: number;
  itemId: number;
}

export interface DeleteItemBody {
  itemId: number;
}
