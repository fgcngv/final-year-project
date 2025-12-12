import { getRole } from "@/utils/role";
import Link from "next/link";

const sidebarLinks = [
  {
    label: "MENU",
    key: "dashboard",
    links: [
      {
        name: "Dashboard",
        link: `/admin`,
        key2: "dashboard",
      },
    ],
  },
  {
    label: "MANAGE",
    key: "manage",
    links: [
      {
        name: "Users",
        link: "/admin/users",
        key2: "users",
        icon: "Users",
      },
      {
        name: "Farmers",
        link: "/admin/farmers",
        key2: "farmers",
        icon: "User",
      },
      {
        name: "Staffs",
        link: "/admin/staffs",
        key2: "staffs",
        icon: "User",
      },
      {
        name: "Products",
        link: "/admin/product",
        key2: "Products",
        icon: "Users",
      },
    ],
  },
];
function Sidebar() {
  return (
    <div className="px-2 fixed">
      <div className="border text-center cursor-pointer bg-green-800 rounded font-bold text-2xl text-green-300 mb-4 md:p-3 w-full">
        Green Coffee
      </div>
      {sidebarLinks.map((links) => (
        <div key={links.key}>
          <h1 className="font-bold" key={links.key}>
            {links.label}
          </h1>
          <div className="flex flex-col pl-3 gap-2">
            {links.links.map((link) => (
              <Link
                key={link.key2}
                href={link.link}
                className="bg-gray-300 rounded flex justify-center items-center hover:bg-gray-500 font-bold "
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
