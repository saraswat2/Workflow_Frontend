import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await api.get('/users/me');
          setUser(res.data);
        } catch (err) {
          console.error("Failed to fetch user session", err);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    fetchUser();
  }, [token]);

  const updateUserSession = (updatedUser) => {
    setUser(updatedUser);
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { usernameOrEmail: email, password });
      // Depending on backend payload, we get the token.
      // Usually it's in response.data.token or response.data.jwt
      const jwtToken = response.data.token || response.data.jwt || response.data;
      if (!jwtToken || typeof jwtToken !== 'string') {
         throw new Error("Invalid token received");
      }
      localStorage.setItem('token', jwtToken);
      setToken(jwtToken);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed. Please check your credentials.' 
      };
    }
  };

  const register = async (username, email, password) => {
    try {
      // Adapting to standard signup payload
      await api.post('/auth/register', { username, email, password });
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed.' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateUserSession }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
