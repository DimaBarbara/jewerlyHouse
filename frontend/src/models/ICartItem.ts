import type { ICart } from "./ICart";
import type { IItem } from "./IItem";

export interface ICartItem {
  id: number;
  cartId: number;
  cart?: ICart;
  itemId: number;
  item?: IItem;
  quantity: number;
}
