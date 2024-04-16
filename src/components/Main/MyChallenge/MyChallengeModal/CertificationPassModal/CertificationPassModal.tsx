import Button from "@/components/Common/Button";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import { Modal } from "@/components/Common/Modal/Modal";
import CommonMutationErrorModal from "@/components/Error/CommonMutationErrorModal/CommonMutationErrorModal";
import { usePostCertificationPassItemUse } from "@/hooks/queries/useItemQuery";

interface PassItemModalProps {
  closeModal: () => void;
  instanceId: number;
  numOfPassItem: number;
  itemId: number;
  setModal: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

function CertificationPassModal({
  closeModal,
  instanceId,
  numOfPassItem,
  itemId,
  setModal,
}: PassItemModalProps) {
  const onClickNotUse = () => {
    closeModal();
  };
  const onSuccessPostItemUse = () => {
    closeModal();
  };
  const onErrorPostItemUse = (error: any) => {
    setModal(
      <CommonMutationErrorModal error={error} closeModal={closeModal} />
    );
  };
  const {
    mutate: certificationPassItemUse,
    isLoading: certificationPassItemUseLoading,
  } = usePostCertificationPassItemUse({
    onSuccess: onSuccessPostItemUse,
    onError: onErrorPostItemUse,
  });
  const onClickUsePassItem = () => {
    certificationPassItemUse({ instanceId, itemId });
  };

  return (
    <Modal.ModalContentBox width="w-[35.5rem]" height="h-[32.3rem]">
      {certificationPassItemUseLoading ? (
        <LoadingBox />
      ) : (
        <div className="flex flex-col gap-[1.4rem] justify-center items-center">
          <Modal.ModalContent
            content={`인증 패스권 아이템을\n 사용하시겠어요?\n (현재 ${numOfPassItem}개 보유중)`}
          />
          <button className="w-full pt-[1.5rem]" onClick={onClickNotUse}>
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
            handleClick={onClickUsePassItem}
          />
        </div>
      )}
    </Modal.ModalContentBox>
  );
}

export default CertificationPassModal;
