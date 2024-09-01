import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { checkUser } from '../services/api';

interface ProtectedRouteProps {
  children: ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = checkUser(); 

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
