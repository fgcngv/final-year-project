"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { AddReport } from "@/app/[locale]/actions/review";

// Import your server action

type ReportReason =
  | "SCAM"
  | "POOR_QUALITY"
  | "WRONG_ITEM"
  | "LATE_DELIVERY"
  | "ABUSE"
  | "SPAM"
  | "OTHER";

interface ReportDialogProps {
  orderId?: string;
  farmerId?: string;
  productId?: string;
  type: "FARMER" | "PRODUCT" | "ORDER" | "USER";
}

export default function ReportDialog({
  orderId,
  farmerId,
  productId,
  type,
}: ReportDialogProps) {
  const [reason, setReason] = useState<ReportReason | "">("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    if (!reason) return toast.error("Please select a reason");

    try {
      setLoading(true);

      //  Call the server action directly
      const result = await AddReport({
        orderId,
        farmerId,
        productId,
        type,
        reason,
        description,
      });

      if (result.success) {
        toast.success("Report submitted successfully");
        setOpen(false);
        setReason("");
        setDescription("");
      } else {
        toast.error(result.message || "Failed to submit report");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="gap-2">
          <AlertTriangle size={18} />
          Report
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle size={20} />
            Report Issue
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* Reason */}
          <div className="space-y-1">
            <label className="text-sm font-medium">
              Reason <span className="text-red-500">*</span>
            </label>

            <Select onValueChange={(value) => setReason(value as ReportReason)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="SCAM">Scam</SelectItem>
                <SelectItem value="POOR_QUALITY">Poor Quality</SelectItem>
                <SelectItem value="WRONG_ITEM">Wrong Item</SelectItem>
                <SelectItem value="LATE_DELIVERY">Late Delivery</SelectItem>
                <SelectItem value="ABUSE">Abusive Behavior</SelectItem>
                <SelectItem value="SPAM">Spam</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-sm font-medium">
              Description (optional)
            </label>

            <Textarea
              placeholder="Describe the issue in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none min-h-[100px]"
            />
          </div>

          {/* Info note */}
          <p className="text-xs text-muted-foreground">
            Reports are reviewed by our team. False reports may result in account restrictions.
          </p>

          {/* Actions */}
          <div className="flex flex-col gap-2 pt-2">
          <Button
              className="w-full text-gray-300 hover:text-gray-700 cursor-pointer bg-green-600 font-bold"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Report"}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}