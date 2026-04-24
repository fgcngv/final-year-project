
// "use client";

// import { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
// } from "@/components/ui/select";
// import { updateReportStatus } from "@/app/[locale]/actions/admin";
// import { AlertTriangle, Star, Shield, Eye } from "lucide-react";
// import { motion } from "framer-motion";

// type Report = any;

// function getTrustLevel(report: any) {
//   const target = report.product || report.farmer;

//   if (!target) return "UNKNOWN";

//   if (target.reportCount >= 10) return "CRITICAL";
//   if (target.reportCount >= 5 || target.avgRating < 2.5) return "HIGH";
//   if (target.reportCount >= 3 || target.avgRating < 3.5) return "MEDIUM";
//   return "LOW";
// }

// export default function AdminReportsDashboard({
//   initialReports,
// }: {
//   initialReports: Report[];
// }) {
//   const [reports, setReports] = useState(initialReports);
//   const [filter, setFilter] = useState("ALL");

//   const handleUpdate = async (id: string, status: string) => {
//     const res = await updateReportStatus({
//       reportId: id,
//       status: status as any,
//     });

//     if (res.success) {
//       setReports((prev) =>
//         prev.map((r) => (r.id === id ? { ...r, status } : r))
//       );
//     }
//   };

//   const filtered =
//     filter === "ALL" ? reports : reports.filter((r) => r.status === filter);

//   return (
//     <div className="p-6 space-y-6 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 min-h-screen">
      
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
//           🛡️ Trust & Safety Dashboard
//         </h1>

//         <Select onValueChange={setFilter}>
//           <SelectTrigger className="w-48 bg-white dark:bg-gray-800">
//             <SelectValue placeholder="Filter reports" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="ALL">All</SelectItem>
//             <SelectItem value="PENDING">Pending</SelectItem>
//             <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
//             <SelectItem value="RESOLVED">Resolved</SelectItem>
//             <SelectItem value="REJECTED">Rejected</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Cards */}
//       <div className="grid gap-6">
//         {filtered.map((report, i) => {
//           const target = report.product || report.farmer;
//           const trust = getTrustLevel(report);

//           return (
//             <motion.div
//               key={report.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.05 }}
//             >
//               <Card className="shadow-xl border-0 bg-white dark:bg-gray-800 hover:shadow-2xl transition-all rounded-2xl">
//                 <CardContent className="p-6 space-y-4">

//                   {/* Top */}
//                   <div className="flex justify-between">
//                     <div>
//                       <p className="text-lg font-semibold text-gray-800 dark:text-white">
//                         {report.type}
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         {report.reason}
//                       </p>
//                     </div>

//                     <Badge className="text-xs px-3 py-1">
//                       {report.status}
//                     </Badge>
//                   </div>

//                   {/* Target Info */}
//                   {target && (
//                     <div className="grid grid-cols-3 gap-4 text-sm">

//                       <div className="flex items-center gap-2">
//                         <Star className="text-yellow-500 w-4 h-4" />
//                         <span>{target.avgRating?.toFixed(1)}</span>
//                       </div>

//                       <div className="flex items-center gap-2">
//                         <AlertTriangle className="text-red-500 w-4 h-4" />
//                         <span>{target.reportCount}</span>
//                       </div>

//                       <div className="flex items-center gap-2">
//                         <Shield className="text-blue-500 w-4 h-4" />
//                         <span>{trust}</span>
//                       </div>
//                     </div>
//                   )}

//                   {/* Description */}
//                   {report.description && (
//                     <p className="text-gray-600 dark:text-gray-300 text-sm">
//                       {report.description}
//                     </p>
//                   )}

//                   {/* Reporter */}
//                   <p className="text-xs text-gray-400">
//                     By: {report.reporter?.first_name}{" "}
//                     {report.reporter?.last_name}
//                   </p>

//                   {/* Actions */}
//                   <div className="flex gap-2 pt-2">
//                     <Button
//                       variant="outline"
//                       onClick={() =>
//                         handleUpdate(report.id, "UNDER_REVIEW")
//                       }
//                     >
//                       Review
//                     </Button>

//                     <Button
//                       className="bg-green-600 hover:bg-green-700"
//                       onClick={() =>
//                         handleUpdate(report.id, "RESOLVED")
//                       }
//                     >
//                       Resolve
//                     </Button>

