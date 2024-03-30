import getMyChallengeDone from "@/apis/getMyChallengeDone";
import getMyChallengeDoneReward from "@/apis/getMyChallengeDoneReward";
import ChallengeItem from "@/components/Common/ChallengeItem/ChallengeItem";
import Loading from "@/components/Common/Loading/Loading";
import MyChallengeLabel from "@/components/Main/MyChallenge/MyChallengeLabel/MyChallengeLabel";
import MyChallengeLinkWrap from "@/components/Main/MyChallenge/MyChallengeLinkWrap/MyChallengeLinkWrap";
import GetRewardModal from "@/components/Main/MyChallenge/MyChallengeModal/GetRewardModal/GetRewardModal";
import GetRewardTwiceModal from "@/components/Main/MyChallenge/MyChallengeModal/GetRewardTwiceModal/GetRewardTwiceModal";
import MyChallengeTitle from "@/components/Main/MyChallenge/MyChallengeTitle/MyChallengeTitle";
import MyChallengeWrap from "@/components/Main/MyChallenge/MyChallengeWrap/MyChallengeWrap";
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
  rewardedPoints: number;
  achievementRate: number;
  itemId: number;
  fileResponse: File;
}

interface File {
  encodedFile: string;
}

const MyChallengeComplete = () => {
  const { setModal, closeModal, openModal } = useOutletContext<Props>();

  const { data, refetch, isLoading } = useQuery<Data[]>({
    queryKey: ["myChallengeDone"],
    queryFn: () => getMyChallengeDone(),
  });

  if (isLoading) {
    return <Loading />;
  }
  if (!data) {
    return;
  }

  const onClickGetRewardButton = async (
    e: React.MouseEvent,
    instanceId: number
  ) => {
    e.stopPropagation();
    await getMyChallengeDoneReward({ instanceId });
    setModal(<GetRewardModal closeModal={closeModal} />);
    openModal();
    refetch();
  };
  const onClickGetRewardTwiceButton = (
    e: React.MouseEvent,
    instanceId: number,
    numOfPointItem: number,
    itemId: number
  ) => {
    e.stopPropagation();
    setModal(
      <GetRewardTwiceModal
        numOfPointItem={numOfPointItem}
        instanceId={instanceId}
        closeModal={closeModal}
        refetch={refetch}
        itemId={itemId}
      />
    );
    openModal();
  };
  return (
    <>
      <MyChallengeWrap>
        {data.map((item, index) => {
          return (
            <li key={index} className="mb-[1.3rem] list-none">
              <MyChallengeLinkWrap key={index} instanceId={item.instanceId}>
                <div className="min-w-[16.4rem] w-[16.4rem]">
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

                <div className="w-full justify-between flex flex-col ">
                  <MyChallengeTitle
                    title={item.title}
                    point={item.pointPerPerson}
                  />
                  {!item.canGetReward && (
                    <div className="flex justify-around w-full">
                      <div className="flex flex-col">
                        <span className="text-[#777777] text-[12px] font-medium">
                          획득 포인트
                        </span>
                        <span className="text-black text-[18px] font-medium">
                          {item.rewardedPoints}P
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
                  {item.canGetReward && item.numOfPointItem === 0 && (
                    <MyChallengeLabel
                      labelText="보상 수령"
                      onClick={(e: React.MouseEvent) =>
                        onClickGetRewardButton(e, item.instanceId)
                      }
                    />
                  )}
                  {item.canGetReward && item.numOfPointItem > 0 && (
                    <MyChallengeLabel
                      labelText="보상 수령"
                      onClick={(e: React.MouseEvent) =>
                        onClickGetRewardTwiceButton(
                          e,
                          item.instanceId,
                          item.numOfPointItem,
                          item.itemId
                        )
                      }
                    />
                  )}
                </div>
              </MyChallengeLinkWrap>
            </li>
          );
        })}
      </MyChallengeWrap>
    </>
  );
};

export default MyChallengeComplete;
