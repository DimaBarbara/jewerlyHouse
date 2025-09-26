import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type Row,
  useReactTable,
} from "@tanstack/react-table";
import { SyncLoader } from "react-spinners";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useDeleteItemMutation,
  useGetItemsQuery,
} from "../../../redux/items/ItemApi";
import { itemColumns } from "../config/columns";
import type { IItem } from "../../../models/IItem";

export default function Items() {
  const { data: items = [], error, isLoading } = useGetItemsQuery();
  const [deleteItem] = useDeleteItemMutation();

  const handleDelete = (id: string): void => {
    deleteItem(id);
  };

  const columns = [
    ...itemColumns,
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: { row: Row<IItem> }) => (
        <div className=" flex gap-2 items-center justify-center">
          <Link to={`/admin/items/${row.original.id}/edit`} className="flex ">
            <FaEdit className="text-gray-500 hover:text-gray-700 cursor-pointer transition-colors" />
          </Link>
          <FaTrash
            className="text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
            onClick={() => handleDelete(String(row.original.id))}
          />
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <SyncLoader color="#36d7b7" />
      </div>
    );
  }

  if (error) return <p className="text-red-500 font-medium">Loading error</p>;

  return (
    <div className="flex items-center justify-center !mx-auto ">
      {items.length > 0 ? (
        <div className="!p-4 bg-white rounded-lg shadow-md">
          <table className="w-full text-left table-auto">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-gray-200">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="!px-4 !py-2 text-sm font-semibold text-gray-600 cursor-pointer select-none"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="!px-4 !py-3 text-gray-800 text-sm"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-gray-600">You don't have any items yet.</p>
        </div>
      )}
    </div>
  );
}
