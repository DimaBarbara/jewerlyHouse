import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type Row,
} from "@tanstack/react-table";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../../redux/users/UserApi";
import { SyncLoader } from "react-spinners";
import { userColumns } from "../config/columns";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { IUser } from "../../../models/IUser";

export default function Users() {
  const { data: users = [], error, isLoading } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = (id: string): void => {
    deleteUser(id);
  };

  const columns = [
    ...userColumns,
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: { row: Row<IUser> }) => (
        <div className=" flex gap-2 items-center justify-center">
          <Link to={`/admin/users/${row.original.id}/edit`} className="flex ">
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
    data: users,
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
      {users.length > 0 ? (
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
          <p className="text-lg text-gray-600">You don't have any users yet.</p>
        </div>
      )}
    </div>
  );
}
