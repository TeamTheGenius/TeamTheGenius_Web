import postAuthLogout from "@/apis/postAuthLogout";
import postJWTApi from "@/apis/postJWTApi";
import { ACCESS_TOKEN, FRAMEID, IDENTIFIER } from "@/constants/localStorageKey";
import { PATH } from "@/constants/path";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { encrypt } from "../useCrypto";
import { AxiosError } from "axios";
import { AuthDataType } from "@/types/authType";
import CommonMutationErrorModal from "@/components/Error/CommonMutationErrorModal/CommonMutationErrorModal";
import { useModalStore } from "@/stores/modalStore";
import postGuestApi from "@/apis/postGuestApi";
import { GuestLoginModal } from "@/components/GuestLogin/GuestLoginModal";

export const usePostAuthLogout = () => {
  const navigate = useNavigate();
  const { setModal, closeModal } = useModalStore();

  const { mutate } = useMutation(postAuthLogout, {
    onSuccess: () => {
      localStorage.removeItem(IDENTIFIER);
      localStorage.removeItem(FRAMEID);
      localStorage.removeItem(ACCESS_TOKEN);
      navigate(PATH.LOGIN);
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      setModal(
        <CommonMutationErrorModal error={error} closeModal={closeModal} />
      );
    },
  });
  return { mutate };
};

export const usePostAuth = () => {
  const navigate = useNavigate();
  const { mutate, isLoading, mutateAsync } = useMutation(postJWTApi, {
    onSuccess: (data: AuthDataType) => {
      if (data.frameId) {
        localStorage.setItem(FRAMEID, encrypt(data.frameId));
      } else {
        localStorage.setItem(FRAMEID, "");
      }
    },
    onError: () => {
      localStorage.removeItem(IDENTIFIER);
      localStorage.removeItem(FRAMEID);
      navigate(PATH.LOGIN);
    },
  });
  return { mutate, isLoading, mutateAsync };
};

export const usePostGuestAuth = () => {
  const { setModal, closeModal } = useModalStore();
  const { mutate, isLoading, mutateAsync } = useMutation(
    ({ id, password }: { id: string; password: string }) =>
      postGuestApi({ id, password }),
    {
      onSuccess: (data: AuthDataType) => {
        console.log("mutation", data);
        if (data.frameId) {
          localStorage.setItem(FRAMEID, encrypt(data.frameId));
        } else {
          localStorage.setItem(FRAMEID, "");
        }
      },
      onError: () => {
        setModal(
          <GuestLoginModal
            modalHandle={closeModal}
            isLoading={isLoading}
            editBoolean={true}
            success="아이디 및 비밀번호가 틀립니다."
            fail="Error"
            buttonText="확인하기"
          />
        );
      },
    }
  );
  return { mutate, isLoading, mutateAsync };
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
