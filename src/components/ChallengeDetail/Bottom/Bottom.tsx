import Button from "@/components/Common/Button";
import Heart from "../Heart/Heart";
import { useNavigate } from "react-router-dom";
import deleteLikeChallenge from "@/apis/deleteLikeChallenge";
import postLikeChallenge from "@/apis/postLikeChallenge";

interface HeartProps {
  isHearted: boolean;
  likesId: number;
  heartCount: number;
  refetch: () => void;
  instanceId: number;
}

interface MainProps {
  children: React.ReactNode;
}

interface ButtonProps {
  status: "참가하기" | "참가완료" | "모집완료" | "챌린지종료";
}

function BottomHeart({
  isHearted,
  likesId,
  refetch,
  heartCount,
  instanceId,
}: HeartProps) {
  const onClick = () => {
    console.log("instanceId", instanceId);
    if (isHearted) {
      deleteLikeChallenge({ likesId: likesId })
        .then(() => {
          refetch();
        })
        .catch((err) => {
          throw err;
        });
    } else {
      postLikeChallenge({ instanceId: instanceId })
        .then(() => {
          refetch();
        })
        .catch((err) => {
          throw err;
        });
    }
  };
  return (
    <div className="flex flex-col justify-center">
      <div onClick={onClick} className="w-[3.4rem] h-[2.9rem] cursor-pointer">
        <Heart isActive={isHearted} />
      </div>
      <span className="text-[1.2rem] font-medium leading-_normal text-center text-_coral-70">
        {heartCount}
      </span>
    </div>
  );
}

function BottomMain({ children }: MainProps) {
  return (
    <div className="px-[3rem] w-full h-[8rem] flex items-center bg-white">
      <div className="flex justify-between gap-[10rem] w-full">{children}</div>
    </div>
  );
}

function BottomButton({ status }: ButtonProps) {
  const navigate = useNavigate();
  const onClickParticipation = () => {
    navigate("repo-register");
  };
  const joinStatusVariants = {
    참가하기: {
      buttonText: "참가하기",
      backgroundColor: "bg-[#FF4356]",
      textColor: "text-white",
      onClick: onClickParticipation,
    },
    참가완료: {
      buttonText: "참가완료",
      backgroundColor: "bg-[#DDD] cursor-default",
      textColor: "text-[#7C7C7C]",
      onClick: () => {},
    },
    모집완료: {
      buttonText: "모집완료",
      backgroundColor: "bg-[#DDD] cursor-default",
      textColor: "text-[#7C7C7C]",
      onClick: () => {},
    },
    챌린지종료: {
      buttonText: "챌린지 종료",
      backgroundColor: "bg-[#DDD] cursor-default",
      textColor: "text-[#7C7C7C]",
      onClick: () => {},
    },
  };

  const { buttonText, backgroundColor, textColor, onClick } =
    joinStatusVariants[status as keyof typeof joinStatusVariants];
  return (
    <Button
      content={buttonText}
      width="w-full max-w-[35.4rem] _sm:max-w-[16.4rem]"
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
