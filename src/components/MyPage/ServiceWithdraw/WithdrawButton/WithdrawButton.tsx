import deleteServiceWithdraw from "@/apis/deleteServiceWithdraw";
import Button from "@/components/Common/Button";
import { PATH } from "@/constants/path";
import { useNavigate } from "react-router-dom";

type Reason =
  | "앱 사용이 불편해요"
  | "참여할 만한 챌린지가 없어요"
  | "쓰지 않는 서비스예요"
  | "기타";

interface Props {
  selectedReason: Reason;
  otherReason: string;
}

function WithdrawButton({ selectedReason, otherReason }: Props) {
  const navigate = useNavigate();

  const onClick = async () => {
    await deleteServiceWithdraw()
      .then(() => navigate(PATH.LOGIN))
      .then((err) => {
        throw err;
      });
  };

  return (
    <Button
      content="탈퇴하기"
      width="w-full max-w-[46.7rem] _sm:max-w-[16.4rem]"
      height="h-[5rem]"
      backgroundColor="bg-black"
      textSize="text-[1.5rem]"
      fontWeight="font-[500]"
      textColor="text-white"
      handleClick={onClick}
    />
  );
}

export default WithdrawButton;
