

import { getRole } from "@/utils/role";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { cn } from "@/lib/utils";


const sidebarLinks = [
  {
    label: "MENU",
    key: "dashboard",
    links: [
      {
        name: "Dashboard",
        link: "/admin",
        key2: "dashboard",
      },
    ],
  },
  {
    label: "MANAGE",
    key: "manage",
    links: [
      { name: "Users", link: "/admin/users", key2: "users" },
      { name: "Farmers", link: "/admin/farmers", key2: "farmers" },
      { name: "Staffs", link: "/admin/staffs", key2: "staffs" },
      { name: "Products", link: "/admin/product", key2: "products" },
      { name: "Messages", link: "/admin/messages", key2: "messages" },
    ],
  },
];

const farmerSideBarLinks = (userId: string) => [
  {
    label: "MENU",
    key: "dashboard",
    links: [
      {
        name: "Dashboard",
        link: "/farmer",
        key2: "dashboard",
      },
    ],
  },
  {
    label: "MANAGE",
    key: "manage",
    links: [
      {
        name: "Orders",
        link: `/farmer/orders`,
        key2: "orders",
      },
      {
        name: "Cart",
        link: `/cart/${userId}`,
        key2: "cart",
      },
    ],
  },
];

async function Sidebar() {
  const { userId } = await auth();
  const role = await getRole();

  // Choose links based on role
  const linksToRender =
    (role === "farmer" || role === "seller" || role === "SELLER") && userId
      ? farmerSideBarLinks(userId)
      : sidebarLinks;

  return (
    <div className="px-2 fixed">
      <div className="border text-center cursor-pointer bg-green-800 rounded font-bold text-2xl text-green-300 mb-4 md:p-3 w-full">
        Green Coffee
      </div>

      {linksToRender.map((section) => (
        <div key={section.key}>
          <h1 className="font-bold">{section.label}</h1>
          <div className="flex flex-col pl-3 gap-2">
            {section.links.map((link) => (
              <Link
                key={link.key2}
                href={link.link}
                className="bg-gray-300 rounded flex justify-center items-center hover:bg-gray-500 font-bold"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;



// Farmer side bar
export async function FarmerSidebar() {
  const { userId } = await auth();
  const role = await getRole();

  const links =
   ( role === "farmer" || role === "seller" || role === "SELLER") && userId
      ? [
          { name: "Dashboard", link: "/farmer" },
          { name: "Orders", link: "/farmer/orders" },
          { name: "Cart", link: `/cart/${userId}` },
          { name: "Profile", link: `/farmer/profile/${userId}` },
        ]
      : [{ name: "Dashboard", link: "/admin" }];

  return (
    <div className="flex h-full flex-col p-4 fixed">
      {/* LOGO */}
      <div className="mb-6 rounded-lg bg-green-800 py-3 text-center text-xl font-bold text-green-200">
        Green Coffee
      </div>

      {/* LINKS */}
      <nav className="flex flex-col gap-2">
        {links.map((item) => (
          <Link
            key={item.name}
            href={item.link}
            className={cn(
              "rounded-lg px-4 py-3 text-sm font-semibold transition",
              "hover:bg-green-700 hover:text-white",
              "bg-gray-100 text-gray-800"
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}

