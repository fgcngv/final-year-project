
"use client";

// order sequence

// Create Order (PENDING)
// ↓
// Create Payment (UNPAID)
// ↓
// Initialize Chapa
// ↓
// Redirect user to Chapa
// ↓
// Chapa Callback (SUCCESS)
// ↓
// Confirm payment → Reduce stock → Mark order PAID

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Package, Shield } from "lucide-react";
import { Product } from "@prisma/client";
import { createOrder } from "@/app/[locale]/actions/order";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CartItemProps {
  cart_id: string;
  id: string;
  product: Product;
  product_id: string;
  quantity: number;
}

interface OrderSummaryProps {
  items: CartItemProps[];
  subtotal: number;
  shippingFee: number;
  total: number;
}

export default function OrderSummary({
  items,
  subtotal,
  shippingFee,
  total,
}: OrderSummaryProps) {
  const [loading, setLoading] = useState(false);

  // console.log("itrems : ", items);

  async function handleCreateOrder() {
    try {
      setLoading(true);

      const response = await createOrder(
        items.map((i) => ({
          product_id: i.product_id,
          quantity: i.quantity,
          price: i.product.price,
        }))
      );

      if (!response?.success) {
        toast.error(response.message);
        return;
      }

      // response.order_id is returned from createOrder
      // createOrder already created the payment
      const payment_id = response.payment_id;

      // Initialize Chapa
      const locale = "en";

      const res = await fetch(`/${[locale]}/api/chapa/initialize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payment_id }),
      });

      console.log("res : ",res)

      // Read JSON directly
      const data = await res.json();
      console.log("CHAPA RESPONSE FULL:", data);

      if (!data.checkout_url) {
        toast.error("Payment initialization failed");
        return;
      }

      window.location.href = data.checkout_url;
    } catch (err) {
      toast.error("Catch Error : Payment initialization failed");
    } finally {
      setLoading(false);
    }
  }

  return (
<div className="space-y-6 sticky top-8">
  <Card className="shadow-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
    <CardHeader>
      <CardTitle className="text-xl text-gray-900 dark:text-white">Order Summary</CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      {/* Order Items */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
          >
            <div className="relative h-16 w-16 rounded-lg overflow-hidden">
              <img
                src={item?.product?.image}
                alt={item?.product?.product_name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 dark:text-white">{item.product.product_name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{item.product.product_detail}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {(item.product.price * item.quantity).toFixed(2)} Brr
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="flex justify-between text-gray-700 dark:text-gray-300">
          <span>Subtotal</span>
          <span className="font-semibold">{subtotal.toFixed(2)} Brr</span>
        </div>
        <div className="flex justify-between text-gray-700 dark:text-gray-300">
          <span>Shipping</span>
          <span className="font-semibold">{shippingFee.toFixed(2)} Brr</span>
        </div>
        <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-3">
          <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-700">{total.toFixed(2)} Brr</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">including VAT</div>
          </div>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="space-y-3 p-4 bg-green-50 dark:bg-green-900 rounded-lg border border-green-200 dark:border-green-700 text-gray-900 dark:text-white">
        <div className="flex items-center gap-2">
          <Truck className="h-5 w-5 text-green-600" />
          <span className="font-semibold">Estimated Delivery</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Within 3-5 business days in Addis Ababa
        </p>
      </div>

      {/* Guarantee */}
      <div className="flex items-center gap-3 p-3 bg-amber-50 dark:bg-amber-900 rounded-lg border border-amber-200 dark:border-amber-700 text-gray-900 dark:text-white">
        <Shield className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium">100% Satisfaction Guarantee</p>
          <p className="text-xs text-gray-600 dark:text-gray-300">
            Full refund if not satisfied with quality
          </p>
        </div>
      </div>

      <Button
        disabled={loading}
        className={`w-full py-3 rounded-xl font-bold ${
          loading ? "bg-green-100 text-black" : "bg-green-700 text-white hover:bg-green-800"
        }`}
        onClick={handleCreateOrder}
      >
        {loading ? "Creating Order..." : "Create Order"}
      </Button>
    </CardContent>
  </Card>

  {/* Support Card */}
  <Card className="border border-green-200 dark:border-green-700 bg-white dark:bg-gray-800">
    <CardContent className="p-4 text-gray-900 dark:text-white">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
          <Package className="h-5 w-5 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <p className="font-medium">Need help with your order?</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Call us at +251 900 123 456</p>
        </div>
      </div>
    </CardContent>
  </Card>
</div>
  );
}
