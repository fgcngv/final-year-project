// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Package, MoreVertical, Plus, Truck } from "lucide-react";
// import { Status } from "@prisma/client";
// import type { Product } from "@/types/product";
// import DeleteProductPopup from "./deleteProductPopup";
// import Link from "next/link";
// import LoaderBtn from "../loaderBtn";
// import AddProduct from "../form/add-product";
// import { useState } from "react";

// interface ProductRowProps {
//   image: string;
//   name: string;
//   origin: string;
//   grade?: string;
//   qty: number;
//   price: number;
//   status: Status;
//   p_id: string;
// }

// function ProductRow({
//   image,
//   name,
//   origin,
//   grade,
//   qty,
//   price,
//   status,
//   p_id,
// }: ProductRowProps) {
//   return (
//     <TableRow>
//       <TableCell className="font-medium">
//         <img width={40} height={40} src={image} alt="" />
//       </TableCell>
//       <TableCell>{name}</TableCell>
//       <TableCell>{origin}</TableCell>
//       <TableCell>{grade ?? "-"}</TableCell>
//       <TableCell>{qty.toLocaleString()} kg</TableCell>
//       <TableCell>${price.toFixed(2)}</TableCell>
//       <TableCell>
//         <Badge
//           className={status === Status.ACTIVE ? " bg-green-500 " : " "}
//           variant={
//             status === Status.ACTIVE
//               ? "secondary"
//               : status === Status.DORMANT || status === Status.PAUSED
//               ? "default"
//               : "outline"
//           }
//         >
//           {status}
//         </Badge>
//       </TableCell>
//       <TableCell className="text-right">
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" size="icon">
//               <MoreVertical className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuItem>Edit</DropdownMenuItem>
//             <DropdownMenuItem>
//               <LoaderBtn
//                 btnName="View"
//                 linkTo={`orders/product/${p_id}`}
//                 className="bg-green-700"
//               />
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//         <DeleteProductPopup productId={p_id} />
//       </TableCell>
//     </TableRow>
//   );
// }

// interface OrderRowProps {
//   buyer: string;
//   lot: string;
//   qty: number;
//   status: "Pending" | "Processing" | "Shipped";
// }

// function OrderRow({ buyer, lot, qty, status }: OrderRowProps) {
//   return (
//     <div className="flex flex-col gap-4 rounded-xl border bg-white p-4 md:flex-row md:items-center md:justify-between">
//       <div className="flex items-center gap-3">
//         <div className="rounded-lg bg-emerald-100 p-2 text-emerald-700">
//           <Package />
//         </div>
//         <div>
//           <p className="font-medium">{buyer}</p>
//           <p className="text-sm text-emerald-600">
//             Lot {lot} • {qty} kg
//           </p>
//         </div>
//       </div>
//       <div className="flex items-center gap-4">
//         <Badge
//           variant={
//             status === "Pending"
//               ? "secondary"
//               : status === "Processing"
//               ? "default"
//               : "outline"
//           }
//         >
//           {status}
//         </Badge>
//         <Button size="sm" variant="outline">
//           <Truck className="mr-2 h-4 w-4" /> Track
//         </Button>
//       </div>
//     </div>
//   );
// }

// interface FarmerOrdersProductsProps {
//   products: Product[];
// }

// export default function FarmerOrdersProducts({
//   products,
// }: FarmerOrdersProductsProps) {
//   const [actionBtn, setActionBtn] = useState(false);

//   return (
//     <div className=" bg-emerald-50 p-6">
//       <div className="mx-auto max-w-7xl space-y-8">
//         {/* Header */}
//         <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-emerald-900">
//               Products & Orders
//             </h1>
//             <p className="text-emerald-700">
//               Manage your coffee lots and buyer orders
//             </p>
//           </div>
//           {/* <AddProduct /> */}
//           <div className="fixed bottom-4 left-4 right-4 ">
//             <AddProduct />
//           </div>
//         </div>

//         {/* Products */}

//         <Button onClick={() => setActionBtn(!actionBtn)}>
//           {!actionBtn ? " View Products" : " Hide Products"}
//         </Button>

//         {actionBtn && (
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between">
//               <CardTitle>Your Products</CardTitle>
//               <Input placeholder="Search lots..." className="max-w-xs" />
//             </CardHeader>
//             <CardContent>
//               {/* MOBILE View PRODUCTS */}

