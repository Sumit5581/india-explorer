// Custom hook for authentication using localStorage

import { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing user
    const storedUser = localStorage.getItem('tourist_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    // Simulate login - in real app, validate against backend
    const users = JSON.parse(localStorage.getItem('tourist_users') || '[]');
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
      if (existingUser.password === password) {
        const userData = { id: existingUser.id, name: existingUser.name, email: existingUser.email };
        setUser(userData);
        localStorage.setItem('tourist_user', JSON.stringify(userData));
        return { success: true };
      }
      return { success: false, error: 'Invalid password' };
    }
    return { success: false, error: 'User not found' };
  };

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('tourist_users') || '[]');
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
      return { success: false, error: 'Email already registered' };
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem('tourist_users', JSON.stringify(users));
    
    const userData = { id: newUser.id, name: newUser.name, email: newUser.email };
    setUser(userData);
    localStorage.setItem('tourist_user', JSON.stringify(userData));
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tourist_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
