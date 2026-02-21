// "use client"

// import { ThemeContext } from "@/Providers/ThemeProvider";
// import { useContext } from "react";

// function CheckTheme() {
//     const {theme,toggleTheme } = useContext(ThemeContext);

//     return {theme,toggleTheme}
// }

// export default CheckTheme;

"use client";

import { useContext } from "react";
import { LanguageContext } from "@/Providers/LanguageProvider";

export function useTheme() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context; // returns { theme, toggleTheme }
}
