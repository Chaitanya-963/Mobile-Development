import React from "react";
import { AuthProvider } from "./src/context/AuthContext";
import { CartProvider } from "./src/context/CartContext";
import { ThemeProvider } from "./src/context/ThemeContext";
import RootNavigator from "./src/navigation/RootNavigator";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ThemeProvider>
          <RootNavigator />
        </ThemeProvider>
      </CartProvider>
    </AuthProvider>
  );
}
