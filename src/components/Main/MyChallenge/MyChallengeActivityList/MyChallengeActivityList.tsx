import ChallengeItem from "@/components/Common/ChallengeItem/ChallengeItem";
import MyChallengeLabel from "@/components/Main/MyChallenge/MyChallengeLabel/MyChallengeLabel";
import MyChallengeLinkWrap from "@/components/Main/MyChallenge/MyChallengeLinkWrap/MyChallengeLinkWrap";
import MyChallengeTitle from "@/components/Main/MyChallenge/MyChallengeTitle/MyChallengeTitle";
import MyChallengeWrap from "@/components/Main/MyChallenge/MyChallengeWrap/MyChallengeWrap";
import successStamp from "@/assets/icon/success-stamp.svg";
import { makeBase64IncodedImage } from "@/utils/makeBase64IncodedImage";
import MyChallengePassItem from "@/components/Main/MyChallenge/MyChallengePass/MyChallengePassItem";
import CertificationPassModal from "@/components/Main/MyChallenge/MyChallengeModal/CertificationPassModal/CertificationPassModal";
import { useGetMyActivityChallenges } from "@/hooks/queries/useMyChallengeQuery";
import CertificationModal from "@/components/Main/MyChallenge/MyChallengeModal/CertificationModal/CertificationModal";
import { EmptyDataView } from "@/components/Common/EmptyDataView/EmptyDataView";
import { PATH } from "@/constants/path";
import { useModalStore } from "@/stores/modalStore";

interface PassItemModal {
  e: React.MouseEvent;
  instanceId: number;
  numOfPassItem: number;
  itemId: number;
}

const MyChallengeActivityList = () => {
  const { setModal } = useModalStore();
  const { data } = useGetMyActivityChallenges();
  if (!data) {
    return;
  }

  const onClickPassItem = ({
    e,
    instanceId,
    numOfPassItem,
    itemId,
  }: PassItemModal) => {
    e.stopPropagation();
    setModal(
      <CertificationPassModal
        instanceId={instanceId}
        numOfPassItem={numOfPassItem}
        itemId={itemId}
      />
    );
  };

  const reNewCertification = async (
    e: React.MouseEvent,
    instanceId: number
  ) => {
    e.stopPropagation();
    setModal(<CertificationModal instanceId={instanceId} />);
  };

  return (
    <>
      {!data.length && (
        <div className="mt-[5rem]">
          <EmptyDataView>
            <EmptyDataView.FireHatchIcon />
            <EmptyDataView.Title title="진행 중인 챌린지가 없습니다" />
            <EmptyDataView.SubTitle subTitle="새로운 챌린지에 참여해보세요" />
            <EmptyDataView.Button label="챌린지 구경가기" path={PATH.HOME} />
          </EmptyDataView>
        </div>
      )}
      <MyChallengeWrap>
        {data.map((item, index) => {
          return (
            <li key={index} className=" mb-[1.3rem] list-none">
              <MyChallengeLinkWrap instanceId={item.instanceId}>
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
                      {item.certificateStatus === "패스 완료" && (
                        <ChallengeItem.Overlay text="패 스" />
                      )}
                      {item.certificateStatus === "인증 갱신" && (
                        <ChallengeItem.Overlay />
                      )}
                      {item.certificateStatus === "인증 갱신" && (
                        <img
                          src={successStamp}
                          alt="성공 스탬프"
                          className="bottom-[1rem] right-[1rem] absolute"
                        />
                      )}
                    </ChallengeItem.Image>
                  </ChallengeItem>
                </div>
                <div className="w-full justify-between flex flex-col ">
                  <MyChallengeTitle
                    title={item.title}
                    point={item.pointPerPerson}
                    repositoryName={item.repository}
                  />
                  {item.canUsePassItem &&
                    item.certificateStatus == "인증하기" && (
                      <MyChallengePassItem
                        passCount={item.numOfPassItem}
                        onClick={(e: React.MouseEvent) =>
                          onClickPassItem({
                            e: e,
                            instanceId: item.instanceId,
                            numOfPassItem: item.numOfPassItem,
                            itemId: item.itemId,
                          })
                        }
                      />
                    )}
                  {item.certificateStatus === "인증 갱신" ||
                  item.certificateStatus === "인증하기" ? (
                    <MyChallengeLabel
                      labelText={item.certificateStatus}
                      onClick={(e: React.MouseEvent) =>
                        reNewCertification(e, item.instanceId)
                      }
                    />
                  ) : (
                    <MyChallengeLabel labelText={item.certificateStatus} />
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

export default MyChallengeActivityList;
