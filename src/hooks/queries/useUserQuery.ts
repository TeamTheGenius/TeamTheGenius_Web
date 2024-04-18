import signUpApi from "@/apis/postSignUpApi";
import { IDENTIFIER } from "@/constants/localStorageKey";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { encrypt } from "../useCrypto";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";
import { getCheckNicknameApi } from "@/apis/getCheckNicknameApi";

interface PostSignUpMutateType {
  identifier: string;
  nickname: string;
  information: string;
  interest: CheckboxValueType[];
  files: string;
}
interface PostSignUpType {
  onError: () => void;
}
export const usePostSignUp = ({ onError }: PostSignUpType) => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(
    ({
      identifier,
      nickname,
      information,
      interest,
      files,
    }: PostSignUpMutateType) =>
      signUpApi({ identifier, nickname, information, interest, files }),
    {
      onSuccess: (res: AxiosResponse) => {
        const identifier = res.data.data.identifier;
        localStorage.setItem(IDENTIFIER, encrypt(identifier));
        navigate(PATH.AUTH);
      },
      onError: () => {
        onError();
      },
      useErrorBoundary: false,
    }
  );
  return { mutate, isLoading };
};

interface GetCheckNinkNameMutateType {
  value: string;
}
interface GetCheckNinkNameType {
  onSuccess: (res: AxiosResponse) => void;
  onError: (err: AxiosError<{ message?: string }>) => void;
}

export const useGetCheckNickName = ({
  onSuccess,
  onError,
}: GetCheckNinkNameType) => {
  const { mutate } = useMutation(
    ({ value }: GetCheckNinkNameMutateType) => getCheckNicknameApi({ value }),
    {
      onSuccess: (res: AxiosResponse) => {
        onSuccess(res);
      },
      onError: (err: AxiosError<{ message?: string }>) => {
        onError(err);
      },
      useErrorBoundary: false,
    }
  );
  return { mutate };
};
