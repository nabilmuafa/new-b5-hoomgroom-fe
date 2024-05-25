"use client";

import { createContext, useEffect, useState } from "react";
import Navbar from "./components/navigation/navbar";
import { extractDetails } from "./utils/jwtUtil";

export const AuthContext = createContext();

export default function AuthProvider({ children, userDetails }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    window.localStorage.getItem("token") !== null
  );
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const details = extractDetails(token);
  const [username, setUsername] = useState(details.username);
  const [role, setRole] = useState(details.role);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: [isAuthenticated, setIsAuthenticated],
        token: [token, setToken],
        username: [username, setUsername],
        role: [role, setRole],
      }}
    >
      <Navbar />
      {children}
    </AuthContext.Provider>
  );
}
