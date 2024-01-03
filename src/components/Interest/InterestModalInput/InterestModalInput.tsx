import "@/pages/Interest/InterestModalInputStyle.css";
import { ChangeEventHandler, FocusEvent } from "react";

type InterestModalInputType = {
  id: string;
  name: string;
  placeholder: string;
  maxLength: number;
  value: string;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  error: string | null;
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
};

const InterestModalInput = ({
  id,
  name,
  placeholder,
  maxLength,
  value,
  onBlur,
  error,
  handleInputChange,
}: InterestModalInputType) => {
  return (
    <div className="flex flex-col mb-16 relative">
      <input
        className="interest-placeholder interest-input"
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onBlur={onBlur}
        onChange={handleInputChange}
      />
      {error && (
        <div className="interest-err absolute bottom-[-25px] right-0">
          {error}
        </div>
      )}
    </div>
  );
};

export default InterestModalInput;
