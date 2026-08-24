import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch('http://localhost:8081/auth/status', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.login) {
          setUser({ email: data.email, name: data.name, id:data.id });
        } else {
          setUser(null);
        }
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 AuthProvider 안에서만 사용해야 합니다');
  }
  return context;
}