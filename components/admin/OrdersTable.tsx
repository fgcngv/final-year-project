

"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
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
        const customerName = `${order.user.first_name} ${order.user.last_name}`.toLowerCase();
        const customerEmail = order.user.email.toLowerCase();
        const orderId = order.id.toLowerCase();
        const productNames = order.items.map((item: any) => item.product.product_name.toLowerCase()).join(" ");
    
        const term = searchTerm.toLowerCase();
        return (
          customerName.includes(term) ||
          customerEmail.includes(term) ||
          orderId.includes(term) ||
          productNames.includes(term)
        );
      });
  return (
    <div className="space-y-6">

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <p className="text-2xl font-bold">{totalOrders}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-bold">
              {totalRevenue?.toLocaleString()} ETB
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold">
              {statusStats?.PENDING || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Delivered</p>
            <p className="text-2xl font-bold">
              {statusStats?.DELIVERED || 0}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ORDERS TABLE */}
      <Card>
        <CardContent className="p-4">
        <div className="mb-4 flex items-center gap-2">
  <Input
    placeholder="Search orders by ID, customer, email, product..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full max-w-md"
  />
</div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
            {filteredOrders.map((order) => (
                <>
                  <TableRow
                    key={order.id}
                    className="cursor-pointer hover:bg-muted"
                    onClick={() =>
                      setOpenOrder(
                        openOrder === order.id ? null : order.id
                      )
                    }
                  >
                    <TableCell className="font-medium">
                      #{order.id.slice(-6)}
                    </TableCell>

                    <TableCell>
                      {order.user.first_name} {order.user.last_name}
                    </TableCell>

                    <TableCell>{order.items.length}</TableCell>

                    <TableCell>
                      {order.payment?.amount?.toLocaleString()} ETB
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={statusColors[order.status]}
                      >
                        {order.status}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>

                  {/* EXPANDABLE ROW */}
                  {openOrder === order.id && (
                    <TableRow>
                      <TableCell colSpan={6}>
                        <div className="flex flex-col pb-3  bg-muted rounded-lg">
                        <div className="p-4 bg-muted rounded-lg space-y-4">
                          <p className="font-semibold">Items:</p>

                          {order.items.map((item: any) => (
                            <div
                              key={item.id}
                              className="flex justify-between items-center border-b pb-2"
                            >
                              <div className="flex items-center gap-3">
                                <img
                                  src={item.product.image}
                                  alt=""
                                  className="w-12 h-12 rounded object-cover"
                                />
                                <div>
                                  <p className="font-medium">
                                    {item.product.product_name}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    Qty: {item.quantity}
                                  </p>
                                </div>
                                <ReviewDialog order_id={order.id} product_id={item.product.id}/>

                              </div>

                              <p className="font-semibold">
                                {(item.quantity * item.price).toLocaleString()} ETB
                              </p>
                            </div>
                          ))}

                          <div className="text-right font-bold">
                            Total:{" "}
                            {order.payment?.amount?.toLocaleString()} ETB
                          </div>
                        </div>
                          {/* <ReviewDialog /> */}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
