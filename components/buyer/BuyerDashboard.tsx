"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { format } from "date-fns";
import { CancelOrder, OrdersByBuyerId } from "@/utils/services/order";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Bell,
  Heart,
  Home,
  MessageCircle,
  ShoppingCart,
  User,
} from "lucide-react";

type OrderItemType = {
  id: string;
  product_name: string;
  quantity: number;
  price: number;
  image: string;
};

type OrderType = {
  id: string;
  status: string;
  createdAt: string;
  totalAmount: number;
  address: {
    fullName: string;
    phone: string;
    addressLine1: string;
    city: string;
    region: string;
  };
  items: OrderItemType[];
  payment: {
    method: string;
    status: string;
  } | null;
};

export default function BuyerDashboardPage() {
  const { user } = useUser();
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    if (!user || !user.id) return;

    async function fetchOrders() {
      setLoading(true);
      try {
        const data = await OrdersByBuyerId();
        if (!data || !data.data) return;
        setOrders(data.data);
      } catch {
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [user]);

  const cancelOrder = async (orderId: string) => {
    setCancelLoading(true);

    try {
      const canceled = await CancelOrder(orderId);
      if (!canceled.success) toast.error(canceled.message);
      else {
        toast.success(canceled.message);
        setOrders((prev) =>
          prev.map((o) =>
            o.id === orderId ? { ...o, status: "CANCELLED" } : o
          )
        );
      }
    } catch {
      toast.error("Failed to cancel order");
    }

    setCancelLoading(false);
  };

  return (
    <div className="min-h-screen bg-green-50 ">
      <main className="p-4 space-y-6 max-w-5xl mx-auto mt-20">
        {/* Greeting */}
        <section className="space-y-1">
          <h2 className="text-xl font-semibold text-green-800">
            {" "}
            Welcome back
          </h2>
          <p className="text-sm text-muted-foreground">
            Discover fresh coffee directly from farmers
          </p>
        </section>

        {/* Featured Products */}
        <section>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"></div>
        </section>

        {/* Orders */}
        <section>
          <h3 className="font-semibold mb-3 text-green-800">📦 My Orders</h3>
          {loading ? (
            <p>Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="text-muted-foreground">No orders yet</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="rounded-xl shadow-sm">
                  <CardHeader className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-green-700">
                        Order #{order.id.slice(0, 6).toUpperCase()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Placed on {format(new Date(order.createdAt), "PPP")}
                      </p>
                    </div>
                    <p
                      className={`text-sm font-semibold ${
                        order.status === "PENDING"
                          ? "text-amber-500"
                          : order.status === "DELIVERED"
                          ? "text-green-600"
                          : order.status === "CANCELLED"
                          ? "text-red-500"
                          : "text-gray-600"
                      }`}
                    >
                      {order.status}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-2">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 border-b py-2"
                      >
                        <img
                          src={item.image}
                          alt={item.product_name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{item.product_name}</p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity} • Price: {item.price} ETB
                          </p>
                        </div>
                      </div>
                    ))}

                    <p className="text-sm">
                      <span className="font-semibold">Delivery:</span>{" "}
                      {order.address.addressLine1}, {order.address.city},{" "}
                      {order.address.region}
                    </p>

                    <p className="text-sm">
                      <span className="font-semibold">Payment:</span>{" "}
                      {order.payment
                        ? `${order.payment.method} (${order.payment.status})`
                        : "Pending"}
                    </p>

                    {order.status === "PENDING" && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => cancelOrder(order.id)}
                        className="mt-2 w-full"
                        disabled={cancelLoading}
                      >
                        {cancelLoading ? "Cancelling..." : "Cancel Order"}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2 md:hidden">
        <Home className="w-6 h-6 text-green-700" />
        <Heart className="w-6 h-6 text-green-700" />
        <ShoppingCart className="w-6 h-6 text-green-700" />
        <MessageCircle className="w-6 h-6 text-green-700" />
        <User className="w-6 h-6 text-green-700" />
      </nav>
    </div>
  );
}
