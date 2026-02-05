import DashboardHeader from "@/components/dashboardHeader";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { auth } from "@clerk/nextjs/server";

async function AdminLayout({ children }: { children: React.ReactNode }) {

const { sessionClaims } = await auth();
let role = sessionClaims?.metadata?.role;

if(!role || role === null || role === "BUYER"){
  const role = "user";
}


  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="hidden md:flex w-64 bg-white border-r border-gray-200 shadow-sm">
        <Sidebar />
      </div>

      {/* Main content wrapper */}
      <div className="flex flex-col flex-1">

        {/* Header */}
        <div className="w-full sticky top-0 z-40">
         {role && (
                <DashboardHeader role={role} />
         )} 
        </div>

        {/* Page content container */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>

      </div>
    </div>
  );
}

export default AdminLayout;