//                     <Button
//                       variant="destructive"
//                       onClick={() =>
//                         handleUpdate(report.id, "REJECTED")
//                       }
//                     >
//                       Reject
//                     </Button>
//                   </div>

//                 </CardContent>
//               </Card>
//             </motion.div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }















"use client";

import { useState } from "react";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { updateReportStatus } from "@/app/[locale]/actions/admin";
import LoaderBtn from "../loaderBtn";

interface Report {
  id: string;
  type: "FARMER" | "PRODUCT" | "ORDER" | "USER";
  reason: string;
  status: "UNDER_REVIEW" | "RESOLVED" | "REJECTED";
  description?: string | null;
  createdAt: Date;

  reporter: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };

  product?: {
    id: string;
    product_name: string;
  } | null;

  farmer?: {
    id: string;
    first_name: string;
    last_name: string;
  } | null;

  order?: {
    id: string;
  } | null;
}

export default function AdminReportsDashboard({
  initialReports,
}: {
  initialReports: Report[];
}) {
  const [reports, setReports] = useState(initialReports);
  const [filter, setFilter] = useState("ALL");

  const handleUpdate = async (id: string, status: Report["status"]) => {
    const res = await updateReportStatus({ reportId: id, status });

    if (res.success) {
      setReports((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    }
  };

  const filteredReports =
    filter === "ALL" ? reports : reports.filter((r) => r.status === filter);

  return (
    <div className="p-6 space-y-6 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
        Reports Dashboard
      </h1>

      {/* Filter */}
      <Select onValueChange={setFilter}>
        <SelectTrigger className="w-56">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All</SelectItem>
          {/* <SelectItem value="PENDING">Pending</SelectItem> */}
          <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
          <SelectItem value="RESOLVED">Resolved</SelectItem>
          <SelectItem value="REJECTED">Rejected</SelectItem>
        </SelectContent>
      </Select>

      {/* Reports */}
      <div className="grid gap-6">
        {filteredReports.map((report) => (
          <Card
            key={report.id}
            className="shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <CardContent className="p-6 space-y-4">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {report.type} Report
                  </p>
                  <p className="text-sm text-gray-500">{report.reason}</p>
                </div>

                <Badge
                  className={
                     report.status === "UNDER_REVIEW"
                      ? "bg-blue-500"
                      : report.status === "RESOLVED"
                      ? "bg-green-600"
                      : "bg-red-500"
                  }
                >
                  {report.status}
                </Badge>
              </div>

              {/* Reporter Info */}
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {report.reporter.first_name[0].toUpperCase()}
                    {report.reporter.last_name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {report.reporter.first_name} {report.reporter.last_name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {report.reporter.email}
                  </p>
                </div>
                <LoaderBtn btnName="Talk With" className="bg-amber-900 dark:text-gray-500" linkTo={`/chatMatche/${report.reporter.id}`}/>
              </div>

              {/* Target Info */}
              <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                {report.product && (
                    <div className="flex items-center gap-2">
                  <p>
                    📦 Product: <strong>{report.product.product_name}</strong>
                  </p>
                    <LoaderBtn btnName="View Product" className="bg-amber-900 dark:text-gray-500" linkTo={`/product/${report.product.id}`}/>
                    </div>
                )}

                {report.farmer && (
                  <p>
                    🌱 Farmer: {report.farmer.first_name} {report.farmer.last_name}
                  </p>
                )}

                {report.order && (
                  <p>
                    🧾 Order ID: {report.order.id}
                  </p>
                )}
              </div>

              {/* Description */}
              {report.description && (
                <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm">
                  {report.description}
                </div>
              )}

              {/* Date */}
              <p className="text-xs text-gray-400">
                {new Date(report.createdAt).toLocaleString()}
              </p>

              {/* Actions */}
              <div className="flex gap-2 pt-2 flex-wrap">
                <Button
                  variant="secondary"
                  onClick={() => handleUpdate(report.id, "UNDER_REVIEW")}
                >
                  Review
                </Button>

                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => handleUpdate(report.id, "RESOLVED")}
                >
                  Resolve
                </Button>

                <Button
                  variant="destructive"
                  onClick={() => handleUpdate(report.id, "REJECTED")}
                >
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
