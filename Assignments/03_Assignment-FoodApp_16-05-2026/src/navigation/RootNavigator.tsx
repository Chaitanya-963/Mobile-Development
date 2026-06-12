import React from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import MainTabs from "./MainTabs";
import AuthNavigator from "./AuthNavigator";
import linking from "./linking";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuth();
  const { mode, colors } = useTheme();

  if (isLoading) {
    return null;
  }

  // Generate a synchronized style tree matching React Navigation requirements
  const navigationTheme = {
    ...(mode === "dark" ? DarkTheme : DefaultTheme),
    colors: {
      ...(mode === "dark" ? DarkTheme.colors : DefaultTheme.colors),
      background: colors.bg,
      card: colors.bgCard,
      text: colors.textPrimary,
      border: colors.border,
    },
  };

  return (
    <NavigationContainer linking={linking} theme={navigationTheme}>
      {isAuthenticated ? <MainTabs /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
