"use client";

import {
  createContext,
  useEffect,
  useEffectEvent,
  useContext,
  useReducer,
} from "react";

export interface ActionDispatch {
  type: string;
  payload: StateTheme;
}

export interface StateTheme {
  mode: "app" | "system";
  value: "light" | "dark" | "no-preference" | "unknown";
}

const initialArg: StateTheme = { mode: "system", value: "unknown" };

function reducer(state: StateTheme, action: ActionDispatch): StateTheme {
  if (action.type === "update") {
    return action.payload;
  }

  return state;
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

  const handleChange = useEffectEvent(() => {
    if (theme.mode === "system") {
      dispatch({
        type: "update",
        payload: { mode: "system", value: "unknown" },
      });
    }
  });

  const getSystemTheme = () => {
    const md = window.matchMedia("(prefers-color-scheme: dark)");
    return md.matches ? "dark" : "light";
  };

  useEffect(() => {
    const value = theme.value === "unknown" ? getSystemTheme() : theme.value;
    document.documentElement.setAttribute("data-theme", value);
  }, [theme]);

  useEffect(() => {
    const mdd = window.matchMedia("(prefers-color-scheme: dark)");
    mdd.addEventListener("change", handleChange);
    return () => {
      mdd.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <ThemeContext value={theme}>
      <ThemeDispatchContext value={dispatch}>{children}</ThemeDispatchContext>
    </ThemeContext>
  );
}
