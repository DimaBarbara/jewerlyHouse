import type { ICartItem } from "./ICartItem";
import type { IUser } from "./IUser";

export interface ICart {
    id: string;
    userId: number;
    user?: IUser;
    cartItems: ICartItem[]
}