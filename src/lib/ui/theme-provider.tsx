"use client";

import {
  createContext,
  useEffect,
  useEffectEvent,
  useContext,
  useReducer,
} from "react";

interface ActionDispatch {
  type: string;
  payload: StateTheme;
}

interface StateTheme {
  mode: "app" | "system";
  value: "light" | "dark" | undefined;
}

function initialStateTheme(): StateTheme {
  return ({
    mode: "system",
    value: undefined,
  });
}

function reducerStateTheme(state: StateTheme,
  action: ActionDispatch): StateTheme {
  if (action.type === "update") {
    return action.payload;
  }
  return state;
}

const ThemeContext = createContext<StateTheme>(initialStateTheme());
const ThemeDispatchContext = createContext<(action: ActionDispatch) => void>(
  (action) => {},
);

export function themeSwitcher() {
  const dispatch = useContext(ThemeDispatchContext);
  const switchToLight = () => {
    dispatch({ type: "update", payload: { mode: "app", value: "light" } });
  };
  const switchToDark = () => {
    dispatch({ type: "update", payload: { mode: "app", value: "dark" } });
  };
  const switchToSystem = () => {
    dispatch({ type: "update", payload: { mode: "system", value: undefined } });
  };
  return { switchToLight, switchToDark, switchToSystem };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, dispatch] = useReducer(reducerStateTheme, initialStateTheme());

  const getThemeSystemMedia = () => {
    return window.matchMedia("(prefers-color-scheme: dark)");
  };

  const getThemeSystem = () => {
    const md = getThemeSystemMedia();
    return md.matches ? "dark" : "light";
  };

  useEffect(() => {
    const value = theme.value === undefined ? getThemeSystem() : theme.value;
    document.documentElement.setAttribute("data-theme", value);
  }, [theme]);

  const handleThemeSystemChange = useEffectEvent(() => {
    if (theme.mode === "system") {
      dispatch({
        type: "update",
        payload: { mode: "system", value: undefined },
      });
    }
  });

  useEffect(() => {
    const md = getThemeSystemMedia();
    md.addEventListener("change", handleThemeSystemChange);
    return () => {
      md.removeEventListener("change", handleThemeSystemChange);
    };
  }, []);

  return (
    <ThemeContext value={theme}>
      <ThemeDispatchContext value={dispatch}>{children}</ThemeDispatchContext>
    </ThemeContext>
  );
}
