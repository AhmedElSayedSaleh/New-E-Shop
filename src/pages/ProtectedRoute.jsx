import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isSignPage = false }) => {
  const isAuthorized = useSelector((state) => state.userAuth.isAuth);

  return isSignPage ? (
    <>{isAuthorized ? <Navigate to="/" /> : children}</>
  ) : (
    <>{isAuthorized ? children : <Navigate to="/login" />}</>
  );
};

export default ProtectedRoute;
