import Button from "@/components/Common/Button";
import { Modal } from "@/components/Common/Modal/Modal";

interface NoItemModalProps {
  closeModal: () => void;
  itemName: string;
}

function HasNoItemModal({ closeModal, itemName }: NoItemModalProps) {
  const onClickButton = () => {
    closeModal();
  };

  return (
    <Modal.ModalContentBox width="w-[35.5rem]" height="h-[32.3rem]">
      <div className="flex flex-col gap-[1.4rem] mt-[9rem] justify-center items-center">
        <Modal.ModalContent
          content={`보유하신\n ${itemName} 아이템이 없습니다`}
        />
        <Button
          content="확인"
          width="w-[16.4rem]"
          height="h-[5rem]"
          backgroundColor="bg-white border-2 border-_coral-70"
          textSize="text-[1.5rem]"
          fontWeight="font-[500]"
          textColor="text-_coral-70"
          handleClick={onClickButton}
        />
      </div>
    </Modal.ModalContentBox>
  );
}

export default HasNoItemModal;
