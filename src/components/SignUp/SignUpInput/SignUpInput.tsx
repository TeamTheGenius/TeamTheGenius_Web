import React, { ChangeEvent, FocusEvent, KeyboardEventHandler } from "react";

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
  required,
  margin,
}) => {
  return (
    <li className={`flex flex-col ${margin}`}>
      <label htmlFor={id} className={`signUp-lable ${required}`}>
        {label}
      </label>
      <input
        className="signUp-placeholder signUp-input"
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <div className="signUp-err">{error}</div>}
    </li>
  );
};
export default SignUpInput;
