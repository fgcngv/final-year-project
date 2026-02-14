export const dynamic = "force-dynamic";


import DashboardHeader from "@/components/dashboardHeader";
import MobileNav from "@/components/farmer/MobileNav";
import { FarmerSidebar } from "@/components/sidebar";
import { auth } from "@clerk/nextjs/server";

async function AdminLayout({ children }: { children: React.ReactNode }) {


const { sessionClaims, userId} = await auth();
let role = sessionClaims?.metadata?.role;

if(!role || role === null || role === "BUYER"){
  const role = "user";
}

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-64 flex-shrink-0 border-r bg-white">
        <FarmerSidebar />
      </aside>

      {/* MAIN */}
      <div className="flex flex-1 flex-col">
        {/* HEADER */}
        <header className="sticky top-0 z-40">
          {role && (
          <DashboardHeader role={role} />
          )}
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
                {/* MOBILE NAV */}
                {userId && <MobileNav userId={userId} />}

      </div>
    </div>
  );
}

export default AdminLayout;
