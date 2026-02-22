"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { deleteProductById } from "@/app/[locale]/actions/products";
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          
          <div className="w-full max-w-sm rounded-2xl border border-border bg-card shadow-xl p-6 transition-colors">
            
            {/* Title */}
            <h2 className="text-lg font-bold text-destructive text-center mb-4">
              Delete Product?
            </h2>
  
            {/* Warning */}
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2 font-medium mb-6 text-center">
              <AlertTriangle className="w-5 h-5 text-amber-500 dark:text-amber-400" />
              This action cannot be undone.
            </p>
  
            {/* Actions */}
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
