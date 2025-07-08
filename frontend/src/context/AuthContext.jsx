import React, { useContext, useState, useEffect } from 'react';

const AuthContext = React.createContext();

// Mock user database
const mockUsers = {
  'user@example.com': { id: 1, email: 'user@example.com', name: 'Test User', role: 'user' },
  'organizer@example.com': { id: 2, email: 'organizer@example.com', name: 'Test Organizer', role: 'organizer' },
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for a logged-in user in localStorage on initial load
    try {
      const storedUser = localStorage.getItem('causehive_user');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('causehive_user');
    }
    setLoading(false);
  }, []);

  function login(email, password) {
    // In a real app, you'd verify the password. Here, we just check if the user exists.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockUsers[email]) {
          const user = mockUsers[email];
          setCurrentUser(user);
          localStorage.setItem('causehive_user', JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error('User not found.'));
        }
      }, 500); // Simulate network delay
    });
  }

  function logout() {
    setCurrentUser(null);
    localStorage.removeItem('causehive_user');
    return Promise.resolve();
  }

  function signup(email, password, name, role = 'user') {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockUsers[email]) {
          reject(new Error('User already exists.'));
        } else {
          const newUser = { id: Date.now(), email, name, role };
          mockUsers[email] = newUser; // Add to our mock DB
          setCurrentUser(newUser);
          localStorage.setItem('causehive_user', JSON.stringify(newUser));
          resolve(newUser);
        }
      }, 500);
    });
  }

  const value = {
    currentUser,
    login,
    logout,
    signup,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined || context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
