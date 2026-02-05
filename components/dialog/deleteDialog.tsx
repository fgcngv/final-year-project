// "use client";

// import * as React from "react";
// import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Trash2 } from "lucide-react";
// import { deleteData } from "@/app/actions/admin"; // server action
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// interface DeleteDialogProps {
//   id: string;
//   table:string
// }

// export default function DeleteDialog({ id,table}: DeleteDialogProps) {
//     const router = useRouter();
//     const [loading, setLoading] = React.useState(false);
//   const [open, setOpen] = React.useState(false);

//   const handleDelete = async () => {
//     try {
//       setLoading(true);

//       const res = await deleteData(id, table!);
//       if(!res){
//         return toast.error("Deletion Failed!");
//       }

//       if (res.success) {
//         toast.success("Record deleted successfully");
//         router.refresh();
//       } else {
//         toast.error("Failed to delete record!");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Trash2 size={20} className="text-red-600 cursor-pointer hover:text-red-700" />
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-lg">
//         <DialogHeader>
//           <DialogTitle className="text-red-600 font-bold text-center">Delete User</DialogTitle>
//         </DialogHeader>
//         <DialogFooter className="flex justify-end gap-2">
//           <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
//           <Button variant="destructive" onClick={handleDelete}>Delete</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteData } from "@/app/[locale]/actions/admin";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteDataById } from "@/app/[locale]/actions/general";

interface DeleteDialogProps {
  id: string;
  deleteType:
    | "user"
    | "farmer"
    | "product"
    | "order"
    | "order_item"
    | "cart"
    | "cart_item"
    | "wishlist";
}

export default function DeleteDialog({ id, deleteType }: DeleteDialogProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const res = await deleteDataById(id, deleteType!);

      if (res.success) {
        toast.success("Record deleted successfully");
        router.refresh();
      } else {
        toast.error("Failed to delete record!");
      }

      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-2">
          <Trash2 size={20} className="text-red-600" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-red-600 font-bold text-center">
            Delete Record
          </DialogTitle>
        </DialogHeader>

        <div className="text-center py-4">
          Are you sure you want to delete this record? This action cannot be
          undone.
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            disabled={loading}
            onClick={handleDelete}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
