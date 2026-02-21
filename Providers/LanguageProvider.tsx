// "use client";

// import { createContext, useState, useEffect } from "react";

// interface ThemeContextType {
//   theme: string;
//   toggleTheme: () => void;
// }

// export const ThemeContext = createContext<ThemeContextType>({
//   theme: "english",
//   toggleTheme: () => {},
// });

// export default function LanguageProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [theme, setTheme] = useState<string>("ENGLISH");

//   // Load saved theme from localStorage on mount
//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme) setTheme(savedTheme);
//   }, []);

//   // Save theme to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme((prev) =>
//       prev === "ENGLISH" ? "AMHARIC" : prev === "AMHARIC" ? "AFAN_OROMO" : "ENGLISH"
//     );
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }










"use client";

import { createContext, useState, useEffect } from "react";

interface LanguageContextType {
  language: string;
  toggleLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: "ENGLISH",
  toggleLanguage: () => {},
});

export default function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguage] = useState<string>("ENGLISH");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) setLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) =>
      prev === "ENGLISH"
        ? "AMHARIC"
        : prev === "AMHARIC"
        ? "AFAN_OROMO"
        : "ENGLISH"
    );
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}