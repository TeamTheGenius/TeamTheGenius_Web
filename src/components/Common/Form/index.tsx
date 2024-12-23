import {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { FieldError, Merge, UseFormRegisterReturn } from "react-hook-form";

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
          className="flex shrink-0 justify-center items-center"
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
          className="flex shrink-0 justify-center items-center"
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
          className="flex shrink-0 justify-center items-center"
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
