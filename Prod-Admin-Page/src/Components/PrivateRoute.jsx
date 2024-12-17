import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Auth/UseAuth';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;