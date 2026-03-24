"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import SidebarContent from "./SidebarContent";

interface Props {
  role: string;
  userId: string | null;
}

export default function MobileSidebar({ role, userId }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="min-[1291px]:hidden p-2"
      >
        <Menu />
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4 dark:text-black font-bold">
          <button onClick={() => setOpen(false)} className="font-bold cursor-pointer hover:bg-green-700 p-1 rounded-2xl hover:text-white">
            <X />
          </button>
        </div>

        <SidebarContent role={role} userId={userId} />
      </div>
    </>
  );
}
