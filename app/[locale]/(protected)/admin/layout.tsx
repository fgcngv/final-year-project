

// import DashboardHeader from "@/components/dashboardHeader";
// import MobileSidebar from "@/components/MobileSidebar";
// import SidebarContent from "@/components/SidebarContent";
// import { auth } from "@clerk/nextjs/server";
// import { getRole } from "@/utils/role";

// export const dynamic = "force-dynamic";

// async function AdminLayout({ children }: { children: React.ReactNode }) {
//   const { userId, sessionClaims } = await auth();
//   const role = await getRole();

//   const resolvedRole =
//     !role || role === "BUYER" ? "user" : role;

//   return (
//     <div className="flex min-h-screen bg-gray-100">
      
//       {/* Desktop Sidebar */}
//       <div className="hidden md:flex w-64 bg-white border-r border-gray-200 shadow-sm">
//         <SidebarContent role={resolvedRole} userId={userId} />
//       </div>

//       <div className="flex flex-col flex-1">
        
//         <div className="w-full sticky top-0 z-40 bg-white border-b flex items-center px-4">
//           <MobileSidebar role={resolvedRole} userId={userId} />
//           <DashboardHeader role={resolvedRole} />
//         </div>

//         <main className="flex-1 p-6 overflow-y-auto">
//           <div className="max-w-7xl mx-auto">{children}</div>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default AdminLayout;












import DashboardHeader from "@/components/dashboardHeader";
import MobileSidebar from "@/components/MobileSidebar";
import SidebarContent from "@/components/SidebarContent";
import { auth } from "@clerk/nextjs/server";
import { getRole } from "@/utils/role";

export const dynamic = "force-dynamic";

async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userId, sessionClaims } = await auth();
  const role = await getRole();
  const resolvedRole = !role || role === "BUYER" ? "user" : role;

  return (
    <div className="flex min-h-screen transition-colors duration-500 bg-gray-100 dark:bg-[#121212]">

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 border-r border-gray-200 dark:border-[#3c2a21] shadow-sm transition-colors">
        <SidebarContent role={resolvedRole} userId={userId} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1">

        {/* Header */}
        <div className="w-full sticky top-0 z-40 flex items-center px-4 border-b bg-white dark:bg-[#1f140d] dark:border-[#3c2a21] transition-colors">
          <MobileSidebar role={resolvedRole} userId={userId} />
          <DashboardHeader role={resolvedRole} />
        </div>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>

      </div>
    </div>
  );
}

export default AdminLayout;