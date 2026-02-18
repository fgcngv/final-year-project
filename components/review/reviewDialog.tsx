"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Star } from "lucide-react";
import ReviewForm from "@/components/review/ReviewForm";

export default function ReviewDialog({ items }: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-medium px-2  rounded-lg transition shadow-sm">
          <Star className="w-4 h-4" />
          Rate Product
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg rounded-2xl p-0 overflow-hidden">
        
        {/* Header */}
        <div className="bg-green-800 text-white px-6 py-4">
          <DialogTitle className="text-xl font-semibold">
            Rate This Product
          </DialogTitle>
          <DialogDescription className="text-green-100 text-sm mt-1">
            Share your experience to help other buyers.
          </DialogDescription>
        </div>

        {/* Body */}
        <div className="p-6 bg-white">
          <ReviewForm
            type="PRODUCT"
            productId={items?.product.id}
            orderId={items?.order.id}
          />
        </div>

      </DialogContent>
    </Dialog>
  );
}
