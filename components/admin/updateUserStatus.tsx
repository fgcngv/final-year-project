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
// import { updateUserStatus } from "@/app/[locale]/actions/admin";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { updateStatus } from "@/app/[locale]/actions/admin";

type Status = "ACTIVE" | "INACTIVE" | "DORMANT" | "PAUSED";

interface StatusDropdownProps {
  userId: string;
  currentStatus: Status; // Current status of the user
  entity:"user" | "product"  //which table is to be updated
}

export function UserStatusDropdown({
  userId,
  currentStatus,
  entity
}: StatusDropdownProps) {
  const [status, setStatus] = useState<Status>(currentStatus);
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const handleChange = async (val: string) => {
    const selectedStatus = val as Status;

    if (selectedStatus === status) return; // no change

    setLoading(true);
    try {
      const result = await updateStatus(entity,userId, selectedStatus);

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

<div className={cn(` rounded-2xl text-white ${currentStatus === "ACTIVE" ? "bg-green-900" : currentStatus === "INACTIVE" ? "bg-red-700" : "bg-yellow-900"}`)}>
<Select value={status} onValueChange={handleChange} disabled={loading}>
      <SelectTrigger className="w-32">
        {/* Display the current status inside the trigger */}
        <SelectValue placeholder="Select Status">{status}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem className="bg-blue-700 font-bold text-white" value="ACTIVE">
          ACTIVE
        </SelectItem>
        <SelectItem className="bg-yellow-500 font-bold text-white" value="DORMANT">
          DORMANT
        </SelectItem>
        <SelectItem className="bg-red-600 font-bold text-white" value="INACTIVE">
          INACTIVE
        </SelectItem>
        {
          entity==="product" && (
            <SelectItem className="bg-cyan-600 font-bold text-white" value="PAUSED">
            PAUSED
          </SelectItem>
          )
        }
      </SelectContent>
    </Select>
</div>
  );
}
