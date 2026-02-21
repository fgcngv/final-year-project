"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Check,
  Download,
  Home,
  Package,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { motion } from "framer-motion";

interface OrderConfirmationProps {
  orderId: string;
  items?:number
  totalAmount?:number
  deliveryDate?:string
  deliveryTo?:string
}

export default function OrderConfirmation({ orderId,items,totalAmount,deliveryDate,deliveryTo }: OrderConfirmationProps) {
  const [countdown, setCountdown] = useState(10);

  function formatDate(iso?: string) {
    if (!iso) return "Unknown date"; // fallback if undefined
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(iso));
  }


  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const orderDetails = {
    items: 3,
    total: "2,790.00",
    delivery: "December 20, 2024",
    address: "Bole, Addis Ababa, Ethiopia",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <Card className="border-2 shadow-2xl overflow-hidden bg-white dark:bg-gray-800">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-8 text-center text-white">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-white/20 mb-6"
            >
              <Check className="h-12 w-12 text-green-700" />
            </motion.div>
  
            <h1 className="text-4xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-lg opacity-90">
              Thank you for supporting Ethiopian coffee farmers
            </p>
          </div>
  
          <CardContent className="p-8 space-y-8">
            {/* Order ID */}
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-1">Your order number is</p>
              <div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-6 py-3 rounded-full">
                <ShoppingBag className="h-5 w-5 text-green-600" />
                <code className="text-2xl font-mono font-bold text-gray-800 dark:text-gray-100">
                  {orderId}
                </code>
              </div>
            </div>
  
            {/* Order Details */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Package className="h-4 w-4" />, label: "Items", value: items },
                { icon: <div className="h-4 w-4">💰</div>, label: "Total Amount", value: `${totalAmount} Brr` },
                { icon: <Truck className="h-4 w-4" />, label: "Delivery Date", value: formatDate(deliveryDate) },
                { icon: <div className="h-4 w-4">📍</div>, label: "Delivery To", value: deliveryTo },
              ].map((detail, i) => (
                <div key={i} className="space-y-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    {detail.icon}
                    <span className="text-sm">{detail.label}</span>
                  </div>
                  <p className="text-xl font-semibold">{detail.value}</p>
                </div>
              ))}
            </div>
  
            {/* Next Steps */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">What happens next?</h3>
              <div className="space-y-3">
                {[
                  "We'll notify the farmer to prepare your coffee",
                  "Quality check and packaging by our lab technicians",
                  "Shipping and delivery to your address",
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <span className="text-green-600 font-bold">{i + 1}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-200">{step}</p>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                className="flex-1 gap-2 py-6"
                onClick={() => window.print()}
              >
                <Download className="h-5 w-5" />
                Download Receipt
              </Button>
  
              <Button
                className="flex-1 gap-2 py-6"
                onClick={() => (window.location.href = "/orders")}
              >
                View Order Details
              </Button>
  
              <Button
                variant="ghost"
                className="flex-1 gap-2 py-6"
                onClick={() => (window.location.href = "/")}
              >
                <Home className="h-5 w-5" />
                Back to Home
              </Button>
            </div>
  
            {/* Countdown */}
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              <p>
                Redirecting to order tracking in{" "}
                <span className="font-bold text-green-600">{countdown}</span>{" "}
                seconds
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