//               <div className="space-y-4 md:hidden">
//                 {products.map((product) => {
//                   const qty = product.orderItems.reduce(
//                     (sum, item) => sum + item.quantity,
//                     0
//                   );

//                   return (
//                     <div
//                       key={product.id}
//                       className="rounded-xl border bg-white p-4 shadow-sm"
//                     >
//                       <div className="flex gap-4">
//                         <img
//                           src={product.image}
//                           className="h-16 w-16 rounded-lg object-cover"
//                           alt=""
//                         />

//                         <div className="flex-1">
//                           <p className="font-semibold text-gray-800">
//                             {product.product_name}
//                           </p>
//                           <p className="text-sm text-gray-500">Qty: {qty} kg</p>
//                           <p className="text-sm text-gray-500">
//                             Price: ${product.price}/kg
//                           </p>
//                         </div>
//                       </div>

//                       <div className="mt-3 flex items-center justify-between">
//                         <Badge
//                           className={
//                             product.status === "ACTIVE"
//                               ? "bg-green-100 text-green-800"
//                               : ""
//                           }
//                         >
//                           {product.status}
//                         </Badge>

//                         <div className="flex gap-2">
//                           <LoaderBtn
//                             btnName="View"
//                             linkTo={`orders/product/${product.id}`}
//                             className="bg-green-700"
//                           />
//                           <DeleteProductPopup productId={product.id} />
//                         </div>
//                       </div>
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" size="icon">
//                             <MoreVertical className="h-4 w-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           <DropdownMenuItem>Edit</DropdownMenuItem>
//                           <DropdownMenuItem>
//                             <LoaderBtn
//                               btnName="View"
//                               linkTo={`orders/product/${product.id}`}
//                               className="bg-green-700"
//                             />
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </div>
//                     ////////////////////
//                   );
//                 })}
//               </div>

//               {/* DESKTOP TABLE */}
//               <div className="hidden overflow-x-auto md:block">
//                 <Table className="min-w-full">
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Image</TableHead>
//                       <TableHead>Product_Name</TableHead>
//                       <TableHead>Origin</TableHead>
//                       <TableHead>Grade</TableHead>
//                       <TableHead>Quantity</TableHead>
//                       <TableHead>Price / kg</TableHead>
//                       <TableHead>Status</TableHead>
//                       <TableHead>Action</TableHead>
//                     </TableRow>
//                   </TableHeader>

//                   <TableBody>
//                     {products.map((product) => {
//                       const origin =
//                         product.description?.origion ?? "Unknown origin";

//                       const qty = product.orderItems.reduce(
//                         (sum, item) => sum + item.quantity,
//                         0
//                       );

//                       return (
//                         <ProductRow
//                           key={product.id}
//                           image={product.image}
//                           name={product.product_name}
//                           origin={origin}
//                           grade="-"
//                           qty={qty}
//                           price={product.price}
//                           status={product.status}
//                           p_id={product.id}
//                         />
//                       );
//                     })}
//                   </TableBody>
//                 </Table>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {actionBtn && (
//           <Button onClick={() => setActionBtn(!actionBtn)}>
//             {!actionBtn ? " View Products" : " Hide Products"}
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// }






















"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Package, MoreVertical, Truck } from "lucide-react";
import { Status } from "@prisma/client";
import type { Product } from "@/types/product";
import DeleteProductPopup from "./deleteProductPopup";
import LoaderBtn from "../loaderBtn";
import AddProduct from "../form/add-product";
import Link from "next/link";

interface ProductRowProps {
  image: string;
  name: string;
  origin: string;
  grade?: string;
  qty: number;
  price: number;
  status: Status;
  p_id: string;
  searchTerm: string;
}

