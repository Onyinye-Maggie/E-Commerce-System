import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  const ADMIN_EMAIL = "your@email.com";

  if (!user) return <Navigate to="/login" />;
  if (user.email !== ADMIN_EMAIL) return <Navigate to="/" />;

  return children;
}

export default ProtectedRoute;