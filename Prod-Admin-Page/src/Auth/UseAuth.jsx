import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  // Function to check if token is expired
  const isTokenValid = (token) => {
    if (!token) return false;
    
    try {
      // Decode the token to check expiration
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      const payload = JSON.parse(window.atob(base64));
      
      // Check if token is expired
      return payload.exp * 1000 > Date.now();
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  };

  useEffect(() => {
    // Check for stored token on initial load
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser && isTokenValid(storedToken)) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    } else {
      // Clear invalid or expired token
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  }, [navigate]);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      const { token, user } = response.data;
      
      // Store token and user in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Update state
      setToken(token);
      setUser(user);

      // Navigate to admin home or dashboard
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password
      });

      const { token, user } = response.data;
      
      // Store token and user in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Update state
      setToken(token);
      setUser(user);

      // Navigate to admin home or dashboard
      navigate('/');
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
  };

  const logout = () => {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Reset state
    setToken(null);
    setUser(null);

    // Redirect to login
    navigate('/login');
  };

  const isAuthenticated = () => {
    const storedToken = localStorage.getItem('token');
    return isTokenValid(storedToken);
  };

  // Axios interceptor to add token to all requests
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, [token]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      register, 
      logout, 
      isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};