"use client";

import { useTheme } from "@/lib/ui/theme-provider";

interface ButtonParams {
  attributs: {
    label: string;
    title: string;
  };
  dispatch: () => void;
}

export function ThemeSwitcher() {
  const [theme, switchToLight, switchToDark, switchToSystem] = useTheme();

  const buttonParams: ButtonParams[] = [
    {
      dispatch: switchToLight,
      attributs: { label: "🌞 ", title: "Switch to Light" },
    },
    {
      dispatch: switchToDark,
      attributs: { label: "🌜 ", title: "Switch to Dark" },
    },
    {
      dispatch: switchToSystem,
      attributs: { label: "⚙️ ", title: "Switch to System" },
    },
  ];
  return (
    <div className="flex justify-between gap-4 mx-auto px-2 py-4">
      {buttonParams.map((params, index) => (
        <button
          key={index}
          onClick={() => {
            params.dispatch();
          }}
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
