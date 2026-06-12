import React, { createContext, useContext, useEffect, useState } from "react";

import { getToken, saveToken, removeToken } from "../utils/storage";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;

  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = await getToken();

    setIsAuthenticated(!!token);

    setIsLoading(false);
  };

  const login = async () => {
    await saveToken("logged_in");

    setIsAuthenticated(true);
  };

  const logout = async () => {
    await removeToken();

    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
