

// "use client";

// import Link from "next/link";
// import { Home, ShoppingCart, Package } from "lucide-react";

// export default function MobileNav({ userId }: { userId: string }) {
//   return (
//     <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-around border-t bg-white p-2 md:hidden">
//       <Link href="/farmer" className="flex flex-col items-center text-sm">
//         <Home />
//         Home
//       </Link>
//       <Link href="/farmer/orders" className="flex flex-col items-center text-sm">
//         <Package />
//         Orders
//       </Link>
//       <Link href={`/cart/${userId}`} className="flex flex-col items-center text-sm">
//         <ShoppingCart />
//         Cart
//       </Link>
//     </div>
//   );
// }




"use client";

import Link from "next/link";
import { Home, Package, ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function MobileNav({ userId }: { userId: string }) {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/farmer", icon: Home },
    { name: "Orders", href: "/farmer/orders", icon: Package },
    { name: "Cart", href: `/cart/${userId}`, icon: ShoppingCart },
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
              "flex flex-col items-center gap-1 text-xs",
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
