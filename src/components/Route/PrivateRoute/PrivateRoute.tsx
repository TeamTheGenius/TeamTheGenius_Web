import { IDENTIFIER } from "@/constants/localStorageKey";
import { PATH } from "@/constants/path";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const isLogin = !!localStorage.getItem(IDENTIFIER);
  return isLogin ? <Outlet /> : <Navigate to={PATH.LOGIN} />;
}

export default PrivateRoute;
