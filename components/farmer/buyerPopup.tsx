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
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import LoaderBtn from "../loaderBtn";

interface BuyerPopup {
  user: User;
}

export default function BuyerPopup({ user }: BuyerPopup) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

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
      <Button
        onClick={() => setOpen(true)}
        className="bg-emerald-600 hover:bg-emerald-700 text-white active:bg-green-800"
      >
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
              <span className="text-gray-800">
                {user.first_name} {user.last_name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Email:</span>
              <span className="text-gray-800">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Phone:</span>
              <span className="text-gray-800">No</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Address:</span>
              <span className="text-gray-800">{user.address}</span>
            </div>
          </div>

          {/* Footer with Close Button */}
          <DialogFooter className="mt-6">
            <LoaderBtn
              btnName="Chat With"
              linkTo={`/chatMatche/${user?.id}`}
              className="bg-pink-400 font-bold cursor-pointer hover:bg-pink-500 active:bg-pink-600"
            />
            <Button
              onClick={() => setOpen(false)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
