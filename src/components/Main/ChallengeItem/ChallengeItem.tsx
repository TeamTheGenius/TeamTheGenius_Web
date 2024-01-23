import personIcon from "@/assets/icon/person-icon.svg";

interface MainProps {
  children: React.ReactNode;
}

interface ParticipantProps {
  numberOfParticipants: number;
}

interface ImageProps {
  imgSrc: string;
  alt: string;
  children: React.ReactNode;
}

interface TitleProps {
  title: string;
}

function Main({ children }: MainProps) {
  return (
    <div className="flex flex-col gap-[0.8rem] my-[0.4rem]">{children}</div>
  );
}

function NumberOfParticipant({ numberOfParticipants }: ParticipantProps) {
  return (
    <span className="text-[1rem] font-extralight leading-_normal text-white">
      {numberOfParticipants}명
    </span>
  );
}

function Image({ imgSrc, alt, children }: ImageProps) {
  return (
    <div className="relative rounded-[10px] w-[18.8rem] h-[12.6rem] bg-yellow-500">
      <img src={imgSrc} alt={alt} className="w-full h-full" />
      <div className="absolute bg-black opacity-80 top-[0.3rem] left-[1rem] rounded-[8px] w-[4.8rem] h-[1.9rem] flex justify-center items-center gap-[0.6rem]">
        <img src={personIcon} alt="신청 인원 수 아이콘" />
        {children}
      </div>
    </div>
  );
}

function Title({ title }: TitleProps) {
  return <p className="text-[1.5rem] font-medium leading-_normal">{title}</p>;
}

export const ChallengeItem = Object.assign(Main, {
  NumberOfParticipant: NumberOfParticipant,
  Image: Image,
  Title: Title,
});

export default ChallengeItem;
