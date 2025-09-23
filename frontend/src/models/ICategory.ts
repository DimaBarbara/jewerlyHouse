import type { IItem } from "./IItem";

export interface ICategory {
  id?: number;
  name: string;
  items?: IItem[];
  createdAt?: string;
  updatedAt?: string;
}
