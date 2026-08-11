"use client";

import { createContext, useState, useEffect, useContext } from "react";

interface ThemeParams {
  mode: "app" | "system";
  theme: "light" | "dark" | "no-preference" | "system";
}

const ThemeContext = createContext((ThemeParams: ThemeParams) => { });

export function useThemeContext() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeParams, setThemeParams] = useState<ThemeParams>({ mode: "app", theme: "light" });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeParams.theme);
    if (themeParams.mode === "system") {
      const md = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => {
        setThemeParams({ ...themeParams, theme: e.matches ? "dark" : "light" });
      };
      md.addEventListener("change", handleChange);
      return () => {
        md.removeEventListener("change", handleChange);
      };
    }
    return () => {};
  }, [themeParams]);


  return <ThemeContext value={setThemeParams}>{children}</ThemeContext>;
}
