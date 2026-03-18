"use client";

import * as React from "react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateUserStatus } from "@/app/[locale]/actions/admin";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type Status = "ACTIVE" | "INACTIVE" | "DORMANT";

interface StatusDropdownProps {
  userId: string;
  currentStatus: Status; // Current status of the user
}

export function UserStatusDropdown({
  userId,
  currentStatus,
}: StatusDropdownProps) {
  const [status, setStatus] = useState<Status>(currentStatus);
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const handleChange = async (val: string) => {
    const selectedStatus = val as Status;

    if (selectedStatus === status) return; // no change

    setLoading(true);
    try {
      const result = await updateUserStatus(userId, selectedStatus);

      if (result.error) {
        toast.error(result.message);
        return;
      }

      setStatus(selectedStatus); // update UI
      toast.success(result.message || "Status Updated Successfully!");
      router.refresh()

    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }


  };

  return (

<div className={cn(` rounded-2xl ${currentStatus === "ACTIVE" ? "bg-green-900" : currentStatus === "INACTIVE" ? "bg-red-700" : "bg-yellow-900"}`)}>
<Select value={status} onValueChange={handleChange} disabled={loading}>
      <SelectTrigger className="w-32">
        {/* Display the current status inside the trigger */}
        <SelectValue placeholder="Select Status">{status}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem className="bg-blue-700 font-bold" value="ACTIVE">
          ACTIVE
        </SelectItem>
        <SelectItem className="bg-yellow-500 font-bold" value="DORMANT">
          DORMANT
        </SelectItem>
        <SelectItem className="bg-red-600 font-bold" value="INACTIVE">
          INACTIVE
        </SelectItem>
      </SelectContent>
    </Select>
</div>
  );
}
