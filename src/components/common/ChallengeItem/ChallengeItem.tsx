import personIcon from "@/assets/icon/person-icon.svg";
import { cls } from "@/utils/mergeTailwind";

interface MainProps {
  children: React.ReactNode;
  onClick: () => void;
}

interface ParticipantProps {
  numberOfParticipants: number;
}

interface ImageProps {
  imgSrc: string;
  alt: string;
  children: React.ReactNode;
  direction: "horizontal" | "vertical";
}

interface TitleProps {
  title: string;
}

function Main({ children, onClick }: MainProps) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col gap-[0.8rem] my-[0.4rem] cursor-pointer"
    >
      {children}
    </div>
  );
}

function NumberOfParticipant({ numberOfParticipants }: ParticipantProps) {
  return (
    <span className="text-[1rem] font-extralight leading-normal text-white">
      {numberOfParticipants}명
    </span>
  );
}

function Image({ imgSrc, alt, children, direction }: ImageProps) {
  const additionalStyles = {
    horizontal: "w-[18.8rem] h-[12.6rem]",
    vertical: "w-full max-w-[16.4rem] pb-[77%]",
  };

  return (
    <div
      className={`relative rounded-[10px] bg-yellow-500 ${additionalStyles[direction]}`}
    >
      <img
        src={imgSrc}
        alt={alt}
        className={cls(
          "w-full h-full",
          direction === "vertical" ? "absolute top-0 left-0 " : ""
        )}
      />
      <div className="absolute bg-black opacity-80 top-[0.3rem] left-[1rem] rounded-[8px] w-[4.8rem] h-[1.9rem] flex justify-center items-center gap-[0.6rem]">
        <img src={personIcon} alt="신청 인원 수 아이콘" />
        {children}
      </div>
    </div>
  );
}

function Title({ title }: TitleProps) {
  return <p className="text-[1.5rem] font-medium leading-normal">{title}</p>;
}

export const ChallengeItem = Object.assign(Main, {
  NumberOfParticipant: NumberOfParticipant,
  Image: Image,
  Title: Title,
});

export default ChallengeItem;
