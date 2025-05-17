import React, { createContext, useContext, useState, useEffect } from "react";
import { LevelStatusMap } from "@/types";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  points: number;
  streak: number;
  lastActive: string;
  isLoggedIn: boolean;
  coursesEnrolled: string[];
  completedLevels: string[];
  interests?: string[];
  experienceLevel?: 'beginner' | 'intermediate' | 'advanced';
  hasCompletedCustomization?: boolean;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  levelStatus: LevelStatusMap;
  updateLevelStatus: (level: string, status: { completed?: boolean; paid?: boolean }) => void;
  isLevelAccessible: (level: string) => boolean;
  initiatePayment: (level: string, amount: number) => Promise<boolean>;
  updateLastActive: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [levelStatus, setLevelStatus] = useState<LevelStatusMap>({
    beginner: { completed: false, paid: true }, // Beginner level is free
    intermediate: { completed: false, paid: false },
    advanced: { completed: false, paid: false }
  });
  
  // Initialize user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      
      // Check if streak should be updated or reset
      const lastActive = new Date(parsedUser.lastActive);
      const now = new Date();
      const daysSinceActive = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysSinceActive === 0) {
        // Already active today, keep current streak
        setUser(parsedUser);
      } else if (daysSinceActive === 1) {
        // Active yesterday, increment streak
        const updatedUser = {
          ...parsedUser,
          streak: parsedUser.streak + 1,
          lastActive: now.toISOString()
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      } else {
        // More than a day gap, reset streak
        const updatedUser = {
          ...parsedUser,
          streak: 0,
          lastActive: now.toISOString()
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    }
    
    // Initialize dark mode and level status...
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode) {
      setIsDarkMode(storedDarkMode === "true");
    }
    
    const storedLevelStatus = localStorage.getItem("levelStatus");
    if (storedLevelStatus) {
      setLevelStatus(JSON.parse(storedLevelStatus));
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
  
  // Save levelStatus to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("levelStatus", JSON.stringify(levelStatus));
  }, [levelStatus]);
  
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

  const updateLevelStatus = (level: string, status: { completed?: boolean; paid?: boolean }) => {
    setLevelStatus(prev => {
      const currentLevelStatus = prev[level] || { completed: false, paid: false };
      const updatedLevelStatus = {
        ...currentLevelStatus,
        ...status
      };
      
      return {
        ...prev,
        [level]: updatedLevelStatus
      };
    });
  };

  const isLevelAccessible = (level: string): boolean => {
    if (level.toLowerCase() === 'beginner') return true;
    
    const levels = ['beginner', 'intermediate', 'advanced'];
    const levelIndex = levels.indexOf(level.toLowerCase());
    
    if (levelIndex <= 0) return true; // Beginner is always accessible
    
    const previousLevel = levels[levelIndex - 1];
    // Check if previous level is completed and current level is paid
    return (
      levelStatus[previousLevel]?.completed === true && 
      levelStatus[level.toLowerCase()]?.paid === true
    );
  };

  // Mock payment gateway integration
  const initiatePayment = async (level: string, amount: number): Promise<boolean> => {
    try {
      // In a real app, this would be replaced with actual payment gateway integration
      console.log(`Processing payment of ₹${amount} for ${level} level`);

      // Simulate payment processing with 80% success rate
      return new Promise(resolve => {
        setTimeout(() => {
          const isSuccess = Math.random() < 0.8; // 80% success rate
          if (isSuccess) {
            // Mark the level as paid
            updateLevelStatus(level.toLowerCase(), { paid: true });
            console.log(`Payment successful for ${level} level`);
            resolve(true);
          } else {
            console.log(`Payment failed for ${level} level`);
            resolve(false);
          }
        }, 1500); // Simulate network delay
      });
    } catch (error) {
      console.error("Payment processing error:", error);
      return false;
    }
  };
  
  // Update lastActive timestamp whenever user interacts
  const updateLastActive = () => {
    if (user) {
      const now = new Date();
      const updatedUser = {
        ...user,
        lastActive: now.toISOString()
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };
  
  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      isDarkMode, 
      toggleDarkMode, 
      logout, 
      updateUser,
      levelStatus,
      updateLevelStatus,
      isLevelAccessible,
      initiatePayment,
      updateLastActive
    }}>
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
