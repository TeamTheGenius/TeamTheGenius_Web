import { IDENTIFIER } from "@/constants/localStorageKey";
import { PATH } from "@/constants/path";
import { Navigate, useNavigate, Outlet } from "react-router-dom";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { useEffect } from "react";
import Error from "@/pages/Error/Error";

const FallbackComponent = ({ error }: FallbackProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!error.response || !error.response.data) return;
    if (error.response?.data?.message === "JWT가 유효하지 않습니다.") {
      navigate(PATH.AUTH);
    }
  }, []);

  return (
    <Error
      errNum={error.reponse?.data?.resultCode}
      errorTxt={error.response?.data?.message}
    />
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
