

import { getRole } from "@/utils/role";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Coffee } from "lucide-react";
import AddProduct from "./form/add-product";



// Farmer side bar
export async function FarmerSidebar() {
  const { userId } = await auth();
  const role = await getRole();
  

  const links =
   ( role === "farmer" || role === "seller" || role === "SELLER") && userId
      ? [
          { name: "Dashboard", link: "/farmer" },
          { name: "Orders", link: "/farmer/orders" },
          { name: "Profile", link: `/farmer/profile/${userId}` },
          { name: "Home", link: `/` },
        ]
      : [{ name: "Dashboard", link: "/admin" }];

  return (
    <div className="flex h-full z-50 bg-gray-900 flex-col p-4 fixed">
      {/* LOGO */}
      <div className="mb-6 rounded-lg bg-green-800 py-3 text-center text-xl font-bold text-green-200 flex items-center">
       <Coffee /> Green Coffee
      </div>

      {/* LINKS */}
      <nav className="flex flex-col gap-2">
        {links.map((item) => (
          <Link
            key={item.name}
            href={item.link}
            className={cn(
              "rounded-lg z-0 px-4 py-3 text-sm font-semibold transition",
              "hover:bg-green-700 hover:text-white",
              "bg-gray-100 text-gray-800"
            )}
          >
            {item.name}
          </Link>
        ))}
        <div className=" border-t border-gray-700 mt-4 pt-4 bottom-0">  
            <h2 className="text-sm font-semibold mt-4 mb-2 text-gray-300 botto-0">Add New Product</h2>
        </div>
        <AddProduct />
      </nav>
    </div>
  );
}

