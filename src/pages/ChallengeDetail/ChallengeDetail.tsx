import { useParams } from "react-router-dom";
import Bottom from "@/components/ChallengeDetail/Bottom/Bottom";
import CoreInformation from "@/components/ChallengeDetail/CoreInformation/CoreInformation";
import Image from "@/components/ChallengeDetail/Image/Image";
import Information from "@/components/ChallengeDetail/Information/Information";
import Line from "@/components/ChallengeDetail/Line/Line";
import MobCard from "@/components/Common/MobCard";
import DynamicBackIcon from "@/components/Common/DynamicBackIcon/DynamicBackIcon";
import getInstanceDetail from "@/apis/getInstanceDetail";
import { makeBase64IncodedImage } from "@/utils/makeBase64IncodedImage";
import { useQuery } from "react-query";
import ParticipationCancelButton from "@/components/ChallengeDetail/ParticipationCancelButton/ParticipationCancelButton";
import { decrypt } from "@/hooks/useCrypto";

interface Data {
  instanceId: number;
  title: string;
  remainDays: number;
  startedDate: string;
  completedDate: string;
  participantCount: number;
  pointPerPerson: number;
  description: string;
  notice: string;
  certificationMethod: string;
  joinStatus: "NO" | "YES";
  likesInfo: Likes;
  fileResponse: File;
  progress: "PREACTIVITY" | "ACTIVITY" | "DONE";
}

interface Likes {
  likesId: number;
  isLiked: boolean;
  likesCount: number;
}

interface File {
  encodedFile: string;
}

function ChallengeDetail() {
  const { id } = useParams();
  const decryptId = decrypt(id);
  const { data, refetch } = useQuery<Data>({
    queryKey: ["instanceDetail", { decryptId }],
    queryFn: () =>
      decryptId
        ? getInstanceDetail({ instanceId: parseInt(decryptId) })
        : Promise.resolve(null),
  });

  if (!decryptId) return;
  if (!data) return;

  const PARTICIPATION_YET =
    data.joinStatus === "NO" && data.progress === "PREACTIVITY";
  const PARTICIPATION_COMPLETE =
    data.joinStatus === "YES" &&
    (data.progress === "PREACTIVITY" || data.progress === "ACTIVITY");
  const PARTICIPATION_NONE =
    data.joinStatus === "NO" && data.progress === "ACTIVITY";
  const CHALLENGE_FINISHED = data.progress === "DONE";

  return (
    <MobCard>
      <div className="max-w-[77.3rem] w-full z-10 fixed ml-[1.9rem] top-[1.3rem]">
        <DynamicBackIcon />
      </div>

      <div className="pb-[13rem] flex flex-col items-center">
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
              instanceId={parseInt(decryptId)}
              refetch={refetch}
              title={data.title}
            />
          )}
          <Bottom>
            <Bottom.Heart
              refetch={refetch}
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
      </div>
    </MobCard>
  );
}

export default ChallengeDetail;
