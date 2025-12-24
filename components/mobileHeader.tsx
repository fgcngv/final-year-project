// "use client";

// import Link from "next/link";
// import { Menu, X, SearchIcon, ShoppingCartIcon } from "lucide-react";
// import { Button } from "./ui/button";
// import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
// import { useState } from "react";

// const headerLinks = [
//   {
//     name: "Home",
//     link: "/",
//     key: "home",
//   },
//   {
//     name: "Shop",
//     link: "/shop",
//     key: "shop",
//   },
//   {
//     name: "About",
//     link: "/about",
//     key: "about",
//   },
//   {
//     name: "Contact Us",
//     link: "/contact",
//     key: "contact",
//   },
//   {
//     name: "Oders",
//     link: "/orders",
//     key: "orders",
//   },
// ];

// function MobileHeader() {
//   const [isListDisplayed, setIsListDisplayed] = useState(false);

//   return (
//     <nav className=" w-[75%] md:hidden  absolute top-20 bg-black left-0 flex flex-col justify-items-start items-center justify-around">
//       {headerLinks.map((link) => (
//         <Link
//           href={link.link}
//           key={link.key}
//           className="hover:underline transition-all duration-75"
//         >
//           {link.name}
//         </Link>
//       ))}


//     </nav>
//   );
// }

// export default MobileHeader;





"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const headerLinks = [
  { name: "Home", link: "/", key: "home" },
  { name: "Shop", link: "/product", key: "shop" },
  { name: "About", link: "/about", key: "about" },
  { name: "Contact Us", link: "/contact", key: "contact" },
  { name: "Orders", link: "/orders", key: "orders" },
  { name: "Notifications", link: "/notifications", key: "notifications" },
];

export default function MobileHeader() {
  return (
    <div className="md:hidden bg-black text-white px-6 py-4 border-t border-gray-700 animate-slideDown">
      <nav className="flex flex-col gap-4 text-lg font-medium">
        {headerLinks.map((item) => (
          <Link
            key={item.key}
            href={item.link}
            className="hover:text-green-500 transition"
          >
            {item.name}
          </Link>
        ))}

        {/* USER SECTION */}
        <SignedIn>
          <UserButton />
        </SignedIn>

        <SignedOut>
          <SignInButton>
            <span className="text-green-500">Login</span>
          </SignInButton>
        </SignedOut>
      </nav>
    </div>
  );
}
