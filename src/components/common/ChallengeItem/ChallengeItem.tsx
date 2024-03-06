import personIcon from "@/assets/icon/person-icon.svg";
import { cls } from "@/utils/mergeTailwind";
import heartIcon from "@/assets/icon/heart-icon.svg";

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

interface HeartProps {
  onClick?: (e: React.MouseEvent) => void;
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

function Heart({ onClick }: HeartProps) {
  return (
    <button onClick={onClick} className="absolute top-[0.9rem] right-[0.7rem]">
      <img src={heartIcon} alt="좋아요 아이콘" width={24} />
    </button>
  );
}

function NumberOfParticipant({ numberOfParticipants }: ParticipantProps) {
  return (
    <div className="absolute bg-black opacity-80 top-[0.3rem] left-[1rem] rounded-[8px] w-[4.8rem] h-[1.9rem] flex justify-center items-center gap-[0.6rem]">
      <img src={personIcon} alt="신청 인원 수 아이콘" />
      <span className="text-[1rem] font-extralight leading-normal text-white">
        {numberOfParticipants | 0}명
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
