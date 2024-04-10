import { PATH } from "@/constants/path";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { acceptInstance, instance, jsonInstance, multiInstance } from "./axios";
import { AxiosError } from "axios";

export default function AxiosNavigation() {
  const navigate = useNavigate();

  const handleInterceptorError = (error: AxiosError) => {
    const responseData = error.response?.data;
    if (
      responseData &&
      typeof responseData === "object" &&
      "message" in responseData &&
      (responseData.message === "JWT가 유효하지 않습니다." ||
        responseData.message === "회원 정보를 찾을 수 없습니다.")
    ) {
      navigate(PATH.LOGIN);
    }
    return Promise.reject(error);
  };

  useEffect(() => {
    const instanceInterceptor = instance.interceptors.response.use(
      (response) => response,
      handleInterceptorError
    );

    const acceptInstanceInterceptor = acceptInstance.interceptors.response.use(
      (response) => response,
      handleInterceptorError
    );

    const jsonInstanceInterceptor = jsonInstance.interceptors.response.use(
      (response) => response,
      handleInterceptorError
    );

    const multiInstanceInterceptor = multiInstance.interceptors.response.use(
      (response) => response,
      handleInterceptorError
    );

    return () => {
      instance.interceptors.response.eject(instanceInterceptor);
      instance.interceptors.response.eject(acceptInstanceInterceptor);
      instance.interceptors.response.eject(jsonInstanceInterceptor);
      instance.interceptors.response.eject(multiInstanceInterceptor);
    };
  }, []);
  return <></>;
}
