

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import ThemeToggle from "./theme/theme-toggle";
import LocaleSwitcher from "./LocaleSwitcher";
import { getAllNotification } from "@/utils/services/notification";
import Link from "next/link";
import { Bell } from "lucide-react";


async function DashboardHeader({ role }: { role: string }) {
  const notification = await getAllNotification()
  return (
    <div className="flex items-center justify-between font-bold text-2xl  px-4 py-3 w-full bg-transparent text-black  sm:px-6">
      {/* LEFT */}
      <span className="text-sm font-semibold uppercase tracking-wide dark:text-white">
        {role} Dashboard
      </span>
      <ThemeToggle />

      {/* CENTER (desktop only) */}
      <div className="hidden sm:block">
            <LocaleSwitcher />
      </div>
          {/* notification */}
<div>
{notification.data && notification.data.length > 0 ? (
            <div className="relative hidden min-[298px]:block hover:text-red-400 active:text-red-600">
              <Link
                href={`/notifications`}
                className="hover:text-red-400 active:text-red-600"
              >
                <Bell size={25} className="text-2xl text-black dark:text-white font-bold hover:text-red-400 active:text-red-600" />
              </Link>
              <span className="absolute  w-9 -top-4 -right-4 items-center justify-center text-white flex bg-red-500 text-sm rounded-full">
                {notification.data.length > 100 ? "100+" : notification.data.length}
              </span>
            </div>
          ) : null}
</div>

      {/* RIGHT */}
      <div>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </div>
  );
}

export default DashboardHeader;
