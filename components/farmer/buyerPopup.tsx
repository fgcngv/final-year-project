

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

export default function BuyerPopup() {
  const [open, setOpen] = useState(false);

  // Example static buyer data
  const buyer = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    address: "123 Coffee Street, New York, USA",
  };

  return (
    <div className="p-6">
      {/* Button to open modal */}
      <Button onClick={() => setOpen(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white active:bg-green-800">
         Buyer
      </Button>

      {/* Shadcn Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md w-full p-6">
          <DialogHeader>
            <DialogTitle>Buyer Details</DialogTitle>
            <DialogDescription>
              Basic information about the buyer.
            </DialogDescription>
            {/* Close icon */}
            <DialogClose className="absolute top-4 right-4">
              <X className="h-5 w-5 text-gray-500 hover:text-gray-700" />
            </DialogClose>
          </DialogHeader>

          {/* Buyer Info */}
          <div className="space-y-3 mt-4">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Name:</span>
              <span className="text-gray-800">{buyer.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Email:</span>
              <span className="text-gray-800">{buyer.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Phone:</span>
              <span className="text-gray-800">{buyer.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Address:</span>
              <span className="text-gray-800">{buyer.address}</span>
            </div>
          </div>

          {/* Footer with Close Button */}
          <DialogFooter className="mt-6">
            <Button onClick={() => setOpen(false)} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
