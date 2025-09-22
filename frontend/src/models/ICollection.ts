import type { IItem } from "./IItem";

export interface ICollection {
  id: number;
  name: string;
  items: IItem[];
  createdAt: string;
  updatedAt: string;
}