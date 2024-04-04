import { IDENTIFIER } from "@/constants/localStorageKey";
import { PATH } from "@/constants/path";
import { Navigate, Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import PrivateRouteErrorFallback from "@/components/Error/PrivateRouteErrorFallback/PrivateRouteErrorFallback";

function PrivateRoute() {
  const isLogin = !!localStorage.getItem(IDENTIFIER);
  return isLogin ? (
    <ErrorBoundary FallbackComponent={PrivateRouteErrorFallback}>
      <Outlet />
    </ErrorBoundary>
  ) : (
    <Navigate to={PATH.LOGIN} />
  );
}

export default PrivateRoute;
