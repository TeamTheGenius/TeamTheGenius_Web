import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import { Modal } from "@/components/Common/Modal/Modal";
import { usePostPointTwiceItemUse } from "@/hooks/queries/useItemQuery";
import React, { useEffect } from "react";
import { MyChallengeDoneDataType } from "@/types/myChallengeType";
import CommonModal from "@/components/Common/CommonModal/CommonModal";
import CommonMutationErrorModal from "@/components/Error/CommonMutationErrorModal/CommonMutationErrorModal";
import { AxiosError } from "axios";

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
      <CommonModal
        buttonContent="확인"
        onClick={closeModal}
        content={`챌린지 완료!\n${res.rewardedPoints}P를 획득하셨습니다.`}
      />
    );
  };

  const onErrorPostItemUse = (error: AxiosError<{ message: string }>) => {
    setModal(
      <CommonMutationErrorModal error={error} closeModal={closeModal} />
    );
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
