import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import PropTypes from "prop-types";
function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (user) {
    return children;
  }

  return (
    <Navigate
      to={"/login"}
      state={{ from: location.pathname }}
      replace
    ></Navigate>
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
