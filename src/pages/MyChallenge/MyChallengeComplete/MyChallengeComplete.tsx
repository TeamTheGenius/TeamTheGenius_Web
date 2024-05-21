import ChallengeItem from "@/components/Common/ChallengeItem/ChallengeItem";
import MyChallengeLabel from "@/components/Main/MyChallenge/MyChallengeLabel/MyChallengeLabel";
import MyChallengeLinkWrap from "@/components/Main/MyChallenge/MyChallengeLinkWrap/MyChallengeLinkWrap";
import GetRewardModal from "@/components/Main/MyChallenge/MyChallengeModal/GetRewardModal/GetRewardModal";
import AskGetRewardTwiceModal from "@/components/Main/MyChallenge/MyChallengeModal/AskGetRewardTwiceModal/AskGetRewardTwiceModal";
import MyChallengeTitle from "@/components/Main/MyChallenge/MyChallengeTitle/MyChallengeTitle";
import MyChallengeWrap from "@/components/Main/MyChallenge/MyChallengeWrap/MyChallengeWrap";
import { useGetMyDoneChallenges } from "@/hooks/queries/useMyChallengeQuery";
import { makeBase64IncodedImage } from "@/utils/makeBase64IncodedImage";
import React from "react";
import { EmptyDataView } from "@/components/Common/EmptyDataView/EmptyDataView";
import { useModalStore } from "@/stores/modalStore";

const MyChallengeComplete = () => {
  const { setModal } = useModalStore();
  const { data } = useGetMyDoneChallenges();

  if (!data) {
    return;
  }

  const onClickGetRewardButton = async (
    e: React.MouseEvent,
    instanceId: number
  ) => {
    e.stopPropagation();
    setModal(<GetRewardModal instanceId={instanceId} />);
  };
  const onClickGetRewardTwiceButton = (
    e: React.MouseEvent,
    instanceId: number,
    numOfPointItem: number,
    itemId: number
  ) => {
    e.stopPropagation();
    setModal(
      <AskGetRewardTwiceModal
        numOfPointItem={numOfPointItem}
        instanceId={instanceId}
        itemId={itemId}
      />
    );
  };
  return (
    <>
      {!data.length && (
        <div className="mt-[5rem]">
          <EmptyDataView>
            <EmptyDataView.FireHatchIcon />
            <EmptyDataView.Title title="완료한 챌린지가 없습니다" />
            <EmptyDataView.SubTitle subTitle="챌린지에 참여해 끝까지 힘내봐요!" />
          </EmptyDataView>
        </div>
      )}

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
