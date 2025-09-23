export interface EntityConfig {
  name: string;
  label: string;
}

const entities: EntityConfig[] = [
  { name: "users", label: "Users" },
  { name: "items", label: "Items" },
  { name: "orders", label: "Orders" },
  { name: "categories", label: "Categories" },
  { name: "collections", label: "Collections" },
];

export default entities;
