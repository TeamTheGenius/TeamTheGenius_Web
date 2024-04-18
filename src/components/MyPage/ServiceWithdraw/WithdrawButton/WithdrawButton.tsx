import Button from "@/components/Common/Button";
import { ModalLayer } from "@/components/Common/Modal/Modal";
import CommonMutationErrorModal from "@/components/Error/CommonMutationErrorModal/CommonMutationErrorModal";
import { useDeleteUser } from "@/hooks/queries/useProfileQuery";
import useModal from "@/hooks/useModal";
import { AxiosError } from "axios";
import { useState } from "react";
import { createPortal } from "react-dom";

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
  const [modal, setModal] = useState<React.ReactNode>();
  const { isModalOpened, closeModal, openModal } = useModal();

  const onErrorDeleteUser = (error: AxiosError<{ message?: string }>) => {
    setModal(
      <CommonMutationErrorModal error={error} closeModal={closeModal} />
    );
    openModal();
  };
  const { mutate } = useDeleteUser({ onError: onErrorDeleteUser });

  const onClick = async () => {
    const reason = selectedReason == "기타" ? otherReason : selectedReason;
    mutate(reason);
  };

  return (
    <>
      {isModalOpened &&
        createPortal(
          <ModalLayer onClick={closeModal}>{modal}</ModalLayer>,
          document.body
        )}

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
    </>
  );
}

export default WithdrawButton;
