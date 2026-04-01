

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import ThemeToggle from "./theme/theme-toggle";
import LocaleSwitcher from "./LocaleSwitcher";

function DashboardHeader({ role }: { role: string }) {
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
