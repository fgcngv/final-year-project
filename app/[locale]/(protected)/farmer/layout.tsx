
export const dynamic = "force-dynamic";

import DashboardHeader from "@/components/dashboardHeader";
import MobileNav from "@/components/farmer/MobileNav";
import { FarmerSidebar } from "@/components/sidebar";
import { auth } from "@clerk/nextjs/server";

async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { sessionClaims, userId } = await auth();

  let role = sessionClaims?.metadata?.role;

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors">
      
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden md:flex w-64 flex-shrink-0 border-r border-border bg-card">
        <FarmerSidebar />
      </aside>

      {/* ================= MAIN AREA ================= */}
      <div className="flex flex-1 flex-col">

        {/* ================= HEADER ================= */}
        <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
          {role && <DashboardHeader role={role} />}
        </header>

        {/* ================= CONTENT ================= */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>

        {/* ================= MOBILE NAV ================= */}
        {userId && (
          <div className="md:hidden border-t border-border bg-background">
            <MobileNav userId={userId} />
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminLayout;