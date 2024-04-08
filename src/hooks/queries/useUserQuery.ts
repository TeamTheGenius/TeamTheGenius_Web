import signUpApi from "@/apis/postSignUpApi";
import { IDENTIFIER } from "@/constants/localStorageKey";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { encrypt } from "../useCrypto";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";

interface PostSignUpMutateType {
  identifier: string;
  nickname: string;
  information: string;
  interest: CheckboxValueType[];
  files: string;
}
interface PostSignUpType {
  onSuccess: () => void;
  onError: () => void;
}
export const usePostSignUp = ({ onSuccess, onError }: PostSignUpType) => {
  const navigate = useNavigate();
  const { mutate } = useMutation(
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
        onSuccess();
      },
      onError: () => {
        navigate(PATH.LOGIN);
        onError();
      },
      useErrorBoundary: false,
    }
  );
  return { mutate };
};
