import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/userHooks';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, user, loading } = useUser();
  console.log('ProtectedRoute - Estado:', { isAuthenticated, user, loading });

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Cargando...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
