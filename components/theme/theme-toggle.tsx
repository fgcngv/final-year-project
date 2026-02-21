

"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      className="bg-transparent border rounded-md px-2 py-1
                 dark:bg-[#1A120B] dark:text-white"
    >
      <option value="light">☀ Light</option>
      <option value="dark">🌙 Dark</option>
      <option value="system">💻 System</option>
    </select>
  );
}