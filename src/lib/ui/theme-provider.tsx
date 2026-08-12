"use client";

import { createContext, useEffect, useContext, useReducer } from "react";

export interface ActionDispatch {
  type: string;
  payload: StateTheme;
}
export interface StateTheme {
  mode: "app" | "system";
  value: "light" | "dark" | "no-preference" | "system";
}

const initialArg: StateTheme = { mode: "app", value: "light" };

function reducer(state: StateTheme, action: ActionDispatch): StateTheme {
  return action.payload;
}

const ThemeContext = createContext<StateTheme>(initialArg);
const ThemeDispatchContext = createContext<(action: ActionDispatch) => void>(
  (action) => {},
);

export function useThemeContext() {
  return useContext(ThemeContext);
}

export function useThemeDispatch() {
  return useContext(ThemeDispatchContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, dispatch] = useReducer(reducer, initialArg);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme.value);
    if (theme.mode === "system") {
      const md = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => {
        dispatch({
          type: "system",
          payload: { mode: "system", value: e.matches ? "dark" : "light" },
        });
      };
      md.addEventListener("change", handleChange);
      return () => {
        md.removeEventListener("change", handleChange);
      };
    }
    return () => {};
  }, [theme]);

  return (
    <ThemeContext value={theme}>
      <ThemeDispatchContext value={dispatch}>{children}</ThemeDispatchContext>
    </ThemeContext>
  );
}
