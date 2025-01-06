import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthState } from "../../store/auth/authThunks";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();

  const [initialLoad, setInitialLoad] = useState(true);

  const { user, loading, error, isLoggedIn } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!isLoggedIn && !loading && initialLoad) {
      dispatch(checkAuthState());
      setInitialLoad(false);
    }
  }, [dispatch, isLoggedIn, loading, initialLoad]);

  if (loading || (!user && initialLoad)) {
    return <div>Loading...</div>;
  }

  if (!user || error) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
