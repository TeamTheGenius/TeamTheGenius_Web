import Button from "@/components/Common/Button";
import { Modal } from "@/components/Common/Modal/Modal";

interface Props {
  closeModal: () => void;
  content: string;
}
function CertificationResultModal({ closeModal, content }: Props) {
  const onClickButton = () => {
    closeModal();
  };

  return (
    <Modal.ModalContentBox width="w-[35.5rem]" height="h-[32.3rem]">
      <div className="flex flex-col gap-[1.4rem] justify-center items-center">
        <Modal.ModalContent content={content} />
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

export default CertificationResultModal;
