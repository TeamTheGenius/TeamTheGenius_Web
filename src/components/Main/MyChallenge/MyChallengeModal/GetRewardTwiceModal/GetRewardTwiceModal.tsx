import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import { Modal } from "@/components/Common/Modal/Modal";
import { usePostPointTwiceItemUse } from "@/hooks/queries/useItemQuery";
import React, { useEffect } from "react";
import GetRewardResultModal from "../GetRewardResultModal/GetRewardResultModal";
import { MyChallengeDoneDataType } from "@/types/myChallengeType";

interface Props {
  setModal: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  instanceId: number;
  closeModal: () => void;
  itemId: number;
}

function GetRewardTwiceModal({
  setModal,
  instanceId,
  itemId,
  closeModal,
}: Props) {
  const onSuccessPostItemUse = (res: MyChallengeDoneDataType) => {
    setModal(
      <GetRewardResultModal
        closeModal={closeModal}
        content={`챌린지 완료!\n${res.rewardedPoints}P를 획득하셨습니다.`}
      />
    );
  };

  const onErrorPostItemUse = () => {
    <GetRewardResultModal
      closeModal={closeModal}
      content={`두배 보상 아이템 사용에 실패하셨습니다.`}
    />;
  };

  const {
    mutate: pointTwiceItemUseMutate,
    isLoading: pointTwiceItemUseLoading,
  } = usePostPointTwiceItemUse({
    onSuccess: onSuccessPostItemUse,
    onError: onErrorPostItemUse,
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
