import { IDENTIFIER } from "@/constants/localStorageKey";
import { PATH } from "@/constants/path";
import { Navigate, Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import PrivateRouteErrorFallback from "@/components/Error/PrivateRouteErrorFallback/PrivateRouteErrorFallback";
import { QueryErrorResetBoundary } from "react-query";

function PrivateRoute() {
  const isLogin = !!localStorage.getItem(IDENTIFIER);
  return isLogin ? (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          FallbackComponent={PrivateRouteErrorFallback}
          onReset={reset}
        >
          <Outlet />
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  ) : (
    <Navigate to={PATH.LOGIN} />
  );
}

export default PrivateRoute;
