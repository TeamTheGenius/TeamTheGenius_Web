import Button from "@/components/Common/Button";
import { Modal } from "@/components/Common/Modal/Modal";

function GitPullReqModal({
  closeModal,
  errState,
}: {
  closeModal: () => void;
  errState: string;
}) {
  const completeHandle = () => {
    closeModal();
  };
  return (
    <>
      <Modal.ModalContentBox width="w-[35.5rem]" height="h-[32.3rem]">
        <div className="flex flex-col justify-center relative items-center">
          <div className="mb-[7.4rem]">
            {errState && <Modal.ModalContent content={errState} />}
          </div>
          <Button
            content="닫기"
            width="w-[16.4rem]"
            height="h-[5rem]"
            backgroundColor="bg-white border-2 border-[#ff4356]"
            textSize="text-[1.5rem]"
            fontWeight="font-[500]"
            textColor="text-[#ff4356]"
            handleClick={completeHandle}
          />
        </div>
      </Modal.ModalContentBox>
    </>
  );
}

export default GitPullReqModal;
