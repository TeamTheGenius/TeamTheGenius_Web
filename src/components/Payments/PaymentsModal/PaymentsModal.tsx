import Button from "@/components/Common/Button";
import { Modal } from "@/components/Common/Modal/Modal";

interface ModalProps {
  text: string;
  buttonText: string;
  closeModal: () => void;
}

export function PaymentsModal({ closeModal, text, buttonText }: ModalProps) {
  return (
    <Modal.ModalContentBox width="w-[35.5rem]" height="h-[32.3rem]">
      <div className="flex flex-col gap-[7.4rem] mt-[9rem] justify-center items-center">
        <Modal.ModalContent content={`${text}`} />
        <Button
          content={`${buttonText}`}
          width="w-[16.4rem]"
          height="h-[5rem]"
          backgroundColor="bg-white border-2 border-_coral-70"
          textSize="text-[1.5rem]"
          fontWeight="font-[500]"
          textColor="text-_coral-70"
          handleClick={() => {
            closeModal();
          }}
        />
      </div>
    </Modal.ModalContentBox>
  );
}
