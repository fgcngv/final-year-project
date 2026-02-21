// "use client";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Star } from "lucide-react";
// import ReviewForm from "@/components/review/ReviewForm";

// export default function ReviewDialog({ order_id,product_id }: {order_id:string,product_id:string}) {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <button className="inline-flex p-2 items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-medium px-2  rounded-lg transition shadow-sm">
//           <Star className="w-4 h-4" />
//           Rate Product
//         </button>
//       </DialogTrigger>

//       <DialogContent className="sm:max-w-lg rounded-2xl p-0 overflow-hidden">
        
//         {/* Header */}
//         <div className="bg-green-800 text-white px-6 py-4">
//           <DialogTitle className="text-xl font-semibold">
//             Rate This Product
//           </DialogTitle>
//           <DialogDescription className="text-green-100 text-sm mt-1">
//             Share your experience to help other buyers.
//           </DialogDescription>
//         </div>

//         {/* Body */}
//         <div className="p-6 bg-white">
//           <ReviewForm
//             type="PRODUCT"
//             productId={product_id}
//             orderId={order_id}
//           />
//         </div>

//       </DialogContent>
//     </Dialog>
//   );
// }













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
import { useTheme } from "next-themes";

interface Props {
  order_id: string;
  product_id: string;
}

export default function ReviewDialog({
  order_id,
  product_id,
}: Props) {
  const {theme} = useTheme();

  const isDark = theme === "dark";

  const buttonClasses = `inline-flex p-2 items-center gap-2 font-medium px-2 rounded-lg transition shadow-sm ${
    isDark
      ? "bg-green-700 hover:bg-green-600 text-white"
      : "bg-green-700 hover:bg-green-800 text-white"
  }`;

  const headerClasses = `px-6 py-4 rounded-t-2xl ${
    isDark ? "bg-green-900 text-green-100" : "bg-green-800 text-white"
  }`;

  const descriptionClasses = isDark ? "text-green-200 text-sm mt-1" : "text-green-100 text-sm mt-1";

  const bodyClasses = isDark ? "p-6 bg-gray-800" : "p-6 bg-white";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={buttonClasses}>
          <Star className="w-4 h-4" />
          Rate Product
        </button>
      </DialogTrigger>

      <DialogContent className={`sm:max-w-lg rounded-2xl p-0 overflow-hidden ${isDark ? "bg-gray-900" : ""}`}>
        {/* Header */}
        <div className={headerClasses}>
          <DialogTitle className="text-xl font-semibold">
            Rate This Product
          </DialogTitle>
          <DialogDescription className={descriptionClasses}>
            Share your experience to help other buyers.
          </DialogDescription>
        </div>

        {/* Body */}
        <div className={bodyClasses}>
          <ReviewForm
            type="PRODUCT"
            productId={product_id}
            orderId={order_id}
             // pass theme to ReviewForm if it supports it
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}