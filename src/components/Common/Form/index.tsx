import InterestBtn from "@/components/Interest/InterestButton/InterestBtn";
import {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { FieldError, Merge, UseFormRegisterReturn } from "react-hook-form";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: FieldError;
  information?: string;
  registration?: UseFormRegisterReturn;
  children?: ReactNode;
}

export const Input = ({
  id,
  label,
  error,
  registration,
  information,
  children,
  ...props
}: InputProps) => {
  const { ref, ...restRegistration } = registration || {};

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex gap-4 text-[1.4rem]">
        <label
          htmlFor={id}
          className="flex shrink-0 justify-center items-center text-[1.6rem] font-medium"
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {children ? (
          children
        ) : (
          <input
            id={id}
            ref={ref}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...restRegistration}
            {...props}
          />
        )}
      </div>
      {error && (
        <p className="mt-1 text-md text-red-500 text-right">{error.message}</p>
      )}
      {information && (
        <p className="mt-1 text-md text-blue-500 text-right">{information}</p>
      )}
    </div>
  );
};

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
}

export const TextArea = ({
  id,
  label,
  error,
  registration,
  ...props
}: TextAreaProps) => {
  const { ref, ...restRegistration } = registration;

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex gap-4 text-[1.4rem]">
        <label
          htmlFor={id}
          className="flex shrink-0 justify-center items-center text-[1.6rem] font-medium"
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <textarea
          id={id}
          ref={ref}
          {...restRegistration}
          {...props}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {error && (
        <p className="mt-1 text-md text-red-500 text-right">{error.message}</p>
      )}
    </div>
  );
};

interface Option {
  label: string;
  value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  options: Option[];
  error?: FieldError | Merge<FieldError, (FieldError | undefined)[]>;
  registration: UseFormRegisterReturn;
}

export const Select = ({
  id,
  label,
  options,
  error,
  registration,
  ...props
}: SelectProps) => {
  const { ref, ...restRegistration } = registration;

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex gap-4 text-[1.4rem]">
        <label
          htmlFor={id}
          className="flex shrink-0 justify-center items-center  text-[1.6rem] font-medium"
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <select
          id={id}
          ref={ref}
          multiple={props.multiple}
          className="w-full p-2 border rounded-lg"
          {...restRegistration}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <p className="mt-1 text-md text-red-500 text-right">{error.message}</p>
      )}
    </div>
  );
};

interface CheckboxOption {
  label: string;
  value: string;
}

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  options: CheckboxOption[];
  error?: FieldError | Merge<FieldError, (FieldError | undefined)[]>;
  registration: UseFormRegisterReturn;
  checkedValues: string[];
}

export const Checkbox = ({
  options,
  checkedValues,
  error,
  registration,
  ...props
}: CheckboxProps) => {
  return (
    <div>
      <ul className="flex flex-wrap gap-2">
        {options.map((option) => (
          <li key={option.value}>
            <label className="cursor-pointer">
              <input
                type="checkbox"
                value={option.value}
                className="hidden"
                {...registration}
                {...props}
              />
              <span className="inline-block">
                <InterestBtn
                  bgColor={
                    checkedValues.some((item) => item === option.value)
                      ? "bg-[#282828]"
                      : "bg-[#dddddd]"
                  }
                  textColor={
                    checkedValues.some((item) => item === option.value)
                      ? "text-white"
                      : "text-black"
                  }
                  checkText={option.label}
                  icon={
                    checkedValues.some((item) => item === option.value)
                      ? faCheck
                      : faPlus
                  }
                />
              </span>
            </label>
          </li>
        ))}
      </ul>
      {error && <p className="text-red-500 mt-1 text-sm">{error.message}</p>}
    </div>
  );
};
