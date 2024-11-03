import Bottom from "@/components/ChallengeDetail/Bottom/Bottom";
import CoreInformation from "@/components/ChallengeDetail/CoreInformation/CoreInformation";
import Image from "@/components/ChallengeDetail/Image/Image";
import Information from "@/components/ChallengeDetail/Information/Information";
import Line from "@/components/ChallengeDetail/Line/Line";
import { makeBase64IncodedImage } from "@/utils/makeBase64IncodedImage";
import ParticipationCancelButton from "@/components/ChallengeDetail/ParticipationCancelButton/ParticipationCancelButton";
import { useGetChallengeDetail } from "@/hooks/queries/useInstanceDetailQuery";

interface Props {
  decryptId: number;
}
function ChallengeDetailContent({ decryptId }: Props) {
  const { data } = useGetChallengeDetail(decryptId);

  if (!data) return null;

  const PARTICIPATION_YET =
    data.joinStatus === "NO" && data.progress === "PREACTIVITY";
  const PARTICIPATION_COMPLETE =
    data.joinStatus === "YES" &&
    (data.progress === "PREACTIVITY" || data.progress === "ACTIVITY");
  const PARTICIPATION_NONE =
    data.joinStatus === "NO" && data.progress === "ACTIVITY";
  const CHALLENGE_FINISHED = data.progress === "DONE";

  return (
    <>
      <div className="max-w-[54.6rem] w-full flex flex-col gap-[2.3rem]">
        <Image
          imgSrc={makeBase64IncodedImage({
            uri: data.fileResponse.encodedFile,
            format: "jpg",
          })}
          alt={"챌린지 이미지"}
        />
        <CoreInformation
          challengeTitle={data.title}
          applicant={data.participantCount}
          period={`${data.startedDate} - ${data.completedDate} / 매일`}
          dDay={data.remainDays}
          point={data.pointPerPerson}
        />
        <Line />
        <Information title="상세 정보" content={data.description} />
        <Line />
        <Information title="인증 방법" content={data.certificationMethod} />
        <Line />
        <Information title="유의 사항" content={data.notice} />
        <Line />
      </div>

      <div className="max-w-[54.6rem] w-full z-10 fixed bottom-0">
        {PARTICIPATION_COMPLETE && (
          <ParticipationCancelButton
            instanceId={decryptId}
            title={data.title}
          />
        )}
        <Bottom>
          <Bottom.Heart
            isHearted={data.likesInfo.isLiked}
            likesId={data.likesInfo.likesId}
            heartCount={data.likesInfo.likesCount}
            instanceId={decryptId}
          />
          {(CHALLENGE_FINISHED && <Bottom.Button status="챌린지종료" />) ||
            (PARTICIPATION_YET && <Bottom.Button status="참가하기" />) ||
            (PARTICIPATION_COMPLETE && <Bottom.Button status="참가완료" />) ||
            (PARTICIPATION_NONE && <Bottom.Button status="모집완료" />)}
        </Bottom>
      </div>
    </>
  );
}

export default ChallengeDetailContent;
