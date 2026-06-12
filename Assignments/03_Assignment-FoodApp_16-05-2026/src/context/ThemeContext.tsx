import React, { createContext, useContext, useState } from "react";
import { useColorScheme } from "react-native";
import { COLORS, FONTS, SPACING, RADIUS, SHADOW } from "../theme/theme"; 

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  colors: typeof COLORS.light;
  fonts: typeof FONTS;
  spacing: typeof SPACING;
  radius: typeof RADIUS;
  shadow: typeof SHADOW;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Automatically detects the phone's native operating system theme setting
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>((systemScheme === "dark" ? "dark" : "light"));

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const currentColors = COLORS[mode];

  return (
    <ThemeContext.Provider
      value={{
        mode,
        colors: currentColors,
        fonts: FONTS,
        spacing: SPACING,
        radius: RADIUS,
        shadow: SHADOW,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
