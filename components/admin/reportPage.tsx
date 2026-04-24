"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { updateReportStatus } from "@/app/[locale]/actions/admin";

interface Report {
  id: string;
  type: string;
  reason: string;
  status: string;
  description?: string;
  createdAt: string;
}

export default function AdminReportsDashboard({
  initialReports,
}: {
  initialReports: Report[];
}) {
  const [reports, setReports] = useState(initialReports);
  const [filter, setFilter] = useState("ALL");

  const handleUpdate = async (id: string, status: string) => {
    const res = await updateReportStatus({
      reportId: id,
      status: status as any,
    });

    if (res.success) {
      setReports((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    }
  };

  const filteredReports =
    filter === "ALL" ? reports : reports.filter((r) => r.status === filter);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Report Management</h1>

      {/* Filter */}
      <div className="flex gap-4">
        <Select onValueChange={setFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
            <SelectItem value="RESOLVED">Resolved</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reports List */}
      <div className="grid gap-4">
        {filteredReports.map((report) => (
          <Card key={report.id} className="shadow-md">
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{report.type}</p>
                  <p className="text-sm text-gray-500">{report.reason}</p>
                </div>

                <Badge>{report.status}</Badge>
              </div>

              {report.description && (
                <p className="text-sm text-gray-700">{report.description}</p>
              )}

              <p className="text-xs text-gray-400">
                {new Date(report.createdAt).toLocaleString()}
              </p>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button onClick={() => handleUpdate(report.id, "UNDER_REVIEW")}>
                  Review
                </Button>

                <Button onClick={() => handleUpdate(report.id, "RESOLVED")}>
                  Resolve
                </Button>

                <Button onClick={() => handleUpdate(report.id, "REJECTED")}>
                  Reject
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
