import Button from "@/components/Common/Button";
import { Modal } from "@/components/Common/Modal/Modal";

const MyChallengeModal = {
  MyChallengeGetRewardModal,
};

interface ModalProps {
  closeModal: () => void;
}

function MyChallengeGetRewardModal({ closeModal }: ModalProps) {
  const onClick = () => {
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

export default MyChallengeModal;
