import { Modal } from "@/components/Common/Modal/Modal";
import { useEffect } from "react";
import GetRewardResultModal from "../GetRewardResultModal/GetRewardResultModal";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import { MyChallengeDoneDataType } from "@/types/myChallengeType";
import { useModalStore } from "@/stores/modalStore";
import { useGetChallengeSuccessReward } from "@/hooks/queries/useMyChallengeQuery";

interface RewardModalProps {
  instanceId: number;
}

function GetRewardModal({ instanceId }: RewardModalProps) {
  const { setModal, closeModal } = useModalStore();
  const onSuccessGetChallengeSuccessReward = (res: MyChallengeDoneDataType) => {
    setModal(
      <GetRewardResultModal
        closeModal={closeModal}
        content={`챌린지 완료!\n${res.rewardedPoints}P를 획득하셨습니다.`}
      />
    );
  };

  const {
    mutate: getChallengeSuccessRewardMutate,
    isLoading: getChallengeSucessRewardLoading,
  } = useGetChallengeSuccessReward({
    onSuccess: onSuccessGetChallengeSuccessReward,
  });

  useEffect(() => {
    getChallengeSuccessRewardMutate({ instanceId });
  }, []);

  return (
    <Modal.ModalContentBox width="w-[35.5rem]" height="h-[32.3rem]">
      {getChallengeSucessRewardLoading && <LoadingBox />}
    </Modal.ModalContentBox>
  );
}

export default GetRewardModal;
