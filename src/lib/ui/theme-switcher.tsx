"use client";

import { useThemeContext } from "@/lib/ui/theme-provider";
import { ThemeParams } from "@/lib/ui/theme-provider";

interface ButtonParams {
  themeParams: ThemeParams;
  label: string;
}

export function ThemeSwitcher() {
  const setThemeParams = useThemeContext();
  const buttonParams: ButtonParams[] = [
    {
      themeParams: { mode: "app", theme: "light" },
      label: "🌞 Switch to Light",
    },
    { themeParams: { mode: "app", theme: "dark" }, label: "🌜 Switch to Dark" },
    {
      themeParams: { mode: "system", theme: "system" },
      label: "⚙️ Switch to System",
    },
  ];
  return (
    <div className="flex justify-between gap-4 mx-auto px-2 py-4">
      {buttonParams.map((params, index) => (
        <button
          key={index}
          onClick={() => setThemeParams(params.themeParams)}
          className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded hover:cursor-pointer"
        >
          {params.label}
        </button>
      ))}
    </div>
  );
}
