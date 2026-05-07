import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'guest' | 'user' | 'designer' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  credits: number;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: UserRole) => void;
  logout: () => void;
  register: (name: string, email: string, password: string, role: UserRole) => void;
  updateCredits: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string, role: UserRole = 'user') => {
    setUser({
      id: '1',
      name: 'John Doe',
      email,
      role,
      credits: 150,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const register = (name: string, email: string, password: string, role: UserRole) => {
    setUser({
      id: '1',
      name,
      email,
      role,
      credits: 50,
    });
  };

  const updateCredits = (amount: number) => {
    if (user) {
      setUser({ ...user, credits: user.credits + amount });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateCredits }}>
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
