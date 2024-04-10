import React, { ChangeEvent, FocusEvent, useState } from "react";

type SignUpInputProps = {
  label: string;
  id: string;
  name: string;
  placeholder: string;
  maxLength: number;
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  error: string | null;
  required: string | null;
  margin: string | null;
};

const SignUpDesc: React.FC<SignUpInputProps> = ({
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
  const [inputCount, setInputCount] = useState(0);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputCount(inputValue.length);
    onChange(event);
  };

  return (
    <li className={`flex flex-col ${margin}`}>
      <label htmlFor={id} className={`signUp-lable ${required} relative`}>
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
        onChange={handleInputChange}
        onBlur={onBlur}
      />

      {error ? (
        <div className="signUp-err">{error}</div>
      ) : (
        <span className="text-[#A8A8A8] text-[1.3rem] font-medium ml-auto">
          {inputCount}/100
        </span>
      )}
    </li>
  );
};

export default SignUpDesc;
