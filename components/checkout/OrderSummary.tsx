

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Package, Shield } from "lucide-react";
import Image from "next/image";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  farmer: string;
}

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
}

export default function OrderSummary({ items, subtotal, shippingFee, total }: OrderSummaryProps) {
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
              <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                <div className="relative h-16 w-16 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-900 to-amber-700" />
                  <div className="absolute inset-0 flex items-center justify-center text-white text-sm">
                    ☕
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.farmer}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </span>
                    <span className="font-bold">
                      {(item.price * item.quantity).toFixed(2)} Brr
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
              <span className="font-semibold">{shippingFee.toFixed(2)} Brr</span>
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

          {/* Promo Code */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Promo Code</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter code"
                className="flex-1 h-10 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Button variant="outline" className="whitespace-nowrap">
                Apply
              </Button>
            </div>
          </div>
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