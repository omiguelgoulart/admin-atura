'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type User = {
  id: string;
  nome: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const cookie = document.cookie
      .split('; ')
      .find((c) => c.startsWith('admin='));

    if (cookie) {
      try {
        const decoded = decodeURIComponent(cookie.split('=')[1]);
        const parsed = JSON.parse(decoded);
        setUser(parsed);
      } catch {
        setUser(null);
      }
    }
  }, []);

  const logout = () => {
    document.cookie = `admin=; Max-Age=0; path=/`; // remove cookie
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth precisa estar dentro do AuthProvider');
  return context;
};
