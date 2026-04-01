

"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import ThemeToggle from "./theme/theme-toggle";
import LoaderBtn from "./loaderBtn";


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
    { name: "Today's_Market", link: `/todays_market`, key: "today-market" },
    { name: "Chat_Members", link: `/chats/${user?.id}`, key: "chatmembers" },
    { name: "Dashboard", link: `/${role}`, key: "dashboard" },
    { name: "Profile", link: `/profile/${user?.id}`, key: "profile" },
  ];
  
  return (
    <div className="min-[1317px]:hidden bg-black text-white px-6 py-4 border-t border-gray-700 animate-slideDown">
      <nav className="flex flex-col gap-4 text-lg font-medium justify-start items-start">
        {headerLinks.map((item) => (
          <LoaderBtn key={item.key} btnName={item.name} linkTo={item.link} className="hover:text-green-500 transition  bg-transparent dark:text-white font-bold border-b-1 border-white"/>
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
