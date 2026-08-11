"use client";

import { useThemeContext } from "@/lib/ui/theme-provider";

export function ThemeSwitcher() {
  const setThemeParams = useThemeContext();
  return (
    <div>
      <button onClick={() => setThemeParams({ mode: "app", theme: "light" })}>
        🌜Switch to Light
      </button>
      <button onClick={() => setThemeParams({ mode: "app", theme: "dark" })}>
        🌜Switch to Dark
      </button>
      <button
        onClick={() => setThemeParams({ mode: "system", theme: "system" })}
      >
        🌜Switch to System
      </button>
    </div>
  );
}
