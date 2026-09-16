import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from local storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('lexiease_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login logic
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !password) {
          reject(new Error("Please enter both email and password."));
          return;
        }
        // Accept any dummy login for the MVP Demo
        const dummyUser = { id: '1', email, name: email.split('@')[0], plan: 'free' };
        setUser(dummyUser);
        localStorage.setItem('lexiease_user', JSON.stringify(dummyUser));
        resolve(dummyUser);
      }, 800); // simulate network delay
    });
  };

  const signup = (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!name || !email || !password) {
          reject(new Error("Please fill in all fields."));
          return;
        }
        const newUser = { id: Date.now().toString(), name, email, plan: 'free' };
        setUser(newUser);
        localStorage.setItem('lexiease_user', JSON.stringify(newUser));
        resolve(newUser);
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lexiease_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
