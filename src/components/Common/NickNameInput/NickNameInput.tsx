import Button from "@/components/Common/Button";
import React, {
  ChangeEvent,
  Dispatch,
  FocusEvent,
  SetStateAction,
} from "react";
import nickname_X from "@/assets/icon/nickname_X.svg";
import { AxiosResponse } from "axios";
import { useModalStore } from "@/stores/modalStore";
import { useGetCheckNickName } from "@/hooks/queries/useUserQuery";
import CommonModal from "../CommonModal/CommonModal";

type SignUpInputProps = {
  label: string;
  id: string;
  name: string;
  placeholder: string;
  maxLength: number;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  nickCheck: string;
  setNickCheck: React.Dispatch<React.SetStateAction<string>>;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  error: string | null;
  required: string | null;
  margin: string | null;
  signUpBoolean: boolean;
  setsignUpBoolean: Dispatch<SetStateAction<boolean>>;
  userValue?: string;
  formikNickName: string;
};

const NickNameInput: React.FC<SignUpInputProps> = ({
  label,
  id,
  name,
  placeholder,
  maxLength,
  value,
  setValue,
  nickCheck,
  setNickCheck,
  onChange,
  onBlur,
  error,
  required,
  margin,
  signUpBoolean,
  setsignUpBoolean,
  userValue,
  formikNickName,
}) => {
  const { setModal, closeModal } = useModalStore();

  const onSuccessGetCheckNickName = (res: AxiosResponse) => {
    const replaceData = (res.data.message = res.data.message.replace(
      "요청이 정상적으로 처리되었습니다",
      "사용 가능한 닉네임입니다"
    ));
    setsignUpBoolean(true);
    setNickCheck(replaceData);
  };
  const onErrorGetCheckNickName = () => {
    setsignUpBoolean(false);
  };
  const { mutate: getCheckNinkNameMutate } = useGetCheckNickName({
    onSuccess: onSuccessGetCheckNickName,
    onError: onErrorGetCheckNickName,
  });

  const sameNickCheck = () => {
    setModal(
      <CommonModal
        content="닉네임 변경 후 시도해주세요"
        buttonContent="확인"
        onClick={closeModal}
      />
    );
  };

  const nickNameCheck = () => {
    if (formikNickName) {
      if (/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-zA-Z0-9]/.test(formikNickName)) {
        setModal(
          <CommonModal
            content="닉네임에는 특수문자를 사용할 수 없습니다."
            buttonContent="확인"
            onClick={closeModal}
          />
        );
      } else {
        getCheckNinkNameMutate({ value });
      }
    } else if (!formikNickName) {
      setModal(
        <CommonModal
          content="닉네임을 입력해주세요."
          buttonContent="확인"
          onClick={closeModal}
        />
      );
    }
  };

  const resetValue = () => {
    setValue("");
    onChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement>);
  };
  const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (signUpBoolean) {
      setsignUpBoolean(false);
    }
    onChange(event);
  };

  return (
    <li className={`flex flex-col ${margin}`}>
      <label htmlFor={id} className={`signUp-lable ${required} relative`}>
        {label}
      </label>
      <div className="flex items-end">
        <div className="w-full relative pr-[1.2rem]">
          <input
            className="signUp-placeholder signUp-input relative"
            type="text"
            id={id}
            name={name}
            placeholder={placeholder}
            maxLength={maxLength}
            value={value}
            onChange={inputChange}
            onBlur={onBlur}
          />
          <>
            <button
              className="w-[16px] h-[38px] absolute right-5 bottom-0"
              onClick={resetValue}
            >
              <img src={nickname_X} alt="nickname_X" />
            </button>
          </>
        </div>
        {userValue === value ? (
          <Button
            width="w-[76px]"
            height="h-[38px]"
            content="중복확인"
            fontWeight="font-medium"
            backgroundColor="bg-[#dddddd]"
            textColor="text-white"
            textSize="text-[1.3rem]"
            handleClick={sameNickCheck}
          />
        ) : (
          <Button
            width="w-[76px]"
            height="h-[38px]"
            content="중복확인"
            fontWeight="font-medium"
            backgroundColor="bg-[#6893FF]"
            textColor="text-white"
            textSize="text-[1.3rem]"
            handleClick={nickNameCheck}
          />
        )}
      </div>
      {signUpBoolean ? (
        <div className="signUp-check">{nickCheck}</div>
      ) : (
        <>
          <div className="signUp-err">{error}</div>
        </>
      )}
    </li>
  );
};
export default NickNameInput;
