import MyChallengeWrap from "@/components/Main/MyChallenge/MyChallengeWrap/MyChallengeWrap";
import MyChallengeTitle from "@/components/Main/MyChallenge/MyChallengeTitle/MyChallengeTitle";
import MyChallengeLinkWrap from "@/components/Main/MyChallenge/MyChallengeLinkWrap/MyChallengeLinkWrap";
import MyChallengeLabel from "@/components/Main/MyChallenge/MyChallengeLabel/MyChallengeLabel";
import ChallengeItem from "@/components/Common/ChallengeItem/ChallengeItem";
import { makeBase64IncodedImage } from "@/utils/makeBase64IncodedImage";
import { useGetMyPreActivityChallenges } from "@/hooks/queries/useMyChallengeQuery";
import { EmptyDataView } from "@/components/Common/EmptyDataView/EmptyDataView";
import { PATH } from "@/constants/path";

const MyChallengeStart = () => {
  const { data } = useGetMyPreActivityChallenges();

  return (
    <>
      {!data?.length && (
        <div className="mt-[5rem]">
          <EmptyDataView>
            <EmptyDataView.FireHatchIcon />
            <EmptyDataView.Title title="시작 전인 챌린지가 없습니다" />
            <EmptyDataView.SubTitle subTitle="새로운 챌린지에 참여해보세요" />
            <EmptyDataView.Button label="챌린지 구경가기" path={PATH.HOME} />
          </EmptyDataView>
        </div>
      )}
      <MyChallengeWrap>
        {data?.map((item, index) => {
          return (
            <li key={index} className="mb-[1.3rem] list-none">
              <MyChallengeLinkWrap key={index} instanceId={item.instanceId}>
                <div className="min-w-[16.4rem] w-[16.4rem] h-[12.6rem]">
                  <ChallengeItem>
                    <ChallengeItem.Image
                      imgSrc={makeBase64IncodedImage({
                        uri: item.fileResponse.encodedFile,
                        format: "jpg",
                      })}
                      alt={"챌린지 이미지"}
                      direction="vertical"
                    >
                      <ChallengeItem.Overlay text={`D - ${item.remainDays}`} />
                      <ChallengeItem.NumberOfParticipant
                        numberOfParticipants={item.participantCount}
                      />
                    </ChallengeItem.Image>
                  </ChallengeItem>
                </div>

                <div className="w-full justify-between flex flex-col ">
                  <MyChallengeTitle
                    title={item.title}
                    point={item.pointPerPerson}
                  />
                  <MyChallengeLabel
                    labelText="시작 전"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </MyChallengeLinkWrap>
            </li>
          );
        })}
      </MyChallengeWrap>
    </>
  );
};

export default MyChallengeStart;
