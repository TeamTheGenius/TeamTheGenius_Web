import React, { ChangeEvent, FocusEvent } from "react";

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
};

const SignUpInput: React.FC<SignUpInputProps> = ({
  label,
  id,
  name,
  placeholder,
  maxLength,
  value,
  onChange,
  onBlur,
  error,
}) => {
  return (
    <li className="mb-12 flex flex-col">
      <label htmlFor={id} className="signUp-lable">
        {label}
      </label>
      <input
        className="pretendard signUp-placeholder signUp-input"
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <div className="pretendard singUp-err">{error}</div>}
    </li>
  );
};
export default SignUpInput;
