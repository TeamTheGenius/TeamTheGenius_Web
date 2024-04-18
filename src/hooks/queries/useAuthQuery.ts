import postAuthLogout from "@/apis/postAuthLogout";
import postJWTApi from "@/apis/postJWTApi";
import { FRAMEID, IDENTIFIER } from "@/constants/localStorageKey";
import { PATH } from "@/constants/path";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { encrypt } from "../useCrypto";
import { AxiosError } from "axios";

interface PostAuthLogoutType {
  onError: (error: AxiosError<{ message?: string }>) => void;
}
export const usePostAuthLogout = ({ onError }: PostAuthLogoutType) => {
  const navigate = useNavigate();

  const { mutate } = useMutation(postAuthLogout, {
    onSuccess: () => {
      localStorage.removeItem(IDENTIFIER);
      localStorage.removeItem(FRAMEID);
      navigate(PATH.LOGIN);
    },
    onError: (error: AxiosError<{ message?: string }>) => onError(error),
  });
  return { mutate };
};

export const usePostAuth = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(postJWTApi, {
    onSuccess: (data) => {
      if (data.frameId) {
        localStorage.setItem(FRAMEID, encrypt(data.frameId));
      } else {
        localStorage.setItem(FRAMEID, "");
      }
      if (data.role === "ADMIN") {
        navigate(PATH.ADMIN);
      } else {
        navigate(PATH.HOME);
      }
    },
    onError: () => {
      localStorage.removeItem(IDENTIFIER);
      localStorage.removeItem(FRAMEID);
      navigate(PATH.LOGIN);
    },
    useErrorBoundary: false,
  });
  return { mutate, isLoading };
};

export const useOnlyAdminPermit = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation(postJWTApi, {
    onSuccess: (data) => {
      if (data.role !== "ADMIN") {
        navigate(PATH.ERROR, {
          state: { errNum: 403, errorTxt: "접근 권한이 없습니다." },
        });
      }
    },
  });
  return { mutate };
};
