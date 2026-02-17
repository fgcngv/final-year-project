// app/components/users-table.tsx
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
import {  Trash2 } from "lucide-react";
import Link from "next/link";
import DeleteDialog from "./dialog/deleteDialog";

interface usersTableProps {
  data:any,
  deleteType: "user" | "farmer" | "product" | "order" | "order_item" | "cart" | "cart_item" | "wishlist",
}


export default function UsersTable({data,deleteType}:usersTableProps) {

  return (
    <div className="p-6 border rounded-xl bg-white shadow">
      <h2 className="text-xl font-semibold mb-4">Users</h2>

     
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">ID</TableHead>

            <TableHead>
              <Button
                variant="ghost"
                className="p-0 font-semibold"
               
              >
                Name
                {/* <ArrowUpDown className="ml-1 h-4 w-4" /> */}
              </Button>
            </TableHead>

            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="hidden  sm:flex justify-center items-center text-xl font-bold text-blue-600">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((user:any) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell className="font-medium">{user.first_name} {user?.last_name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className="hidden sm:flex flex-col sm:flex-row md:flex-row gap-1 ">
                 <DeleteDialog deleteType={deleteType} id={user?.id} />
                <Link href={`/admin/users/${user?.id}`} className="bg-blue-700 p-1 rounded text-white hover:bg-blue-800 active:bg-blue-900">
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
