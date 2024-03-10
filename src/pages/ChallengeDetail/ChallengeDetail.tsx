import { useParams } from "react-router-dom";
import Bottom from "@/components/ChallengeDetail/Bottom/Bottom";
import CoreInformation from "@/components/ChallengeDetail/CoreInformation/CoreInformation";
import Image from "@/components/ChallengeDetail/Image/Image";
import Information from "@/components/ChallengeDetail/Information/Information";
import Line from "@/components/ChallengeDetail/Line/Line";
import MobCard from "@/components/Common/MobCard";
import { useState } from "react";
import DynamicBackIcon from "@/components/Common/DynamicBackIcon/DynamicBackIcon";
import getInstanceDetail from "@/apis/getInstanceDetail";
import { makeBase64IncodedImage } from "@/utils/makeBase64IncodedImage";
import { useQuery } from "react-query";

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
  joinStatus: string;
  hitCount: number;
  fileResponse: File;
}

interface File {
  encodedFile: string;
}

function ChallengeDetail() {
  const [heartActive, setHeartActive] = useState<boolean>(false);

  const { id } = useParams();

  const { data } = useQuery<Data>({
    queryKey: ["instanceDetail", { id }],
    queryFn: () =>
      id
        ? getInstanceDetail({ instanceId: parseInt(id) })
        : Promise.resolve(null),
  });

  if (!data) return;
  const tempToday = new Date();

  const certificationStartDate = new Date(`${data.startedDate}T00:00:00`);
  const certificationEndDate = new Date(`${data.completedDate}T00:00:00`);
  certificationEndDate.setDate(certificationEndDate.getDate() + 1);
  const applyLastDate = new Date(certificationStartDate);
  const challengeEndDate = new Date(certificationEndDate);
  applyLastDate.setSeconds(certificationStartDate.getSeconds() - 1);
  challengeEndDate.setSeconds(certificationEndDate.getSeconds() + 1);

  return (
    <MobCard>
      <div className="max-w-[77.3rem] w-full z-10 fixed ml-[1.9rem] top-[1.3rem]">
        <DynamicBackIcon />
      </div>

      <div className="pb-[8rem] flex flex-col items-center">
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

        <div className="px-[2.2rem] max-w-[59rem] w-full z-10 fixed bottom-0">
          <Bottom>
            <Bottom.Heart
              heartActive={heartActive}
              setHeartActive={setHeartActive}
              heartCount={data.hitCount}
            />
            {(challengeEndDate.getTime() <= tempToday.getTime() && (
              <Bottom.Button status="챌린지종료" />
            )) ||
              (applyLastDate.getTime() >= tempToday.getTime() &&
                data.joinStatus === "NO" && (
                  <Bottom.Button status="참가하기" />
                )) ||
              (certificationEndDate.getTime() >= tempToday.getTime() &&
                data.joinStatus === "YES" && (
                  <Bottom.Button status="참가완료" />
                )) ||
              (certificationStartDate.getTime() <= tempToday.getTime() &&
                certificationEndDate.getTime() >= tempToday.getTime() &&
                data.joinStatus === "NO" && (
                  <Bottom.Button status="모집완료" />
                ))}
          </Bottom>
        </div>
      </div>
    </MobCard>
  );
}

export default ChallengeDetail;
