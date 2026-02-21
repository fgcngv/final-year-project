
"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import LoaderBtn from "./loaderBtn";
import DeleteDialog from "./dialog/deleteDialog";
import { useState } from "react";
import { Input } from "./ui/input";
import { useTheme } from "next-themes";

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
    const {theme }= useTheme();
    
    const [searchTerm, setSearchTerm] = useState("");
  
      // Filter orders based on search
      const filteredProducts = products.filter((product) => {
          const customerName = `${product.farmer.first_name} ${product.farmer.last_name}`.toLowerCase();
          const customerEmail = product.farmer.email.toLowerCase();
          const orderId = product.id.toLowerCase();
          const productNames = product.product_name;
      
          const term = searchTerm.toLowerCase();
          return (
            customerName.includes(term) ||
            customerEmail.includes(term) ||
            orderId.includes(term) ||
            productNames.includes(term)
          );
        });

//   console.log("products : ",products)
//   return (
//     <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
//       {/* Table Header */}
//       <div className="px-6 py-4 border-b">
//         <h2 className="text-lg font-semibold">All Products</h2>
//         <p className="text-sm text-gray-500">
//           Manage all products in the system
//         </p>
//         <h1 className="text-green-600 text-2xl font-bold text-center">{products.length} Product{products.length > 1 ?"s":""} Found</h1>
//       </div>

//       <div className="mb-4 flex items-center gap-2">
//   <Input
//     placeholder="Search products by,Origin, farmer, farmer email, product_name..."
//     value={searchTerm}
//     onChange={(e) => setSearchTerm(e.target.value)}
//     className="w-full max-w-md m-2"
//   />
// </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-50 sticky top-0 z-10">
//             <tr className="text-left text-gray-600">
//               <th className="px-6 py-3 font-medium">Product</th>
//               <th className="px-6 py-3 font-medium ">Farmer</th>
//               <th className="px-6 py-3 font-medium">Price</th>
//               <th className="px-6 py-3 font-medium">Status</th>
//               <th className="px-6 py-3 font-medium">Created</th>
//               <th className="px-6 py-3 font-medium text-right ">Actions</th>
//             </tr>
//           </thead>

//           <tbody className="divide-y">
//             {filteredProducts.map((product) => (
//                  <tr
//                  key={product.id}
//                  className="hover:bg-gray-50 transition"
//                >
//                  {/* Product */}

//                  <td className="px-6 py-4 flex items-center gap-3">
//                    <img src={product?.image} width={60} height={60} alt={product?.product_name} className="rounded"/>
//                    <Link  href={`/admin/product/${product?.id}`}>
//                    <div>
//                      <p className="font-medium">
//                        {product.product_name}
//                      </p>
//                      <p className="text-xs text-gray-500 line-clamp-1">
//                        {product.product_detail}
//                      </p>
//                    </div>
//                    </Link>
//                  </td>
 
//                  {/* Farmer */}
//                  <td className="px-6 py-4">
//                  <Link  href={`/admin/product/${product?.id}`}>
//                  <p className="font-medium">
//                      {product.farmer.first_name}{" "}
//                      {product.farmer.last_name}
//                    </p>
//                    <p className="text-xs text-gray-500">
//                      {product.farmer.email}
//                    </p>
//                  </Link>

//                  </td>
 
//                  {/* Price */}
//                  <td className="px-6 py-4 font-semibold text-green-600">
//                  <Link  href={`/admin/product/${product?.id}`}>
//                  {product.price.toLocaleString()} ETB
//                  </Link>
//                  </td>
 
//                  {/* Status */}
//                  <td className="px-6 py-4">
//                  <Link  href={`/admin/product/${product?.id}`}>
//                  <StatusBadge status={product.status} />
//                  </Link>
//                  </td>
 
