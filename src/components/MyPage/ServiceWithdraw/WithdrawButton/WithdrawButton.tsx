import Button from "@/components/Common/Button";
import CommonModal from "@/components/Common/CommonModal/CommonModal";
import CommonMutationErrorModal from "@/components/Error/CommonMutationErrorModal/CommonMutationErrorModal";
import { useDeleteUser } from "@/hooks/queries/useProfileQuery";
import { useModalStore } from "@/stores/modalStore";
import { AxiosError } from "axios";

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
  const { setModal, closeModal } = useModalStore();

  const onErrorDeleteUser = (error: AxiosError<{ message?: string }>) => {
    setModal(
      <CommonMutationErrorModal error={error} closeModal={closeModal} />
    );
  };
  const { mutate } = useDeleteUser({ onError: onErrorDeleteUser });

  const onClickWithdrawButton = () => {
    setModal(
      <CommonModal
        content="정말 탈퇴하시겠습니까?"
        buttonContent="예"
        onClick={onClickWithdrawYes}
      />
    );
  };
  const onClickWithdrawYes = async () => {
    const reason = selectedReason == "기타" ? otherReason : selectedReason;
    mutate(reason);
    closeModal();
  };

  return (
    <>
      <Button
        content="탈퇴하기"
        width="w-full max-w-[46.7rem] _sm:max-w-[16.4rem]"
        height="h-[5rem]"
        backgroundColor="bg-black"
        textSize="text-[1.5rem]"
        fontWeight="font-[500]"
        textColor="text-white"
        handleClick={onClickWithdrawButton}
      />
    </>
  );
}

export default WithdrawButton;
