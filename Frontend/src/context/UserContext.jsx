// src/context/UserContext.jsx
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const API_BASE = import.meta.env.VITE_API_BASE;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Optionally fetch user info from backend
      axios.get(`${API_BASE}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setUser(res.data))
        .catch(() => setUser(null));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}
