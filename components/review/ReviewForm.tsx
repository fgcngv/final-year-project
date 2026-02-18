
"use client";

import { useState } from "react";
import StarRating from "./StarRating";

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select a rating.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/review", {
        method: "POST",
        body: JSON.stringify({
          rating,
          comment,
          productId,
          farmerId,
          orderId,
          type,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      setSuccess(true);
    } catch (error) {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="p-6 bg-green-50 border border-green-200 rounded-lg text-green-700 font-semibold">
        Thank you for your review! 🎉
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm border max-w-md w-full space-y-4"
    >
      <h2 className="text-lg font-semibold">
        {type === "PRODUCT"
          ? "Rate this Product"
          : "Rate this Farmer"}
      </h2>

      <StarRating value={rating} onChange={setRating} />

      <textarea
        placeholder="Write your review (optional)..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none resize-none"
        rows={4}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
