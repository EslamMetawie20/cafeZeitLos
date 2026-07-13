import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types/models';
import { DEMO_USERS } from '../storage/demoDatabase';

interface AuthContextType {
  user: User | null;
  login: (userId: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('cz_auth_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user', e);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (userId: string) => {
    setIsLoading(true);
    // Simulate network delay for demo
    await new Promise(resolve => setTimeout(resolve, 600));
    const foundUser = DEMO_USERS.find(u => u.id === userId);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('cz_auth_user', JSON.stringify(foundUser));
    }
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cz_auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
