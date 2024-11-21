import React, { createContext, useState, useEffect } from 'react';
import { initializeUser } from './userContextHelpers';
import { User } from './userTypes';

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      const { user, isAuthenticated } = await initializeUser();
      setUser(user);
      setIsAuthenticated(isAuthenticated);
      setLoading(false);
    };

    initialize();
  }, []);

  // Sincroniza isAuthenticated con el estado de user
  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  const logout = async () => {
    try {
      const response = await fetch('http://44.197.80.108:3000/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setUser(null);
        setIsAuthenticated(false);
      } else {
        console.error('Error al cerrar sesión');
      }
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, isAuthenticated, loading }}>
      {children}
    </UserContext.Provider>
  );
};
