import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const ProtectedRoute = ({ redirectPath = "/", children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
