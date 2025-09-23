import type { IOrderItem } from "./IOrderItem";
import type { IUser } from "./IUser";

export type OrderStatus =
  | "PENDING"
  | "PAID"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface IOrder {
  id: number;
  userId: number;
  createdAt: string;
  totalAmount: number;
  status: OrderStatus;
  orderItems: IOrderItem[];
  user?: IUser;
}
