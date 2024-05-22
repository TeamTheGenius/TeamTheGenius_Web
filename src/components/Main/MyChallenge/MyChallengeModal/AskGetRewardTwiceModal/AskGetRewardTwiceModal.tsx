import Button from "@/components/Common/Button";
import { Modal } from "@/components/Common/Modal/Modal";
import GetRewardModal from "../GetRewardModal/GetRewardModal";
import GetRewardTwiceModal from "../GetRewardTwiceModal/GetRewardTwiceModal";
import { useModalStore } from "@/stores/modalStore";

interface TwiceRewardModalProps {
  instanceId: number;
  numOfPointItem: number;
  itemId: number;
}

function AskGetRewardTwiceModal({
  instanceId,
  numOfPointItem,
  itemId,
}: TwiceRewardModalProps) {
  const { setModal } = useModalStore();
  const onClickUse = async () => {
    setModal(<GetRewardTwiceModal instanceId={instanceId} itemId={itemId} />);
  };

  const onClickNotUse = () => {
    setModal(<GetRewardModal instanceId={instanceId} />);
  };

  return (
    <Modal.ModalContentBox width="w-[35.5rem]" height="h-[32.3rem]">
      <div className="flex flex-col  items-center">
        <Modal.ModalContent
          content={"포인트 2배 획득 아이템을\n사용하시겠어요?"}
        />
        <p className="text-center font-[500] text-[1.6rem]">
          (현재 {numOfPointItem}개 보유중)
        </p>
        <button
          onClick={onClickNotUse}
          className="underline text-[#777] text-[1.3rem] font-medium mt-[3.6rem] mb-[1.6rem]"
        >
          사용하지 않습니다.
        </button>
        <Button
          content="사용하기"
          width="w-[16.4rem]"
          height="h-[5rem]"
          backgroundColor="bg-white border-2 border-_coral-70"
          textSize="text-[1.5rem]"
          fontWeight="font-[500]"
          textColor="text-_coral-70"
          handleClick={onClickUse}
        />
      </div>
    </Modal.ModalContentBox>
  );
}

export default AskGetRewardTwiceModal;
