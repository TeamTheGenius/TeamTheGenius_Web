import signUpApi from "@/apis/postSignUpApi";
import { FRAMEID, IDENTIFIER } from "@/constants/localStorageKey";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { encrypt } from "../useCrypto";
import { getCheckNicknameApi } from "@/apis/getCheckNicknameApi";
import { useModalStore } from "@/stores/modalStore";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";
import CommonModal from "@/components/Common/CommonModal/CommonModal";
import CommonMutationErrorModal from "@/components/Error/CommonMutationErrorModal/CommonMutationErrorModal";
import postGuestApi from "@/apis/postGuestApi";
import { GuestAuthDataType } from "@/types/authType";
import { GuestLoginModal } from "@/components/GuestLogin/GuestLoginModal";

interface PostSignUpMutateType {
  identifier: string;
  nickname: string;
  information: string;
  interest: string[];
}

export const usePostSignUp = () => {
  const { setModal, closeModal } = useModalStore();
  const navigate = useNavigate();
  const { mutate, isLoading, mutateAsync, data } = useMutation(
    ({ identifier, nickname, information, interest }: PostSignUpMutateType) =>
      signUpApi({ identifier, nickname, information, interest }),
    {
      onSuccess: (res: AxiosResponse) => {
        const identifier = res.data.data.identifier;
        localStorage.setItem(IDENTIFIER, encrypt(identifier));
      },
      onError: () => {
        const onClickMoveToSiupUpFirstStep = () => {
          closeModal();
          navigate(PATH.LOGIN);
        };
        setModal(
          <CommonModal
            content={"오류가 발생했습니다.\n처음으로 이동합니다."}
            buttonContent="확인"
            onClick={onClickMoveToSiupUpFirstStep}
          />
        );
      },
    }
  );
  return { mutate, isLoading, mutateAsync, data };
};

interface GetCheckNinkNameMutateType {
  value: string;
}
interface GetCheckNinkNameType {
  onSuccess: (res: AxiosResponse) => void;
  onError: () => void;
}

export const useGetCheckNickName = ({
  onSuccess,
  onError,
}: GetCheckNinkNameType) => {
  const { setModal, closeModal } = useModalStore();
  const { mutate, isLoading } = useMutation(
    ({ value }: GetCheckNinkNameMutateType) => getCheckNicknameApi({ value }),
    {
      onSuccess: (res: AxiosResponse) => {
        onSuccess(res);
      },
      onError: (err: AxiosError<{ message?: string }>) => {
        if (err?.response?.data?.message !== "이미 존재하는 닉네임입니다.") {
          setModal(
            <CommonMutationErrorModal error={err} closeModal={closeModal} />
          );
        }
        onError();
      },
    }
  );
  return { mutate, isLoading };
};

export const usePostGuestLogin = () => {
  const { setModal, closeModal } = useModalStore();
  const { mutate, isLoading, mutateAsync } = useMutation(
    ({ id, password }: { id: string; password: string }) =>
      postGuestApi({ id, password }),
    {
      onSuccess: (data: GuestAuthDataType) => {
        const identifier = data.identifier;
        localStorage.setItem(IDENTIFIER, encrypt(identifier));
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
