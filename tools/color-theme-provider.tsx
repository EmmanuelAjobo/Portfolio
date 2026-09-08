"use client"
import { createContext, useContext, useEffect, useState } from "react";

type ColorTheme = "mint" | "blue";

interface ColorThemeContextType {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(undefined);

export function ColorThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorTheme, setColorThemeState] = useState<ColorTheme>("mint");

  useEffect(() => {
    // Read saved theme on initial client mount
    const saved = localStorage.getItem("color-theme") as ColorTheme;
    if (saved) {
      setColorThemeState(saved);
      document.documentElement.setAttribute("data-color-theme", saved);
    }
  }, []);

  const setColorTheme = (theme: ColorTheme) => {
    setColorThemeState(theme);
    localStorage.setItem("color-theme", theme);
    document.documentElement.setAttribute("data-color-theme", theme);
  };

  return (
    <ColorThemeContext.Provider value={{ colorTheme, setColorTheme }}>
      {children}
    </ColorThemeContext.Provider>
  );
}

export function useColorTheme() {
  const context = useContext(ColorThemeContext);
  if (!context) {
    throw new Error("useColorTheme must be used within a ColorThemeProvider");
  }
  return context;
}