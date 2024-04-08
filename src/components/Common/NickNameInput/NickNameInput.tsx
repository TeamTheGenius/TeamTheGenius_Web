import Button from "@/components/Common/Button";

import React, {
  ChangeEvent,
  Dispatch,
  FocusEvent,
  SetStateAction,
  useState,
} from "react";
import nickname_X from "@/assets/icon/nickname_X.svg";
import { getCheckNicknameApi } from "@/apis/getCheckNicknameApi";
import Loading from "../Loading/Loading";
import { EditModal } from "@/components/MyPage/EditModal/EditModal";
import { SignUpModal } from "@/components/SignUp/SignUpForm/SignUpModal/SignUpModal";

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
  openModal: () => void;
  closeModal: () => void;
  setModal: React.Dispatch<React.SetStateAction<JSX.Element>>;
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
  openModal,
  setModal,
  closeModal,
  formikNickName,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const sameNickCheck = () => {
    openModal();
    setModal(
      <EditModal
        modalHandle={closeModal}
        isLoading={isLoading}
        editBoolean={true}
        success="닉네임 변경 후 시도해주세요"
        fail="Error"
        buttonText="확인하기"
      />
    );
  };
  const nickNameCheck = () => {
    setIsLoading(true);
    if (formikNickName) {
      if (/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-zA-Z0-9]/.test(formikNickName)) {
        setIsLoading(false);
        openModal();
        setModal(
          <SignUpModal
            modalHandle={closeModal}
            isLoading={isLoading}
            editBoolean={true}
            success="닉네임에는 특수문자를 사용할 수 없습니다."
            fail="Error"
            buttonText="확인하기"
          />
        );
      } else {
        getCheckNicknameApi({
          value,
          setNickCheck,
          setsignUpBoolean,
          setIsLoading,
        });
      }
    } else if (!formikNickName) {
      setIsLoading(false);
      openModal();
      setModal(
        <SignUpModal
          modalHandle={closeModal}
          isLoading={isLoading}
          editBoolean={true}
          success="닉네임을 입력해주세요."
          fail="Error"
          buttonText="확인하기"
        />
      );
    }
    setIsLoading(false);
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

  if (isLoading) {
    return <Loading />;
  }

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
