"use client"

import { useTheme } from "@/components/checkTheme";
import { Button } from "@/components/ui/button";

export default function SomeComponent() {
  const { language, toggleLanguage } = useTheme();

  return (
      <Button onClick={toggleLanguage} className="cursor-pointer font-bold bg-green-600 hover:bg-green-700 active:bg-green-800">{language}</Button>
  );
}
