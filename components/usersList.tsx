"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import DeleteDialog from "./dialog/deleteDialog";
import { useTheme } from "next-themes";
import { useState } from "react";
import { UserStatusDropdown } from "./admin/updateUserStatus";

interface usersTableProps {
  data: any;
  deleteType:
    | "user"
    | "farmer"
    | "product"
    | "order"
    | "order_item"
    | "cart"
    | "cart_item"
    | "wishlist";
}

// Dummy server function wrapper
async function serverUpdate(
  userId: string,
  status: "ACTIVE" | "INACTIVE" | "DORMANT"
) {
  console.log("Updating user", userId, "to status", status);
  // Here, call your server-only function like:
  // await updateUserStatus(adminId, userId, status)
}

export default function UsersTable({ data, deleteType }: usersTableProps) {
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const [users, setUsers] = useState(data);

  const deleteStatus = () => setShowDeleteBtn(!showDeleteBtn);

  return (
    <div className="p-6 border rounded-xl bg-white dark:bg-gray-800 shadow">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold dark:text-white">Users</h2>
        <Button
          onClick={deleteStatus}
          className="bg-red-300 cursor-pointer hover:bg-red-400 text-sm text-green-900 font-bold"
        >
          {showDeleteBtn ? " Disable Delete " : "Enable Delete"}
        </Button>
      </div>

      <Table className="dark:text-white">
        <TableHeader className="dark:bg-gray-700">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden sm:flex justify-center items-center text-xl font-bold text-blue-600 dark:text-blue-400">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user: any) => (
            <TableRow
              key={user.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <TableCell>{user.id}</TableCell>
              <TableCell className="font-medium">
                {user.first_name} {user?.last_name}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <UserStatusDropdown
                  userId={user.id}
                  currentStatus={user.status}
                  entity="user"
                />
              </TableCell>
              <TableCell className="hidden sm:flex flex-col sm:flex-row md:flex-row gap-1">
                {showDeleteBtn && (
                  <DeleteDialog deleteType={deleteType} id={user?.id} />
                )}
                <Link
                  href={`/admin/users/${user?.id}`}
                  className="bg-blue-700 p-1 rounded text-white hover:bg-blue-800 active:bg-blue-900 dark:bg-blue-600 dark:hover:bg-blue-500"
                >
                  View Detail
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
