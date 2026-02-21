
// "use client";

// import { useState } from "react";
// import StarRating from "./StarRating";
// import { toast } from "sonner";
// import { AddReview } from "@/app/[locale]/actions/review";

// interface Props {
//   productId?: string;
//   farmerId?: string;
//   orderId: string;
//   type: "PRODUCT" | "FARMER";
// }

// export default function ReviewForm({
//   productId,
//   farmerId,
//   orderId,
//   type,
// }: Props) {
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
  
//     if (rating === 0) {
//       toast.error("Please select a rating.");
//       return;
//     }
  
//     setLoading(true);
  
//     const result = await AddReview({
//       rating,
//       comment,
//       productId,
//       farmerId,
//       orderId,
//       type,
//     });
  
//     if (!result.success) {
//       toast.error(result.message);
//       setLoading(false);
//       return;
//     }
  
//     toast.success("Review submitted successfully 🎉");
//     setSuccess(true);
//     setLoading(false);
//   }
  
//   if (success) {
//     return (
//       <div className="p-6 bg-green-50 border border-green-200 rounded-lg text-green-700 font-semibold">
//         Thank you for your review! 🎉
//       </div>
//     );
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white p-6 rounded-xl shadow-sm border max-w-md w-full space-y-4"
//     >
//       <h2 className="text-lg font-semibold">
//         {type === "PRODUCT"
//           ? "Rate this Product"
//           : "Rate this Farmer"}
//       </h2>

//       <StarRating value={rating} onChange={setRating} />

//       <textarea
//         placeholder="Write your review (optional)..."
//         value={comment}
//         onChange={(e) => setComment(e.target.value)}
//         className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none resize-none"
//         rows={4}
//       />

//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
//       >
//         {loading ? "Submitting..." : "Submit Review"}
//       </button>
//     </form>
//   );
// }




"use client";

import { useState } from "react";
import StarRating from "./StarRating";
import { toast } from "sonner";
import { AddReview } from "@/app/[locale]/actions/review";
import { useTheme } from "next-themes";

interface Props {
  productId?: string;
  farmerId?: string;
  orderId: string;
  type: "PRODUCT" | "FARMER";
}

export default function ReviewForm({
  productId,
  farmerId,
  orderId,
  type,
}: Props) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const {theme} = useTheme();

  const isDark = theme === "dark";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }

    setLoading(true);

    const result = await AddReview({
      rating,
      comment,
      productId,
      farmerId,
      orderId,
      type,
    });

    if (!result.success) {
      toast.error(result.message);
      setLoading(false);
      return;
    }

    toast.success("Review submitted successfully 🎉");
    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div
        className={`p-6 border rounded-lg font-semibold ${
          isDark
            ? "bg-gray-800 border-green-600 text-green-300"
            : "bg-green-50 border-green-200 text-green-700"
        }`}
      >
        Thank you for your review! 🎉
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`max-w-md w-full rounded-xl shadow-sm border p-6 space-y-4 ${
        isDark ? "bg-gray-900 border-gray-700 text-gray-100" : "bg-white border-gray-200 text-gray-800"
      }`}
    >
      <h2 className="text-lg font-semibold">
        {type === "PRODUCT" ? "Rate this Product" : "Rate this Farmer"}
      </h2>

      <StarRating value={rating} onChange={setRating} />

      <textarea
        placeholder="Write your review (optional)..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className={`w-full rounded-lg p-3 text-sm outline-none resize-none focus:ring-2 ${
          isDark ? "bg-gray-800 border-gray-600 focus:ring-green-500 text-gray-100" : "bg-white border-gray-300 focus:ring-green-500 text-gray-800"
        }`}
        rows={4}
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 font-semibold rounded-lg transition disabled:opacity-50 ${
          isDark ? "bg-green-700 hover:bg-green-600 text-white" : "bg-green-700 hover:bg-green-800 text-white"
        }`}
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}