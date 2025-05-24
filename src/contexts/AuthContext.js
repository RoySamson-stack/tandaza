import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function login(email, password) {
    ///will add the backend and api call here
    const user = { email, name: email.split('@')[0] };
    localStorage.setItem('user', JSON.stringify(user));
    setCurrentUser(user);
    return Promise.resolve(user);
  }

  function logout() {
    localStorage.removeItem('user');
    setCurrentUser(null);
    return Promise.resolve();
  }

  useEffect(() => {
    // Check local storage
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}