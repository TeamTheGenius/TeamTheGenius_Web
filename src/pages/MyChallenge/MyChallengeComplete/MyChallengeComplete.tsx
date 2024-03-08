import getMyChallengeDone from "@/apis/getMyChallengeDone";
import getMyChallengeDoneReward from "@/apis/getMyChallengeDoneReward";
import ChallengeItem from "@/components/Common/ChallengeItem/ChallengeItem";
import MyChallengeLabel from "@/components/Main/MyChallenge/MyChallengeLabel/MyChallengeLabel";
import MyChallengeLinkWrap from "@/components/Main/MyChallenge/MyChallengeLinkWrap/MyChallengeLinkWrap";
import GetRewardModal from "@/components/Main/MyChallenge/MyChallengeModal/GetRewardModal/GetRewardModal";
import GetRewardTwiceModal from "@/components/Main/MyChallenge/MyChallengeModal/GetRewardTwiceModal/GetRewardTwiceModal";
import MyChallengeTitle from "@/components/Main/MyChallenge/MyChallengeTitle/MyChallengeTitle";
import MyChallengeWrap from "@/components/Main/MyChallenge/MyChallengeWrap/MyChallengeWrap";
import { PATH } from "@/constants/path";
import { makeBase64IncodedImage } from "@/utils/makeBase64IncodedImage";
import { useQuery } from "react-query";
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

  const { data, refetch } = useQuery<Data[]>({
    queryKey: ["myChallengeDone"],
    queryFn: () => getMyChallengeDone(),
  });

  if (!data) {
    return;
  }

  const onClickGetRewardButton = async (instanceId: number) => {
    await getMyChallengeDoneReward({ item: false, instanceId });
    setModal(<GetRewardModal closeModal={closeModal} />);
    openModal();
    refetch();
  };
  const onClickGetRewardTwiceButton = (instanceId: number) => {
    setModal(
      <GetRewardTwiceModal instanceId={instanceId} closeModal={closeModal} />
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
                        {item.rewardPoints || 0}P
                      </span>
                    </div>
                    <div className="flex justify-start flex-col">
                      <span className="text-[#777777] text-[12px] font-medium">
                        달성률
                      </span>
                      <span className="text-black text-[18px] font-medium">
                        {item.achievementRate}%
                      </span>
                    </div>
                  </div>
                )}
              </MyChallengeLinkWrap>
              {item.canGetReward && item.numOfPointItem === 0 && (
                <MyChallengeLabel
                  labelText="보상 수령"
                  onClick={() => onClickGetRewardButton(item.instanceId)}
                />
              )}
              {!item.canGetReward && item.numOfPointItem > 0 && (
                <MyChallengeLabel
                  labelText="보상 수령"
                  onClick={() => onClickGetRewardTwiceButton(item.instanceId)}
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
