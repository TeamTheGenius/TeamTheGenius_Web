import ChallengeItem from "@/components/Common/ChallengeItem/ChallengeItem";
import MyChallengeLabel from "@/components/Main/MyChallenge/MyChallengeLabel/MyChallengeLabel";
import MyChallengeLinkWrap from "@/components/Main/MyChallenge/MyChallengeLinkWrap/MyChallengeLinkWrap";
import MyChallengeModal from "@/components/Main/MyChallenge/MyChallengeModal/MyChallengeModal";
import MyChallengeTitle from "@/components/Main/MyChallenge/MyChallengeTitle/MyChallengeTitle";
import MyChallengeWrap from "@/components/Main/MyChallenge/MyChallengeWrap/MyChallengeWrap";
import { PATH } from "@/constants/path";
import { allChallengeData } from "@/data/allChallengeData";
import { useOutletContext } from "react-router-dom";

interface Props {
  setModal: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  closeModal: () => void;
  openModal: () => void;
}

const MyChallengeComplete = () => {
  const data = [
    {
      challengeItem: allChallengeData[0],
      completePoint: "130p",
      completePer: "100%",
      completeState: true,
      getReward: false,
      haveItem: false,
    },
    {
      challengeItem: allChallengeData[0],
      completePoint: "130p",
      completePer: "100%",
      completeState: true,
      getReward: false,
      haveItem: true,
    },
    {
      challengeItem: allChallengeData[1],
      completePoint: "130p",
      completePer: "25%",
      completeState: false,
    },
    {
      challengeItem: allChallengeData[2],
      completePoint: "130p",
      completePer: "85%",
      completeState: true,
      getReward: true,
    },
  ];

  const { setModal, closeModal, openModal } = useOutletContext<Props>();

  const onClickGetRewardButton = () => {
    setModal(
      <MyChallengeModal.MyChallengeGetRewardModal closeModal={closeModal} />
    );
    openModal();
  };
  const onClickGetRewardTwiceButton = () => {
    setModal(
      <MyChallengeModal.MyChallengeGetRewardTwiceModal
        closeModal={closeModal}
      />
    );
    openModal();
  };
  return (
    <>
      <MyChallengeWrap>
        {data.map((item, index) => {
          if (!item.challengeItem) return null;

          return (
            <li
              key={index}
              className="flex justify-between w-full relative mb-[1.3rem]"
            >
              <MyChallengeLinkWrap
                key={item.challengeItem.id}
                link={`${PATH.CHALLENGE_DETAIL}/${item.challengeItem.id}`}
              >
                <div className="w-[16.4rem] h-[12.6rem] mr-[1.8rem] _sm:mr-[1.1rem]">
                  <ChallengeItem>
                    <ChallengeItem.Image
                      imgSrc={item.challengeItem.imgSrc}
                      alt={item.challengeItem.alt}
                      direction="vertical"
                    >
                      {!item.completeState && (
                        <ChallengeItem.Overlay text="실 패" />
                      )}
                    </ChallengeItem.Image>
                  </ChallengeItem>
                </div>

                <MyChallengeTitle
                  title={item.challengeItem.title}
                  point={item.challengeItem.point}
                />
                {(item.getReward || !item.completeState) && (
                  <div className="flex justify-between w-full max-w-[16rem] absolute bottom-0 right-0">
                    <div className="flex justify-start flex-col">
                      <span className="text-[#777777] text-[12px] font-medium">
                        획득 포인트
                      </span>
                      <span className="text-black text-[18px] font-medium">
                        {item.completePoint}
                      </span>
                    </div>
                    <div className="flex justify-start flex-col">
                      <span className="text-[#777777] text-[12px] font-medium">
                        달성률
                      </span>
                      <span className="text-black text-[18px] font-medium">
                        {item.completePer}
                      </span>
                    </div>
                  </div>
                )}
              </MyChallengeLinkWrap>
              {!item.getReward && item.completeState && !item.haveItem && (
                <MyChallengeLabel
                  labelText="보상 수령"
                  onClick={onClickGetRewardButton}
                />
              )}
              {!item.getReward && item.completeState && item.haveItem && (
                <MyChallengeLabel
                  labelText="보상 수령"
                  onClick={onClickGetRewardTwiceButton}
                />
              )}
            </li>
          );
        })}
      </MyChallengeWrap>
    </>
  );
};

export default MyChallengeComplete;
