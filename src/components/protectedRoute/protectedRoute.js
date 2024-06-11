import { Navigate } from "react-router-dom";

import cookieManager from "../../utils/cookieManager";

const ProtectedRoute = ({ children, isProtected, redirectTo }) => {
  const isLgdIn = !!cookieManager("get", "JWTToken");

  if ((isProtected && !isLgdIn) || (!isProtected && isLgdIn)) {
    return <Navigate to={redirectTo} />;
  }

  return children;
};

export default ProtectedRoute;
