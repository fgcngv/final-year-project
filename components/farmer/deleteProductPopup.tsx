

"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { deleteProductById } from "@/app/actions/products";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";

type Props = {
  productId: string;
};

export default function DeleteProductPopup({ productId }: Props) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteProductById(productId);

      if (res.success) {
        setOpen(false);
        // optional: refresh page
        toast.success(res.message);
        window.location.reload();
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Delete
      </Button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-lg text-red-600 font-bold text-center mb-4">
              Delete Product?
            </h2>


            <p className="text-sm flex  text-amber-400  font-bold mb-6 text-center">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>

              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isPending}
              >
                {isPending ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
