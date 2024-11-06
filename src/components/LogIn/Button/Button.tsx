interface ButtonWrapperProps {
  backgroundColor: string;
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
}

interface ButtonLogoProps {
  imageSrc: string;
  imageAlt: string;
}

interface ButtonContentProps {
  content: string;
  textColor: string;
  className?: string;
}

function ButtonMain({
  backgroundColor,
  children,
  className,
  onClick,
}: ButtonWrapperProps) {
  return (
    <button
      onClick={onClick}
      className={` ${backgroundColor} flex justify-center items-center gap-[0.7rem] w-full h-[5.6rem] rounded-[1rem] ${className}`}
    >
      {children}
    </button>
  );
}

function ButtonLogo({ imageSrc, imageAlt }: ButtonLogoProps) {
  return <img src={imageSrc} alt={imageAlt} className="w-[2.6rem]" />;
}

function ButtonContent({ content, textColor, className }: ButtonContentProps) {
  return (
    <p
      className={` ${textColor} text-[1.7rem] font-medium leading-_normal ${className}`}
    >
      {content}
    </p>
  );
}

export const Button = Object.assign(ButtonMain, {
  Logo: ButtonLogo,
  Coontent: ButtonContent,
});

export default Button;
