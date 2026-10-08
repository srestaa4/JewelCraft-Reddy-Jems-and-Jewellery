import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, authService, LoginParams } from '../services/authService';

interface AuthContextType {
  user: User | null;
  token: string | null;
  role: 'ROLE_CUSTOMER' | 'ROLE_SALESMAN' | 'ROLE_ADMIN' | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (params: LoginParams | string, pass?: string) => Promise<void>;
  register: (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    city?: string;
    address?: string;
  }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('jewelcraft_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('jewelcraft_token');
      if (storedToken) {
        try {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        } catch (err) {
          console.warn('Session expired or invalid, clearing authentication state', err);
          localStorage.removeItem('jewelcraft_token');
          setToken(null);
          setUser(null);
        }
      }
      // When there is no valid stored token, user remains unauthenticated
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (params: LoginParams | string, pass?: string) => {
    setIsLoading(true);
    try {
      const res = await authService.login(params, pass);
      localStorage.setItem('jewelcraft_token', res.token);
      setToken(res.token);
      setUser(res.user);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    city?: string;
    address?: string;
  }) => {
    setIsLoading(true);
    try {
      const res = await authService.register(userData);
      localStorage.setItem('jewelcraft_token', res.token);
      setToken(res.token);
      setUser(res.user);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('jewelcraft_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role: user?.role || null,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

