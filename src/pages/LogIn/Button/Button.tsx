interface ButtonWrapperProps {
  backgroundColor: string;
  children: React.ReactNode;
  className?: string;
  oncClick: () => void;
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
}: ButtonWrapperProps) {
  return (
    <button
      className={` ${backgroundColor} flex justify-center items-center w-full h-[5.3rem] py-0 px-[1.5rem] rounded-xl ${className}`}
    >
      {children}
    </button>
  );
}

function ButtonLogo({ imageSrc, imageAlt }: ButtonLogoProps) {
  return (
    <img src={imageSrc} alt={imageAlt} className="ml-10 shrink-0 w-[2rem]" />
  );
}

function ButtonContent({ content, textColor, className }: ButtonContentProps) {
  return (
    <p
      className={` ${textColor} flex justify-center items-center w-full text-[1.5rem] leading-[2.25rem] ${className}`}
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
