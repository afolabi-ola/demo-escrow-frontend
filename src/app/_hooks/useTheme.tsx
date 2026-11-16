"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { lightDbTheme, darkDbTheme } from "../_utils/theme";

// ✅ Define a type for your theme object
type Theme = typeof lightDbTheme;

// ✅ Define the shape of your context
interface DbThemeContextType {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const DbThemeContext = createContext<DbThemeContextType | undefined>(undefined);

export function DbThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hasLoadedTheme, setHasLoadedTheme] = useState(false);
  const theme = isDarkMode ? darkDbTheme : lightDbTheme;

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const shouldUseDarkMode =
      savedTheme === "dark" ||
      (savedTheme !== "light" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setIsDarkMode(shouldUseDarkMode);
    setHasLoadedTheme(true);
  }, []);

  useEffect(() => {
    if (!hasLoadedTheme) return;

    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");

    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
  }, [hasLoadedTheme, isDarkMode, theme]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <DbThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </DbThemeContext.Provider>
  );
}

export const useDbTheme = (): DbThemeContextType => {
  const context = useContext(DbThemeContext);
  if (!context) {
    throw new Error("useDbTheme must be used within a DbThemeProvider");
  }
  return context;
};
