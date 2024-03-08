import Button from "@/components/Common/Button";
import { Modal } from "@/components/Common/Modal/Modal";

interface ModalProps {
  closeModal: () => void;
  editApiBoolean: boolean;
}

export function InterestEditModal({ closeModal, editApiBoolean }: ModalProps) {
  const onClick = async () => {
    closeModal();
  };
  return (
    <Modal.ModalContentBox width="w-[35.5rem]" height="h-[32.3rem]">
      <div className="flex flex-col gap-[7.4rem] mt-[9rem] justify-center items-center">
        {editApiBoolean === true ? (
          <Modal.ModalContent content={"관심사 수정에 성공했습니다"} />
        ) : (
          <Modal.ModalContent content={"관심사 수정에 실패했습니다"} />
        )}
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
