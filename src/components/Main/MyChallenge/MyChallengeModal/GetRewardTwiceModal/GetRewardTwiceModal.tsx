import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import { Modal } from "@/components/Common/Modal/Modal";
import { useEffect } from "react";
import { MyChallengeDoneDataType } from "@/types/myChallengeType";
import CommonModal from "@/components/Common/CommonModal/CommonModal";
import { useModalStore } from "@/stores/modalStore";
import { usePostPointTwiceItemUse } from "@/hooks/queries/useItemQuery";

interface Props {
  instanceId: number;
  itemId: number;
}

function GetRewardTwiceModal({ instanceId, itemId }: Props) {
  const { closeModal, setModal } = useModalStore();
  const onSuccessPostItemUse = (res: MyChallengeDoneDataType) => {
    setModal(
      <CommonModal
        buttonContent="확인"
        onClick={closeModal}
        content={`챌린지 완료!\n${res.rewardedPoints}P를 획득하셨습니다.`}
      />
    );
  };

  const {
    mutate: pointTwiceItemUseMutate,
    isLoading: pointTwiceItemUseLoading,
  } = usePostPointTwiceItemUse({
    onSuccess: onSuccessPostItemUse,
  });

  useEffect(() => {
    pointTwiceItemUseMutate({ instanceId, itemId });
  }, []);

  return (
    <Modal.ModalContentBox width="w-[35.5rem]" height="h-[32.3rem]">
      {pointTwiceItemUseLoading && <LoadingBox />}
    </Modal.ModalContentBox>
  );
}

export default GetRewardTwiceModal;
