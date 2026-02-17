
"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import LoaderBtn from "./loaderBtn";
import DeleteDialog from "./dialog/deleteDialog";

type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    farmer: true;
  };
}>;

interface AdminProductsTableProps {
  products: ProductWithRelations[];
}


// action btn
function ActionButton({
    icon,
    danger,
    link,
  }: {
    icon: React.ReactNode;
    danger?: boolean;
    link?:string
  }) {
    return (
      <button
        className={`p-2 rounded-md border transition
          ${
            danger
              ? "hover:bg-red-50 text-red-600"
              : "hover:bg-gray-100 text-gray-600"
          }`}
      >
        {link ? <Link href={link}>{link}</Link> :icon}
      </button>
    );
  }


//   status badge
  function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
      ACTIVE: "bg-green-100 text-green-700",
      INACTIVE: "bg-gray-100 text-gray-700",
      DORMANT: "bg-yellow-100 text-yellow-700",
      PAUSED: "bg-red-100 text-red-700",
    };
  
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          styles[status] || "bg-gray-100 text-gray-600"
        }`}
      >
        {status}
      </span>
    );
  }
  
  

export default function AdminProductsTable({
  products,
}: AdminProductsTableProps) {
  return (
    <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b">
        <h2 className="text-lg font-semibold">All Products</h2>
        <p className="text-sm text-gray-500">
          Manage all products in the system
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr className="text-left text-gray-600">
              <th className="px-6 py-3 font-medium">Product</th>
              <th className="px-6 py-3 font-medium ">Farmer</th>
              <th className="px-6 py-3 font-medium">Price</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Created</th>
              <th className="px-6 py-3 font-medium text-right ">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {products.map((product) => (
                 <tr
                 key={product.id}
                 className="hover:bg-gray-50 transition"
               >
                 {/* Product */}

                 <td className="px-6 py-4 flex items-center gap-3">
                   <img src={product?.image} width={60} height={60} alt={product?.product_name} className="rounded"/>
                   <Link  href={`/admin/product/${product?.id}`}>
                   <div>
                     <p className="font-medium">
                       {product.product_name}
                     </p>
                     <p className="text-xs text-gray-500 line-clamp-1">
                       {product.product_detail}
                     </p>
                   </div>
                   </Link>
                 </td>
 
                 {/* Farmer */}
                 <td className="px-6 py-4">
                 <Link  href={`/admin/product/${product?.id}`}>
                 <p className="font-medium">
                     {product.farmer.first_name}{" "}
                     {product.farmer.last_name}
                   </p>
                   <p className="text-xs text-gray-500">
                     {product.farmer.email}
                   </p>
                 </Link>

                 </td>
 
                 {/* Price */}
                 <td className="px-6 py-4 font-semibold text-green-600">
                 <Link  href={`/admin/product/${product?.id}`}>
                 {product.price.toLocaleString()} ETB
                 </Link>
                 </td>
 
                 {/* Status */}
                 <td className="px-6 py-4">
                 <Link  href={`/admin/product/${product?.id}`}>
                 <StatusBadge status={product.status} />
                 </Link>
                 </td>
 
                 {/* Created */}
                 <td className="px-6 py-4 text-gray-500">
                 <Link  href={`/admin/product/${product?.id}`}>
                 {new Date(product.createdAt).toLocaleDateString()}
                 </Link>
                 </td>
 
                 {/* Actions */}
                 <td className="px-6 py-4">
                   <div className="flex justify-end gap-2">
                     <Link className="p-2 hover:bg-gray-300 active:bg-gray-400 rounded-md border transition" href={`/admin/product/${product?.id}`}><Eye size={20} /></Link>
                     <ActionButton icon={<Pencil size={16} />} />
                     <DeleteDialog deleteType="product" id={product?.id}/>
                   </div>
                 </td>
               </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

