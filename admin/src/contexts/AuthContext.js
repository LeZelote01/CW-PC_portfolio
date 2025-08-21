import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const result = await authAPI.checkAuth();
      setIsAuthenticated(result.isAuthenticated);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const result = await authAPI.login(credentials);
      if (result.token) {
        localStorage.setItem('admin_token', result.token);
        setIsAuthenticated(true);
        return { success: true };
      }
      throw new Error('Invalid credentials');
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    await authAPI.logout();
    setIsAuthenticated(false);
  };

  // Simple authentication bypass for demo - in production use real auth
  const simpleLogin = (password) => {
    if (password === 'admin123') {
      localStorage.setItem('admin_token', 'demo-token');
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, error: 'Mot de passe incorrect' };
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        login: simpleLogin, // Use simpleLogin for demo
        logout,
        checkAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};