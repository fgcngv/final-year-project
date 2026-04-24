
// import Link from "next/link";
// import { cn } from "@/lib/utils";

// interface Props {
//   role: string;
//   userId: string | null;
// }

// const sidebarLinks = [
//   {
//     label: "MENU",
//     key: "dashboard",
//     links: [
//       { name: "Dashboard", link: "/admin", key2: "dashboard" },
//     ],
//   },
//   {
//     label: "MANAGE",
//     key: "manage",
//     links: [
//       { name: "Users", link: "/admin/users", key2: "users" },
//       { name: "Farmers", link: "/admin/farmers", key2: "farmers" },
//       { name: "Products", link: "/admin/product", key2: "products" },
//       { name: "Messages", link: "/admin/messages", key2: "messages" },
//       { name: "Orders", link: "/admin/order", key2: "order" },
//       { name: "Home", link: "/", key2: "home" },
//     ],
//   },
// ];

// const farmerSideBarLinks = (userId: string) => [
//   {
//     label: "MENU",
//     key: "dashboard",
//     links: [{ name: "Dashboard", link: "/farmer", key2: "dashboard" }],
//   },
//   {
//     label: "MANAGE",
//     key: "manage",
//     links: [
//       { name: "Orders", link: `/farmer/orders`, key2: "orders" },
//       { name: "Cart", link: `/cart/${userId}`, key2: "cart" },
//     ],
//   },
// ];

// export default function SidebarContent({ role, userId }: Props) {
//   const linksToRender =
//     (role === "farmer" || role === "seller" || role === "SELLER") && userId
//       ? farmerSideBarLinks(userId)
//       : sidebarLinks;

//   return (
//     <div className="px-4 py-4 fixed">
//       <div className="border text-center bg-green-800 rounded font-bold text-2xl text-green-300 mb-6 p-3">
//         Green Coffee
//       </div>

//       {linksToRender.map((section) => (
//         <div key={section.key} className="mb-6">
//           <h1 className="font-bold text-gray-500 text-sm mb-2">
//             {section.label}
//           </h1>

//           <div className="flex flex-col gap-2">
//             {section.links.map((link) => (
//               <Link
//                 key={link.key2}
//                 href={link.link}
//                 className={cn(
//                   "rounded-lg px-4 py-3 text-sm font-semibold transition",
//                   "hover:bg-green-700 hover:text-white",
//                   "bg-gray-100 text-gray-800"
//                 )}
//               >
//                 {link.name}
//               </Link>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }















import Link from "next/link";
import { cn } from "@/lib/utils";
import { Coffee } from "lucide-react";

interface Props {
  role: string;
  userId: string | null;
}

const sidebarLinks = [
  {
    label: "MENU",
    key: "dashboard",
    links: [{ name: "Dashboard", link: "/admin", key2: "dashboard" }],
  },
  {
    label: "MANAGE",
    key: "manage",
    links: [
      { name: "Users", link: "/admin/users", key2: "users" },
      { name: "Farmers", link: "/admin/farmers", key2: "farmers" },
      { name: "Products", link: "/admin/product", key2: "products" },
      { name: "Messages", link: "/admin/messages", key2: "messages" },
      { name: "Orders", link: "/admin/order", key2: "order" },
      { name: "Reports", link: "/admin/reports", key2: "report" },
      { name: "Home", link: "/", key2: "home" },
    ],
  },
];

const farmerSideBarLinks = (userId: string) => [
  {
    label: "MENU",
    key: "dashboard",
    links: [{ name: "Dashboard", link: "/farmer", key2: "dashboard" }],
  },
  {
    label: "MANAGE",
    key: "manage",
    links: [
      { name: "Orders", link: `/farmer/orders`, key2: "orders" },
      { name: "Cart", link: `/cart/${userId}`, key2: "cart" },
    ],
  },
];

export default function SidebarContent({ role, userId }: Props) {
  const linksToRender =
    (role === "farmer" || role === "seller" || role === "SELLER") && userId
      ? farmerSideBarLinks(userId)
      : sidebarLinks;

  return (
    <aside className="fixed h-screen w-64 border-r bg-white dark:bg-zinc-900 dark:border-zinc-800 px-5 py-6 shadow-sm">
      
      {/* Logo */}
      <div className="mb-8">
        <div className="rounded-xl bg-green-700 dark:bg-green-600 text-center py-3 font-bold text-xl text-white tracking-wide shadow-md flex items-center gap-1">
        <Coffee size={40} strokeWidth={2} className="text-amber-700 fill-amber-800" /> Coffee
        </div>
      </div>

      {linksToRender.map((section) => (
        <div key={section.key} className="mb-8">

          {/* Section label */}
          <h1 className="text-xs font-semibold tracking-wider text-gray-500 dark:text-gray-400 mb-3 uppercase">
            {section.label}
          </h1>

          <div className="flex flex-col gap-2">
            {section.links.map((link) => (
              <Link
                key={link.key2}
                href={link.link}
                className={cn(
                  "flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                  
                  /* light mode */
                  "text-gray-700 hover:bg-green-100",

                  /* dark mode */
                  "dark:text-gray-300 dark:hover:bg-green-900/40",

                  /* hover */
                  "hover:text-green-800 dark:hover:text-green-400"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}