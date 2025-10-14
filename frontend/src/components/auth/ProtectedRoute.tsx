// src/components/ProtectedRoute.jsx (или .tsx)

import React from "react";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../redux/auth/selectors";
import NotFoundPage from "../../pages/common/NotFoundPage";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  if (!isAuthenticated) {
    return <NotFoundPage />;
  }
  return children;
};

export default ProtectedRoute;
