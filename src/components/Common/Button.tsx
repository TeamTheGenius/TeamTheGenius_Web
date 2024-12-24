import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  content: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  textSize?: string;
  fontWeight?: string;
  textColor?: string;
  handleClick?: () => void;
  className?: string;
}

function Button({
  content,
  width,
  height,
  backgroundColor,
  textSize,
  fontWeight,
  textColor,
  handleClick,
  className,
  ...props
}: Props) {
  return (
    <button
      className={`${width} ${height} ${backgroundColor} ${textColor} ${textSize} ${fontWeight} rounded-[1rem] ${className}`}
      onClick={handleClick}
      {...props}
    >
      {content}
    </button>
  );
}

export default Button;
