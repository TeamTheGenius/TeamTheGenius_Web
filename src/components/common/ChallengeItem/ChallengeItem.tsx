import personIcon from "@/assets/icon/person-icon.svg";
import { cls } from "@/utils/mergeTailwind";

interface MainProps {
  children: React.ReactNode;
  onClick?: () => void;
}

interface ParticipantProps {
  numberOfParticipants: number;
}

interface ImageProps {
  imgSrc: string;
  alt: string;
  children?: React.ReactNode;
  direction: "horizontal" | "vertical";
  maxWidth?: string;
  paddingBottom?: string;
}

interface TitleProps {
  title: string;
}

interface RewardProps {
  point: number;
  fontWeight?: string;
}

interface OverlayProps {
  text?: string;
}

function Main({ children, onClick }: MainProps) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col gap-[0.8rem] cursor-pointer"
    >
      {children}
    </div>
  );
}

function Heart() {
  return (
    <div className="absolute top-[0.9rem] right-[0.7rem]">
      <svg
        width="24"
        height="19"
        viewBox="0 0 24 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.1083 4.77628L12 6.53339L12.8917 4.77628C14.5767 1.45615 17.1397 0.629779 19.1505 1.14026C21.2141 1.66416 23 3.65696 23 6.64113C23 8.04958 22.3794 9.46591 21.3292 10.8462C20.2817 12.223 18.8615 13.4906 17.4023 14.5784C15.9483 15.6624 14.4886 16.5436 13.3891 17.1548C12.8405 17.4597 12.3844 17.6959 12.0672 17.8551C12.044 17.8667 12.0216 17.8779 12 17.8887C11.9784 17.8779 11.956 17.8667 11.9328 17.8551C11.6156 17.6959 11.1595 17.4597 10.6109 17.1548C9.51141 16.5436 8.05165 15.6624 6.59769 14.5784C5.13854 13.4906 3.71831 12.223 2.67083 10.8462C1.62059 9.46591 1 8.04958 1 6.64113C1 3.65696 2.78586 1.66415 4.84951 1.14025C6.86034 0.629768 9.42329 1.45613 11.1083 4.77628Z"
          fill="#FF4356"
          stroke="#FF4356"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

function NumberOfParticipant({ numberOfParticipants }: ParticipantProps) {
  return (
    <div className="absolute bg-black opacity-80 top-[0.3rem] left-[1rem] rounded-[8px] w-[4.8rem] h-[1.9rem] flex justify-center items-center gap-[0.6rem]">
      <img src={personIcon} alt="신청 인원 수 아이콘" />
      <span className="text-[1rem] font-extralight leading-normal text-white">
        {numberOfParticipants}명
      </span>
    </div>
  );
}

function Image({
  imgSrc,
  alt,
  children,
  direction,
  maxWidth,
  paddingBottom,
}: ImageProps) {
  const additionalStyles = {
    horizontal: "w-[18.8rem] h-[12.6rem]",
    vertical: maxWidth
      ? `w-full ${maxWidth} ${paddingBottom}`
      : "w-full max-w-[16.4rem] pb-[77%]",
  };

  return (
    <div className={`relative flex ${additionalStyles[direction]}`}>
      <img
        src={imgSrc}
        alt={alt}
        className={cls(
          "w-full h-full rounded-[1rem] object-cover",
          direction === "vertical" ? "absolute top-0 left-0 " : ""
        )}
      />
      {children}
    </div>
  );
}

function Title({ title }: TitleProps) {
  return <p className="text-[1.5rem] font-medium leading-normal">{title}</p>;
}

function Reward({ point }: RewardProps) {
  return (
    <p className="text-[#434343] text-[1.2rem] font-regular leading-_normal">
      보상 {point}P
    </p>
  );
}

function Overlay({ text }: OverlayProps) {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full opacity-55 bg-black rounded-[1rem] " />
      <span className=" absolute top-0 left-0 w-full h-full text-white text-[1.6rem] font-medium leading-_normal flex justify-center items-center">
        {text}
      </span>
    </>
  );
}

export const ChallengeItem = Object.assign(Main, {
  NumberOfParticipant: NumberOfParticipant,
  Heart: Heart,
  Image: Image,
  Title: Title,
  Reward: Reward,
  Overlay: Overlay,
});

export default ChallengeItem;
