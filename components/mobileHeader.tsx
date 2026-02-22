

"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import ThemeToggle from "./theme/theme-toggle";


export default function MobileHeader() {

  const {user} = useUser()
  const role = user?.publicMetadata?.role;

  let orderLink = "";
  (role === "admin" || role === "ADMIN") ?orderLink = `${role}/order` : orderLink = `${role}`;


  const headerLinks = [
    { name: "Home", link: "/", key: "home" },
    { name: "Shop", link: "/product", key: "shop" },
    { name: "About", link: "/about", key: "about" },
    { name: "Contact Us", link: "/contact", key: "contact" },
    { name: "Orders", link: `/${orderLink}`, key: "orders" },
    { name: "Notifications", link: "/notifications", key: "notifications" },
    { name: "Chat_Members", link: `/chats/${user?.id}`, key: "chatmembers" },
  ];
  
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
        <ThemeToggle />
      </nav>
    </div>
  );
}
