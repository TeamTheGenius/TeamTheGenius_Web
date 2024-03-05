import Button from "@/components/Common/Button";
import Heart from "../Heart/Heart";

interface HeartProps {
  heartActive: boolean;
  setHeartActive: React.Dispatch<React.SetStateAction<boolean>>;
  heartCount: number;
}

interface MainProps {
  children: React.ReactNode;
}

interface ButtonProps {
  status: "참가하기" | "참가완료" | "모집완료" | "챌린지종료";
}

function BottomHeart({ heartActive, setHeartActive, heartCount }: HeartProps) {
  const onClick = () => {
    setHeartActive(!heartActive);
  };
  return (
    <div className="flex flex-col justify-center">
      <div onClick={onClick} className="w-[3.4rem] h-[2.9rem] cursor-pointer">
        <Heart isActive={heartActive} />
      </div>
      <span className="text-[1.2rem] font-medium leading-_normal text-center text-_coral-70">
        {heartCount}
      </span>
    </div>
  );
}

function BottomMain({ children }: MainProps) {
  return (
    <div className="w-full h-[8rem] flex items-center bg-white">
      <div className="flex justify-between gap-[13.8rem] w-full">
        {children}
      </div>
    </div>
  );
}

function BottomButton({ status }: ButtonProps) {
  const onClickParticipation = () => {};
  const joinStatusVariants = {
    참가하기: {
      buttonText: "참가하기",
      backgroundColor: "bg-[#FF4356]",
      textColor: "text-white",
      onClick: onClickParticipation,
    },
    참가완료: {
      buttonText: "참가완료",
      backgroundColor: "bg-[#DDD]",
      textColor: "text-[#7C7C7C]",
      onClick: () => {},
    },
    모집완료: {
      buttonText: "모집완료",
      backgroundColor: "bg-[#DDD]",
      textColor: "text-[#7C7C7C]",
      onClick: () => {},
    },
    챌린지종료: {
      buttonText: "챌린지 종료",
      backgroundColor: "bg-[#DDD]",
      textColor: "text-[#7C7C7C]",
      onClick: () => {},
    },
  };

  const { buttonText, backgroundColor, textColor, onClick } =
    joinStatusVariants[status as keyof typeof joinStatusVariants];
  return (
    <Button
      content={buttonText}
      width="w-full max-w-[35.4rem]"
      height="h-[5rem]"
      backgroundColor={backgroundColor}
      textSize="text-[1.5rem]"
      fontWeight="font-[500]"
      textColor={textColor}
      handleClick={onClick}
    />
  );
}

export const Bottom = Object.assign(BottomMain, {
  Heart: BottomHeart,
  Button: BottomButton,
});

export default Bottom;
