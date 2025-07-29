import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import LoadingBar from "./LoadingBar";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useContext(UserContext);

  // While loading, don't redirect or show blank / loader to prevent premature redirect
  if (loading) {
    return <LoadingBar />; // or a spinner
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
