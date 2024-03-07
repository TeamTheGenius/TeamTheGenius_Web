import getMyChallengeDoneReward from "@/apis/getMyChallengeDoneReward";
import Button from "@/components/Common/Button";
import { Modal } from "@/components/Common/Modal/Modal";

const MyChallengeModal = {
  MyChallengeGetRewardModal,
  MyChallengeGetRewardTwiceModal,
};

interface ModalProps {
  closeModal: () => void;
  instanceId?: number;
}

function MyChallengeGetRewardModal({ closeModal }: ModalProps) {
  const onClick = async () => {
    closeModal();
  };
  return (
    <Modal.ModalContentBox width="w-[35.5rem]" height="h-[32.3rem]">
      <div className="flex flex-col gap-[7.4rem] mt-[9rem] justify-center items-center">
        <Modal.ModalContent content={"챌린지 완료!\n100P를 획득하셨습니다."} />
        <Button
          content="확인"
          width="w-[16.4rem]"
          height="h-[5rem]"
          backgroundColor="bg-white border-2 border-_coral-70"
          textSize="text-[1.5rem]"
          fontWeight="font-[500]"
          textColor="text-_coral-70"
          handleClick={onClick}
        />
      </div>
    </Modal.ModalContentBox>
  );
}

function MyChallengeGetRewardTwiceModal({
  closeModal,
  instanceId,
}: ModalProps) {
  if (!instanceId) return null;
  const onClickUse = async () => {
    await getMyChallengeDoneReward({ item: true, instanceId });
    closeModal();
  };
  const onClickNotUse = async () => {
    await getMyChallengeDoneReward({ item: false, instanceId });
    closeModal();
  };

  return (
    <Modal.ModalContentBox width="w-[35.5rem]" height="h-[32.3rem]">
      <div className="flex flex-col mt-[7rem]  items-center">
        <Modal.ModalContent
          content={"포인트 2배 획득 아이템을\n사용하시겠어요?"}
        />
        <p className="text-center font-[500] text-[1.6rem]">
          (현재 n개 보유중)
        </p>

        <button
          onClick={onClickNotUse}
          className="underline text-[#777] text-[1.3rem] font-medium mt-[3.6rem] mb-[1.6rem]"
        >
          사용하지 않습니다.
        </button>

        <Button
          content="사용하기"
          width="w-[16.4rem]"
          height="h-[5rem]"
          backgroundColor="bg-white border-2 border-_coral-70"
          textSize="text-[1.5rem]"
          fontWeight="font-[500]"
          textColor="text-_coral-70"
          handleClick={onClickUse}
        />
      </div>
    </Modal.ModalContentBox>
  );
}

export default MyChallengeModal;
