import signUpApi from "@/apis/postSignUpApi";
import { IDENTIFIER } from "@/constants/localStorageKey";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { encrypt } from "../useCrypto";
import { getCheckNicknameApi } from "@/apis/getCheckNicknameApi";
import { useModalStore } from "@/stores/modalStore";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";
import CommonModal from "@/components/Common/CommonModal/CommonModal";
import CommonMutationErrorModal from "@/components/Error/CommonMutationErrorModal/CommonMutationErrorModal";

interface PostSignUpMutateType {
  identifier: string;
  nickname: string;
  information: string;
  interest: CheckboxValueType[];
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
        setModal(
          <CommonMutationErrorModal error={err} closeModal={closeModal} />
        );
        onError();
      },
    }
  );
  return { mutate, isLoading };
};
