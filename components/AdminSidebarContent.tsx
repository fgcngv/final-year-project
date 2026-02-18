

import { getRole } from "@/utils/role";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  {
    label: "MENU",
    key: "dashboard",
    links: [
      { name: "Dashboard", link: "/admin", key2: "dashboard" },
    ],
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

export default async function AdminSidebarContent() {
  const { userId } = await auth();
  const role = await getRole();

  const linksToRender =
    (role === "farmer" || role === "seller" || role === "SELLER") && userId
      ? farmerSideBarLinks(userId)
      : sidebarLinks;

  return (
    <div className="px-4 py-4 ">
      <div className="border text-center bg-green-800 rounded font-bold text-2xl text-green-300 mb-6 p-3">
        Green Coffee
      </div>

      {linksToRender.map((section) => (
        <div key={section.key} className="mb-6">
          <h1 className="font-bold text-gray-500 text-sm mb-2">
            {section.label}
          </h1>

          <div className="flex flex-col gap-2">
            {section.links.map((link) => (
              <Link
                key={link.key2}
                href={link.link}
                className={cn(
                  "rounded-lg px-4 py-3 text-sm font-semibold transition",
                  "hover:bg-green-700 hover:text-white",
                  "bg-gray-100 text-gray-800"
                )}
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
