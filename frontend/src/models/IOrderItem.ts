import type { IItem } from "./IItem";
import type { IOrder } from "./IOrder";

export interface IOrderItem {
  id: number;
  orderId: number;
  order?: IOrder;
  itemId: number;
  item?: IItem;
  quantity: number;
  price: number;
}
