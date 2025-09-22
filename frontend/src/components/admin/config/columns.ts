export interface Columns {
    accessorKey: string;
    header: string;

}

export const userColumns: Columns[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "surname",
    header: "Surname",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "createdAt",
    header: "CreatedAt",
  },
  {
    accessorKey: "updatedAt",
    header: "UpdatedAt",
  },
];

export const itemColumns: Columns[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "image",
    header: "Image",
  },
  {
    accessorKey: "images",
    header: "Images",
  },
  {
    accessorKey: "material",
    header: "Material",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "collection",
    header: "Collection",
  },
  {
    accessorKey: "isNew",
    header: "isNew",
  },
  {
    accessorKey: "createdAt",
    header: "CreatedAt",
  },
  {
    accessorKey: "updatedAt",
    header: "UpdatedAt",
  },
];

export const orderColumns: Columns[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "user",
    header: "User",
  },
  {
    accessorKey: "totalAmount",
    header: "Total amount",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "orderItems",
    header: "Order items",
  },
  {
    accessorKey: "createdAt",
    header: "CreatedAt",
  },
  {
    accessorKey: "updatedAt",
    header: "UpdatedAt",
  },
];
