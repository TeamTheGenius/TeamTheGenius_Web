import getMyChallengeDone from "@/apis/getMyChallengeDone";
import ChallengeItem from "@/components/Common/ChallengeItem/ChallengeItem";
import MyChallengeLabel from "@/components/Main/MyChallenge/MyChallengeLabel/MyChallengeLabel";
import MyChallengeLinkWrap from "@/components/Main/MyChallenge/MyChallengeLinkWrap/MyChallengeLinkWrap";
import MyChallengeModal from "@/components/Main/MyChallenge/MyChallengeModal/MyChallengeModal";
import MyChallengeTitle from "@/components/Main/MyChallenge/MyChallengeTitle/MyChallengeTitle";
import MyChallengeWrap from "@/components/Main/MyChallenge/MyChallengeWrap/MyChallengeWrap";
import { PATH } from "@/constants/path";
import { makeBase64IncodedImage } from "@/utils/makeBase64IncodedImage";
import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";

interface Props {
  setModal: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  closeModal: () => void;
  openModal: () => void;
}

interface Data {
  instanceId: number;
  title: string;
  pointPerPerson: number;
  joinResult: "SUCCESS" | "FAIL";
  canGetReward: boolean;
  numOfPointItem: number;
  rewardPoints: number;
  achievementRate: number;
  fileResponse: File;
}

interface File {
  encodedFile: string;
}

const MyChallengeComplete = () => {
  const { setModal, closeModal, openModal } = useOutletContext<Props>();

  const { data } = useQuery<Data[]>({
    queryKey: ["myChallengeDone"],
    queryFn: () => getMyChallengeDone(),
  });

  if (!data) {
    return;
  }

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
          return (
            <li
              key={index}
              className="flex justify-between w-full relative mb-[1.3rem]"
            >
              <MyChallengeLinkWrap
                key={index}
                link={`${PATH.CERTIFICATION}/${item.instanceId}/my-current`}
              >
                <div className="w-[16.4rem] h-[12.6rem] mr-[1.8rem] _sm:mr-[1.1rem]">
                  <ChallengeItem>
                    <ChallengeItem.Image
                      imgSrc={makeBase64IncodedImage({
                        uri: item.fileResponse.encodedFile,
                        format: "jpg",
                      })}
                      alt={"챌린지 이미지"}
                      direction="vertical"
                    >
                      {item.joinResult === "FAIL" && (
                        <ChallengeItem.Overlay text="실 패" />
                      )}
                    </ChallengeItem.Image>
                  </ChallengeItem>
                </div>

                <MyChallengeTitle
                  title={item.title}
                  point={item.pointPerPerson}
                />
                {!item.canGetReward && (
                  <div className="flex justify-between w-full max-w-[16rem] absolute bottom-0 right-0">
                    <div className="flex justify-start flex-col">
                      <span className="text-[#777777] text-[12px] font-medium">
                        획득 포인트
                      </span>
                      <span className="text-black text-[18px] font-medium">
                        {item.rewardPoints}
                      </span>
                    </div>
                    <div className="flex justify-start flex-col">
                      <span className="text-[#777777] text-[12px] font-medium">
                        달성률
                      </span>
                      <span className="text-black text-[18px] font-medium">
                        {item.achievementRate}
                      </span>
                    </div>
                  </div>
                )}
              </MyChallengeLinkWrap>
              {item.canGetReward && item.numOfPointItem === 0 && (
                <MyChallengeLabel
                  labelText="보상 수령"
                  onClick={onClickGetRewardButton}
                />
              )}
              {!item.canGetReward && item.numOfPointItem > 0 && (
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
