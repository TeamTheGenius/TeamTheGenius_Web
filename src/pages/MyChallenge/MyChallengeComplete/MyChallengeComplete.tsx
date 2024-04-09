import ChallengeItem from "@/components/Common/ChallengeItem/ChallengeItem";
import { ModalLayer } from "@/components/Common/Modal/Modal";
import MyChallengeLabel from "@/components/Main/MyChallenge/MyChallengeLabel/MyChallengeLabel";
import MyChallengeLinkWrap from "@/components/Main/MyChallenge/MyChallengeLinkWrap/MyChallengeLinkWrap";
import GetRewardModal from "@/components/Main/MyChallenge/MyChallengeModal/GetRewardModal/GetRewardModal";
import AskGetRewardTwiceModal from "@/components/Main/MyChallenge/MyChallengeModal/AskGetRewardTwiceModal/AskGetRewardTwiceModal";
import MyChallengeTitle from "@/components/Main/MyChallenge/MyChallengeTitle/MyChallengeTitle";
import MyChallengeWrap from "@/components/Main/MyChallenge/MyChallengeWrap/MyChallengeWrap";
import { useGetMyDoneChallenges } from "@/hooks/queries/useMyChallengeQuery";
import useModal from "@/hooks/useModal";
import { makeBase64IncodedImage } from "@/utils/makeBase64IncodedImage";
import React, { useState } from "react";
import { createPortal } from "react-dom";

const MyChallengeComplete = () => {
  const { isModalOpened, closeModal, openModal } = useModal();
  const [modal, setModal] = useState<React.ReactNode>();

  const { data } = useGetMyDoneChallenges();

  if (!data) {
    return;
  }

  const onClickGetRewardButton = async (
    e: React.MouseEvent,
    instanceId: number
  ) => {
    e.stopPropagation();
    setModal(
      <GetRewardModal
        setModal={setModal}
        instanceId={instanceId}
        closeModal={closeModal}
      />
    );
    openModal();
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
        closeModal={closeModal}
        setModal={setModal}
        itemId={itemId}
      />
    );
    openModal();
  };
  return (
    <>
      {isModalOpened &&
        createPortal(
          <ModalLayer onClick={closeModal}>{modal}</ModalLayer>,
          document.body
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
