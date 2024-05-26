"use client";

import { createContext, useEffect, useState } from "react";
import Navbar from "./components/navigation/navbar";
import { extractDetails } from "./utils/jwtUtil";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedToken = window.localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken), setIsAuthenticated(true);
      const details = extractDetails(storedToken);
      setUsername(details.username);
      setRole(details.role);
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: [isAuthenticated, setIsAuthenticated],
        token: [token, setToken],
        username: [username, setUsername],
        role: [role, setRole],
        isLoading: [isLoading, setIsLoading],
      }}
    >
      <Navbar />
      {children}
    </AuthContext.Provider>
  );
}
