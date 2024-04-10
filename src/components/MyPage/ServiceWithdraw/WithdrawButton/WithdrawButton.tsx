import Button from "@/components/Common/Button";
import { useDeleteUser } from "@/hooks/queries/useProfileQuery";

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
  const { mutate } = useDeleteUser();

  const onClick = async () => {
    const reason = selectedReason == "기타" ? otherReason : selectedReason;
    mutate(reason);
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
