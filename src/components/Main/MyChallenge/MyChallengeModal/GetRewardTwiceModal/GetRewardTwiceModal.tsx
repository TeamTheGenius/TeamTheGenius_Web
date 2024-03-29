import getMyChallengeDoneReward from "@/apis/getMyChallengeDoneReward";
import postUseItem from "@/apis/postUseItem";
import Button from "@/components/Common/Button";
import { Modal } from "@/components/Common/Modal/Modal";

interface TwiceRewardModalProps {
  closeModal: () => void;
  instanceId: number;
  numOfPointItem: number;
  refetch: () => void;
  itemId: number;
}

function GetRewardTwiceModal({
  closeModal,
  instanceId,
  numOfPointItem,
  refetch,
  itemId,
}: TwiceRewardModalProps) {
  if (!instanceId) return null;
  const onClickUse = async () => {
    await postUseItem({ itemId, instanceId })
      .then(() => {
        closeModal();
        refetch();
      })
      .catch((err) => {
        throw err;
      });
  };
  const onClickNotUse = async () => {
    await getMyChallengeDoneReward({ instanceId })
      .then(() => {
        closeModal();
        refetch();
      })
      .catch((err) => {
        throw err;
      });
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

export default GetRewardTwiceModal;
