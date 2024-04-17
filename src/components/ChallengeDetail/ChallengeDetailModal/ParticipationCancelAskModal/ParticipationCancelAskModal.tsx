import Button from "@/components/Common/Button";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import { Modal } from "@/components/Common/Modal/Modal";
import CommonMutationErrorModal from "@/components/Error/CommonMutationErrorModal/CommonMutationErrorModal";
import { useDeleteChallengeJoin } from "@/hooks/queries/useInstanceDetailQuery";
import { AxiosError } from "axios";

interface Props {
  closeModal: () => void;
  instanceId: number;
  title: string;
  setModal: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

function ParticipationCancelAskModal({
  closeModal,
  instanceId,
  title,
  setModal,
}: Props) {
  const onSuccessDeleteChallengeJoin = () => {
    closeModal();
  };
  const onErrorDeleteChallengeJoin = (
    error: AxiosError<{ message: string }>
  ) => {
    setModal(
      <CommonMutationErrorModal error={error} closeModal={closeModal} />
    );
  };
  const { mutate: deleteChallengeJoin, isLoading: deleteChallengeJoinLoading } =
    useDeleteChallengeJoin({
      onSuccess: onSuccessDeleteChallengeJoin,
      onError: onErrorDeleteChallengeJoin,
    });
  const onClickParticipationCancelYesButton = () => {
    deleteChallengeJoin({ instanceId });
  };

  const onClickParticipationCancelNoButton = () => {
    closeModal();
  };

  return (
    <Modal.ModalContentBox width="w-[35.5rem]" height="h-[32.3rem]">
      {deleteChallengeJoinLoading ? (
        <LoadingBox />
      ) : (
        <div className="flex flex-col items-center">
          <Modal.ModalContent
            content={`"${title}"챌린지\n 참가를 취소하시겠어요?`}
          />
          <button
            onClick={onClickParticipationCancelNoButton}
            className="underline text-[#777] text-[1.3rem] font-medium mt-[3.6rem] mb-[1.6rem]"
          >
            아니요, 참가하겠습니다.
          </button>
          <Button
            content="취소하겠습니다"
            width="w-[16.4rem]"
            height="h-[5rem]"
            backgroundColor="bg-white border-2 border-_coral-70"
            textSize="text-[1.5rem]"
            fontWeight="font-[500]"
            textColor="text-_coral-70"
            handleClick={onClickParticipationCancelYesButton}
          />
        </div>
      )}
    </Modal.ModalContentBox>
  );
}

export default ParticipationCancelAskModal;
