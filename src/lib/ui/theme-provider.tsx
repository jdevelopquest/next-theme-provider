"use client";

import {
  createContext,
  useEffect,
  useEffectEvent,
  useContext,
  useReducer,
} from "react";

type theme = { mode: "app" | "system"; value: "light" | "dark" | undefined };

const ThemeContext = createContext<theme>({ mode: "system", value: undefined });
const ThemeDispatchContext = createContext<
  React.Dispatch<{ type: "set-theme"; payload: theme }>
>(() => () => {});

function reducer(
  state: theme,
  action: { type: "set-theme"; payload: theme },
): theme {
  return action.payload;
}

export function useTheme(): [theme, () => void, () => void, () => void] {
  const theme = useContext(ThemeContext);
  const dispatch = useContext(ThemeDispatchContext);
  const switchToLight = () =>
    dispatch({ type: "set-theme", payload: { mode: "app", value: "light" } });
  const switchToDark = () =>
    dispatch({ type: "set-theme", payload: { mode: "app", value: "dark" } });
  const switchToSystem = () =>
    dispatch({
      type: "set-theme",
      payload: { mode: "system", value: undefined },
    });

  return [theme, switchToLight, switchToDark, switchToSystem];
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const getColorScheme = useEffectEvent(() => {
    const md = window.matchMedia("(prefers-color-scheme: dark)");
    return md.matches ? "dark" : "light";
  });

  const [theme, dispatch] = useReducer(reducer, {
    mode: "system",
    value: undefined,
  });

  useEffect(() => {
    // TODO: manage theme.value === undefined
    const value = theme.mode === "system" ? getColorScheme() : theme.value!;
    document.documentElement.setAttribute("data-theme", value);
  }, [theme]);

  const handleColorSchemeChange = useEffectEvent((e: MediaQueryListEvent) => {
    if (theme.mode === "system") {
      dispatch({
        type: "set-theme",
        payload: { mode: "system", value: undefined },
      });
    }
  });

  useEffect(() => {
    const md = window.matchMedia("(prefers-color-scheme: dark)");
    md.addEventListener("change", handleColorSchemeChange);
    return () => {
      md.removeEventListener("change", handleColorSchemeChange);
    };
  }, []);

  return (
    <ThemeContext value={theme}>
      <ThemeDispatchContext value={dispatch}>{children}</ThemeDispatchContext>
    </ThemeContext>
  );
}
