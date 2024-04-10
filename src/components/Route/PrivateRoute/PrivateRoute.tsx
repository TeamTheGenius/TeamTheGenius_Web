import { IDENTIFIER } from "@/constants/localStorageKey";
import { PATH } from "@/constants/path";
import { Navigate, Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import PrivateRouteErrorFallback from "@/components/Error/PrivateRouteErrorFallback/PrivateRouteErrorFallback";
import {
  QueryErrorResetBoundary,
  useQueryErrorResetBoundary,
} from "react-query";

function PrivateRoute() {
  const { reset } = useQueryErrorResetBoundary();
  const handleReset = () => {
    reset();
  };

  const isLogin = !!localStorage.getItem(IDENTIFIER);
  return isLogin ? (
    <QueryErrorResetBoundary>
      <ErrorBoundary
        FallbackComponent={PrivateRouteErrorFallback}
        onReset={handleReset}
      >
        <Outlet />
      </ErrorBoundary>
    </QueryErrorResetBoundary>
  ) : (
    <Navigate to={PATH.LOGIN} />
  );
}

export default PrivateRoute;
