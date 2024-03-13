import Button from "@/components/Common/Button";
import { Modal } from "@/components/Common/Modal/Modal";
import HasNoItemModal from "../HasNoItemModal/HasNoItemModal";
import postUseItem from "@/apis/postUseItem";

interface PassItemModalProps {
  closeModal: () => void;
  instanceId: number;
  refetch: () => void;
  setModal: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  numOfPassItem: number;
  itemId: number;
}

function CertificationPassModal({
  closeModal,
  instanceId,
  refetch,
  setModal,
  numOfPassItem,
  itemId,
}: PassItemModalProps) {
  const onClickNotUse = () => {
    closeModal();
  };

  const onClickUsePassItem = async () => {
    postUseItem({ instanceId: instanceId, itemId: itemId })
      .then(() => {
        closeModal();
        refetch();
      })
      .catch(() => {
        setModal(
          <HasNoItemModal itemName="인증 패스" closeModal={closeModal} />
        );
      });
  };

  return (
    <Modal.ModalContentBox width="w-[35.5rem]" height="h-[32.3rem]">
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
    </Modal.ModalContentBox>
  );
}

export default CertificationPassModal;
