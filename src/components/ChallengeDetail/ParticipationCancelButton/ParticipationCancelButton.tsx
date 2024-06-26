import participationCancelIcon from "@/assets/icon/gray-next-arrow.svg";
import ParticipationCancelAskModal from "../ChallengeDetailModal/ParticipationCancelAskModal/ParticipationCancelAskModal";
import { useModalStore } from "@/stores/modalStore";

interface Props {
  instanceId: number;
  title: string;
}

function ParticipationCancelButton({ instanceId, title }: Props) {
  const { setModal } = useModalStore();

  const onClickParticipationCancelButton = async () => {
    setModal(
      <ParticipationCancelAskModal instanceId={instanceId} title={title} />
    );
  };

  return (
    <>
      <div className="px-[1rem] bg-[#FFF8E5] w-full h-[3.8rem] flex justify-between items-center">
        <div className="flex gap-[1.3rem] pl-[0.3rem]">
          <div className="bg-[#7384A6] w-[2rem] h-[2rem] rounded-[0.4rem]" />
          <p className="text-[1.2rem] font-normal">
            이미 참가 중인 챌린지 입니다.
          </p>
        </div>
        <button
          onClick={onClickParticipationCancelButton}
          className="flex gap-[0.6rem]"
        >
          <p className="text-[1.1rem] font-normal text-[#767676]">
            참가 취소하기
          </p>
          <img src={participationCancelIcon} alt="참가 취소 아이콘" width={7} />
        </button>
      </div>
    </>
  );
}

export default ParticipationCancelButton;
