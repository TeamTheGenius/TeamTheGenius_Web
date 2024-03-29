import { IDENTIFIER } from "@/constants/localStorageKey";
import { PATH } from "@/constants/path";
import { Navigate, useNavigate, Outlet } from "react-router-dom";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

const FallbackComponent = ({ error }: FallbackProps) => {
  const navigate = useNavigate();
  if (
    error.response &&
    error.response.data &&
    error.response.data.message === "JWT가 유효하지 않습니다."
  ) {
    navigate(PATH.LOGIN);
  }
  return (
    <div>
      <p>{error.response?.data?.message}</p>
    </div>
  );
};

function PrivateRoute() {
  const isLogin = !!localStorage.getItem(IDENTIFIER);
  return isLogin ? (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <Outlet />
    </ErrorBoundary>
  ) : (
    <Navigate to={PATH.LOGIN} />
  );
}

export default PrivateRoute;
