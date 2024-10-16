import React, { createContext, useContext, useState, ReactNode, useLayoutEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; 

interface AuthContextType {
  userId: string; 
  roleId: number | null; 
  isLoggedIn: boolean; 
  performLogin: (accessToken: string) => void; 
  logout: () => void; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('authToken');
  });

  const [userId, setUserId] = useState<string>(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      const decodedToken = jwtDecode<{ id: string }>(storedToken);
      return decodedToken.id;
    }
    return '';
  });

  const [roleId, setRoleId] = useState<number | null>(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      const decodedToken = jwtDecode<{ roleId: number }>(storedToken);
      return decodedToken.roleId;
    }
    return null;
  });

  const isLoggedIn = !!token; // Check if the token exists

  const performLogin = (accessToken: string) => {
    const decodedToken = jwtDecode<{ id: string, roleId: number }>(accessToken);
    setUserId(decodedToken.id);
    setRoleId(decodedToken.roleId);
    setToken(accessToken);
    
    localStorage.setItem('authToken', accessToken);
  };

  const logout = () => {
    setUserId('');
    setRoleId(null);
    setToken(null);
    
    localStorage.removeItem('authToken');
  };

  useLayoutEffect(() => {
    const handleStorageChange = () => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        const decodedToken = jwtDecode<{ id: string, roleId: number }>(storedToken);
        setUserId(decodedToken.id);
        setRoleId(decodedToken.roleId);
        setToken(storedToken);
      } else {
        logout(); 
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ userId, roleId, isLoggedIn, performLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
