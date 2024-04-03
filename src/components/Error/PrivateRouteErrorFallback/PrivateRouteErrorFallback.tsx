import { PATH } from "@/constants/path";
import { useLocation } from "react-router-dom";
import { FallbackProps } from "react-error-boundary";
import { useEffect, useRef } from "react";
import Error from "@/pages/Error/Error";

const PrivateRouteErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const location = useLocation();
  const errorLocation = useRef(location.pathname);
  useEffect(() => {
    if (location.pathname !== errorLocation.current) {
      resetErrorBoundary();
    }
  }, [location.pathname]);

  return error.response?.data?.message === "JWT가 유효하지 않습니다." ? (
    <Error
      errorTxt="재로그인이 필요합니다."
      path={PATH.LOGIN}
      buttonText="로그인하기"
    />
  ) : (
    <Error
      errNum={error.response?.data?.resultCode}
      errorTxt={error.response?.data?.message}
    />
  );
};

export default PrivateRouteErrorFallback;
