

"use client";

import Link from "next/link";
import { Home, Package,User, ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function MobileNav({ userId }: { userId: string }) {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/farmer", icon: Home },
    { name: "Orders", href: "/farmer/orders", icon: Package },
    { name: "Cart", href: `/cart/${userId}`, icon: ShoppingCart },
    { name: "Profile", href: `/farmer/profile/${userId}`, icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around border-t bg-white py-2 md:hidden">
      {links.map(({ name, href, icon: Icon }) => {
        const active = pathname === href;

        return (
          <Link
            key={name}
            href={href}
            className={cn(
              "flex flex-col items-center gap-1 text-xs hover:text-green-600 active:text-green-700 font-bold",
              active ? "text-green-700" : "text-gray-500"
            )}
          >
            <Icon className="h-6 w-6" />
            {name}
          </Link>
        );
      })}
    </nav>
  );
}
