import { PATH } from "@/constants/path";
import { useNavigate } from "react-router-dom";
import { FallbackProps } from "react-error-boundary";
import Error from "@/pages/Error/Error";

const PrivateRouteErrorFallback = ({ error }: FallbackProps) => {
  const navigate = useNavigate();

  const onClickGoToLogIn = () => {
    navigate(PATH.LOGIN);
  };

  return error?.response?.data?.message === "JWT가 유효하지 않습니다." ? (
    <Error
      errorTxt="재로그인이 필요합니다."
      onClick={onClickGoToLogIn}
      buttonText="로그인하기"
    />
  ) : (
    <Error
      errNum={error?.response?.data?.resultCode}
      errorTxt={error?.response?.data?.message}
    />
  );
};

export default PrivateRouteErrorFallback;
