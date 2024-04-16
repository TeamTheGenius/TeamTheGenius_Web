import Button from "@/components/Common/Button";
import { Modal } from "@/components/Common/Modal/Modal";

interface Props {
  content: string;
  buttonContent: string;
  onClick: () => void;
}

function CommonModal({ content, buttonContent, onClick }: Props) {
  return (
    <Modal.ModalContentBox width="w-[35.5rem]" height="h-[32.3rem]">
      <div className="flex flex-col gap-[1.4rem] justify-center items-center">
        <div className="mb-[5rem]">
          <Modal.ModalContent content={content} />
        </div>
        <Button
          content={buttonContent || "확인"}
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

export default CommonModal;
