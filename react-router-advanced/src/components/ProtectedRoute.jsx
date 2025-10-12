import React from "react";
import { Navigate } from "react-router-dom";

// Custom hook to simulate authentication state
export function useAuth(isAuthenticated) {
  return { isAuthenticated };
}

const ProtectedRoute = ({ isAuthenticated, children }) => {
  const auth = useAuth(isAuthenticated);

  if (!auth.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
