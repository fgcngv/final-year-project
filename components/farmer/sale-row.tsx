import { Badge } from "../ui/badge";

export default function SaleRow({
    buyer,
    amount,
    status,
  }: {
    buyer: string;
    amount: string;
    status: string;
  }) {
    const getColor = () => {
      switch (status) {
        case "DELIVERED":
        case "CONFIRMED":
          return "bg-emerald-600";
        case "PENDING":
          return "bg-yellow-500";
        case "CANCELLED":
          return "bg-red-500";
        default:
          return "bg-gray-400";
      }
    };
  
    return (
      <div className="flex items-center justify-between rounded-lg border bg-card p-3">
        <div>
          <p className="font-medium">{buyer}</p>
          <p className="text-emerald-600 dark:text-emerald-400">{amount}</p>
        </div>
        <Badge className={getColor()}>{status}</Badge>
      </div>
    );
  }