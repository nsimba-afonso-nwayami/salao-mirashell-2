import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null; // ou um loader

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
}
