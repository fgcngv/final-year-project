"use client";

import StarRating from "./StarRating";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  name: string;
  rating: number;
  comment?: string;
  date: string;
  isDialog?: boolean;
}

export default function ReviewCard({
  name,
  rating,
  comment,
  date,
  isDialog = false,
}: Props) {
  const ReviewBody = (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-lg">{name}</h4>
        <span className="text-sm text-gray-500">
          {new Date(date).toLocaleDateString()}
        </span>
      </div>

      <StarRating value={rating} readonly />

      {comment && <p className="text-gray-700 leading-relaxed">{comment}</p>}
    </div>
  );

  //  Normal Card (No Dialog)
  if (!isDialog) {
    return (
      <div className="border rounded-xl p-4 bg-white shadow-sm space-y-2">
        {ReviewBody}
      </div>
    );
  }

  //  Dialog Version
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="border rounded-xl p-4 bg-white shadow-sm space-y-2 cursor-pointer hover:shadow-md transition">
          <StarRating value={rating} readonly />
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Review Details</DialogTitle>
        </DialogHeader>

        <div className="mt-4">{ReviewBody}</div>
      </DialogContent>
    </Dialog>
  );
}
