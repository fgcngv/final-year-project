"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import { Input } from "../ui/input";
import ReviewDialog from "../review/reviewDialog";

interface Props {
  orders: any[];
  totalOrders?: number;
  totalRevenue?: number;
  statusStats?: Record<string, number>;
}

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PAID: "bg-blue-100 text-blue-700",
  PROCESSING: "bg-purple-100 text-purple-700",
  SHIPPED: "bg-indigo-100 text-indigo-700",
  DELIVERED: "bg-green-100 text-green-700",
  CONFIRMED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function OrdersTable({
  orders,
  totalOrders,
  totalRevenue,
  statusStats,
}: Props) {
  const [openOrder, setOpenOrder] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter orders based on search
  const filteredOrders = orders.filter((order) => {
    const customerName =
      `${order.user.first_name} ${order.user.last_name}`.toLowerCase();
    const customerEmail = order.user.email.toLowerCase();
    const orderId = order.id.toLowerCase();
    const productNames = order.items
      .map((item: any) => item.product.product_name.toLowerCase())
      .join(" ");

    const term = searchTerm.toLowerCase();
    return (
      customerName.includes(term) ||
      customerEmail.includes(term) ||
      orderId.includes(term) ||
      productNames.includes(term)
    );
  });

  const statusColorsDark: Record<string, string> = {
    PENDING: "bg-amber-400 text-black",
    DELIVERED: "bg-green-400 text-black",
    CANCELLED: "bg-red-400 text-black",
    PROCESSING: "bg-blue-400 text-black",
  };


  return (
    <div className="space-y-6 transition-colors duration-500">
      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Orders", value: totalOrders },
          {
            label: "Total Revenue",
            value: `${totalRevenue?.toLocaleString()} ETB`,
          },
          { label: "Pending", value: statusStats?.PENDING || 0 },
          { label: "Delivered", value: statusStats?.DELIVERED || 0 },
        ].map((card, i) => (
          <Card
            key={i}
            className="bg-white dark:bg-[#1f140d] border border-gray-200 dark:border-[#3c2a21] shadow-md transition-colors"
          >
            <CardContent className="p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {card.label}
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-[#f5f5dc]">
                {card.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ORDERS TABLE */}
      <Card className="bg-white dark:bg-[#1f140d] border border-gray-200 dark:border-[#3c2a21] shadow-md transition-colors">
        <CardContent className="p-4">
          <div className="mb-4 flex items-center gap-2">
            <Input
              placeholder="Search orders by ID, customer, email, product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md bg-white dark:bg-[#2b1c12] text-black dark:text-[#f5f5dc] border-gray-300 dark:border-[#3c2a21] transition-colors"
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                {["Order", "Customer", "Items", "Total", "Status", "Date"].map(
                  (head) => (
                    <TableHead key={head} className="dark:text-gray-300">
                      {head}
                    </TableHead>
                  )
                )}
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredOrders.map((order) => (
                <React.Fragment key={order.id}>
                  <TableRow
                    className="cursor-pointer hover:bg-gray-100 dark:hover:bg-[#2b1c12] transition-colors"
                    onClick={() =>
                      setOpenOrder(openOrder === order.id ? null : order.id)
                    }
                  >
                    <TableCell className="font-medium dark:text-[#f5f5dc]">
                      #{order.id.slice(-6)}
                    </TableCell>
                    <TableCell className="dark:text-[#f5f5dc]">
                      {order.user.first_name} {order.user.last_name}
                    </TableCell>
                    <TableCell className="dark:text-[#f5f5dc]">
                      {order.items.length}
                    </TableCell>
                    <TableCell className="dark:text-[#f5f5dc]">
                      {order.payment?.amount?.toLocaleString()} ETB
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`
    ${statusColors[order.status]} 
    dark:${statusColorsDark[order.status]} 
    transition-colors
  `}
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="dark:text-[#f5f5dc]">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>

                  {/* EXPANDABLE ROW */}
                  {openOrder === order.id && (
                    <TableRow>
                      <TableCell colSpan={6}>
                        <div className="flex flex-col pb-3 bg-gray-50 dark:bg-[#2b1c12] rounded-lg transition-colors">
                          <div className="p-4 space-y-4">
                            <p className="font-semibold dark:text-[#f5f5dc]">
                              Items:
                            </p>
                            {order.items.map((item: any) => (
                              <div
                                key={item.id}
                                className="flex justify-between items-center border-b border-gray-200 dark:border-[#3c2a21] pb-2 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <img
                                    src={item.product.image}
                                    alt=""
                                    className="w-12 h-12 rounded object-cover"
                                  />
                                  <div>
                                    <p className="font-medium dark:text-[#f5f5dc]">
                                      {item.product.product_name}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                      Qty: {item.quantity}
                                    </p>
                                  </div>
                                  <ReviewDialog
                                    order_id={order.id}
                                    product_id={item.product.id}
                                  />
                                </div>
                                <p className="font-semibold dark:text-[#f5f5dc]">
                                  {(
                                    item.quantity * item.price
                                  ).toLocaleString()}{" "}
                                  ETB
                                </p>
                              </div>
                            ))}
                            <div className="text-right font-bold dark:text-[#f5f5dc]">
                              Total: {order.payment?.amount?.toLocaleString()}{" "}
                              ETB
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
