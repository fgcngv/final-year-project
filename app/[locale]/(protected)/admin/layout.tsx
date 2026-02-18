// export const dynamic = "force-dynamic";


// import DashboardHeader from "@/components/dashboardHeader";
// import Sidebar from "@/components/sidebar";
// import { auth } from "@clerk/nextjs/server";

// async function AdminLayout({ children }: { children: React.ReactNode }) {

// const { sessionClaims } = await auth();
// let role = sessionClaims?.metadata?.role;

// if(!role || role === null || role === "BUYER"){
//   const role = "user";
// }


//   return (
//     <div className="flex min-h-screen bg-gray-100">

//       {/* Sidebar */}
//       <div className="hidden md:flex w-64 bg-white border-r border-gray-200 shadow-sm">
//         <Sidebar />
//       </div>

//       {/* Main content wrapper */}
//       <div className="flex flex-col flex-1">

//         {/* Header */}
//         <div className="w-full sticky top-0 z-40">
//          {role && (
//                 <DashboardHeader role={role} />
//          )} 
//         </div>

//         {/* Page content container */}
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

  const resolvedRole =
    !role || role === "BUYER" ? "user" : role;

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 bg-white border-r border-gray-200 shadow-sm">
        <SidebarContent role={resolvedRole} userId={userId} />
      </div>

      <div className="flex flex-col flex-1">
        
        <div className="w-full sticky top-0 z-40 bg-white border-b flex items-center px-4">
          <MobileSidebar role={resolvedRole} userId={userId} />
          <DashboardHeader role={resolvedRole} />
        </div>

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
