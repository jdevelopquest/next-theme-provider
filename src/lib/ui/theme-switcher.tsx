"use client";

import { useThemeDispatch } from "@/lib/ui/theme-provider";
import { StateTheme } from "@/lib/ui/theme-provider";

interface ButtonParams {
  theme: StateTheme;
  attributs: {
    label: string;
    title: string;
  };
}

export function ThemeSwitcher() {
  const disptach = useThemeDispatch();
  const buttonParams: ButtonParams[] = [
    {
      theme: { mode: "app", value: "light" },
      attributs: { label: "🌞 ", title: "Switch to Light" },
    },
    {
      theme: { mode: "app", value: "dark" },
      attributs: { label: "🌜 ", title: "Switch to Dark" },
    },
    {
      theme: { mode: "system", value: "unknown" },
      attributs: { label: "⚙️ ", title: "Switch to System" },
    },
  ];
  return (
    <div className="flex justify-between gap-4 mx-auto px-2 py-4">
      {buttonParams.map((params, index) => (
        <button
          key={index}
          onClick={() =>
            disptach({ type: "update", payload: params.theme })
          }
          className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded hover:cursor-pointer"
          title={params.attributs.title}
          aria-label={params.attributs.label}
        >
          {params.attributs.label}
        </button>
      ))}
    </div>
  );
}
