// // app/admin/reports/page.tsx
// // import AdminReportsDashboard from "@/components/admin/AdminReportsDashboard";
// // import { getReports } from "@/app/actions/admin/report";

// import { getReports } from "@/app/[locale]/actions/admin";
// import AdminReportsDashboard from "@/components/admin/reportPage";

// export default async function Page() {
//   const result = await getReports();
//   console.log(
//     "Reports fetched from server:",
//     result.success ? result.data : "Failed to fetch reports"
//   )

//   if (!result.success) {
//     return <div>Error loading reports</div>;
//   }

//   return <AdminReportsDashboard initialReports={result.data} />;
// }




import { getReports } from "@/app/[locale]/actions/admin";
import AdminReportsDashboard from "@/components/admin/AdminReportsDashboard";

export default async function Page() {
  const result = await getReports();

  console.log("first result", result.data);

  if (!result.success) {
    return <div className="p-10 text-red-500">Failed to load</div>;
  }

  return <AdminReportsDashboard initialReports={result.data || []} />;
}