import Button from "@/components/Common/Button";
import { CheckNicknameApi } from "@/pages/SignUp/api/CheckNicknameApi";
import React, {
  ChangeEvent,
  Dispatch,
  FocusEvent,
  SetStateAction,
  useState,
} from "react";

type SignUpInputProps = {
  label: string;
  id: string;
  name: string;
  placeholder: string;
  maxLength: number;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  error: string | null;
  required: string | null;
  margin: string | null;
  signUpBoolean: boolean;
  setsignUpBoolean: Dispatch<SetStateAction<boolean>>;
};

const SignUpName: React.FC<SignUpInputProps> = ({
  label,
  id,
  name,
  placeholder,
  maxLength,
  value,
  onChange,
  onBlur,
  error,
  required,
  margin,
  signUpBoolean,
  setsignUpBoolean,
}) => {
  const [nickCheck, setNickCheck] = useState("");

  const nickNameCheck = () => {
    CheckNicknameApi({ value, setNickCheck, setsignUpBoolean });
  };
  const InputChange = (event: ChangeEvent<HTMLInputElement>) => {
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
        <input
          className="signUp-placeholder signUp-input"
          type="text"
          id={id}
          name={name}
          placeholder={placeholder}
          maxLength={maxLength}
          value={value}
          onChange={InputChange}
          onBlur={onBlur}
        />
        <Button
          width="w-[76px]"
          height="h-[38px]"
          content="중복확인"
          fontWeight="normal"
          backgroundColor="bg-[#6893FF]"
          textColor="text-white"
          textSize="text-[13px]"
          handleClick={nickNameCheck}
        />
      </div>
      {signUpBoolean && <div className="signUp-check">{nickCheck}</div>}
      {error && <div className="signUp-err">{error}</div>}
    </li>
  );
};
export default SignUpName;
