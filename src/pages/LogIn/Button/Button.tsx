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
    <div
      className={` ${backgroundColor} flex justify-center items-center w-[456px] h-[53px] py-0 px-[15px] rounded-xl  ${className}`}
    >
      {children}
    </div>
  );
}

function ButtonLogo({ imageSrc, imageAlt }: ButtonLogoProps) {
  return (
    <img src={imageSrc} alt={imageAlt} className="ml-10 shrink-0 w-[20px]" />
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