function ProductRow({
  image,
  name,
  origin,
  grade,
  qty,
  price,
  status,
  p_id,
  searchTerm,
}: ProductRowProps) {
  const highlightText = (text: string) => {
    if (!searchTerm.trim()) return text;
    const regex = new RegExp(`(${searchTerm.trim()})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, idx) =>
      regex.test(part) ? (
        <mark key={idx} className="bg-yellow-300 text-black">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <TableRow>
      <TableCell className="font-medium">
        <img width={40} height={40} src={image} alt="" />
      </TableCell>
      <TableCell>{highlightText(name)}</TableCell>
      <TableCell>{highlightText(origin)}</TableCell>
      <TableCell>{grade ?? "-"}</TableCell>
      <TableCell>{qty.toLocaleString()} kg</TableCell>
      <TableCell>${price.toFixed(2)}</TableCell>
      <TableCell>
        <Badge
          className={status === Status.ACTIVE ? " bg-green-500 " : ""}
          variant={
            status === Status.ACTIVE
              ? "secondary"
              : status === Status.DORMANT || status === Status.PAUSED
              ? "default"
              : "outline"
          }
        >
          {status}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <LoaderBtn
                btnName="View"
                linkTo={`orders/product/${p_id}`}
                className="bg-green-700"
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DeleteProductPopup productId={p_id} />
      </TableCell>
    </TableRow>
  );
}

interface FarmerOrdersProductsProps {
  products: Product[];
}

export default function FarmerOrdersProducts({
  products,
}: FarmerOrdersProductsProps) {
  const [actionBtn, setActionBtn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter products dynamically based on search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products;
    const term = searchTerm.trim().toLowerCase();
    return products.filter(
      (p) =>
        p.product_name.toLowerCase().includes(term) ||
        (p.description?.origion ?? "unknown origin").toLowerCase().includes(term)
    );
  }, [searchTerm, products]);

  return (
    <div className="bg-emerald-50 p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-emerald-900">
              Products & Orders
            </h1>
            <p className="text-emerald-700">
              Manage your coffee lots and buyer orders
            </p>
          </div>
          <div className="fixed bottom-4 left-4 right-4">
            <AddProduct />
          </div>
        </div>

        {/* Toggle Products */}
        <Button onClick={() => setActionBtn(!actionBtn)}>
          {!actionBtn ? " View Products" : " Hide Products"}
        </Button>

        {actionBtn && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Your Products</CardTitle>
              <Input
                placeholder="Search lots..."
                className="max-w-xs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </CardHeader>

            <CardContent>
              {/* MOBILE View */}
              <div className="space-y-4 md:hidden">
                {filteredProducts.map((product) => {
                  const origin = product.description?.origion ?? "Unknown origin";
                  const qty = product.orderItems.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                  );
                  return (
                    <div
                      key={product.id}
                      className="rounded-xl border bg-white p-4 shadow-sm"
                    >
                      <div className="flex gap-4">
                        <img
                          src={product.image}
                          className="h-16 w-16 rounded-lg object-cover"
                          alt=""
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">
                            {highlightText(product.product_name)}
                          </p>
                          <p className="text-sm text-gray-500">
                            Qty: {qty} kg
                          </p>
                          <p className="text-sm text-gray-500">
                            Price: ${product.price}/kg
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <Badge
                          className={
                            product.status === "ACTIVE"
                              ? "bg-green-100 text-green-800"
                              : ""
                          }
                        >
                          {product.status}
                        </Badge>
                        <div className="flex gap-2">
                          <LoaderBtn
                            btnName="View"
                            linkTo={`orders/product/${product.id}`}
                            className="bg-green-700"
                          />
                          <DeleteProductPopup productId={product.id} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* DESKTOP TABLE */}
              <div className="hidden overflow-x-auto md:block">
                <Table className="min-w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Product_Name</TableHead>
                      <TableHead>Origin</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price / kg</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredProducts.map((product) => {
                      const origin =
                        product.description?.origion ?? "Unknown origin";
                      const qty = product.orderItems.reduce(
                        (sum, item) => sum + item.quantity,
                        0
                      );
                      return (
                        <ProductRow
                          key={product.id}
                          image={product.image}
                          name={product.product_name}
                          origin={origin}
                          grade="-"
                          qty={qty}
                          price={product.price}
                          status={product.status}
                          p_id={product.id}
                          searchTerm={searchTerm}
                        />
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );

  function highlightText(text: string) {
    if (!searchTerm.trim()) return text;
    const regex = new RegExp(`(${searchTerm.trim()})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, idx) =>
      regex.test(part) ? (
        <mark key={idx} className="bg-yellow-300 text-black">
          {part}
        </mark>
      ) : (
        part
      )
    );
  }
}
