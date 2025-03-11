import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  // If there's no token, redirect to the login page
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the user is authenticated, render the children (protected component)
  return children;
};

export default ProtectedRoute;