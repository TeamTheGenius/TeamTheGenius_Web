import Button from "@/components/Common/Button";
import { Modal } from "@/components/Common/Modal/Modal";

interface ModalProps {
  closeModal: () => void;
}

export function MyChallengePassModal({ closeModal }: ModalProps) {
  const onClick = async () => {
    closeModal();
  };
  return (
    <Modal.ModalContentBox width="w-[35.5rem]" height="h-[32.3rem]">
      <div className="flex flex-col gap-[1.4rem] mt-[9rem] justify-center items-center">
        <Modal.ModalContent
          content={`포인트 2배 획득 아이템을\n 사용하시겠어요?\n (현재 5개 보유중)`}
        />
        <button className="w-full pt-[1.5rem]" onClick={closeModal}>
          <span className="whitespace-nowrap relative text-[1.3rem] text-[#777777] hover:border-b-[1px] hover:border-[#777777]">
            사용하지 않습니다
          </span>
        </button>
        <Button
          content="사용하기"
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
