import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

// Redirect authenticated users away from guest-only pages
const GuestRoute = ({ redirectPath = "/" }) => {
  const { user } = useContext(UserContext);
  if (user) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

export default GuestRoute;
