import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { authApi } from '../api/auth';
import type { LoginPayload, User } from '../types/auth';

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = await authApi.getMe();
        setUser(currentUser);
      } catch (err) {
        console.error('Session check failed:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (payload: LoginPayload) => {
    const loggedInUser = await authApi.login(payload);
    setUser(loggedInUser);
  };

  const register = async ({ fullName, email, password }: RegisterData) => {
    // Split full name into firstName & lastName as expected by backend validator
    const parts = fullName.trim().split(/\s+/);
    const firstName = parts[0] || 'Athlete';
    const lastName = parts.slice(1).join(' ') || parts[0] || 'Member';

    const registeredUser = await authApi.register({
      firstName,
      lastName,
      email,
      password,
    });
    setUser(registeredUser);
  };

  const logout = () => {
    setUser(null);
    // In cookie-based auth, removing the client state directs back to login.
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
