"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Package, Shield } from "lucide-react";
import Image from "next/image";
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

  console.log("itrems : ", items);
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

      if (!response) {
        toast.error("Failed to Store order!");
      }

      toast.success(response.message);

      console.log(response.message);

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="space-y-6 sticky top-8">
      <Card className="shadow-xl border-2">
        <CardHeader>
          <CardTitle className="text-xl">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Order Items */}
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-3 rounded-lg bg-gray-50"
              >
                <div className="relative h-16 w-16 rounded-lg overflow-hidden">
                  {/* <div className="absolute inset-0 bg-gradient-to-br from-amber-900 to-amber-700" /> */}
                  <img
                    src={item?.product?.image}
                    alt={item?.product?.product_name}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{item.product.product_name}</h4>
                  <p className="text-sm text-gray-600">
                    {item.product.farmer_id}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </span>
                    <span className="font-bold">
                      {(item.product.price * item.quantity).toFixed(2)} Brr
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 border-t pt-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">{subtotal.toFixed(2)} Brr</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-semibold">
                {shippingFee.toFixed(2)} Brr
              </span>
            </div>
            <div className="flex justify-between items-center border-t pt-3">
              <span className="text-lg font-bold">Total</span>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-700">
                  {total.toFixed(2)} Brr
                </div>
                <div className="text-sm text-gray-500">including VAT</div>
              </div>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="space-y-3 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-green-600" />
              <span className="font-semibold">Estimated Delivery</span>
            </div>
            <p className="text-sm text-gray-600">
              Within 3-5 business days in Addis Ababa
            </p>
          </div>

          {/* Guarantee */}
          <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
            <Shield className="h-5 w-5 text-amber-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">100% Satisfaction Guarantee</p>
              <p className="text-xs text-gray-600">
                Full refund if not satisfied with quality
              </p>
            </div>
          </div>
          <Button
            disabled={loading}
            className={cn(
              ` ${
                loading
                  ? "bg-green-100 text-black"
                  : "cursor-pointer bg-green-700 font-bold"
              }`
            )}
            onClick={handleCreateOrder}
          >
            {loading ? "Creating Order... " : "Create Order "}
          </Button>
        </CardContent>
      </Card>

      {/* Support Card */}
      <Card className="border border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Package className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium">Need help with your order?</p>
              <p className="text-sm text-gray-600">
                Call us at +251 900 123 456
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