//                  {/* Created */}
//                  <td className="px-6 py-4 text-gray-500">
//                  <Link  href={`/admin/product/${product?.id}`}>
//                  {new Date(product.createdAt).toLocaleDateString()}
//                  </Link>
//                  </td>
 
//                  {/* Actions */}
//                  <td className="px-6 py-4">
//                    <div className="flex justify-end gap-2">
//                      <Link className="p-2 hover:bg-gray-300 active:bg-gray-400 rounded-md border transition" href={`/admin/product/${product?.id}`}><Eye size={20} /></Link>
//                      <ActionButton icon={<Pencil size={16} />} />
//                      <DeleteDialog deleteType="product" id={product?.id}/>
//                    </div>
//                  </td>
//                </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );


const isDark = theme === "dark";

  return (
    <div
      className={`rounded-xl border overflow-hidden shadow-sm ${
        isDark
          ? "bg-gray-900 border-gray-700 text-gray-100"
          : "bg-white border-gray-200 text-gray-800"
      }`}
    >
      {/* Table Header */}
      <div
        className={`px-6 py-4 border-b ${
          isDark ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <h2 className="text-lg font-semibold">All Products</h2>
        <p className={isDark ? "text-gray-400" : "text-gray-500"}>
          Manage all products in the system
        </p>
        <h1 className="text-green-600 text-2xl font-bold text-center">
          {products.length} Product{products.length > 1 ? "s" : ""} Found
        </h1>
      </div>

      {/* Search Input */}
      <div className="mb-4 flex items-center gap-2 px-6">
        <Input
          placeholder="Search products by Origin, farmer, email, or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead
            className={`sticky top-0 z-10 ${
              isDark ? "bg-gray-800" : "bg-gray-50"
            }`}
          >
            <tr className={isDark ? "text-gray-300" : "text-gray-600"}>
              <th className="px-6 py-3 font-medium">Product</th>
              <th className="px-6 py-3 font-medium">Farmer</th>
              <th className="px-6 py-3 font-medium">Price</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Created</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                className={`transition ${
                  isDark ? "hover:bg-gray-800" : "hover:bg-gray-50"
                }`}
              >
                {/* Product */}
                <td className="px-6 py-4 flex items-center gap-3">
                  <img
                    src={product?.image}
                    width={60}
                    height={60}
                    alt={product?.product_name}
                    className="rounded"
                  />
                  <Link href={`/admin/product/${product?.id}`}>
                    <div>
                      <p className="font-medium">{product.product_name}</p>
                      <p
                        className={`text-xs line-clamp-1 ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {product.product_detail}
                      </p>
                    </div>
                  </Link>
                </td>

                {/* Farmer */}
                <td className="px-6 py-4">
                  <Link href={`/admin/product/${product?.id}`}>
                    <p className="font-medium">
                      {product.farmer.first_name} {product.farmer.last_name}
                    </p>
                    <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                      {product.farmer.email}
                    </p>
                  </Link>
                </td>

                {/* Price */}
                <td className="px-6 py-4 font-semibold text-green-600">
                  <Link href={`/admin/product/${product?.id}`}>
                    {product.price.toLocaleString()} ETB
                  </Link>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <Link href={`/admin/product/${product?.id}`}>
                    <StatusBadge status={product.status} />
                  </Link>
                </td>

                {/* Created */}
                <td className={`px-6 py-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  <Link href={`/admin/product/${product?.id}`}>
                    {new Date(product.createdAt).toLocaleDateString()}
                  </Link>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      className={`p-2 rounded-md border transition ${
                        isDark
                          ? "hover:bg-gray-700 active:bg-gray-600 border-gray-600"
                          : "hover:bg-gray-300 active:bg-gray-400 border-gray-200"
                      }`}
                      href={`/admin/product/${product?.id}`}
                    >
                      <Eye size={20} />
                    </Link>
                    <ActionButton icon={<Pencil size={16} />} />
                    <DeleteDialog deleteType="product" id={product?.id} />
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

