
import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  points: number;
  streak: number;
  isLoggedIn: boolean;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  
  // Initialize user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // Initialize dark mode from localStorage
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode) {
      setIsDarkMode(storedDarkMode === "true");
    }
  }, []);
  
  // Apply dark mode to document when it changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [isDarkMode]);
  
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };
  
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  
  const updateUser = (userData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...userData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };
  
  return (
    <UserContext.Provider value={{ user, setUser, isDarkMode, toggleDarkMode, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
