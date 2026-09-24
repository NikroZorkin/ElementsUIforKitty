"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { savePreference, usePreference } from "@/lib/preferences";

const ThemeContext = createContext({
  theme: "light",
  preference: "system",
  setTheme: (value: string) => {
    void value;
  },
});
export const useTheme = () => useContext(ThemeContext);
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const savedTheme = usePreference("kitty-theme", "system");
  const preference = savedTheme === "light" || savedTheme === "dark" ? savedTheme : "system";
  const [systemDark, setSystemDark] = useState(false);
  useEffect(() => {
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const update = () => setSystemDark(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const theme = preference === "system" ? (systemDark ? "dark" : "light") : preference;
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  }, [theme]);
  return (
    <ThemeContext.Provider
      value={{ theme, preference, setTheme: (v) => savePreference("kitty-theme", v) }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
