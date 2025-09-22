import type { IItem } from "./IItem";
import type { IUser } from "./IUser";

export interface IFavoriteItem {
  userId: number;
  itemId: number;
  user?: IUser; 
  item?: IItem;
}
