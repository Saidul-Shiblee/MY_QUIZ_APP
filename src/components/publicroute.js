import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const PublicRoute = ({ redirectPath = "/", children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return children ? children : <Outlet />;
  }
  return <Navigate to={redirectPath} replace />;
};

export default PublicRoute;
