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
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const nickNameCheck = () => {
    setIsLoading(true);
    getCheckNicknameApi({
      value,
      setNickCheck,
      setsignUpBoolean,
      setIsLoading,
    });
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
      </div>
      {signUpBoolean ? (
        <div className="signUp-check">{nickCheck}</div>
      ) : (
        <div className="signUp-err">{nickCheck}</div>
      )}
      {error && <div className="signUp-err">{error}</div>}
    </li>
  );
};
export default NickNameInput;
