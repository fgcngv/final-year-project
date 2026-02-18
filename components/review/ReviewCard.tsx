
import StarRating from "./StarRating";

interface Props {
  name: string;
  rating: number;
  comment?: string;
  date: string;
}

export default function ReviewCard({
  name,
  rating,
  comment,
  date,
}: Props) {
  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm space-y-2">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">{name}</h4>
        <span className="text-xs text-gray-500">
          {new Date(date).toLocaleDateString()}
        </span>
      </div>

      <StarRating value={rating} readonly />

      {comment && (
        <p className="text-sm text-gray-700">{comment}</p>
      )}
    </div>
  );
}
