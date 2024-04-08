import { PATH } from "@/constants/path";
import { useLocation, useNavigate } from "react-router-dom";
import { FallbackProps } from "react-error-boundary";
import { useEffect, useRef } from "react";
import Error from "@/pages/Error/Error";

const PrivateRouteErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const location = useLocation();
  const errorLocation = useRef(location.pathname);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== errorLocation.current) {
      resetErrorBoundary();
    }
  }, [location.pathname]);

  const onClickGoToLogIn = () => {
    resetErrorBoundary();
    navigate(PATH.LOGIN);
  };

  const onClickBack = () => {
    resetErrorBoundary();
    navigate(-1);
  };

  return error.response?.data?.message === "JWT가 유효하지 않습니다." ? (
    <Error
      errorTxt="재로그인이 필요합니다."
      onClick={onClickGoToLogIn}
      buttonText="로그인하기"
    />
  ) : (
    <Error
      onClick={onClickBack}
      errNum={error.response?.data?.resultCode}
      errorTxt={error.response?.data?.message}
    />
  );
};

export default PrivateRouteErrorFallback;
