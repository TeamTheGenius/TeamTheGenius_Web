import Button from "@/components/Common/Button";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import { Modal } from "@/components/Common/Modal/Modal";

interface ModalProps {
  editBoolean: boolean;
  success: string;
  fail: string;
  buttonText: string;
  isLoading: boolean;
  modalHandle: () => void;
}

export function SignUpModal({
  modalHandle,
  editBoolean,
  success,
  fail,
  isLoading,
  buttonText,
}: ModalProps) {
  return (
    <Modal.ModalContentBox width="w-[35.5rem]" height="h-[32.3rem]">
      <div className="flex flex-col gap-[7.4rem] mt-[9rem] justify-center items-center">
        {isLoading ? (
          <LoadingBox />
        ) : (
          <>
            {editBoolean === true ? (
              <Modal.ModalContent content={`${success}`} />
            ) : (
              <Modal.ModalContent content={`${fail}`} />
            )}
            <Button
              content={`${buttonText}`}
              width="w-[16.4rem]"
              height="h-[5rem]"
              backgroundColor="bg-white border-2 border-_coral-70"
              textSize="text-[1.5rem]"
              fontWeight="font-[500]"
              textColor="text-_coral-70"
              handleClick={() => {
                modalHandle();
              }}
            />
          </>
        )}
      </div>
    </Modal.ModalContentBox>
  );
}
