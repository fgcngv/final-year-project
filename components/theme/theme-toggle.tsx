
"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger
        className=" bg-transparent border rounded-md 
                   dark:bg-[#1A120B] dark:text-white"
      >
        <SelectValue placeholder="Select theme" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="light">
          <div className="flex items-center gap-2">
            <Sun fill="yellow" className="w-4 h-4 text-yellow-500" />
            Light
          </div>
        </SelectItem>

        <SelectItem value="dark">
          <div className="flex items-center gap-2">
          <Moon className="w-5 h-5 fill-gray-600 stroke-none" />

            Dark
          </div>
        </SelectItem>

        <SelectItem value="system">
          <div className="flex items-center gap-2">
            <Laptop className="w-4 h-4 text-blue-600" />
            System
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}